'use strict';

goog.provide('Blockly.SparkS.header');

goog.require('Blockly.SparkS');

Blockly.SparkS['include_library'] = function(block) {
    var dropdown_name = block.getFieldValue('NAME');
    var code = 'include library ' + dropdown_name + ' \n';
    return code;
};

Blockly.SparkS['require_as_linkertype'] = function(block) {
    var variable_name1 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name1'), Blockly.Variables.NAME_TYPE);
    var text_name2 = block.getFieldValue('name2') || '';
    if (text_name2 === '' || text_name2 === ' ')
    {
        //window.alert('linkerType should not be empty!');
        //block.setColour("#ff0000");
    }
    else
    {
        block.setColour(0);
    }
    var text_name3 = block.getFieldValue('name3') || '';
    if (text_name3 === '' || text_name3 === ' ')
    {
        //window.alert('testType should not be empty!');
        //block.setColour("#ff0000");
    }
    else
    {
        block.setColour(0);
    }
    if (text_name2 === '' || text_name2 === ' ' || text_name3 === '' || text_name3 === ' ')
    {
        block.setColour("#ff0000");
    }
    var text_name4 = block.getFieldValue('name4') || '';
    if (text_name4 === ' ' || text_name4 === '')
    {
        var code = 'require ' + variable_name1 + ' as linkerType "' + text_name2 + '" testType "' + text_name3 +'" \n';
    }
    else
    {
        var code = 'require ' + variable_name1 + ' as linkerType "' + text_name2 + '" testType "' + text_name3 + '" interfaceName "' + text_name4 + '" \n';
    }
    return code;
};

Blockly.SparkS['bind'] = function(block) {
    var variable_name1 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name1'), Blockly.Variables.NAME_TYPE);
    var text_name2 = block.getFieldValue('name2') || '';
    if (text_name2 === '' || text_name2 === ' ')
    {
        //window.alert('bind to should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(0);
    }
    var code = 'bind ' + variable_name1 + ' to "' + text_name2 + '" \n';
    return code;
};

Blockly.SparkS['order'] = function(block) {
    var variable_name1 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name1'), Blockly.Variables.NAME_TYPE);
    var statements_2 = Blockly.SparkS.statementToCode(block, '2');
    statements_2 = Blockly.SparkS.addLoopTrap(statements_2, block.id);
    if (statements_2 =='')
    {
        //window.alert('filter should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(0);
    }
    var code = 'order ' + variable_name1 + '\n' + statements_2 + 'end order \n';
    return code;
};

Blockly.SparkS['order_element'] = function(block) {
    var dropdown_name = block.getFieldValue('NAME');
    var variable_id = Blockly.SparkS.variableDB_.getName(block.getFieldValue('ID'), Blockly.Variables.NAME_TYPE);
    var code = dropdown_name + ' ' + variable_id + '\n';
    return code;
};

Blockly.SparkS['filter'] = function(block) {
    var variable_name1 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name1'), Blockly.Variables.NAME_TYPE);
    var statements_2 = Blockly.SparkS.statementToCode(block, '2');
    statements_2 = Blockly.SparkS.addLoopTrap(statements_2, block.id);
    if (statements_2 =='')
    {
        //window.alert('filter should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(0);
    }
    var code = 'filter ' + variable_name1 + '\n' + statements_2 + 'end filter \n';
    return code;
};

Blockly.SparkS['filter_single'] = function(block) {
    var variable_name1 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name1'), Blockly.Variables.NAME_TYPE);
    var dropdown_symbols2 = block.getFieldValue('name');
    var text_name3 = block.getFieldValue('namee') || '';
    if (text_name3 === '' || text_name3 === ' ')
    {
        //window.alert('filter item should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(0);
    }
    var code = variable_name1 + ' ' + dropdown_symbols2 + ' \"' + text_name3 + '\"\n';
    return code;
};

Blockly.SparkS['filter_double'] = function(block) {
    var variable_name1 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name1'), Blockly.Variables.NAME_TYPE);
    var text_name3 = block.getFieldValue('namee') || '';
    /*if (text_name3 === '' || text_name3 === ' ')
    {
        window.alert('filter item should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(0);
    }*/
    var text_name4 = block.getFieldValue('namee2') || '';
    if (text_name4 === '' || text_name4 === ' ' || text_name3 === '' || text_name3 === ' ')
    {
        //window.alert('filter item should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(0);
    }
    var code = variable_name1 + ' [\"' + text_name3 + '\",\"' + text_name4 + '\"]\n';
    return code;
};

Blockly.SparkS['testpoint'] = function(block) {
    var variable_name1 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name1'), Blockly.Variables.NAME_TYPE);
    var statements_2 = Blockly.SparkS.statementToCode(block, '2');
    var statements_3 = Blockly.SparkS.statementToCode(block, '3');
    statements_2 = Blockly.SparkS.addLoopTrap(statements_2, block.id);
    statements_3 = Blockly.SparkS.addLoopTrap(statements_3, block.id);
    if (statements_2 =='')
    {
        //window.alert('provide should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(0);
    }
    if (statements_3 =='')
    {
        //window.alert('measure should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(0);
    }
    if ( statements_2 == '' || statements_3 == '')
    {
        block.setColour("#ff0000");
    }
    var code = 'testPoint ' + variable_name1 + '\nprovide \n' + statements_2 + 'measure \n' + statements_3 + 'end testPoint \n';
    return code;
};

Blockly.SparkS['provide_parameter'] = function(block) {
    var variable_name1 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name1'), Blockly.Variables.NAME_TYPE);
    var value_1 = Blockly.SparkS.valueToCode(block, '1', Blockly.SparkS.ORDER_NONE) || '';
    var code = variable_name1 + ' ' + value_1 + ' \n';
    return code;
};

Blockly.SparkS['optional'] = function(block) {
    var value_1 = Blockly.SparkS.valueToCode(block, '1', Blockly.SparkS.ORDER_NONE) || '';
    if (value_1 =='')
    {
        //window.alert('optional should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(0);
    }
    var code = 'optional ' + value_1;
    return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['optional_sentence_enum1'] = function(block) {
    var text_name1 = block.getFieldValue('name1') || ' ';
    var value_1 = Blockly.SparkS.valueToCode(block, '1', Blockly.SparkS.ORDER_NONE) || '';
    var code = '["' + text_name1 + '" ' + value_1 + ']';
    return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['optional_sentence_enum'] = function(block) {
    var text_name1 = block.getFieldValue('name1') || ' ';
    var value_1 = Blockly.SparkS.valueToCode(block, '1', Blockly.SparkS.ORDER_NONE) || '';
    /*if (value_1 =='')
    {
        window.alert('optional item should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(0);
    }*/
    var value_2 = Blockly.SparkS.valueToCode(block, '2', Blockly.SparkS.ORDER_NONE) || '';
    if (value_2 =='')
    {
        //window.alert('optional item should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(0);
    }
    var code = '["' + text_name1 + '"' + value_1 + '] ' + value_2;
    return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['optional_sentence_enum_param'] = function(block) {
    var text_name1 = block.getFieldValue('name1') || ' ';
    var value_1 = Blockly.SparkS.valueToCode(block, '1', Blockly.SparkS.ORDER_NONE) || ' ';
    var code = ',"' + text_name1 + '" ' + value_1;
    return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['optional_sentence_default'] = function(block) {
    var text_name = block.getFieldValue('name') || '';
    if (text_name ==='' || text_name ===' ')
    {
        //window.alert('default should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(0);
    }
    var code = '[default "' + text_name + '"]';
    return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['measure_parameter'] = function(block) {
    var variable_name1 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name1'), Blockly.Variables.NAME_TYPE);
    var text_name2 = block.getFieldValue('name2') || '';
    if (text_name2 === '' || text_name2 === ' ')
    {
        //window.alert('measure should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(0);
    }
    var code = variable_name1 + ' in "' + text_name2 + '" \n';
    return code;
};

Blockly.SparkS['tp_space'] = function(block) {
  var text_inp = block.getFieldValue('inp');
  var value_name = Blockly.SparkS.valueToCode(block, 'NAME', Blockly.SparkS.ORDER_NONE) || ' ';
  var code = text_inp + ' ' + value_name;
  return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['testpointlike'] = function(block) {
    var variable_name = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name1'), Blockly.Variables.NAME_TYPE);
    var variable_name2 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name2'), Blockly.Variables.NAME_TYPE);
    var code = 'testPoint ' + variable_name + ' like ' + variable_name2 + '\n';
    return code;
};

Blockly.SparkS['testgroup'] = function(block) {
    var variable_name1 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name1'), Blockly.Variables.NAME_TYPE);
    var variable_name2 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name2'), Blockly.Variables.NAME_TYPE);
    var code = 'testGroup ' + variable_name1 + ' testPoint ' + variable_name2 + ' \n';
    return code;
};

Blockly.SparkS['line_comment_header'] = function(block) {
    var code = '//';
    return code;
};

Blockly.SparkS['lines_comment_header'] = function(block) {
    var statements_1 = Blockly.SparkS.statementToCode(block, '1');
    statements_1 = Blockly.SparkS.addLoopTrap(statements_1, block.id);
    var code = '/*' + statements_1 + '*/ \n';
    return code;
};

Blockly.SparkS['lines_collapse_header'] = function(block) {
    var statements_1 = Blockly.SparkS.statementToCode(block, '1');
    statements_1 = Blockly.SparkS.addLoopTrap(statements_1, block.id);
    var code = statements_1 + '\n';
    return code;
};

Blockly.SparkS['define'] = function(block) {
    var variable_name = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name'), Blockly.Variables.NAME_TYPE);
    var statements_name = Blockly.SparkS.statementToCode(block, 'NAME');
    if (statements_name == '')
    {
        //window.alert('define should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(0);
    }
    statements_name = Blockly.SparkS.addLoopTrap(statements_name, block.id);
    var code = 'define ' + variable_name + ' as ' /*+ value_1*/ + ' \n' + statements_name + 'end define\n';
    return code;
};

Blockly.SparkS['fill'] = function(block) {
    var variable_name1 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name1'), Blockly.Variables.NAME_TYPE);
    var variable_name2 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name2'), Blockly.Variables.NAME_TYPE);
    var statements_1 = Blockly.SparkS.statementToCode(block, '1');
    statements_1 = Blockly.SparkS.addLoopTrap(statements_1, block.id);
    if (statements_1 == '')
    {
        //window.alert('fill should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(0);
    }
    var code = 'fill ' + variable_name1 + ' using ' + variable_name2 + '\n' + statements_1 + 'end fill \n';
    return code;
};
