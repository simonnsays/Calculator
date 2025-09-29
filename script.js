class Calculator {
    constructor() {
        this.operand = {
            value: '',
            element: document.querySelector('#operation')
        } 
        this.currentDisplay = {
            value: '',
            element: document.querySelector('#output')
        }
        this.previousDisplay = {
            value: '',
            element: document.querySelector('#prev')
        }
        this.isDecimal = false
        this.container = document.querySelector('.container')
    }

    init() {
        this.container.addEventListener('click', (e) => {
            if(!e.target.matches('button')) {
                return
            }
            
            const button = e.target.id
            console.log(button)
            switch(button) {
                case '+':
                case '-':
                case 'x':
                case '÷':
                // case 'modulo':
                    this.updateOperation(button)
                    break
                case 'equals': 
                    this.calculate()
                    break
                case 'clear':
                    this.clear()
                    break
                case 'delete':
                    this.delete()
                    break
                case 'decimal':
                    this.makeDecimal()
                    break
                default:
                    this.input(button)
                    break
            }

        })
    }

    updateDisplay() {
        this.currentDisplay.element.innerText = this.currentDisplay.value
        this.previousDisplay.element.innerText = this.previousDisplay.value
        this.operand.element.innerText = this.operand.value
    }
 
    input(number) {
        console.log(typeof number)
        this.currentDisplay.value += number
        this.updateDisplay()    
    }

    makeDecimal() {
        if(this.isDecimal) return
        if(this.currentDisplay.value === '') {
            this.currentDisplay.value = '0.'
        } else {
            this.currentDisplay.value += '.'
        }
        this.isDecimal = true
        this.updateDisplay()
    }

    delete() {
        if(this.currentDisplay.value.at(-1) === '.') {
            this.isDecimal = false
        }

        this.currentDisplay.value = this.currentDisplay.value.slice(0, -1)
        this.updateDisplay()
    }

    clear() {
        this.currentDisplay.value = ''
        this.previousDisplay.value = ''
        this.operand.value = ''
        this.isDecimal = false
        this.updateDisplay()
    }

    updateOperation(operation) {
        if(this.currentDisplay.value === '') return
        this.previousDisplay.value = this.currentDisplay.value
        this.operand.value = operation
        this.currentDisplay.value = ''
        this.isDecimal = false
        this.updateDisplay()
        
        console.log(this.operand)
    }

    calculate() {
        if(this.previousDisplay.value === '' || this.currentDisplay.value === '' || this.operand.value === '') return

        const over = parseFloat(this.previousDisplay.value)
        const under = parseFloat(this.currentDisplay.value)
        const operation = this.operand.value

        let result = this.currentDisplay.value

        if(operation === '+') {
            result = over + under
        }
        if(operation === '-') {
            result = over - under
        }
        if(operation === 'x') {
            result = over * under
        }
        if(operation === '÷') {
            result = over / under
        }

        this.currentDisplay.value = result.toString()
        this.previousDisplay.value = ''
        this.operand.value = ''
        this.isDecimal = false
        this.updateDisplay()
    }
}

const calculator = new Calculator();
calculator.init();