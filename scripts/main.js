// FOR MODULE USE, CURRENTLY NOT WORKING!
// const calcMod = require('./calculator_module.js');


// Select the calculator Objects
const numberButton = document.querySelectorAll('[data-number]')
const operatorButton = document.querySelectorAll('[data-operator]')
const deleteButton = document.querySelector('[data-delete]')
const clear = document.querySelector('[data-clear]')
const clearAll = document.querySelector('[data-clear-all]')
const result = document.querySelector('[data-result]')
const memoryStore = document.querySelector('[data-memory-store]')
const memoryRecovery = document.querySelector('[data-memory-recover]')
const resultRecovery = document.querySelector('[data-memory-result]')
const previousNumberTextElement = document.querySelector('[data-previous-number]')
const currentNumberTextElement = document.querySelector('[data-current-number]')

// Tip Calculator Objects
const tipResultTextElement = document.querySelector('[data-tip-result]')
const tipResult = document.querySelector('[data-equal-tip]')
const tipClear= document.querySelector('[data-clear-tip]')

class Calculator {
  constructor(previousNumberTextElement, currentNumberTextElement){
  this.previousNumberTextElement = previousNumberTextElement
  this.currentNumberTextElement = currentNumberTextElement
  this.previousNumber = ''
  this.memoryNumber = ''
  this.clearAll()
  }

  addNumber(num){
    if (num === '.' && this.currentNumber.includes('.')){ // this prevents consecutive decimal points
      return }
    if (this.currentNumber.length > 20){
      return
    }
    this.currentNumber = this.currentNumber.toString() + num.toString()
  }

  addOperator(operator){
    if (this.currentNumber === ""){ // This prevents consecutives operators
      return
    } else if (this.previousNumber !== ""){
      this.calculate();
      }
    this.operator = operator
    this.previousNumber = this.currentNumber
    this.currentNumber = ""
  }

  deleteNumber(){
    this.currentNumber = this.currentNumber.toString().slice(0, -1)
  }

  storeNumber(){
    if (this.currentNumber === '') {
      return
    }
    this.memoryNumber = this.currentNumber.toString()
  }

  recoverNumber(){
    if (this.currentNumber === ''){
      this.addNumber(this.memoryNumber)
    }
  }

  recoverResult(){
    if (this.currentNumber === ''){
      this.addNumber(this.lastResult)
    }
  }

  clear(){
    this.currentNumber = ''
    this.previousNumber = ''
    this.operator = undefined
  }

  clearAll (){
    this.clear();
    this.memoryNumber = ''
    this.lastResult = ''
  }

  calculate(){
    let calculateResult = undefined
    const currentNum = parseFloat(this.currentNumber)
    const previousNum = parseFloat(this.previousNumber)
    if (isNaN(currentNum) || isNaN(previousNum)) return
    switch(this.operator) {
      case '+':
        calculateResult = previousNum + currentNum
        break
      case '-':
        calculateResult = previousNum - currentNum
        break
      case '*':
        calculateResult = previousNum * currentNum
        break
      case '÷':
        calculateResult = (previousNum / currentNum)
        break
      case '%':
        calculateResult = ((currentNum/100) * previousNum)
        break
       }
    this.currentNumber = calculateResult
    this.operator = undefined;
    this.previousNumber = ""
  }

  // Formats the number with decimals to be displayed.
  displayNumber(num) {
    const numString = num.toString()
    const integerDigits = parseFloat(numString.split('.')[0])
    let decimalDigits = numString.split('.')[1]

    let numDisplay = undefined

    if (isNaN(integerDigits)) {
      numDisplay = ''
    } else {
      numDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }

    if (decimalDigits != null) {
      if (decimalDigits.length >= 40){
        let parsedNumber = parseFloat(integerDigits.toString() + '.' + decimalDigits.toString()).toFixed(10)
        return parsedNumber
      } else {
          return `${numDisplay}.${decimalDigits}`
        }
    } else {
        return numDisplay
    }
  }

  // Updates the display as you use the calculator
  updateDisplay() {
    this.currentNumberTextElement.innerText =
      this.displayNumber(this.currentNumber)
    if (this.operator != null) {
      this.previousNumberTextElement.innerText =
        `${this.displayNumber(this.previousNumber)} ${this.operator}`
    } else {
      this.previousNumberTextElement.innerText = ''
    }
  }

}

// TipCalculator Still under implementation
class TipCalculator extends Calculator {
  constructor(tipResultTextElement){
   super()
   this.tipResultTextElement = tipResultTextElement
  }

  tip(input){
    const num = input
    let tipPeopleNumber = parseFloat(document.getElementById("tip-People").value) || 1
    let tipPercentage = document.getElementById("tip-Input-Percentage").value || 10
    let tip = (((num/100) * tipPercentage).toFixed(2)) / tipPeopleNumber
    this.tipResultTextElement.innerText = this.displayNumber(tip)
  }

  clearTip(){
    document.getElementById('tip-People').value = ''
    document.getElementById('tip-Input').value = ''
    document.getElementById('tip-Input-Percentage').value = ''
    document.getElementById("tip-Result-Cell").innerText = ''
  }
}

// Creates the Calculator
const calculadora = new Calculator(previousNumberTextElement, currentNumberTextElement);
const calculadoraGorjeta = new TipCalculator(tipResultTextElement)

// BUTTONS

// For the multiple buttons with same purpose (add numbers, add operators), it maps each one
// and adds the function
numberButton.forEach(button => {
  button.addEventListener('click', () => {
    calculadora.addNumber(button.innerText)
    calculadora.updateDisplay()
  })
})

operatorButton.forEach(button => {
  button.addEventListener('click', () => {
    calculadora.addOperator(button.innerText)
    calculadora.updateDisplay()
  })
})

// For single buttons, adds the function directly
deleteButton.addEventListener('click', button => {
    calculadora.deleteNumber()
    calculadora.updateDisplay()
})

result.addEventListener('click', button => {
    calculadora.calculate()
    calculadora.updateDisplay()
    calculadora.lastResult = calculadora.currentNumber // stores the last result
})

clear.addEventListener('click', button =>{
  calculadora.clear()
  calculadora.updateDisplay()
})

clearAll.addEventListener('click', button =>{
  calculadora.clearAll()
  calculadora.updateDisplay()
})

memoryStore.addEventListener('click', button =>{
  calculadora.storeNumber()
  calculadora.updateDisplay()
})

memoryRecovery.addEventListener('click', button =>{
  calculadora.recoverNumber()
  calculadora.updateDisplay()
})


// TipCalculator
resultRecovery.addEventListener('click', button =>{
  calculadora.recoverResult()
  calculadora.updateDisplay()
})

tipResult.addEventListener('click', button =>{
  calculadoraGorjeta.tip(document.getElementById("tip-Input").value)
})

tipClear.addEventListener('click', button =>{
  calculadoraGorjeta.clearTip()
})

/*
// Calculation Tests
calculadora.result();
calculadora.addNumber(5)
calculadora.addNumber('.')
calculadora.addOperator('+')
calculadora.addNumber(7)
calculadora.addOperator('+')
calculadora.addNumber(5)
calculadora.storeNumber();
calculadora.result();
console.log(calculadora)

// Recovering from memory and clear test
calculadora.addNumber(7)
calculadora.addOperator('+')
calculadora.recoverNumber();
calculadora.addOperator('+')
calculadora.recoverResult();
console.log(calculadora)
calculadora.result();
console.log(calculadora)
calculadora.clear();
console.log(calculadora)
calculadora.clearAll();
console.log(calculadora)


// Tip calculator test
console.log(calculadoraGorjeta.tip(25.34))
*/
