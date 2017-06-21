'use strict';

goog.provide('Blockly.Blocks.header');

goog.require('Blockly.Blocks');

Blockly.Blocks['include_library'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("include library")
            .appendField(new Blockly.FieldDropdown([["Dialog", "Dialog"], ["MathLib", "MathLib"]]), "NAME");
        this.setInputsInline(false);
        this.setPreviousStatement(true, 'header');
        this.setNextStatement(true, ['header','body']);
        this.setColour(0);
        this.setTooltip('rules that defines libraries to be included into the script. example : Math, Dialog, ...');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['require_as_linkertype'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("require")
            .appendField(new Blockly.FieldVariable("<item>"), "name1");
        this.appendDummyInput()
            .appendField("as linkerType \"")
            .appendField(new Blockly.FieldTextInput(""), "name2")
            .appendField("\"");
        this.appendDummyInput()
            .appendField("testType \"")
            .appendField(new Blockly.FieldTextInput(""), "name3")
            .appendField("\"");
        this.appendDummyInput()
            .appendField("interfaceName \"")
            .appendField(new Blockly.FieldTextInput(""), "name4")
            .appendField("\"");
        this.setInputsInline(true);
        this.setPreviousStatement(true, 'header');
        this.setNextStatement(true, ['header','body']);
        this.setColour(0);
        this.setTooltip('rule that defines the equipment to be used in the test. it may be ETE or UUT devices. example : PSA, PSG ');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['bind'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("bind")
            .appendField(new Blockly.FieldVariable("<item>"), "name1");
        this.appendDummyInput()
            .appendField("to \"")
            .appendField(new Blockly.FieldTextInput(""), "name2")
            .appendField("\"");
        this.setInputsInline(true);
        this.setPreviousStatement(true, 'header');
        this.setNextStatement(true, ['header','body']);
        this.setColour(0);
        this.setTooltip('this rule defines the bind statement. it is used to define some properties of the test script. example: Test Name ');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['order'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("order")
            .appendField(new Blockly.FieldVariable(null), "name1");
        this.appendStatementInput("2")
            .setCheck('order_element');
        this.setInputsInline(false);
        this.setPreviousStatement(true, 'header');
        this.setNextStatement(true, ['header','body']);
        this.setColour(0);
        this.setTooltip('this rule defines the order statement. this is used in the test point loop to change the order of loop  ');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['order_element'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["descending", "descending"],
                ["ascending", "ascending"]
            ]), "NAME")
            .appendField(new Blockly.FieldVariable("item"), "ID");
        this.setInputsInline(false);
        this.setPreviousStatement(true, 'order_element');
        this.setNextStatement(true, 'order_element');
        this.setColour(0);
        this.setTooltip('this rule defines the order statement. this is used in the test point loop to change the order of loop  ');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['filter'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("filter")
            .appendField(new Blockly.FieldVariable("<item>"), "name1");
        this.appendStatementInput("2")
            .setCheck(['filter_single','filter_double']);
        this.setPreviousStatement(true, 'header');
        this.setNextStatement(true, ['header','body']);
        this.setColour(0);
        this.setTooltip('this rule defines the filter statement. this is used in test point loops to filter test points. it filters test points based on the specified param values. it may be an exact match, below than, higher than, or between two values.');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['filter_single'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("<item>"), "name1")
            .appendField(new Blockly.FieldDropdown([
                ["≤", "<="],
                ["≥", ">="],
                ["<", "<"],
                [">", ">"],
                ["=", "="],
                ["≠", "/="]
            ]), "name")
            .appendField("\"")
            .appendField(new Blockly.FieldTextInput(""), "namee")
            .appendField("\"");
        this.setPreviousStatement(true, ['filter_single','filter_double']);
        this.setNextStatement(true, ['filter_single','filter_double']);
        this.setColour(0);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['filter_double'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("<item>"), "name1")
            .appendField("[\"")
            .appendField(new Blockly.FieldTextInput(""), "namee")
            .appendField("\",\"")
            .appendField(new Blockly.FieldTextInput(""), "namee2")
            .appendField("\"]");
        this.setPreviousStatement(true, ['filter_single','filter_double']);
        this.setNextStatement(true, ['filter_single','filter_double']);
        this.setColour(0);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['testpoint'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("testPoint")
            .appendField(new Blockly.FieldVariable("<item>"), "name1");
        this.appendDummyInput()
            .appendField("provide");
        this.appendStatementInput("2")
            .setCheck('provide_parameter');
        this.appendDummyInput()
            .appendField("measure");
        this.appendStatementInput("3")
            .setCheck('measure_parameter');
        this.setInputsInline(false);
        this.setPreviousStatement(true, 'header');
        this.setNextStatement(true, ['header','body']);
        this.setColour(0);
        this.setTooltip('this rule defines the test point type statement.\nthe STRINGLITERAL in measure part is for UofM\npossible alternatives for provide list:\nparam optional\nparam optional [default]\nparam optional [,] [default]\nparam\nparam [,]\nif optional keyword comes, default value must be specified');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['provide_parameter'] = {
    init: function() {
        this.appendValueInput("1")
            .setCheck(['optional','optional_sentence_enum1'])
            .appendField(new Blockly.FieldVariable("<item>"), "name1");
        this.setPreviousStatement(true, ['provide_parameter','provide_parameter2']);
        this.setNextStatement(true, ['provide_parameter','provide_parameter2']);
        this.setColour(0);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['optional'] = {
    init: function() {
        this.appendValueInput("1")
            .setCheck(['optional_sentence_enum','optional_sentence_default'])
            .appendField("optional");
        this.setOutput(true, 'optional');
        this.setColour(0);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['optional_sentence_enum1'] = {
    init: function() {
        this.appendValueInput("1")
            .setCheck('optional_sentence_enum_param')
            .appendField("[\"")
            .appendField(new Blockly.FieldTextInput(""), "name1")
            .appendField("\"");
        this.appendDummyInput()
            .appendField("]");
        this.setInputsInline(true);
        this.setOutput(true, 'optional_sentence_enum1');
        this.setColour(0);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['optional_sentence_enum'] = {
    init: function() {
        this.appendValueInput("1")
            .setCheck('optional_sentence_enum_param')
            .appendField("[\"")
            .appendField(new Blockly.FieldTextInput(""), "name1")
            .appendField("\"");
        this.appendValueInput("2")
            .setCheck('optional_sentence_default')
            .appendField("]");
        this.setInputsInline(true);
        this.setOutput(true, 'optional_sentence_enum');
        this.setColour(0);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['optional_sentence_enum_param'] = {
    init: function() {
        this.appendValueInput("1")
            .setCheck('optional_sentence_enum_param')
            .appendField(",\"")
            .appendField(new Blockly.FieldTextInput(""), "name1")
            .appendField("\"");
        this.setOutput(true, 'optional_sentence_enum_param');
        this.setColour(0);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['optional_sentence_default'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("[default \"")
            .appendField(new Blockly.FieldTextInput(""), "name")
            .appendField("\"]");
        this.setOutput(true, 'optional_sentence_default');
        this.setColour(0);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['measure_parameter'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("item"), "name1")
            .appendField('in')
            .appendField("\"")
            .appendField(new Blockly.FieldTextInput(""), "name2")
            .appendField("\"");
        this.setPreviousStatement(true, 'measure_parameter');
        this.setNextStatement(true, 'a');
        this.setColour(0);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['tp_space'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField(new Blockly.FieldTextInput(""), "inp");
    this.setOutput(true, null);
    this.setColour(0);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};


Blockly.Blocks['testpointlike'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("testPoint")
            .appendField(new Blockly.FieldVariable("<item>"), "name1")
            .appendField("like")
            .appendField(new Blockly.FieldVariable("item"), "name2");
        this.setInputsInline(false);
        this.setPreviousStatement(true, 'header');
        this.setNextStatement(true, ['header','body']);
        this.setColour(0);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['testgroup'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("testGroup")
            .appendField(new Blockly.FieldVariable("<item>"), "name1")
            .appendField("testPoint")
            .appendField(new Blockly.FieldVariable("item"), "name2");
        this.setPreviousStatement(true, 'header');
        this.setNextStatement(true, ['header','body']);
        this.setColour(0);
        this.setTooltip('this rule defines the test group statement and how it is bound to test point type.');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['line_comment_header'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("//");
        this.setPreviousStatement(true, 'header');
        this.setNextStatement(true, ['body','header']);
        this.setColour("#d3d3c3");
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['lines_comment_header'] = {
    init: function() {
        this.appendStatementInput("1")
            .setCheck('header')
            .appendField("/*");
        this.appendDummyInput()
            .appendField("*/");
        this.setPreviousStatement(true, 'header');
        this.setNextStatement(true, ['body','header']);
        this.setColour("#d3d3c3");
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['lines_collapse_header'] = {
    init: function() {
        this.appendStatementInput("1")
            .setCheck('header')
            .appendField("collapse");
        this.setPreviousStatement(true, 'header');
        this.setNextStatement(true, ['body','header']);
        this.setColour("#d3d3c3");
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['define'] = {
    // to be used in expand
    init: function() {
        this.appendDummyInput("1")
            .appendField("define")
            .appendField(new Blockly.FieldVariable("item"), "name")
            .appendField("as");
        this.appendStatementInput("NAME")
            .setCheck(['fill','header']);
        this.setPreviousStatement(true, 'header');
        this.setNextStatement(true, ['body', 'header']);
        this.setColour(0);
        this.setTooltip('this rule specifies the \'define\' statement.it has two types:\n- one is used to define how a test point type is derived from another test point type.\n- the other is used to define macros to be used as functions in different parts of the script.');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['fill'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("fill")
            .appendField(new Blockly.FieldVariable("item"), "name1")
            .appendField("using")
            .appendField(new Blockly.FieldVariable("item"), "name2");
        this.appendStatementInput("1")
            .setCheck('header');
        this.setPreviousStatement(true, 'fill');
        this.setNextStatement(true, 'a');
        this.setColour(0);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};
