'use strict';

goog.provide('Blockly.Blocks.others');

goog.require('Blockly.Blocks');

Blockly.Blocks['undefined_wrapper'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldTextInput(""), "u_code");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#d3d3c3");
    this.setTooltip('undefined code segment');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['testprocess'] = { 
  init: function () { 
    this.appendDummyInput().appendField("testProcess").appendField(new Blockly.FieldTextInput(""), "tpName"); 
    this.appendStatementInput("code").setCheck(null); 
    this.setPreviousStatement(true, null); 
    this.setNextStatement(true, null); 
    this.setColour(120); 
    this.setTooltip('write all your code here'); 
    this.setHelpUrl(''); 
  } 
};