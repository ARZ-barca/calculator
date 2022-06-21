//basic functions

const DECIMAL_POINTS = 6

function add(a, b) {
    let result = String(+a + +b);
    if (result.includes('.')) {
        if (result.split('.')[1].length > DECIMAL_POINTS) {
            result = String(Number(result).toFixed(DECIMAL_POINTS))
        }
    }
    return result;
}

function subtract(a, b) {
    let result = String(a - b);
    if (result.includes('.')) {
        if (result.split('.')[1].length > DECIMAL_POINTS) {
            result = String(Number(result).toFixed(DECIMAL_POINTS))
        }
    }
    return result;
}

function multiply(a, b) {
    let result = String(a * b);
    if (result.includes('.')) {
        if (result.split('.')[1].length > DECIMAL_POINTS) {
            result = String(Number(result).toFixed(DECIMAL_POINTS))
        }
    }
    return result;
}

function devide(a, b) {
    let result = String(a / b);
    if (result.includes('.')) {
        if (result.split('.')[1].length > DECIMAL_POINTS) {
            result = String(Number(result).toFixed(DECIMAL_POINTS))
        }
    }
    return result;
}

function operate(a, b, operand) {
    switch (operand.trim()) {
        case '+':
            return add(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case '*':
            return multiply(a, b);
            break;
        case '÷':
            return devide(a, b)
    }
}

let displayValue = '';
const display = document.querySelector('.display');

//adding the numbers

const numberButtons = document.querySelectorAll('.button-number');
numberButtons.forEach(button => button.addEventListener('click', updateDisplayNumber));

function updateDisplayNumber(event) {
    displayValue += event.target.textContent;
    display.textContent = displayValue;
}

//making clear and delete functionality

const deleteButton = document.querySelector('.button-delete')
const clearButton = document.querySelector('.button-clear')

deleteButton.addEventListener('click', deleteDisplay);

function deleteDisplay(event) {
    let text = displayValue.split(' ')
    let operator = ['-', '+', '*', '÷'].filter(element => element === text[1])
    if (operator.length === 1 && text[2] === '') {
        displayValue = displayValue.slice(0, -3);
        display.textContent = displayValue;
        return;
    } else {
        displayValue = displayValue.slice(0, -1);
        display.textContent = displayValue;
        return;
    }
}

clearButton.addEventListener('click', clearDisplay)

function clearDisplay(event) {
    displayValue = '';
    display.textContent = displayValue;
}

// math funtions
const functionButtons = document.querySelectorAll('.button-function');
functionButtons.forEach(button => button.addEventListener('click', updateDisplayFunction));

function updateDisplayFunction(event) {
    let text = displayValue.split(' ');
    let operator = this.textContent;
    if (text[0] === '') {
        return;
    } else if (text.length === 1) {
        displayValue += ` ${operator} `;
        display.textContent = displayValue;
        return;
    } else if (text[2] === '') {
        displayValue = displayValue.slice(0, -3) + ` ${operator} `;
        display.textContent = displayValue;
        return;
    } else if (text[2] !== '') {
        displayValue = operate(text[0], text[2], text[1]) + ` ${operator} `;
        display.textContent = displayValue;
        return;
    }
}

//evaluate button

const equalButton = document.querySelector('.button-equal')
equalButton.addEventListener('click', operation)

function operation(event) {
    text = displayValue.split(' ')
    if (text[0] === '') {
        return;
    } else if (text.length === 1) {
        return;
    } else if (text[2] === '') {
        displayValue = displayValue.slice(0, -3);
        display.textContent = displayValue;
        return;
    } else if (text[2] !== '') {
        displayValue = operate(text[0], text[2], text[1]);
        display.textContent = displayValue;
        return;
    }
}

// '.' button

const decimalButton = document.querySelector('.button-decimal')
decimalButton.addEventListener('click', addDecimal)

function addDecimal(event) {
    let text = displayValue.split(' ')
    if (text.length === 1 && !text[0].includes('.') && text[0] !== '') {
        displayValue += '.'; 
        display.textContent = displayValue;
        return;
    } else if (text.length === 3 && !text[2].includes('.')) {
        displayValue += '.';
        display.textContent = displayValue;
        return ;
    } else {
        return;
    }
}

/*
    keyboard events
*/

window.addEventListener('keydown', keyboardInputOperation)

function keyboardInputOperation(event) {
    let keyDiv = document.querySelector(`div[data-key="${event.key}"]`)
    //console.log(event)
    if (!keyDiv) return;
    

    /*
        number buttons
    */

    if (!isNaN(Number(event.key))) {
        displayValue += event.key;
        display.textContent = displayValue;
    }

    /*
        delete button
    */

    if (event.key === 'Backspace') {
        deleteDisplay()
    }

    /*
        function buttons
    */

    if ("+-/*".includes(event.key)) {
        let text = displayValue.split(' ');
        let operator = event.key;
        if (operator === "/") {
            operator = '÷'
        }
        if (text[0] === '') {
            //return;
        } else if (text.length === 1) {
            displayValue += ` ${operator} `;
            display.textContent = displayValue;
            //return;
        } else if (text[2] === '') {
            displayValue = displayValue.slice(0, -3) + ` ${operator} `;
            display.textContent = displayValue;
            //return;
        } else if (text[2] !== '') {
            displayValue = operate(text[0], text[2], text[1]) + ` ${operator} `;
            display.textContent = displayValue;
            //return;
        }
    }

    /*
        decimal button
    */
    
    if (event.key === '.') {
        addDecimal()
    }

    /*
        enter button
    */

    if (event.key === 'Enter') {
        operation()
    }
}




