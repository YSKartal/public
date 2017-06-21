/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
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
 * @fileoverview Generating SparkS for procedure blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.SparkS.procedures');

goog.require('Blockly.SparkS');


Blockly.SparkS['procedures_defreturn'] = function(block) {
    // Define a procedure with a return value.
    var funcName = Blockly.SparkS.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var branch = Blockly.SparkS.statementToCode(block, 'STACK');
    if (Blockly.SparkS.STATEMENT_PREFIX) {
        branch = Blockly.SparkS.prefixLines(
            Blockly.SparkS.STATEMENT_PREFIX.replace(/%1/g,
                '\'' + block.id + '\''), Blockly.SparkS.INDENT) + branch;
    }
    if (Blockly.SparkS.INFINITE_LOOP_TRAP) {
        branch = Blockly.SparkS.INFINITE_LOOP_TRAP.replace(/%1/g,
            '\'' + block.id + '\'') + branch;
    }
    var returnValue = Blockly.SparkS.valueToCode(block, 'RETURN',
        Blockly.SparkS.ORDER_NONE) || '';
    if (returnValue) {
        returnValue = '  return ' + returnValue + ';\n';
    }
    var args = [];
    for (var i = 0; i < block.arguments_.length; i++) {
        args[i] = Blockly.SparkS.variableDB_.getName(block.arguments_[i],
            Blockly.Variables.NAME_TYPE);
    }
    var code = 'function ' + funcName + '(' + args.join(', ') + ') {\n' +
        branch + returnValue + '}';
    code = Blockly.SparkS.scrub_(block, code);
    // Add % so as not to collide with helper functions in definitions list.
    Blockly.SparkS.definitions_['%' + funcName] = code;
    return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.SparkS['procedures_defnoreturn'] =
    Blockly.SparkS['procedures_defreturn'];

Blockly.SparkS['procedures_callreturn'] = function(block) {
    // Call a procedure with a return value.
    var funcName = Blockly.SparkS.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var args = [];
    for (var i = 0; i < block.arguments_.length; i++) {
        args[i] = Blockly.SparkS.valueToCode(block, 'ARG' + i,
            Blockly.SparkS.ORDER_COMMA) || 'null';
    }
    var code = funcName + '(' + args.join(', ') + ')';
    return [code, Blockly.SparkS.ORDER_FUNCTION_CALL];
};

Blockly.SparkS['procedures_callnoreturn'] = function(block) {
    // Call a procedure with no return value.
    var funcName = Blockly.SparkS.variableDB_.getName(
        block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
    var args = [];
    for (var i = 0; i < block.arguments_.length; i++) {
        args[i] = Blockly.SparkS.valueToCode(block, 'ARG' + i,
            Blockly.SparkS.ORDER_COMMA) || 'null';
    }
    var code = funcName + '(' + args.join(', ') + ');\n';
    return code;
};

Blockly.SparkS['procedures_ifreturn'] = function(block) {
    // Conditionally return value from a procedure.
    var condition = Blockly.SparkS.valueToCode(block, 'CONDITION',
        Blockly.SparkS.ORDER_NONE) || 'false';
    var code = 'if (' + condition + ') {\n';
    if (block.hasReturnValue_) {
        var value = Blockly.SparkS.valueToCode(block, 'VALUE',
            Blockly.SparkS.ORDER_NONE) || 'null';
        code += '  return ' + value + ';\n';
    } else {
        code += '  return;\n';
    }
    code += '}\n';
    return code;
};