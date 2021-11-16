//basic functions
function add(a, b) {
    let result = String(+a + +b);
    if (result.includes('.')) {
        if (result.split('.')[1].length > 3) {
            result = String(Number(result).toFixed(3))
        }
    }
    return result;
}

function subtract(a, b) {
    let result = String(a - b);
    if (result.includes('.')) {
        if (result.split('.')[1].length > 3) {
            result = String(Number(result).toFixed(3))
        }
    }
    return result;
}

function multiply(a, b) {
    let result = String(a * b);
    if (result.includes('.')) {
        if (result.split('.')[1].length > 3) {
            result = String(Number(result).toFixed(3))
        }
    }
    return result;
}

function devide(a, b) {
    let result = String(a / b);
    if (result.includes('.')) {
        if (result.split('.')[1].length > 3) {
            result = String(Number(result).toFixed(3))
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
console.log(equalButton)
console.log(functionButtons)
function operation(event) {
    console.log(equalButton)
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















