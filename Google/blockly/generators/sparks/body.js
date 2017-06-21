'use strict';

goog.provide('Blockly.SparkS.body');

goog.require('Blockly.SparkS');

Blockly.SparkS['shutdown'] = function(block) {
    var code = 'SHUTDOWN:\n';
    return code;
};

Blockly.SparkS['func_call'] = function(block) {
    var variable_name1 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name1'), Blockly.Variables.NAME_TYPE);
    var variable_name2 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name2'), Blockly.Variables.NAME_TYPE);
    var value_name = Blockly.SparkS.valueToCode(block, 'NAME', Blockly.SparkS.ORDER_NONE) || ' ';
    var code = variable_name1 + '.' + variable_name2 + ' ' + value_name + ' \n';
    return code;
};

Blockly.SparkS['func_call2'] = function(block) {
    var variable_name1 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name1'), Blockly.Variables.NAME_TYPE);
    var variable_name2 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name2'), Blockly.Variables.NAME_TYPE);
    var value_name = Blockly.SparkS.valueToCode(block, 'NAME', Blockly.SparkS.ORDER_NONE) || ' ';
    var code = variable_name1 + '.' + variable_name2 + ' ' + value_name + ' ';
    return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['func_call_paran'] = function(block) {
    var value_name = Blockly.SparkS.valueToCode(block, 'NAME', Blockly.SparkS.ORDER_NONE) || ' ';
    var code = '(' + value_name + ')';
    return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['func_call_paran_arg'] = function(block) {
    var text_name1 = block.getFieldValue('name1') || ' ';
    if (text_name1 === '' || text_name1 === ' ')
    {
        //window.alert('function call string should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(180);
    }
    var value_1 = Blockly.SparkS.valueToCode(block, '1', Blockly.SparkS.ORDER_NONE) || '';
    var code = '"' + text_name1 + '"' + value_1;
    return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['if_space'] = function(block) {
  var text_inp = block.getFieldValue('inp');
  var value_name = Blockly.SparkS.valueToCode(block, 'NAME', Blockly.SparkS.ORDER_NONE) || ' ';
  var code = text_inp + ' ' + value_name;
  return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['for_space'] = function(block) {
  var text_inp = block.getFieldValue('inp');
  var value_name = Blockly.SparkS.valueToCode(block, 'NAME', Blockly.SparkS.ORDER_NONE) || ' ';
  var code = text_inp + ' ' + value_name;
  return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['func_call_arithExpr'] = function(block) {
    var OPERATORS = {
        'mult': '*',
        'div': '/',
        'sub': '-',
        'add': '+'
    };
    var value_compare1 = Blockly.SparkS.valueToCode(block, 'compare1', Blockly.SparkS.ORDER_NONE) || '';
    /*if (value_compare1 == '')
     {
     window.alert('arithmetic expression should not be empty!');
     block.setColour("#ff0000");
     }
     else
     {
     block.setColour(180);
     }*/
    var dropdown_symbols = block.getFieldValue('symbols');
    var operator = OPERATORS[dropdown_symbols];
    var value_compare2 = Blockly.SparkS.valueToCode(block, 'compare2', Blockly.SparkS.ORDER_NONE) || '';
    if (value_compare2 == '' || value_compare1 == '')
    {
        //window.alert('arithmetic expression should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(180);
    }
    var value_1 = Blockly.SparkS.valueToCode(block, '1', Blockly.SparkS.ORDER_NONE) || ' ';
    var code = value_compare1 + ' ' + operator + ' ' + value_compare2 + value_1;
    return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['func_call_arith_parameter'] = function(block) {
    var variable_name1 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name1'), Blockly.Variables.NAME_TYPE);
    var value_1 = Blockly.SparkS.valueToCode(block, '1', Blockly.SparkS.ORDER_NONE) || '';
    var code = variable_name1 + ' ' + value_1;
    return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['func_call_comma'] = function(block) {
    var value_1 = Blockly.SparkS.valueToCode(block, '1', Blockly.SparkS.ORDER_NONE) || ' ';
    if (value_1 == ' ' || value_1 == '')
    {
        //window.alert('function call comma should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(180);
    }
    var code = ',' + value_1;
    return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['func_call_number'] = function(block) {
    var value_name = Blockly.SparkS.valueToCode(block, '1', Blockly.SparkS.ORDER_NONE) || '';
    var number_number = block.getFieldValue('number');
    var code = parseFloat(number_number) + value_name;
    return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['func_call_enumber'] = function(block) {
    var value_name = Blockly.SparkS.valueToCode(block, '1', Blockly.SparkS.ORDER_NONE) || '';
    var dropdown_1 = block.getFieldValue('name1');
    var number_number = block.getFieldValue('number');
    var code = dropdown_1 + parseFloat(number_number) + value_name;
    return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['constant'] = function(block) {
    var variable_name = Blockly.SparkS.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
    var value_1 = Blockly.SparkS.valueToCode(block, '1', Blockly.SparkS.ORDER_NONE);
    if (value_1 == '')
    {
        //window.alert('constant should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(180);
    }
    var code = 'constant ' + variable_name + ' = ' + value_1 + ' \n';
    return code;
};

Blockly.SparkS['controls_try'] = function(block) {
    // If/elseif/else condition.
    block.setColour(180);
    var n = 0;
    //var argument = Blockly.SparkS.valueToCode(block, 'try' + n,
    //Blockly.SparkS.ORDER_NONE) || 'false';
    var branch = Blockly.SparkS.statementToCode(block, 'DO' + n);
    if (branch == '')
    {
        //window.alert('try should not be empty!');
        block.setColour("#ff0000");
    }
    var code = 'try\n' + branch;
    //var dropdown_symbols;// = block.getFieldValue('symbols');
    for (n = 1; n <= block.elseifCount_; n++) {
        //argument = Blockly.SparkS.valueToCode(block, 'try' + n,
        //Blockly.SparkS.ORDER_NONE) || 'false';
        branch = Blockly.SparkS.statementToCode(block, 'DO' + n);
        if (branch == '')
        {
            //window.alert('try on do should not be empty!');
            block.setColour("#ff0000");
        }
        var value_1 = Blockly.SparkS.valueToCode(block, 'ON' + n, Blockly.SparkS.ORDER_NONE);
        if (value_1 == '')
        {
            //window.alert('try on should not be empty!');
            block.setColour("#ff0000");
        }
        //var dropdown_symbols = block.getFieldValue('symbols' + n);
        code += 'on ' + value_1 + ' do\n' + branch + 'end do\n';
    }
    if (block.elseCount_) {
        branch = Blockly.SparkS.statementToCode(block, 'ELSE');
        if (branch == '')
        {
            //window.alert('try on do should not be empty!');
            block.setColour("#ff0000");
        }
        var value_2 = Blockly.SparkS.valueToCode(block, 'ON' + n, Blockly.SparkS.ORDER_NONE);
        if (value_2 == '')
        {
            //window.alert('try on should not be empty!');
            block.setColour("#ff0000");
        }
        //var dropdown_symbols = block.getFieldValue('symbols_else');
        code += 'on ' + value_2 + ' do\n' + branch + 'end do\n';
    }
    code += 'end try\n';
    return code;
};

Blockly.SparkS['tryexception'] = function(block) {
    var variable_name1 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name1'), Blockly.Variables.NAME_TYPE);
    var code = variable_name1;
    return [code, Blockly.SparkS.ORDER_NONE];
};


Blockly.SparkS['expand'] = function(block) {
    var variable_name1 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name1'), Blockly.Variables.NAME_TYPE);
    var value_1 = Blockly.SparkS.valueToCode(block, '1', Blockly.SparkS.ORDER_NONE) || ' ';
    var code = 'expand ' + variable_name1 + ' ' + value_1 + '\n';
    return code;
};

Blockly.SparkS['expand_replace'] = function(block) {
    var variable_name1 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name1'), Blockly.Variables.NAME_TYPE);
    var variable_name2 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name2'), Blockly.Variables.NAME_TYPE);
    var value_1 = Blockly.SparkS.valueToCode(block, '1', Blockly.SparkS.ORDER_NONE) || ' ';
    var code = 'replace ' + variable_name1 + ' with ' + variable_name2 + ' ' + value_1;
    return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['expand_replace_with'] = function(block) {
    var variable_name1 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name1'), Blockly.Variables.NAME_TYPE);
    var variable_name2 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name2'), Blockly.Variables.NAME_TYPE);
    var value_1 = Blockly.SparkS.valueToCode(block, '1', Blockly.SparkS.ORDER_NONE) || ' ';
    var code = '\n,\n' + variable_name1 + ' with ' + variable_name2 + ' ' + value_1;
    return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['controls_if_2'] = function(block) {
    // If/elseif/else condition.
    block.setColour(180);
    var n = 0;
    var argument = Blockly.SparkS.valueToCode(block, 'IF' + n,
            Blockly.SparkS.ORDER_NONE) || '';
    if (argument == '')
    {
        //window.alert('if should not be empty!');
        block.setColour("#ff0000");
    }
    var branch = Blockly.SparkS.statementToCode(block, 'DO' + n);
    if (branch == '')
    {
        //window.alert('if do should not be empty!');
        block.setColour("#ff0000");
    }
    var code = 'if ' + argument + ' then\n' + branch;
    for (n = 1; n <= block.elseifCount_; n++) {
        argument = Blockly.SparkS.valueToCode(block, 'IF' + n,
                Blockly.SparkS.ORDER_NONE) || '';
        if (argument == '')
        {
            //window.alert('else if should not be empty!');
            block.setColour("#ff0000");
        }
        branch = Blockly.SparkS.statementToCode(block, 'DO' + n);
        if (branch == '')
        {
            //window.alert('else if do should not be empty!');
            block.setColour("#ff0000");
        }
        code += 'else if ' + argument + ' then\n' + branch;
    }
    if (block.elseCount_) {
        branch = Blockly.SparkS.statementToCode(block, 'ELSE');
        if (branch == '')
        {
            //window.alert('else do should not be empty!');
            block.setColour("#ff0000");
        }
        code += 'else\n' + branch;
    }
    code += 'end if\n';
    return code;
};

Blockly.SparkS['compare'] = function(block) {
    var OPERATORS = {
        'equal': '=',
        'not equal': '/=',
        'less': '<',
        'less or equal': '<=',
        'greater': '>',
        'greater or equal': '>=',
        'mult': '*',
        'div': '/',
        'sub': '-',
        'add': '+'
    };
    var value_compare1 = Blockly.SparkS.valueToCode(block, 'compare1', Blockly.SparkS.ORDER_NONE) || '';
    /*if (value_compare1 == '')
    {
        window.alert('compare should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(180);
    }*/
    var dropdown_symbols = block.getFieldValue('symbols');
    var operator = OPERATORS[dropdown_symbols];
    var value_compare2 = Blockly.SparkS.valueToCode(block, 'compare2', Blockly.SparkS.ORDER_NONE) || '';
    if (value_compare2 == '' || value_compare1 == '')
    {
        //window.alert('compare should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(180);
    }
    var code = value_compare1 + ' ' + operator + ' ' + value_compare2;
    return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['arithExpr'] = function(block) {
    var OPERATORS = {
        'mult': '*',
        'div': '/',
        'sub': '-',
        'add': '+'
    };
    var value_compare1 = Blockly.SparkS.valueToCode(block, 'compare1', Blockly.SparkS.ORDER_NONE) || '';
    /*if (value_compare1 == '')
    {
        window.alert('arithmetic expression should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(180);
    }*/
    var dropdown_symbols = block.getFieldValue('symbols');
    var operator = OPERATORS[dropdown_symbols];
    var value_compare2 = Blockly.SparkS.valueToCode(block, 'compare2', Blockly.SparkS.ORDER_NONE) || '';
    if (value_compare2 == '' || value_compare1 == '')
    {
        //window.alert('arithmetic expression should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(180);
    }
    var code = value_compare1 + ' ' + operator + ' ' + value_compare2;
    return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['arithExprSub'] = function(block) {
    var value_1 = Blockly.SparkS.valueToCode(block, '1', Blockly.SparkS.ORDER_NONE) || '';
    if (value_1 == '')
    {
        //window.alert('parenthesis should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(180);
    }
    var code = '(' + value_1 + ')';
    return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['not'] = function(block) {
    var value_item = Blockly.SparkS.valueToCode(block, 'item1', Blockly.SparkS.ORDER_NONE);
    if (value_item == '')
    {
        //window.alert('not should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(180);
    }
    var code = 'not ' + value_item;
    return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['bool_expr_main'] = function(block) {
    var value_1 = Blockly.SparkS.valueToCode(block, '1', Blockly.SparkS.ORDER_NONE);
    /*if (value_1 == '')
    {
        window.alert('logic should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(180);
    }*/
    var dropdown_1 = block.getFieldValue('1');
    var value_2 = Blockly.SparkS.valueToCode(block, '2', Blockly.SparkS.ORDER_NONE);
    if (value_2 == '' || value_1 == '')
    {
        //window.alert('logic should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(180);
    }
    var code = value_1 + ' ' + dropdown_1 + ' ' + value_2;
    return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['eq_neq'] = function(block) {
    var value_1 = Blockly.SparkS.valueToCode(block, '1', Blockly.SparkS.ORDER_NONE);
    /*if (value_1 == '')
    {
        window.alert('compare should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(180);
    }*/
    var dropdown_1 = block.getFieldValue('1');
    var value_2 = Blockly.SparkS.valueToCode(block, '2', Blockly.SparkS.ORDER_NONE);
    if (value_2 == '' || value_1 == '')
    {
        //window.alert('compare should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(180);
    }
    var code = value_1 + ' ' + dropdown_1 + ' ' + value_2;
    return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['eq_neq2'] = function(block) {
    var value_1 = Blockly.SparkS.valueToCode(block, '1', Blockly.SparkS.ORDER_NONE);
    /*if (value_1 == '')
    {
        window.alert('compare should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(180);
    }*/
    var dropdown_1 = block.getFieldValue('1');
    var text_string = block.getFieldValue('string') || ' ';
    if (text_string === ' ' || text_string === '' || value_1 == '')
    {
        //window.alert('compare should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(180);
    }
    var code = value_1 + ' ' + dropdown_1 + ' ' + '"' + text_string + '"';
    return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['bool_expr_sub'] = function(block) {
    var value_1 = Blockly.SparkS.valueToCode(block, '1', Blockly.SparkS.ORDER_NONE) || '';
    if (value_1 == '')
    {
        //window.alert('else do should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(180);
    }
    var code = '(' + value_1 + ')';
    return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['true_false'] = function(block) {
    var dropdown_symbols = block.getFieldValue('symbols');
    var code = dropdown_symbols;
    return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['provide_parameter3'] = function(block) {
    var variable_name1 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name1'), Blockly.Variables.NAME_TYPE);
    var code = variable_name1;
    return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['for_each'] = function(block) {
    var variable_name1 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name1'), Blockly.Variables.NAME_TYPE);
    var value_1 = Blockly.SparkS.valueToCode(block, '1', Blockly.SparkS.ORDER_NONE);
    /*if (value_1 == '')
    {
        window.alert('for should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(180);
    }*/
    var statements_2 = Blockly.SparkS.statementToCode(block, '2');
    statements_2 = Blockly.SparkS.addLoopTrap(statements_2, block.id);
    if (statements_2 == '' || value_1 == '')
    {
        //window.alert('for should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(180);
    }
    var code = 'for each ' + variable_name1 + ' in ' + value_1 + ' do \n' + statements_2 + 'end for \n';
    return code;
};

Blockly.SparkS['for_each_range'] = function(block) {
    var variable_name1 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name1'), Blockly.Variables.NAME_TYPE);
    var value_1 = Blockly.SparkS.valueToCode(block, '1', Blockly.SparkS.ORDER_NONE) || '';
    var value_2 = Blockly.SparkS.valueToCode(block, '2', Blockly.SparkS.ORDER_NONE) || '';
    var code = variable_name1 + ' ' + value_1 + ' ' + value_2;
    return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['for_each_range_filter'] = function(block) {
    var variable_name1 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name1'), Blockly.Variables.NAME_TYPE);
    var code = 'filter ' + variable_name1;
    return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['for_each_range_order'] = function(block) {
    var variable_name1 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name1'), Blockly.Variables.NAME_TYPE);
    var code = 'order ' + variable_name1;
    return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['for_each_range_brac_id'] = function(block) {
    var variable_name1 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name2'), Blockly.Variables.NAME_TYPE);
    var variable_name2 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name2'), Blockly.Variables.NAME_TYPE);
    var code = '[' + variable_name1 + ',' + variable_name2 + ']';
    return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['for_each_range_brac_int'] = function(block) {
    var value_1 = Blockly.SparkS.valueToCode(block, '1', Blockly.SparkS.ORDER_NONE) || '';
    var value_2 = Blockly.SparkS.valueToCode(block, '2', Blockly.SparkS.ORDER_NONE) || '';
    if (value_2 == '' || value_1 == '')
    {
        //window.alert('for each integer should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(180);
    }
    var code = '[' + value_1 + ',' + value_2 + ']';
    return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['set1'] = function(block) {
    var value_1 = Blockly.SparkS.valueToCode(block, '1', Blockly.SparkS.ORDER_NONE) || '';
    if (value_1 == '')
    {
        //window.alert('set should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(180);
    }
    var variable_name1 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name1'), Blockly.Variables.NAME_TYPE);
    var code = 'set ' + variable_name1 + ' to '+ value_1 + ' \n';
    return code;
};

Blockly.SparkS['set2'] = function(block) {
    var value_1 = Blockly.SparkS.valueToCode(block, '1', Blockly.SparkS.ORDER_NONE) || '';
    if (value_1 == '')
    {
        //window.alert('set should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(180);
    }
    var variable_name1 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name1'), Blockly.Variables.NAME_TYPE);
    var variable_name2 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name2'), Blockly.Variables.NAME_TYPE);
    var code = 'set ' + variable_name1 + '.' + variable_name2 + ' to ' + value_1 + ' \n';
    return code;
};

Blockly.SparkS['control_set'] = function(block) {
    // Check if a number is even, odd, prime, whole, positive, or negative
    // or if it is divisible by certain number. Returns true or false.
    var dropdown_property = block.getFieldValue('PROPERTY');
    var dropdown_property2 = block.getFieldValue('name1');
    var number_to_check = Blockly.SparkS.valueToCode(block, 'NUMBER_TO_CHECK',
            Blockly.SparkS.ORDER_NONE) || null;
    var code = 'set ';
    /*if (dropdown_property == 'PRIME') {
     // Prime is a special case as it is not a one-liner test.
     var functionName = Blockly.SparkS.provideFunction_(
     'mathIsPrime',
     ['function ' + Blockly.SparkS.FUNCTION_NAME_PLACEHOLDER_ + '(n) {',
     '  // https://en.wikipedia.org/wiki/Primality_test#Naive_methods',
     '  if (n == 2 || n == 3) {',
     '    return true;',
     '  }',
     '  // False if n is NaN, negative, is 1, or not whole.',
     '  // And false if n is divisible by 2 or 3.',
     '  if (isNaN(n) || n <= 1 || n % 1 != 0 || n % 2 == 0 ||' +
     ' n % 3 == 0) {',
     '    return false;',
     '  }',
     '  // Check all the numbers of form 6k +/- 1, up to sqrt(n).',
     '  for (var x = 6; x <= Math.sqrt(n) + 1; x += 6) {',
     '    if (n % (x - 1) == 0 || n % (x + 1) == 0) {',
     '      return false;',
     '    }',
     '  }',
     '  return true;',
     '}']);
     code = functionName + '(' + number_to_check + ')';
     return [code, Blockly.SparkS.ORDER_FUNCTION_CALL];
     }*/
    switch (dropdown_property) {
        case '//variable':
            code += dropdown_property2 + ' to ' + number_to_check + '\n';
            break;
        case '//attribute':
            var divisor = Blockly.SparkS.valueToCode(block, 'DIVISOR', Blockly.SparkS.ORDER_NONE);
            code += dropdown_property2 + '.' + divisor + ' to ' + number_to_check + '\n';
            break;
        /*case 'WHOLE':
         code = number_to_check + ' % 1 == 0';
         break;
         case 'POSITIVE':
         code = number_to_check + ' > 0';
         break;
         case 'NEGATIVE':
         code = number_to_check + ' < 0';
         break;
         case 'DIVISIBLE_BY':
         var divisor = Blockly.SparkS.valueToCode(block, 'DIVISOR',
         Blockly.SparkS.ORDER_MODULUS) || '0';
         code = number_to_check + ' % ' + divisor + ' == 0';
         break;*/
    }
    return code;
};

Blockly.SparkS['sleep_for'] = function(block) {
    var value_name = Blockly.SparkS.valueToCode(block, 'NAME', Blockly.SparkS.ORDER_NONE) || '';
    if (value_name == '')
    {
        //window.alert('sleep should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(180);
    }
    var variable_name1 = Blockly.SparkS.variableDB_.getName(block.getFieldValue('name1'), Blockly.Variables.NAME_TYPE);
    var code = 'sleep for ' + value_name + ' ' + variable_name1 + ' \n';
    return code;
};

Blockly.SparkS['number'] = function(block) {
    var value_name = Blockly.SparkS.valueToCode(block, '1', Blockly.SparkS.ORDER_NONE) || ' ';
    var number_number = block.getFieldValue('number');
    var code = parseFloat(number_number) + value_name;
    return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['enumber'] = function(block) {
    var dropdown_1 = block.getFieldValue('name1');
    var number_number = block.getFieldValue('number');
    var code = dropdown_1 + parseFloat(number_number);
    return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['string'] = function(block) {
    var text_string = block.getFieldValue('string') || ' ';
    if (text_string === '' || text_string === ' ')
    {
        //window.alert('string should not be empty!');
        block.setColour("#ff0000");
    }
    else
    {
        block.setColour(180);
    }
    var code = '"' + text_string + '"';
    return [code, Blockly.SparkS.ORDER_NONE];
};

Blockly.SparkS['line_comment'] = function(block) {
    var code = '//';
    return code;
};

Blockly.SparkS['lines_comment'] = function(block) {
    var statements_1 = Blockly.SparkS.statementToCode(block, '1');
    statements_1 = Blockly.SparkS.addLoopTrap(statements_1, block.id);
    var code = '/*' + statements_1 + '*/ \n';
    return code;
};

Blockly.SparkS['lines_collapse'] = function(block) {
    var statements_1 = Blockly.SparkS.statementToCode(block, '1');
    statements_1 = Blockly.SparkS.addLoopTrap(statements_1, block.id);
    var code = statements_1 + '\n';
    return code;
};
