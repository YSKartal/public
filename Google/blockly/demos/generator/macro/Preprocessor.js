 (function(global) {
     var Preprocessor = function Preprocessor(source, baseDirOrIncludes, preserveLineNumbers) {
         this.source = "" + source;
         this.baseDir = typeof baseDirOrIncludes == 'string' ? baseDirOrIncludes : ".";
         this.includes = typeof baseDirOrIncludes == 'object' ? baseDirOrIncludes : {};
         this.preserveLineNumbers = typeof preserveLineNumbers == 'boolean' ? preserveLineNumbers : false;
         this.errorSourceAhead = 50;
         this.defines = [];
     };
     Preprocessor.EXPR = /(end define|define|expand|include library)/g;
     Preprocessor.DEFINE = /(define)[ ]*([^\n]+)\r?(?:\n|$)*(as\n)(?!fill)/g;
     Preprocessor.ENDDEFINE = /(end)[ ]+(define)/g;
     Preprocessor.INCLUDE = /(include)[ ]+(library)[ ]*([^\n]+)\r?(?:\n|$)/g;
     Preprocessor.EXPAND = /(expand)[ ]*([^\n]+)\r?(?:\n|$)*(replace)[ ]*([^\n]+)\r?(?:\n|$)*(with)[ ]*([^\n]+)\r?(?:\n|$)/g;
     var GLOB_EXP = /(?:^|[^\\])\*/;
     var NOT_LINE_ENDING = /[^\r\n]/g;
     Preprocessor.stripSlashes = function(str) {
         return (str + '').replace(/\\(.?)/g, function(s, n1) {
             switch (n1) {
                 case '\\':
                     return '\\';
                 case '0':
                     return '\u0000';
                 case '':
                     return '';
                 default:
                     return n1;
             }
         });
     };
     Preprocessor.addSlashes = function(str) { return (str + '').replace(/([\\"'])/g, "\\$1").replace(/\0/g, "\\0"); };
     Preprocessor.indent = function(str, indent) {
         var lines = str.split("\n");
         for (var i = 0; i < lines.length; i++) { lines[i] = indent + lines[i]; }
         return lines.join("\n");
     };
     Preprocessor.nlToStr = function(str) { return '[' + str.replace(/\r/g, "").replace(/\n/g, "\\n") + ']'; };
     Preprocessor.evaluate = function(runtimeDefines, inlineDefines, expr) {
         if (typeof inlineDefines === 'string') {
             expr = inlineDefines;
             inlineDefines = [];
         }
         var addSlashes = Preprocessor.addSlashes;
         return (function(runtimeDefines, inlineDefines, expr) {
             for (var key in runtimeDefines) {
                 if (runtimeDefines.hasOwnProperty(key)) {
                     eval("var " + key + " = \"" + addSlashes("" + runtimeDefines[key]) + "\";");
                 }
             }
             for (var i = 0; i < inlineDefines.length; i++) {
                 var def = inlineDefines[i];
                 if (def.substring(0, 9) != 'function ' && def.substring(0, 4) != 'var ') {
                     def = "var " + def; // Enforce local
                 }
                 eval(def);
             }
             return eval(expr);
         }).bind(null)(runtimeDefines, inlineDefines, expr);
     };
     Preprocessor.prototype.process = function(defines, verbose) {
         defines = defines || {};
         verbose = typeof verbose == 'function' ? verbose : function() {};
         verbose("Defines: " + JSON.stringify(defines));
         var match, match2, include, p, stack = [];
         while ((match = Preprocessor.EXPR.exec(this.source)) !== null) {
             verbose(match[1] + " @ " + match.index + "-" + Preprocessor.EXPR.lastIndex);
             switch (match[1]) {
                 case 'include library':
                     Preprocessor.INCLUDE.lastIndex = match.index;
                     if ((match2 = Preprocessor.INCLUDE.exec(this.source)) === null) { throw (new Error("Illegal #" + match[1] + ": " + this.source.substring(match.index, match.index + this.errorSourceAhead) + "...")); }
                     include = Preprocessor.stripSlashes(match2[1]);
                     if (typeof this.includes[include] !== 'undefined') { // Do we already know it?                             
                         verbose("  incl: " + include);
                         include = this.includes[include];
                     }
                     this.source = this.source.substring(0, match.index) + this.source.substring(Preprocessor.INCLUDE.lastIndex);
                     Preprocessor.EXPR.lastIndex = stack.length > 0 ? stack[stack.length - 1].lastIndex : 0; // Start over again                     
                     verbose("  continue at " + Preprocessor.EXPR.lastIndex);
                     break;
                 case 'expand':
                     Preprocessor.EXPAND.lastIndex = match.index;
                     if ((match2 = Preprocessor.EXPAND.exec(this.source)) === null) {
                         throw (new Error("Illegal #" + match[1] + ": " + this.source.substring(match.index, match.index + this.errorSourceAhead) + "..."));
                     }
                     var define = match2[1];
                     verbose("  def: " + match2[1]);
                     this.defines.push(define);
                     var lineEnding = "";
                     if (this.preserveLineNumbers) {
                         lineEnding = this.source.substring(match.index, Preprocessor.EXPAND.lastIndex).replace(NOT_LINE_ENDING, "");
                     }
                     this.source = this.source.substring(0, match.index) + lineEnding + this.source.substring(Preprocessor.EXPAND.lastIndex);
                     Preprocessor.EXPR.lastIndex = match.index;
                     verbose("  continue at " + Preprocessor.EXPR.lastIndex);
                     break;
                 case 'if':
                     Preprocessor.IF.lastIndex = match.index;
                     if ((match2 = Preprocessor.IF.exec(this.source)) === null) {
                         throw (new Error("Illegal #" + match[2] + ": " + this.source.substring(match.index, match.index + this.errorSourceAhead) + "..."));
                     }
                     verbose("  test: " + match2[2]);
                     if (match2[1] == "ifdef") { include = !!defines[match2[2]]; } else if (match2[1] == "ifndef") {
                         include = !defines[match2[2]];
                     } else { include = Preprocessor.evaluate(defines, this.defines, match2[2]); }
                     verbose("  value: " + include);
                     stack.push(p = {
                         "include": include,
                         "index": match.index,
                         "lastIndex": Preprocessor.IF.lastIndex
                     });
                     verbose("  push: " + JSON.stringify(p));
                     break;
                 case 'endif':
                 case 'else':
                 case 'elif':
                     Preprocessor.ENDIF.lastIndex = match.index;
                     if ((match2 = Preprocessor.ENDIF.exec(this.source)) === null) {
                         throw (new Error("Illegal #" + match[2] + ": " + this.source.substring(match.index, match.index + this.errorSourceAhead) + "..."));
                     }
                     if (stack.length == 0) {
                         throw (new Error("Unexpected #" + match2[1] + ": " + this.source.substring(match.index, match.index + this.errorSourceAhead) + "..."));
                     }
                     var before = stack.pop();
                     verbose("  pop: " + JSON.stringify(before));
                     if (this.preserveLineNumbers) {
                         include = this.source.substring(before["index"], before["lastIndex"]).replace(NOT_LINE_ENDING, "") +
                             this.source.substring(before["lastIndex"], match.index) +
                             this.source.substring(match.index, Preprocessor.ENDIF.lastIndex).replace(NOT_LINE_ENDING, "");
                     } else {
                         include = this.source.substring(before["lastIndex"], match.index);
                     }
                     if (before["include"]) {
                         verbose("  incl: " + Preprocessor.nlToStr(include) + ", 0-" + before['index'] + " + " + include.length + " bytes + " + Preprocessor.ENDIF.lastIndex + "-" + this.source.length);
                         this.source = this.source.substring(0, before["index"]) + include + this.source.substring(Preprocessor.ENDIF.lastIndex);
                     } else if (this.preserveLineNumbers) {
                         verbose("  excl(\\n): " + Preprocessor.nlToStr(include) + ", 0-" + before['index'] + " + " + Preprocessor.ENDIF.lastIndex + "-" + this.source.length);
                         include = include.replace(NOT_LINE_ENDING, "");
                         this.source = this.source.substring(0, before["index"]) + include + this.source.substring(Preprocessor.ENDIF.lastIndex);
                     } else {
                         verbose("  excl: " + Preprocessor.nlToStr(include) + ", 0-" + before['index'] + " + " + Preprocessor.ENDIF.lastIndex + "-" + this.source.length);
                         include = "";
                         this.source = this.source.substring(0, before["index"]) + this.source.substring(Preprocessor.ENDIF.lastIndex);
                     }
                     if (this.source == "") {
                         verbose("  result empty");
                     }
                     Preprocessor.EXPR.lastIndex = before["index"] + include.length;
                     verbose("  continue at " + Preprocessor.EXPR.lastIndex);
                     if (match2[1] == "else" || match2[1] == "elif") {
                         if (match2[1] == 'else') {
                             include = !before["include"];
                         } else {
                             include = Preprocessor.evaluate(defines, this.defines, match2[2]);
                         }
                         stack.push(p = {
                             "include": !before["include"],
                             "index": Preprocessor.EXPR.lastIndex,
                             "lastIndex": Preprocessor.EXPR.lastIndex
                         });
                         verbose("  push: " + JSON.stringify(p));
                     }
                     break;
                 case 'define':
                     Preprocessor.DEFINE.lastIndex = match.index;
                     if ((match2 = Preprocessor.DEFINE.exec(this.source)) === null) {
                         throw (new Error("Illegal #" + match[1] + ": " + this.source.substring(match.index, match.index + this.errorSourceAhead) + "..."));
                     }
                     var define = match2[1];
                     verbose("  def: " + match2[1]);
                     this.defines.push(define);
                     var lineEnding = ""
                     if (this.preserveLineNumbers) {
                         lineEnding = this.source.substring(match.index, Preprocessor.DEFINE.lastIndex).replace(NOT_LINE_ENDING, "");
                     }
                     this.source = this.source.substring(0, match.index) + lineEnding + this.source.substring(Preprocessor.DEFINE.lastIndex);
                     Preprocessor.EXPR.lastIndex = match.index;
                     verbose("  continue at " + Preprocessor.EXPR.lastIndex);
             }
         }
         if (stack.length > 0) {
             before = stack.pop();
             verbose("Still on stack: " + JSON.stringify(before));
         }
         return this.source;
     };
     Preprocessor.prototype.toString = function() { return "Preprocessor"; };
     if (typeof module != 'undefined' && module["exports"]) { // CommonJS         
         module["exports"] = Preprocessor;
     } else if (typeof define != 'undefined' && define["amd"]) { // AMD        
         define("Preprocessor", [], function() { return Preprocessor; });
     } else { // Shim         
         if (!global["dcodeIO"]) {
             global["dcodeIO"] = {};
         }
         global["dcodeIO"]["Preprocessor"] = Preprocessor;
     }
 })(this);