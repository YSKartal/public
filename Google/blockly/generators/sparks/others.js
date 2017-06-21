'use strict';

goog.provide('Blockly.SparkS.others');

goog.require('Blockly.SparkS');

Blockly.SparkS['undefined_wrapper'] = function (block) {
  var text_u_code = block.getFieldValue('u_code');
  // TODO: Assemble JavaScript into code variable.
  var code = text_u_code + '\n';
  return code;
};

Blockly.SparkS['testprocess'] = function (block) {
  var text_tpname = block.getFieldValue('tpName'); 
  var statements_name = Blockly.SparkS.statementToCode(block, 'code');   
  // TODO: Assemble JavaScript into code variable.   
  var code = 'testProcess ' + text_tpname + '\n' + statements_name + '\n' + 'end testProcess\n'; 
  return code;
};