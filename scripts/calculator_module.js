// NOT IMPLEMENTED!!!!

// add number to the calculator array (as a string, to prevent undesired calculations)
function addNumber(num, obj) {
  if (num === '.' && obj.currentNumber.includes('.')){ // this prevents consecutive decimal points
    return
  }
  obj.currentNumber = obj.currentNumber.toString() + num.toString()
}

// add the previousNumber to memory.
function storeNumber(obj) {
  if (obj.currentNumber === ''){
    return
  }
  obj.memoryNumber = obj.currentNumber.toString()
}

// recover the previousNumber to cu
function recoverNumber(obj){
  if (obj.currentNumber === ""){
    obj.addNumber(obj.memoryNumber)
  } else {
    return
  }
}

// recover the last operation result (from .result() ONLY!)
function recoverResult(obj){
  if (obj.currentNumber === ''){
    obj.addNumber(obj.lastResult)
  } else {
    return
  }
}

function deleteNumber (obj) {
  obj.currentNumber = obj.currentNumber.toString().slice(0, -1)
}

function clear(obj) {
  obj.currentNumber = ''
  obj.previousNumber = ''
  obj.operator = undefined
}

/* Add the operators. IF a previous operator has been applied, it first calculates
the previous operation before adding the new operator. */
const addOperator = (operator, obj) => {

  if (obj.currentNumber === ""){ // This prevents consecutives operators
    return
  } else if (obj.previousNumber !== ""){
    calculate(obj);
    }

  obj.operator = operator
  obj.previousNumber = obj.currentNumber
  obj.currentNumber = ""
}

const calculate = (obj) => {

  let calculateResult = undefined;
  let currentNum = parseFloat(obj.currentNumber)
  let previousNum = parseFloat(obj.previousNumber)

  switch(obj.operator) {
    case '+':
      calculateResult = previousNum + currentNum
      break
    case '-':
      calculateResult = previousNum - currentNum
      break
    case '*':
      calculateResult = previousNum * currentNum
      break
    case '/':
      calculateResult = previousNum / currentNum
      break
   }

  obj.currentNumber = calculateResult
  obj.operator = undefined;
  obj.previousNumber = ""
}

const calculateTip = (num, obj) =>{
  let tipPercentage = undefined || 10
  let tip = ((num/100) * tipPercentage).toFixed(2)
  obj.lastResult = tip
  return tip
}

module.exports = { addNumber, addOperator, deleteNumber, storeNumber, recoverNumber, recoverResult, calculateTip, calculate, clear }
