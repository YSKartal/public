addJavascriptIndentation = function() {
    // Get the selected textrange in a textarea or textfield.
    textSelection = document.selection ?
        // for IE
        function(element) {
            var selection = element.ownerDocument.selection.createRange();
            var selectionCopy = selection.duplicate();
            selectionCopy.moveToElementText(element);
            // something inside the field is selected
            if (selectionCopy.inRange(selection)) {
                var old_text = selection.text,
                    content = element.value,
                    marker = "\u6666";
                // Bad hack... but other approaches act crummy around
                // newlines. A thousand curses on the person that designed
                // this interface.
                selection.text = marker;
                var start = element.value.indexOf(marker),
                    end = content.length - (element.value.length - (start + 1));
                element.value = content;
                return { start: start, end: end };
            }
            // selection is outside of field, default to putting the cursor at
            // the end of the element
            else {
                return {
                    start: element.value.length,
                    end: element.value.length
                };
            }
        } :
        // for other browsers
        function(element) {
            return {
                start: element.selectionStart,
                end: element.selectionEnd,
                // FF resets scrolling when changing content, so we store that too
                scroll: element.scrollTop
            };
        };

    // Change the selected text in a textarea or textfield.
    setTextSelection = document.selection ?
        // for IE
        function(element, range) {
            // Helper to work around dumb IE behaviour (newlines aren't
            // counted as characters when moving a selection).
            function countNewlineChars(string, from, to) {
                var count = 0;
                for (var i = from; i != to; i++) {
                    if (string.charAt(i) == "\n")
                        count++;
                }
                return count;
            }
            var selection = element.ownerDocument.selection.createRange().duplicate();
            selection.moveToElementText(element);
            selection.collapse();
            var start_hidden_chars = countNewlineChars(element.value, 0, range.start),
                end_hidden_chars = start_hidden_chars + countNewlineChars(element.value, range.start, range.end);
            // This does not work precisely as it should (a cursor after a
            // newline will end up in front of it), but in most cases it
            // does what we want.
            selection.moveEnd("character", range.end - end_hidden_chars);
            selection.moveStart("character", range.start - start_hidden_chars);
            selection.select();
        } :
        // for other browsers
        function(element, range) {
            element.selectionEnd = range.end;
            element.selectionStart = range.start;
            if (range.scroll)
                element.scrollTop = range.scroll;
            element.focus();
        };

    // Used to make scanning through code easier -- this will scan
    // backwards, finding the next character that is not part of a comment
    // or a string.
    function prevRelevantChar(text, point) {
        // This is rather inefficient, single-line comments were not
        // designed to be parsed backwards.
        function eatSingleLineComment() {
            var comment_pos = null;
            for (var temp_point = point - 1; temp_point > 0 && text.charAt(temp_point) != "\n"; temp_point--) {
                if (text.charAt(temp_point) == "/" && text.charAt(temp_point - 1) == "/")
                    comment_pos = temp_point - 2;
            }
            if (comment_pos !== null)
                point = comment_pos;
        }

        function eatMultiLineComment() {
            for (; point > 0; point--) {
                if (text.charAt(point) == "*" && text.charAt(point - 1) == "/") {
                    point -= 2;
                    break;
                }
            }
        }

        function eatString() {
            for (; point >= 0; point--) {
                if (text.charAt(point) == "\"" && (point == 0 || text.charAt(point - 1) != "\\")) {
                    point--;
                    break;
                } else if (text.charAt(point) == "\n") {
                    break;
                }
            }
        }

        if (point < text.length - 1 && text.charAt(point + 1) == "\n")
            eatSingleLineComment();

        while (point >= 0) {
            var ch = text.charAt(point);
            if (ch == "\"") {
                point--;
                eatString();
            } else if (ch == "/") {
                if (point > 0 && text.charAt(point - 1) == "*")
                    eatMultiLineComment();
                else
                    break;
            } else {
                break;
            }
        }
        return point;
    }

    function whiteSpace(ch) {
        return (ch == " " || ch == "\t" || ch == "\n" || ch == "\r");
    }

    // Find the start of a line within a string.
    function lineStart(text, point) {
        for (var line_start = Math.max(point - 1, 0); line_start > 0; line_start--) {
            if (text.charAt(line_start) == "\n") {
                line_start++;
                break;
            }
        }
        return line_start;
    }

    // Find the end of a line within a string.
    function lineEnd(text, point) {
        for (var line_end = point; line_end != text.length; line_end++) {
            if (text.charAt(line_end) == "\n")
                break;
        }
        return line_end;
    }

    // Test whether any non-whitespace, non-comment content follows on
    // this line.
    function isEndOfLine(text, point) {
        function eatComment() {
            for (; point < text.length - 1 && !(text.charAt(point) == "*" && text.charAt(point + 1) == "/"); point++);
            point++;
        }
        for (; point < text.length; point++) {
            var ch = text.charAt(point);
            if (ch == "\n" || ch == "\r") {
                return true;
            } else if (ch == "/" && point < text.length - 1) {
                if (text.charAt(point + 1) == "/")
                    return true;
                else if (text.charAt(point + 1) == "*")
                    eatComment();
            } else if (!(ch == " " || ch == "\t")) {
                return false;
            }
        }
        return true;
    }

    // Decide whether a line that ends with a colon should be
    // interpreted as a case label.
    function looksLikeCase(text, point) {
        return text.slice(lineStart(text, point), point).match(/case/i);
    }

    var matching_char = { "{": "}", "[": "]", "(": ")" };

    /**
     * There are several indentation modes that can be used. Which one is
     * picked depends on the context of the line that we want to indent. A
     * mode is applied relative to a 'base' indentation, which is usually
     * the indentation of the full statement preceding the current one.
     * These are the modes:
     *
     * same: The line should be indented on the same base as the statement
     * before it, unless it starts with a closing brace, in which case it
     * should go back one unit towards the left side.
     *
     * continue: The line is a continuation of the statement on the
     * previous line, and should be indented one unit more than the start
     * of this statement;
     *
     * inside: A new block has been opened, and the current line should be
     * indented one unit more than the statement that started the block.
     *
     * enum: The line is part of a list of arguments, array elements, or
     * object elements, and should be intended exactly under the paren,
     * brace, or bracket that started this enum.
     *
     * multiscope: This is a special case for when multiple new scopes are
     * opened on a line. It will indent one unit deeper than the statement
     * that started the outer scope. This is mostly to make it possible to
     * pass anonymous functions as function arguments without indenting
     * ridiculously far.
     *
     * comment: The line is part of a multiline comment and should be
     * indented relative to the start of the comment.
     *
     * The function findBaseIndentation inspects the last character before
     * the current line, and then calls statementIndentation with a mode
     * hint based on this character. statementIndentation looks for the
     * start of the statement indicated with argument point, or overrides
     * the given mode if the start of a multiline comment or an unmatched
     * opening paren, brace, or bracket is encountered.
     */

    function findBaseIndentation(text, point) {
        while (true) {
            point = prevRelevantChar(text, point);
            if (point < 0)
                break;
            var ch = text.charAt(point);
            if (ch == "{" || ch == "(" || ch == "[")
                return statementIndentation(text, point - 1, "inside", ch);
            if (ch == "}")
                return statementIndentation(text, point, "same");
            if (ch == ";" || (ch == ":" && looksLikeCase(text, point)))
                return statementIndentation(text, point - 1, "same");
            if (!whiteSpace(ch))
                return statementIndentation(text, point, "continue");
            point--;
        }
        return { base: 0, mode: "same" };
    }

    function statementIndentation(text, point, mode, type) {
        function indentationHere() {
            // Skip end of previous statement
            point++;
            // Skip whitespace
            for (; point < text.length && whiteSpace(text.charAt(point)); point++);
            return {
                base: indentationAt(text, point),
                mode: mode,
                type: type
            };
        }

        var stack = [];
        while (true) {
            point = prevRelevantChar(text, point);
            if (point < 0)
                break;
            var ch = text.charAt(point);

            switch (ch) {
                case "\n":
                    if (stack.length == 0 && mode == "inside")
                        return indentationHere();
                    break;
                case "}":
                case "]":
                case ")":
                    stack.unshift(ch);
                    break;
                case "[":
                case "(":
                case "{":
                    if (stack.length > 0 && stack[0] == matching_char[ch])
                        stack.shift();
                    else if (isEndOfLine(text, point + 1))
                        return indentationHere();
                    else if (mode != "inside" && mode != "multiscope")
                        return {
                            base: point - lineStart(text, point),
                            mode: "enum",
                            type: ch
                        };
                    else
                        mode = "multiscope";
                    break;
                case ";":
                    if (stack.length == 0)
                        return indentationHere();
                    break;
                case "*":
                    if (point > 0 && text.charAt(point - 1) == "/")
                        return { base: (point - 1) - lineStart(text, point), mode: "comment" };
                    break;
            }
            point--;
        }
        return { base: 0, mode: mode };
    }

    // Test whether a line starts with a closing character that matches
    // the given opening char.
    function isClosing(line, open) {
        var close = matching_char[open];
        for (var i = 0; i != line.length; i++) {
            if (line.charAt(i) == close)
                return true;
            else if (!whiteSpace(line.charAt(i)))
                return false;
        }
        return false;
    }

    // Find the amount of whitespace that the line at point starts with,
    // counting tabs as 8 spaces.
    function indentationAt(text, point) {
        var indent = 0;
        for (var i = lineStart(text, point); i <= text.length; i++) {
            if (text.charAt(i) == " ")
                indent += 1;
            else if (text.charAt(i) == "\t")
                indent += 8;
            else
                break;
        }
        return indent;
    }

    // Determine the amount the line at point should be indented.
    function indentation(text, point) {
        var indent_unit = 2,
            line_start = lineStart(text, point),
            line = text.slice(line_start, lineEnd(text, point)),
            indent = findBaseIndentation(text, line_start - 1);
        switch (indent.mode) {
            case "enum":
                if (isClosing(line, indent.type))
                    return indent.base;
                else
                    return indent.base + 1;
            case "comment":
                return indent.base + 1;
            case "inside":
                if (isClosing(line, indent.type))
                    return indent.base;
                else
                    return indent.base + indent_unit;
            case "multiscope":
            case "continue":
                return indent.base + indent_unit;
            case "same":
                if (isClosing(line, "{"))
                    return indent.base - indent_unit;
                else
                    return indent.base;
        }
    }

    // Adjust the indentation of a line in a piece of text, returning the
    // new text and moving the cursor as appropriate.
    function adjustIndentation(text, indentation, point) {
        for (var line_start = point - 1; line_start > 0; line_start--) {
            if (text.charAt(line_start) == "\n") {
                line_start++;
                break;
            }
        }
        for (var remove_chars = 0; text.charAt(line_start + remove_chars).match(/[ \t]/); remove_chars++);
        var indent_space = "";
        for (var i = 0; i != indentation; i++)
            indent_space += " ";
        return {
            text: text.slice(0, line_start) + indent_space + text.slice(line_start + remove_chars),
            cursor: Math.max(line_start, point - remove_chars + indentation)
        };
    }

    // Indent the current selection.
    function indentSelection(textarea) {
        var selected = textSelection(textarea),
            text = textarea.value;
        // Single line
        if (selected.start == selected.end) {
            var proper_indent = indentation(text, selected.end);
            if (indentationAt(text, selected.end) != proper_indent) {
                var adjusted = adjustIndentation(text, proper_indent, selected.end);
                text = adjusted.text;
                selected.end = adjusted.cursor;
                selected.start = selected.end;
            }
        }
        // Selected block
        else {
            for (var i = selected.start; true; i++) {
                if (text.charAt(i) == "\n" || i == selected.end) {
                    var adjusted = adjustIndentation(text, indentation(text, i - 1), i);
                    selected.end += adjusted.cursor - i;
                    i = adjusted.cursor;
                    text = adjusted.text;
                    if (i == selected.end)
                        break;
                }
            }
        }
        textarea.value = text;
        setTextSelection(textarea, selected);
    }

    // Add automatic-indentation-related key handlers to a textarea.
    return function(textarea) {
        connect(textarea, "onkeypress", function(event) {
            var str = event.key().string;
            if (str == "}")
                setTimeout(function() { indentSelection(textarea); }, 1);
        });
        connect(textarea, "onkeyup", function(event) {
            if (event.key().string == "KEY_ENTER")
                indentSelection(textarea);
        });
        connect(textarea, "onkeydown", function(event) {
            if ((event.key().string == "KEY_SPACEBAR" || event.key().string == "KEY_I") && event.modifier().ctrl) {
                indentSelection(textarea);
                event.preventDefault();
            }
        });
    }
}();

/* Copyright (c) 2007 Marijn Haverbeke
 *
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any
 * damages arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any
 * purpose, including commercial applications, and to alter it and
 * redistribute it freely, subject to the following restrictions:
 *
 * 1. The origin of this software must not be misrepresented; you must
 *    not claim that you wrote the original software. If you use this
 *    software in a product, an acknowledgment in the product
 *    documentation would be appreciated but is not required.
 *
 * 2. Altered source versions must be plainly marked as such, and must
 *    not be misrepresented as being the original software.
 *
 * 3. This notice may not be removed or altered from any source
 *    distribution.
 *
 * Marijn Haverbeke
 * marijn(at)haverbeke.nl
 */