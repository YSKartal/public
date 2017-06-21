/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2014 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Helper functions for generating SparkS for blocks.
 * @author e1941871@ceng.metu.edu.tr (Burak Kaan Bilgehan)
 */

'use strict';

goog.provide('Blockly.SparkS');
goog.require('Blockly.Generator');

Blockly.SparkS = new Blockly.Generator('SparkS');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.SparkS.addReservedWords(

    'Blockly,include,require,bind,order,testPoint,testGroup,defineStmt,' +
    'library,linkerType,testType,interfaceName,filter,try,on,ascending,' +
    'descending,testProcess,fill,using,expand,replace,with,from,optional,' +
    'define,as,prompt,do,end,if,else,for,each,in,set,to,then,IS,NULL,end if,' +
    'else if,provide,measure,default,constant,sleep,SHUTDOWN,TRUE,FALSE,not,and,or,xor' +
    ''

);



/**
 * Order of operation ENUMs.
 * Until we get the true precedences, we will use C++ language's precedence values.
 * Operations that may not be in sparks syntax are commented.
 * Questions to ask Mr. Nikoo
 ** Do we use logical or bitwise and, not, or?
 ** Which operation is used for assignment? (I suppose it's 'is')
 ** What about shifts and the likes of +=, -=?
 ** In general what should be the order of the operations?
 */
Blockly.SparkS.ORDER_ATOMIC = 0; // 0 "" ...
Blockly.SparkS.ORDER_MEMBER = 1; // . []
Blockly.SparkS.ORDER_FUNCTION_CALL = 2; // ()
Blockly.SparkS.ORDER_MULTIPLICATION = 3; // *
Blockly.SparkS.ORDER_DIVISION = 3; // /
Blockly.SparkS.ORDER_MODULUS = 3; // %
Blockly.SparkS.ORDER_ADDITION = 4; // +
Blockly.SparkS.ORDER_SUBTRACTION = 4; // -
Blockly.SparkS.ORDER_RELATIONAL = 5; // < <= > >=
Blockly.SparkS.ORDER_EQUALITY = 6; // = /= for SparkS 
Blockly.SparkS.ORDER_LOGICAL_NOT = 7;
Blockly.SparkS.ORDER_LOGICAL_AND = 8; // and
Blockly.SparkS.ORDER_LOGICAL_XOR = 9;
Blockly.SparkS.ORDER_LOGICAL_OR = 10; // or
Blockly.SparkS.ORDER_CONDITIONAL = 11; // ?:
Blockly.SparkS.ORDER_NONE = 99; // (...)

/**
 * Arbitrary code to inject into locations that risk causing infinite loops.
 * Any instances of '%1' will be replaced by the block ID that failed.
 * E.g. '  checkTimeout(%1);\n'
 * @type ?string
 */

/**
 * Initialize the database of variable names.
 */
Blockly.SparkS.init = function(workspace) {
    // Create a dictionary of definitions to be printed before the code.
    Blockly.SparkS.definitions_ = Object.create(null);
    // Create a dictionary mapping desired function names in definitions_
    // to actual function names (to avoid collisions with user functions).
    Blockly.SparkS.functionNames_ = Object.create(null);

    if (!Blockly.SparkS.variableDB_) {
        Blockly.SparkS.variableDB_ = new Blockly.Names(Blockly.SparkS.RESERVED_WORDS_);
    } else {
        Blockly.SparkS.variableDB_.reset();
    }

    var defvars = [];
    var variables = workspace.variableList;
    for (var x = 0; x < variables.length; x++) {
        defvars[x] = Blockly.SparkS.variableDB_.getName(variables[x], Blockly.Variables.NAME_TYPE);
    }
    Blockly.SparkS.definitions_['variables'] = defvars.join('\n');
};
/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.SparkS.finish = function(code) {
    // Convert the definitions dictionary into a list.
    var imports = [];
    var definitions = [];
    for (var name in Blockly.SparkS.definitions_) {
        var def = Blockly.SparkS.definitions_[name];
        if (def.match(/^(from\s+\S+\s+)?import\s+\S+/)) {
            imports.push(def);
        } else {
            definitions.push(def);
        }
    }
    delete Blockly.SparkS.definitions_;
    delete Blockly.SparkS.functionNames_;
    Blockly.SparkS.variableDB_.reset();
    var allDefs = imports.join('\n') + '\n\n' + definitions.join('\n\n');
    return /*allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n\n') + */ code;
};





/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.SparkS.scrubNakedValue = function(line) {
    return line + '\n';
};

/**
 * Encode a string as a properly escaped SparkS string, complete with quotes.
 * @param {string} string Text to encode.
 * @return {string} SparkS string.
 * @private
 */
Blockly.SparkS.quote_ = function(string) {
    // TODO: This is a quick hack.  Replace with goog.string.quote
    string = string.replace(/\\/g, '\\\\')
        .replace(/\n/g, '\\\n')
        .replace(/\%/g, '\\%')
        .replace(/'/g, '\\\'');
    return '\'' + string + '\'';
};

/**
 * Common tasks for generating SparkS from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The SparkS code created for this block.
 * @return {string} SparkS code with comments and subsequent blocks added.
 * @private
 */
Blockly.SparkS.scrub_ = function(block, code) {
    if (code === null) {
        // Block has handled code generation itself.
        return '';
    }
    var commentCode = '';
    // Only collect comments for blocks that aren't inline.
    if (!block.outputConnection || !block.outputConnection.targetConnection) {
        // Collect comment for this block.
        var comment = block.getCommentText();
        if (comment) {
            commentCode += this.prefixLines(comment, '// ') + '\n';
        }
        // Collect comments for all value arguments.
        // Don't collect comments for nested statements.
        for (var x = 0; x < block.inputList.length; x++) {
            if (block.inputList[x].type == Blockly.INPUT_VALUE) {
                var childBlock = block.inputList[x].connection.targetBlock();
                if (childBlock) {
                    var comment = this.allNestedComments(childBlock);
                    if (comment) {
                        commentCode += this.prefixLines(comment, '// ');
                    }
                }
            }
        }
    }
    var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    var nextCode = this.blockToCode(nextBlock);
    return commentCode + code + nextCode;
};