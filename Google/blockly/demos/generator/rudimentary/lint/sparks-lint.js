// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";
  // declare global: JSHINT


    // load antlr4 and myLanguage
    var antlr4, Lexer ,Parser;

    antlr4 = require('antlr4/index');
    Lexer = require('generated-parser/SparkS_v2Lexer');
    Parser = require('generated-parser/SparkS_v2Parser');

    // class for gathering errors and posting them to the editor
    var AnnotatingErrorListener = function(annotations) {
	    antlr4.error.ErrorListener.call(this);
      	this.annotations = annotations;
      	return this;
  	};

  	AnnotatingErrorListener.prototype = Object.create(antlr4.error.ErrorListener.prototype);
  	AnnotatingErrorListener.prototype.constructor = AnnotatingErrorListener;

  	AnnotatingErrorListener.prototype.syntaxError = function(recognizer, offendingSymbol, line, column, msg, e) {
    	this.annotations.push({
    	message: msg,
        severity: "error",
        from: CodeMirror.Pos(line - 1, column),
        to: CodeMirror.Pos(line - 1, column)
   	});
  	};

  	var validate = function(input) {
  		var stream = new antlr4.InputStream(input);
  		var lexer = new Lexer.SparkS_v2Lexer(stream);
  		var tokens = new antlr4.CommonTokenStream(lexer);
  		var parser = new Parser.SparkS_v2Parser(tokens);
  		var annotations = [];
  		var listener = new AnnotatingErrorListener(annotations);
        parser.buildParseTrees = true;
  		parser.removeErrorListeners();
  		parser.addErrorListener(listener);
  		parser.script();
  		return annotations;
	};

  CodeMirror.registerHelper("lint", "sparks", validate);

});
