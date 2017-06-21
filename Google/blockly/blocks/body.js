'use strict';

goog.provide('Blockly.Blocks.body');

goog.require('Blockly.Blocks');

Blockly.Blocks['shutdown'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("SHUTDOWN:");
        this.setPreviousStatement(true, 'body');
        this.setNextStatement(true, 'body');
        this.setColour(180);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['func_call'] = {
    init: function() {
        this.appendValueInput("NAME")
            .setCheck('func_call_paran')
            .appendField(new Blockly.FieldVariable("item"), "name1")
            .appendField(".")
            .appendField(new Blockly.FieldVariable("item"), "name2");
        this.setPreviousStatement(true, ['header','body']);
        this.setNextStatement(true, 'body');
        this.setColour(180);
        this.setTooltip('this rule defines the function call statement.');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['func_call2'] = {
    init: function() {
        this.appendValueInput("NAME")
            .setCheck('func_call_paran')
            .appendField(new Blockly.FieldVariable("item"), "name1")
            .appendField(".")
            .appendField(new Blockly.FieldVariable("item"), "name2");
        this.setOutput(true, "func_call2");
        this.setColour(180);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['func_call_paran'] = {
    init: function() {
        this.appendValueInput("NAME")
            .setCheck(['func_call_paran_arg','func_call_arithExpr','func_call_arith_parameter','func_call_number','func_call2'])
            .appendField("(");
        this.appendDummyInput()
            .appendField(")");
        this.setInputsInline(true);
        this.setOutput(true, "func_call_paran");
        this.setColour(180);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['func_call_paran_arg'] = {
    init: function() {
        this.appendValueInput("1")
            .setCheck('func_call_comma')
            .appendField("\"")
            .appendField(new Blockly.FieldTextInput(""), "name1")
            .appendField("\"");
        this.setOutput(true, "func_call_paran_arg");
        this.setColour(180);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['if_space'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField(new Blockly.FieldTextInput(""), "inp");
    this.setOutput(true, null);
    this.setColour(180);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['for_space'] = {
  init: function() {
    this.appendValueInput("NAME")
        .setCheck(null)
        .appendField(new Blockly.FieldTextInput(""), "inp");
    this.setOutput(true, null);
    this.setColour(180);
    this.setTooltip('');
    this.setHelpUrl('');
  }
};

Blockly.Blocks['func_call_arithExpr'] = {
    init: function() {
        this.appendValueInput("compare1")
            .setCheck(['arithExprSub', 'number', 'func_call2', 'provide_parameter3']);
        this.appendValueInput("compare2")
            .setCheck(['arithExprSub', 'number', 'func_call2', 'provide_parameter3'])
            .appendField(new Blockly.FieldDropdown([
                ["*", "mult"],
                ["/", "div"],
                ["-", "sub"],
                ["+", "add"]
            ]), "symbols");
        this.appendValueInput("1")
            .setCheck(['func_call_comma']);
        this.setInputsInline(true);
        this.setOutput(true, 'func_call_arithExpr');
        this.setColour(180);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['func_call_arith_parameter'] = {
    init: function() {
        this.appendValueInput("1")
            .setCheck('func_call_comma')
            .appendField(new Blockly.FieldVariable("item"), "name1");
        this.setOutput(true, 'func_call_arith_parameter');
        this.setColour(180);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['func_call_number'] = {
    init: function() {
        this.appendValueInput('1')
            .setCheck(['func_call_enumber','func_call_comma'])
            .appendField(new Blockly.FieldNumber(0), "number");
        this.setOutput(true, 'func_call_number');
        this.setColour(180);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['func_call_enumber'] = {
    init: function() {
        this.appendValueInput('1')
            .setCheck('func_call_comma')
            .appendField(new Blockly.FieldDropdown([["e", "e"], ["E", "E"]]), "name1")
            .appendField(new Blockly.FieldNumber(0), "number");
        this.setOutput(true, 'func_call_enumber');
        this.setColour(180);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['func_call_comma'] = {
    init: function() {
        this.appendValueInput("1")
            .setCheck(['func_call_paran_arg','func_call_arithExpr','func_call_arith_parameter','func_call_number'])
            .appendField(",");
        this.setOutput(true, 'func_call_comma');
        this.setColour(180);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['constant'] = {
    init: function() {
        this.appendValueInput("1")
            .setCheck('number')
            .appendField("constant")
            .appendField(new Blockly.FieldVariable("item"), "NAME")
            .appendField("=");
        this.setInputsInline(true);
        this.setPreviousStatement(true, ['header','body']);
        this.setNextStatement(true, 'body');
        this.setColour(180);
        this.setTooltip('this rule defines how a constant can be defined');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['try'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("try");
        this.setNextStatement(true, null);
        this.setColour(180);
        this.setTooltip('this rule defines the try/catch statement  ');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['on_do'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("on")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(180);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['on_do_2'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("on")
            .appendField("do");
        this.setPreviousStatement(true, null);
        this.setColour(180);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['controls_try'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(180);
        /*this.appendValueInput('IF0')
         .setCheck('Boolean')
         .appendField("try");*/
        this.appendDummyInput('EMPTY2')
            .appendField("try");
        this.appendStatementInput('DO0')
            .setCheck('body')
            .appendField("do");
        this.setPreviousStatement(true , ['header','body']);
        this.setNextStatement(true , 'body');
        this.setMutator(new Blockly.Mutator(['on_do', 'on_do_2']));
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function() {
            if (!thisBlock.elseifCount_ && !thisBlock.elseCount_) {
                return 'write1';
            } else if (!thisBlock.elseifCount_ && thisBlock.elseCount_) {
                return 'write2';
            } else if (thisBlock.elseifCount_ && !thisBlock.elseCount_) {
                return 'write3';
            } else if (thisBlock.elseifCount_ && thisBlock.elseCount_) {
                return 'write4';
            }
            return '';
        });
        this.elseifCount_ = 0;
        this.elseCount_ = 1;
    },
    /**
     * Create XML to represent the number of else-if and else inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function() {
        if (!this.elseifCount_ && !this.elseCount_) {
            return null;
        }
        var container = document.createElement('mutation');
        if (this.elseifCount_) {
            container.setAttribute('elseif', this.elseifCount_);
        }
        if (this.elseCount_) {
            container.setAttribute('else', 1);
        }
        return container;
    },
    /**
     * Parse XML to restore the else-if and else inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function(xmlElement) {
        this.elseifCount_ = parseInt(xmlElement.getAttribute('elseif'), 10) || 0;
        this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10) || 0;
        this.updateShape_();
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function(workspace) {
        var containerBlock = workspace.newBlock('try');
        containerBlock.initSvg();
        var connection = containerBlock.nextConnection;
        for (var i = 1; i <= this.elseifCount_; i++) {
            var elseifBlock = workspace.newBlock('on_do');
            elseifBlock.initSvg();
            connection.connect(elseifBlock.previousConnection);
            connection = elseifBlock.nextConnection;
        }
        if (this.elseCount_) {
            var elseBlock = workspace.newBlock('on_do_2');
            elseBlock.initSvg();
            connection.connect(elseBlock.previousConnection);
        }
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function(containerBlock) {
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        // Count number of inputs.
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
        var valueConnections = [null];
        var statementConnections = [null];
        var elseStatementConnection = null;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'on_do':
                    this.elseifCount_++;
                    valueConnections.push(clauseBlock.valueConnection_);
                    statementConnections.push(clauseBlock.statementConnection_);
                    break;
                case 'on_do_2':
                    this.elseCount_++;
                    valueConnections.push(clauseBlock.valueConnection_);
                    elseStatementConnection = clauseBlock.statementConnection_;
                    break;
                default:
                    throw 'Unknown block type.';
            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();
        }
        this.updateShape_();
        // Reconnect any child blocks.
        var i = 1;
        for (; i <= this.elseifCount_; i++) {
            Blockly.Mutator.reconnect(valueConnections[i], this, 'ON' + i);
            Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
        }
        Blockly.Mutator.reconnect(valueConnections[i], this, 'ON' + i);
        Blockly.Mutator.reconnect(elseStatementConnection, this, 'ELSE');
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function(containerBlock) {
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        var i = 1;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'on_do':
                    //var inputIf = this.getInput('IF' + i);
                    var inputEmpty = this.getInput('ON' + i);
                    var inputDo = this.getInput('DO' + i);
                    //clauseBlock.valueConnection_ = inputIf && inputIf.connection.targetConnection;
                    clauseBlock.valueConnection_ = inputEmpty && inputEmpty.connection.targetConnection;
                    clauseBlock.statementConnection_ = inputDo && inputDo.connection.targetConnection;
                    i++;
                    break;
                case 'on_do_2':
                    var inputEmpty = this.getInput('ON' + i);
                    var inputDo = this.getInput('ELSE');
                    clauseBlock.valueConnection_ = inputEmpty && inputEmpty.connection.targetConnection;
                    clauseBlock.statementConnection_ = inputDo && inputDo.connection.targetConnection;
                    break;
                default:
                    throw 'Unknown block type.';
            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();
        }
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function() {
        // Delete everything.

        var i = 1;
        while (this.getInput('DO' + i)) {
            //this.removeInput('IF' + i);
            this.removeInput('ON' + i);
            this.removeInput('DO' + i);
            i++;
        }
        if (this.getInput('ELSE')) {
            this.removeInput('ON' + i);
            this.removeInput('ELSE');
        }

        // Rebuild block.
        for (i = 1; i <= this.elseifCount_; i++) {
            /*this.appendValueInput('IF' + i)
             .setCheck('Boolean')
             .appendField("on");*/
            this.appendValueInput('ON' + i)
                .setCheck("tryexception")
                .appendField("on");
                /*.appendField(new Blockly.FieldDropdown([
                    ["UserInputError", "UserInputError"],
                    ["DeviceError", "DeviceError"]
                ]), "symbols" + i);*/
            this.appendStatementInput('DO' + i)
                .setCheck('body')
                .appendField("do");
        }
        if (this.elseCount_) {
            this.appendValueInput('ON' + i)
                .setCheck("tryexception")
                .appendField("on");
                /*.appendField(new Blockly.FieldDropdown([
                    ["UserInputError", "UserInputError"],
                    ["DeviceError", "DeviceError"]
                ]), "symbols_else");*/
            this.appendStatementInput('ELSE')
                .setCheck('body')
                .appendField("do");
        }
    }
};

Blockly.Blocks['tryexception'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("item"), "name1");
        this.setInputsInline(false);
        this.setOutput(true, "tryexception");
        this.setColour(180);
        this.setTooltip('add to input of try_on block');
        this.setHelpUrl('http://www.example.com/');
    }
};


Blockly.Blocks['expand'] = {
    init: function() {
        this.appendValueInput("1")
            .setCheck('expand_replace')
            .appendField("expand")
            .appendField(new Blockly.FieldVariable("item"), "name1");
        this.setPreviousStatement(true, ['header','body']);
        this.setNextStatement(true, 'body');
        this.setColour(180);
        this.setTooltip('this rule defines the \'expand\' statement.it is used in two cases:\n1) when we want to derive a new test point from an already available test point. For that reason it has to go inside a test point loop construct. Using it in other places would make it not to work.\n2) for macro call	');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['expand_replace'] = {
    init: function() {
        this.appendValueInput("1")
            .setCheck('expand_replace_with')
            .appendField("replace")
            .appendField(new Blockly.FieldVariable("item"), "name1")
            .appendField("with")
            .appendField(new Blockly.FieldVariable("item"), "name2");
        this.setOutput(true, "expand_replace");
        this.setColour(180);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['expand_replace_with'] = {
    init: function() {
        this.appendValueInput("1")
            .setCheck('expand_replace_with')
            .appendField(",")
            .appendField(new Blockly.FieldVariable("item"), "name1")
            .appendField("with")
            .appendField(new Blockly.FieldVariable("item"), "name2");
        this.setOutput(true, 'expand_replace_with');
        this.setColour(180);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['if_do'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("if");
        this.setNextStatement(true, null);
        this.setColour(180);
        this.setTooltip('this rule defines the if-then-else statement ');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['else_if_do'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("else if");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(180);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['else'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("else");
        this.setPreviousStatement(true, null);
        this.setColour(180);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['controls_if_2'] = {
    /**
     * Block for if/elseif/else condition.
     * @this Blockly.Block
     */
    init: function() {
        this.setHelpUrl(Blockly.Msg.CONTROLS_IF_HELPURL);
        this.setColour(180);
        this.appendValueInput('IF0')
            .setCheck(['not','bool_expr_main','compare','true_false','eq_neq','eq_neq2'])
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_IF);
        this.appendStatementInput('DO0')
            .setCheck('body')
            .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        this.setPreviousStatement(true , ['header','body']);
        this.setNextStatement(true , 'body');
        this.setMutator(new Blockly.Mutator(['else_if_do',
            'else'
        ]));
        // Assign 'this' to a variable for use in the tooltip closure below.
        var thisBlock = this;
        this.setTooltip(function() {
            if (!thisBlock.elseifCount_ && !thisBlock.elseCount_) {
                return Blockly.Msg.CONTROLS_IF_TOOLTIP_1;
            } else if (!thisBlock.elseifCount_ && thisBlock.elseCount_) {
                return Blockly.Msg.CONTROLS_IF_TOOLTIP_2;
            } else if (thisBlock.elseifCount_ && !thisBlock.elseCount_) {
                return Blockly.Msg.CONTROLS_IF_TOOLTIP_3;
            } else if (thisBlock.elseifCount_ && thisBlock.elseCount_) {
                return Blockly.Msg.CONTROLS_IF_TOOLTIP_4;
            }
            return '';
        });
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
    },
    /**
     * Create XML to represent the number of else-if and else inputs.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function() {
        if (!this.elseifCount_ && !this.elseCount_) {
            return null;
        }
        var container = document.createElement('mutation');
        if (this.elseifCount_) {
            container.setAttribute('elseif', this.elseifCount_);
        }
        if (this.elseCount_) {
            container.setAttribute('else', 1);
        }
        return container;
    },
    /**
     * Parse XML to restore the else-if and else inputs.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function(xmlElement) {
        this.elseifCount_ = parseInt(xmlElement.getAttribute('elseif'), 10) || 0;
        this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10) || 0;
        this.updateShape_();
    },
    /**
     * Populate the mutator's dialog with this block's components.
     * @param {!Blockly.Workspace} workspace Mutator's workspace.
     * @return {!Blockly.Block} Root block in mutator.
     * @this Blockly.Block
     */
    decompose: function(workspace) {
        var containerBlock = workspace.newBlock('if_do');
        containerBlock.initSvg();
        var connection = containerBlock.nextConnection;
        for (var i = 1; i <= this.elseifCount_; i++) {
            var elseifBlock = workspace.newBlock('else_if_do');
            elseifBlock.initSvg();
            connection.connect(elseifBlock.previousConnection);
            connection = elseifBlock.nextConnection;
        }
        if (this.elseCount_) {
            var elseBlock = workspace.newBlock('else');
            elseBlock.initSvg();
            connection.connect(elseBlock.previousConnection);
        }
        return containerBlock;
    },
    /**
     * Reconfigure this block based on the mutator dialog's components.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    compose: function(containerBlock) {
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        // Count number of inputs.
        this.elseifCount_ = 0;
        this.elseCount_ = 0;
        var valueConnections = [null];
        var statementConnections = [null];
        var elseStatementConnection = null;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'else_if_do':
                    this.elseifCount_++;
                    valueConnections.push(clauseBlock.valueConnection_);
                    statementConnections.push(clauseBlock.statementConnection_);
                    break;
                case 'else':
                    this.elseCount_++;
                    elseStatementConnection = clauseBlock.statementConnection_;
                    break;
                default:
                    throw 'Unknown block type.';
            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();
        }
        this.updateShape_();
        // Reconnect any child blocks.
        for (var i = 1; i <= this.elseifCount_; i++) {
            Blockly.Mutator.reconnect(valueConnections[i], this, 'IF' + i);
            Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
        }
        Blockly.Mutator.reconnect(elseStatementConnection, this, 'ELSE');
    },
    /**
     * Store pointers to any connected child blocks.
     * @param {!Blockly.Block} containerBlock Root block in mutator.
     * @this Blockly.Block
     */
    saveConnections: function(containerBlock) {
        var clauseBlock = containerBlock.nextConnection.targetBlock();
        var i = 1;
        while (clauseBlock) {
            switch (clauseBlock.type) {
                case 'else_if_do':
                    var inputIf = this.getInput('IF' + i);
                    var inputDo = this.getInput('DO' + i);
                    clauseBlock.valueConnection_ =
                        inputIf && inputIf.connection.targetConnection;
                    clauseBlock.statementConnection_ =
                        inputDo && inputDo.connection.targetConnection;
                    i++;
                    break;
                case 'else':
                    var inputDo = this.getInput('ELSE');
                    clauseBlock.statementConnection_ =
                        inputDo && inputDo.connection.targetConnection;
                    break;
                default:
                    throw 'Unknown block type.';
            }
            clauseBlock = clauseBlock.nextConnection &&
                clauseBlock.nextConnection.targetBlock();
        }
    },
    /**
     * Modify this block to have the correct number of inputs.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function() {
        // Delete everything.
        if (this.getInput('ELSE')) {
            this.removeInput('ELSE');
        }
        var i = 1;
        while (this.getInput('IF' + i)) {
            this.removeInput('IF' + i);
            this.removeInput('DO' + i);
            i++;
        }
        // Rebuild block.
        for (var i = 1; i <= this.elseifCount_; i++) {
            this.appendValueInput('IF' + i)
                .setCheck(['not','bool_expr_main','compare','true_false','eq_neq','eq_neq2'])
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
            this.appendStatementInput('DO' + i)
                .setCheck('body')
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
        }
        if (this.elseCount_) {
            this.appendStatementInput('ELSE')
                .setCheck('body')
                .appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
        }
    }
};

Blockly.Blocks['compare'] = {
    init: function() {
        this.appendValueInput("compare1")
            .setCheck(['arithExpr', 'func_call2', 'number']);
        this.appendValueInput("compare2")
            .setCheck(['arithExpr', 'func_call2', 'number'])
            .appendField(new Blockly.FieldDropdown([
                ["=", "equal"],
                ["≠", "not equal"],
                ["<", "less"],
                ["≤", "less or equal"],
                [">", "greater"],
                ["≥", "greater or equal"]
            ]), "symbols");
        this.setInputsInline(true);
        this.setOutput(true, 'compare');
        this.setColour(180);
        this.setTooltip('the rules that handle the bool expression  ');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['arithExpr'] = {
    init: function() {
        this.appendValueInput("compare1")
            .setCheck(['arithExprSub', 'number', 'func_call2']);
        this.appendValueInput("compare2")
            .setCheck(['arithExprSub', 'number', 'func_call2'])
            .appendField(new Blockly.FieldDropdown([
                ["*", "mult"],
                ["/", "div"],
                ["-", "sub"],
                ["+", "add"]
            ]), "symbols");
        this.setInputsInline(true);
        this.setOutput(true, 'arithExpr');
        this.setColour(180);
        this.setTooltip('rules that handle arithmetic expressions ');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['arithExprSub'] = {
    init: function() {
        this.appendValueInput("1")
            .setCheck(['arithExpr', 'number', 'func_call2'])
            .appendField("(");
        this.appendDummyInput()
            .appendField(")");
        this.setInputsInline(true);
        this.setOutput(true, 'arithExprSub');
        this.setColour(180);
        this.setTooltip('rules that handle arithmetic expressions ');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['not'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("not");
        this.appendValueInput("item1")
            .setCheck(["true_false", 'bool_expr_sub', 'compare']);
        this.setInputsInline(true);
        this.setOutput(true, 'not');
        this.setColour(180);
        this.setTooltip('the rules that handle the bool expression  ');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['bool_expr_main'] = {
    init: function() {
        this.appendValueInput("1")
            .setCheck(['bool_expr_sub','compare','true_false']);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["and", "and"],
                ["or", "or"],
                ["xor", "xor"]
            ]), "1");
        this.appendValueInput("2")
            .setCheck(['bool_expr_sub','compare','true_false']);
        this.setInputsInline(true);
        this.setOutput(true, 'bool_expr_main');
        this.setColour(180);
        this.setTooltip('the rules that handle the bool expression  ');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['eq_neq'] = {
    init: function() {
        this.appendValueInput("1")
            .setCheck(['not','bool_expr_main','compare','true_false']);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["=", "="],
                ["≠", "/="]
            ]), "1");
        this.appendValueInput("2")
            .setCheck(['not','bool_expr_main','compare','true_false']);
        this.setInputsInline(true);
        this.setOutput(true, 'eq_neq');
        this.setColour(180);
        this.setTooltip('the rules that handle the bool expression  ');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['eq_neq2'] = {
    init: function() {
        this.appendValueInput("1")
            .setCheck(null);
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["=", "="],
                ["≠", "/="]
            ]), "1");
        this.appendDummyInput()
            .appendField("\"")
            .appendField(new Blockly.FieldTextInput(""), "string")
            .appendField("\"");
        this.setInputsInline(true);
        this.setOutput(true, 'eq_neq2');
        this.setColour(180);
        this.setTooltip('the rules that handle the bool expression  ');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['bool_expr_sub'] = {
    init: function() {
        this.appendValueInput("1")
            .setCheck(['not','bool_expr_main','compare','true_false'])
            .appendField("(");
        this.appendDummyInput()
            .appendField(")");
        this.setInputsInline(true);
        this.setOutput(true, 'bool_expr_sub');
        this.setColour(180);
        this.setTooltip('the rules that handle the bool expression  ');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['true_false'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["true", "true"],
                ["false", "false"]
            ]), "symbols");
        this.setInputsInline(false);
        this.setOutput(true, 'true_false');
        this.setColour(180);
        this.setTooltip('the rules that handle the bool expression  ');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['provide_parameter3'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldVariable("<item>"), "name1");
        this.setOutput(true, null);
        this.setColour(0);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['for_each'] = {
    init: function() {
        this.appendValueInput("1")
            .setCheck(['for_each_range','for_each_range_brac_id','for_each_range_brac_int'])
            .appendField("for each")
            .appendField(new Blockly.FieldVariable("<local>"), "name1")
            .appendField("in");
        this.appendDummyInput()
            .appendField("do");
        this.appendStatementInput("2")
            .setCheck('body');
        this.setInputsInline(true);
        this.setPreviousStatement(true, ['header','body']);
        this.setNextStatement(true, 'body');
        this.setColour(180);
        this.setTooltip('for-loop variations includes two variations: one for test point loops, another one that loops through a range of values [lowerLimit, upperLimit]');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['for_each_range'] = {
    init: function() {
        this.appendValueInput("1")
            .setCheck('for_each_range_filter')
            .appendField(new Blockly.FieldVariable("<item>"), "name1");
        this.appendValueInput("2")
            .setCheck('for_each_range_order');
        this.setInputsInline(true);
        this.setOutput(true, 'for_each_range');
        this.setColour(180);
        this.setTooltip('for-loop variations includes two variations: one for test point loops, another one that loops through a range of values [lowerLimit, upperLimit]');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['for_each_range_filter'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("filter")
            .appendField(new Blockly.FieldVariable("<item>"), "name1");
        this.setOutput(true, 'for_each_range_filter');
        this.setColour(180);
        this.setTooltip('for-loop variations includes two variations: one for test point loops, another one that loops through a range of values [lowerLimit, upperLimit]');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['for_each_range_order'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("order")
            .appendField(new Blockly.FieldVariable("<item>"), "name1");
        this.setOutput(true, 'for_each_range_order');
        this.setColour(180);
        this.setTooltip('for-loop variations includes two variations: one for test point loops, another one that loops through a range of values [lowerLimit, upperLimit]');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['for_each_range_brac_id'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("[")
            .appendField(new Blockly.FieldVariable("<item>"), "name1")
            .appendField(",")
            .appendField(new Blockly.FieldVariable("<item>"), "name2")
            .appendField("]");
        this.setOutput(true, 'for_each_range_brac_id');
        this.setColour(180);
        this.setTooltip('for-loop variations includes two variations: one for test point loops, another one that loops through a range of values [lowerLimit, upperLimit]');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['for_each_range_brac_int'] = {
    init: function() {
        this.appendValueInput("1")
            .setCheck('number')
            .appendField("[");
        this.appendValueInput("2")
            .setCheck('number')
            .appendField(",");
        this.appendDummyInput()
            .appendField("]");
        this.setInputsInline(true);
        this.setOutput(true, 'for_each_range_brac_int');
        this.setColour(180);
        this.setTooltip('for-loop variations includes two variations: one for test point loops, another one that loops through a range of values [lowerLimit, upperLimit]');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['set1'] = {
    init: function() {
        this.appendValueInput('1')
            .setCheck(['arithExpr','string','number','func_call2'])
            .appendField('set')
            .appendField(new Blockly.FieldVariable("<item>"), "name1")
            .appendField('to');
        this.setInputsInline(true);
        this.setPreviousStatement(true, ['header','body']);
        this.setNextStatement(true, 'body');
        this.setColour(180);
        this.setTooltip('rules that define set statements');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['set2'] = {
    init: function() {
        this.appendValueInput('1')
            .setCheck(['arithExpr','string','number','func_call2'])
            .appendField('set')
            .appendField(new Blockly.FieldVariable("<item>"), "name1")
            .appendField('.')
            .appendField(new Blockly.FieldVariable("<item>"), "name2")
            .appendField('to');
        this.setInputsInline(true);
        this.setPreviousStatement(true, ['header','body']);
        this.setNextStatement(true, 'body');
        this.setColour(180);
        this.setTooltip('rules that define set statements');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['control_set'] = {
    /**
     * Block for checking if a number is even, odd, prime, whole, positive,
     * negative or if it is divisible by certain number.
     * @this Blockly.Block
     */
    init: function() {
        var PROPERTIES = [
            ['variable', '//variable'],
            ['attribute', '//attribute']
        ];
        this.setColour(180);
        var dropdown = new Blockly.FieldDropdown(PROPERTIES, function(option) {
            var divisorInput = (option == '//attribute');
            this.sourceBlock_.updateShape_(divisorInput);
        });
        this.appendValueInput('NUMBER_TO_CHECK')
            .appendField(dropdown, 'PROPERTY')
            .appendField('set')
            .appendField(new Blockly.FieldDropdown([
                ["ID1", "ID1"],
                ["ID2", "ID2"]
            ]), "name1")
            .appendField('to');
        this.setInputsInline(true);
        this.setPreviousStatement(true, ['header','body']);
        this.setNextStatement(true, 'body');
        //this.setOutput(true, null);
        this.setTooltip('rules that define set statements');
    },
    /**
     * Create XML to represent whether the 'divisorInput' should be present.
     * @return {Element} XML storage element.
     * @this Blockly.Block
     */
    mutationToDom: function() {
        var container = document.createElement('mutation');
        var divisorInput = (this.getFieldValue('PROPERTY') == '//attribute');
        container.setAttribute('divisor_input', divisorInput);
        return container;
    },
    /**
     * Parse XML to restore the 'divisorInput'.
     * @param {!Element} xmlElement XML storage element.
     * @this Blockly.Block
     */
    domToMutation: function(xmlElement) {
        var divisorInput = (xmlElement.getAttribute('divisor_input') == 'true');
        this.updateShape_(divisorInput);
    },
    /**
     * Modify this block to have (or not have) an input for 'is divisible by'.
     * @param {boolean} divisorInput True if this block has a divisor input.
     * @private
     * @this Blockly.Block
     */
    updateShape_: function(divisorInput) {
        // Add or remove a Value Input.
        var inputExists = this.getInput('DIVISOR');
        if (divisorInput) {
            if (!inputExists) {
                this.appendValueInput('DIVISOR')
                    .setCheck(null);
            }
        } else if (inputExists) {
            this.removeInput('DIVISOR');
        }
    }
};

Blockly.Blocks['sleep_for'] = {
    init: function() {
        this.appendValueInput("NAME")
            .setCheck('number')
            .appendField("sleep for");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ["seconds", "sec"],
                ["miliseconds", "msec"]
            ]), "name1");
        this.setPreviousStatement(true, ['header','body']);
        this.setNextStatement(true, 'body');
        this.setColour(180);
        this.setTooltip('sleep rule, this is for when you want to pause the test process for a while');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['number'] = {
    init: function() {
        this.appendValueInput('1')
            .setCheck('enumber')
            .appendField(new Blockly.FieldNumber(0), "number");
        this.setOutput(true, 'number');
        this.setColour(180);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['enumber'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["e", "e"], ["E", "E"]]), "name1")
            .appendField(new Blockly.FieldNumber(0), "number");
        this.setOutput(true, 'enumber');
        this.setColour(180);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['string'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("\"")
            .appendField(new Blockly.FieldTextInput(""), "string")
            .appendField("\"");
        this.setOutput(true, 'string');
        this.setColour(180);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['line_comment'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("//");
        this.setPreviousStatement(true, ['header','body']);
        this.setNextStatement(true, 'body');
        this.setColour("#d3d3c3");
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['lines_comment'] = {
    init: function() {
        this.appendStatementInput("1")
            .setCheck('body')
            .appendField("/*");
        this.appendDummyInput()
            .appendField("*/");
        this.setPreviousStatement(true, ['header','body']);
        this.setNextStatement(true, 'body');
        this.setColour("#d3d3c3");
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.Blocks['lines_collapse'] = {
    init: function() {
        this.appendStatementInput("1")
            .setCheck('body')
            .appendField("collapse");
        this.setPreviousStatement(true, ['header','body']);
        this.setNextStatement(true, 'body');
        this.setColour("#d3d3c3");
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};
