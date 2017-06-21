// Generated from C:/Users/karta/Desktop/proje/sprks\SparkS_v2.g4 by ANTLR 4.6
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by SparkS_v2Parser.

function SparkS_v2Visitor() {

	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

SparkS_v2Visitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
SparkS_v2Visitor.prototype.constructor = SparkS_v2Visitor;

// Visit a parse tree produced by SparkS_v2Parser#script.
SparkS_v2Visitor.prototype.visitScript = function(ctx) {
    alert(12);
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#header.
SparkS_v2Visitor.prototype.visitHeader = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#body.
SparkS_v2Visitor.prototype.visitBody = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#shutDown.
SparkS_v2Visitor.prototype.visitShutDown = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#include.
SparkS_v2Visitor.prototype.visitInclude = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#require.
SparkS_v2Visitor.prototype.visitRequire = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#bind.
SparkS_v2Visitor.prototype.visitBind = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#order.
SparkS_v2Visitor.prototype.visitOrder = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#orderItem.
SparkS_v2Visitor.prototype.visitOrderItem = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#filter.
SparkS_v2Visitor.prototype.visitFilter = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#filterItemSingleLimit.
SparkS_v2Visitor.prototype.visitFilterItemSingleLimit = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#filterItemDoubleLimit.
SparkS_v2Visitor.prototype.visitFilterItemDoubleLimit = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#testPoint.
SparkS_v2Visitor.prototype.visitTestPoint = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#testPointParam.
SparkS_v2Visitor.prototype.visitTestPointParam = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#tpId.
SparkS_v2Visitor.prototype.visitTpId = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#paramID.
SparkS_v2Visitor.prototype.visitParamID = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#enumValues.
SparkS_v2Visitor.prototype.visitEnumValues = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#defaultValue.
SparkS_v2Visitor.prototype.visitDefaultValue = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#testGroup.
SparkS_v2Visitor.prototype.visitTestGroup = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#stmt.
SparkS_v2Visitor.prototype.visitStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#block.
SparkS_v2Visitor.prototype.visitBlock = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#functionCall.
SparkS_v2Visitor.prototype.visitFunctionCall = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#functionArgument.
SparkS_v2Visitor.prototype.visitFunctionArgument = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#constDeclaration.
SparkS_v2Visitor.prototype.visitConstDeclaration = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#tryBlock.
SparkS_v2Visitor.prototype.visitTryBlock = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#tryBlockOnStat.
SparkS_v2Visitor.prototype.visitTryBlockOnStat = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#defineStmt.
SparkS_v2Visitor.prototype.visitDefineStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#defineSubStmt.
SparkS_v2Visitor.prototype.visitDefineSubStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#fillStmt.
SparkS_v2Visitor.prototype.visitFillStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#macro.
SparkS_v2Visitor.prototype.visitMacro = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#expandStmt.
SparkS_v2Visitor.prototype.visitExpandStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#expandReplaceStmt.
SparkS_v2Visitor.prototype.visitExpandReplaceStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#ifThenElseStmt.
SparkS_v2Visitor.prototype.visitIfThenElseStmt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#conditionBlock.
SparkS_v2Visitor.prototype.visitConditionBlock = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#boolExprRule.
SparkS_v2Visitor.prototype.visitBoolExprRule = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#boolExprEq.
SparkS_v2Visitor.prototype.visitBoolExprEq = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#boolOperandexpr.
SparkS_v2Visitor.prototype.visitBoolOperandexpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#boolOperandID.
SparkS_v2Visitor.prototype.visitBoolOperandID = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#boolNotExpr.
SparkS_v2Visitor.prototype.visitBoolNotExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#boolBinaryExpr.
SparkS_v2Visitor.prototype.visitBoolBinaryExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#boolExprVal.
SparkS_v2Visitor.prototype.visitBoolExprVal = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#boolExprParen.
SparkS_v2Visitor.prototype.visitBoolExprParen = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#boolExprSubVal.
SparkS_v2Visitor.prototype.visitBoolExprSubVal = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#BoolArithmeticExpr.
SparkS_v2Visitor.prototype.visitBoolArithmeticExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#boolAtom.
SparkS_v2Visitor.prototype.visitBoolAtom = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#binaryExpr.
SparkS_v2Visitor.prototype.visitBinaryExpr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#arithExprVal.
SparkS_v2Visitor.prototype.visitArithExprVal = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#arithExprSubParen.
SparkS_v2Visitor.prototype.visitArithExprSubParen = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#arithExprSubVal.
SparkS_v2Visitor.prototype.visitArithExprSubVal = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#arithExprNumber.
SparkS_v2Visitor.prototype.visitArithExprNumber = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#arithExprId.
SparkS_v2Visitor.prototype.visitArithExprId = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#arithExprFunctionCall.
SparkS_v2Visitor.prototype.visitArithExprFunctionCall = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#forBlock.
SparkS_v2Visitor.prototype.visitForBlock = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#testPointRange.
SparkS_v2Visitor.prototype.visitTestPointRange = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#intRange.
SparkS_v2Visitor.prototype.visitIntRange = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#intRangeInteger.
SparkS_v2Visitor.prototype.visitIntRangeInteger = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#intRangeID.
SparkS_v2Visitor.prototype.visitIntRangeID = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#loopBody.
SparkS_v2Visitor.prototype.visitLoopBody = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#filterID.
SparkS_v2Visitor.prototype.visitFilterID = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#orderID.
SparkS_v2Visitor.prototype.visitOrderID = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#setVar.
SparkS_v2Visitor.prototype.visitSetVar = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#setAttr.
SparkS_v2Visitor.prototype.visitSetAttr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#setExprArith.
SparkS_v2Visitor.prototype.visitSetExprArith = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#setExprString.
SparkS_v2Visitor.prototype.visitSetExprString = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#setExprFunctionCall.
SparkS_v2Visitor.prototype.visitSetExprFunctionCall = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by SparkS_v2Parser#sleepCommand.
SparkS_v2Visitor.prototype.visitSleepCommand = function(ctx) {
  return this.visitChildren(ctx);
};



exports.SparkS_v2Visitor = SparkS_v2Visitor;