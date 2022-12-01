class Calculator {
  // below lets us set where to place display text for calculator
  constructor (firstDigitsTextElement, secondDigitsTextElement) {
    // below lets us set text elements in class
    this.firstDigitsTextElement = firstDigitsTextElement
    this.secondDigitsTextElement = secondDigitsTextElement
    this.clear() // clears all inputs and sets to default value
    
  }

  clear() {
    this.secondDigits = '' // empty strings
    this.firstDigits = ''
    this.operation = undefined // no operation selected of we clear
  }

  delete() {
   this.secondDigits = this.secondDigits.toString().slice(0, -1) //chops off last number by taking all characters inside secondDigits string and taking out the last number
  }

  appendNumber(number) {
    if (number === '.' && this.secondDigits.includes('.')) return //stops period/dot from being eentered more than once, while numbers can append.
    this.secondDigits = this.secondDigits.toString() + number.toString()
  }

  choosekOperation(operation) {
    if (this.secondDigits === '') return // this stops us from using +-*/ when we have no value on the bottom to operate on
    if (this.firstDigits !== ''){
      this.compute()
    }
    //below allows us to have second digits (bottom) clear out and move to the top when you +-*/
    this.operation = operation
    this.firstDigits = this.secondDigits
    this.secondDigits = '' 
  }

  compute() {
    let computation
    const first = parseFloat(this.firstDigits) // converting string to number
    const second = parseFloat(this.secondDigits)
    if (isNaN(first) || isNaN(second)) return // if we don't have a value on the bottom or top, cancels function with return.
    switch (this.operation) { // switch is like multiple if statements on a single object
      case "+":
        computation = first + second //when operation is, first and sedonf will be added 
        break // makes swithc not follow any other case statement and leave this switch statement
      case '-':
        computation = first - second
        break
      case 'x':
        computation = first * second
        break
      case '÷':
          computation = first / second
          break
      default: 
        return
        // like an else statement. If none of the symbals match operation, the equation is invalid and so the default is return which will not compute
    }
    this.secondDigits = computation // now second digit (top) will be result of the computation! 
    this.operation = undefined 
    this.firstDigits = ''

  }

  
  updateDisplay () {
    this.secondDigitsTextElement.innerText = this.secondDigits
    this.firstDigitsTextElement.innerText = this.firstDigits
    if (this.operation != null){
      this.firstDigitsTextElement.innerText = 
      `${this.firstDigits} ${this.operation}`

    }

  }
}
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const clearButton = document.querySelector('[data-clear]')
const deleteButton = document.querySelector('[data-delete]')
const firstDigitsTextElement = document.querySelector('[data-first-digits]')
const secondDigitsTextElement = document.querySelector('[data-second-digits]')

const calculator = new Calculator(firstDigitsTextElement, secondDigitsTextElement)

numberButtons.forEach(button => {  // to loop over all the different buttons
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay() // display updates after evry number is clicked
  })
})

operationButtons.forEach(button => { 
  button.addEventListener('click', () => {
    calculator.choosekOperation(button.innerText)
    calculator.updateDisplay() 
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

clearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})

