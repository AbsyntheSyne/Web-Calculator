let firstOperand = ''
let secondOperand = ''
let CurrentOperation = null
let ShouldResetScreen = false

const NumberButtons = document.querySelectorAll('[data-number')
const OperatorButtons = document.querySelectorAll('[data-operator]')
const EqualsButton = document.getElementById('equalsBtn')
const ClearButton = document.getElementById('clearBtn')
const DeleteButton = document.getElementById('deleteBtn')
const PointButton = document.getElementById('pointBtn')
const LastOperatorScreen = document.getElementById('lastOperationScreen')
const CurrentOperationScreen = document.getElementById('currentOperationScreen')

window.addEventListener('keydown', handleKeyboardInput)
EqualsButton.addEventListener('click', evaluate)
ClearButton.addEventListener('click', clear)
DeleteButton.addEventListener('click', deleteNumber)
PointButton.addEventListener('click', appendPoint)

NumberButtons.forEach((button) =>
    button.addEventListener('click', () => appendNumber(button.textContent))
)

OperatorButtons.forEach((button) =>
    button.addEventListener('click', () => setOperation(button.textContent))
)

function appendNumber(number) {
    if (CurrentOperationScreen.textContent === '0' || ShouldResetScreen)
        resetScreen()
    CurrentOperationScreen.textContent += number
}

function resetScreen() {
    CurrentOperationScreen.textContent = ''
    ShouldResetScreen = false
}

function clear() {
    CurrentOperationScreen.textContent = '0'
    LastOperatorScreen.textContent = ''
    firstOperand = ''
    secondOperand = ''
    CurrentOperation = null
}

function appendPoint() {
    if (ShouldResetScreen) resetScreen()
    if (CurrentOperationScreen.textContent === '')
        CurrentOperationScreen.textContent = '0'
    if (CurrentOperationScreen.textContent.includes('.')) return
    CurrentOperationScreen.textContent += '.'
}

function deleteNumber() {
    CurrentOperationScreen.textContent = CurrentOperationScreen.textContent
        .toString()
        .slice(0, -1)
}

function setOperation(operator) {
    console.log(`Operator selected: ${operator}`)
    if (CurrentOperation !== null) evaluate()
    firstOperand = CurrentOperationScreen.textContent
    CurrentOperation = operator
    LastOperatorScreen.textContent = `${firstOperand} ${CurrentOperation}`
    ShouldResetScreen = true
}

function evaluate() {
    if (CurrentOperation === null || ShouldResetScreen) return
    if (CurrentOperation === '/' && CurrentOperationScreen.textContent === '0') {
        alert("You can't divide by 0!!!")
        return
    }

    secondOperand = Number(CurrentOperationScreen.textContent)
    firstOperand = Number(firstOperand)

    let result = operate(CurrentOperation, firstOperand, secondOperand)

    if (result !== null && !isNaN(result)) {
        CurrentOperationScreen.textContent = roundResult(result)
        LastOperatorScreen.textContent = `${firstOperand} ${CurrentOperation} ${secondOperand} =`
    } else {
        console.log('Invalid result or division by zero')
        CurrentOperationScreen.textContent = "Error"
    }
    
    CurrentOperation = null
    ShouldResetScreen = true
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
}

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <=9) appendNumber(e.key)
    if (e.key === '.') appendPoint()
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === 'Backspace') deleteNumber()
    if (e.key === 'Escape') clear()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
        setOperation(convertOperator(e.key))
}

function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷'
    if (keyboardOperator === '*') return '×'
    if (keyboardOperator === '-') return '-'
    if (keyboardOperator === '+') return '+'
}

function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)
    switch (operator) {
        case '+':
      return add(a, b)
    case '-':
      return subtract(a, b)
    case '*':
      return multiply(a, b)
    case '/':
      if (b === 0) return null
      else return divide(a, b)
    default:
      return null
    }
}