const num_buttons = document.querySelectorAll('.num-btns')
const screen = document.querySelector('p')
const op_buttons = document.querySelectorAll(".op-btns")
const equal_buttons = document.querySelector('.equal-btn')
const clear_button = document.querySelector('.clear-btn')
const delete_button = document.querySelector('.del-btn')
const dec_button = document.querySelector('.dec-btn')

let num1 = "";
let num2 = "";
let operation = null;
let reset_screen = false;

window.addEventListener('keydown', set_input)
equal_buttons.addEventListener('click', evaluate)
clear_button.addEventListener('click', clear)
delete_button.addEventListener('click', delete_num)
dec_button.addEventListener('click', append_point)

num_buttons.forEach((button) =>
    button.addEventListener('click', () => append_num(button.value)));

op_buttons.forEach((button) =>
    button.addEventListener('click', () => set_operation(button.value)))

function append_num(number) {
    if (screen.textContent === '0' || reset_screen) {
        reset();
    }
    screen.textContent += number;
}

function reset() {
    screen.textContent = "";
    reset_screen = false;
}

function clear() {
    screen.textContent = '0';
    num1 = "";
    num2 = '';
    operation = null;
}

function append_point() {
    if (reset_screen) {
        reset()
    }
    if (screen.textContent === '') {
        screen.textContent = '0';
    }
    if (screen.textContent.includes('.')) {
        return;
    }
    screen.textContent += '.';
}

function delete_num() {
    screen.textContent = screen.textContent.toString().slice(0, -1);
}

function set_operation(operator) {
    if (operation !== null) {
        evaluate();
    }
    num1 = screen.textContent;
    operation = operator;
    reset_screen = true;
}

function evaluate() {
    if (operation === null || reset_screen) {
        return;
    }
    if (operation === '/' && screen.textContent === '0') {
        alert("You can't divide by 0!");
        clear();
        return;
    }
    num2 = screen.textContent;
    screen.textContent = round_result(
        operate(num1, operation, num2)
    );
    operation = null;
}

function round_result(number) {
    return Math.round(number * 1000) / 1000;
}

function set_input(e) {
    if (e.key >= 0 && e.key <= 9) {
        append_num(e.key);
    }
    if (e.key === '.') {
        append_point();
    }
    if (e.key === '=' || e.key === 'Enter') {
        evaluate();
    }
    if (e.key === 'Backspace') {
        delete_num();
    }
    if (e.key == 'Escape') {
        clear();
    }
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        set_operation(e.key);
    }
}

const add = function(a, b) {
    return a + b;
}

const subtract = function(a, b) {
    return a - b;
}

const multiply = function(a, b = 1) {
    return a * b;
}

const divide = function(a, b) {
    return a / b;
}

const operate = function(a, op, b) {
    if (op === '+') {
        return add(a, b);
    } else if (op === '-') {
        return subtract(a, b);
    } else if (op === '*') {
        return multiply(a, b);
    } else if (op === '/') {
        return divide(a, b);
    }
    return 'Operator Error!!!';
}