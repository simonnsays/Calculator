class Calculator {
    constructor() {
        this.operand = {
            value: '',
            element: document.querySelector('#operation')
        } 
        this.currentDisplay = {
            value: 0,
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
            switch(button) {
                case '+':
                case '-':
                case 'x':
                case '÷':
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
                case 'swapSign':
                    this.swapSign()
                    break
                case 'sqrt':
                    this.squareRoot()
                    break
                default:
                    this.input(button)
                    break
            }
        })

        window.addEventListener('keyup', (e) => {
            const key = e.key
            console.log(key)
            if(Number.isInteger(parseFloat(key))) {
                this.input(parseFloat(key))
                return
            }

            switch(key) {
                case '+':
                case '-':
                    this.updateOperation(key)
                    break
                case '*':
                    this.updateOperation('x')
                    break
                case '/':
                    this.updateOperation('÷')
                    break
                case 'Enter':
                    this.calculate()
                    break
                case 'Backspace':
                    this.delete()
                case '.':
                    this.makeDecimal()
            }
        })
    }

    updateDisplay() {
        this.currentDisplay.element.innerText =this.currentDisplay.value
        
        this.previousDisplay.element.innerText = this.previousDisplay.value
        this.operand.element.innerText = this.operand.value
    }
 
    input(number) {
        if(this.currentDisplay.value.length >= 9) {
            window.alert("Maximum input length reached")
            return
        }

        if(this.currentDisplay.value === 0)  {
            this.currentDisplay.value = ''
        }

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
        this.currentDisplay.value = 0
        this.previousDisplay.value = ''
        this.operand.value = ''
        this.isDecimal = false
        this.updateDisplay()
    }

    updateOperation(operation) {
        if(this.currentDisplay.value === '') return

        if(this.previousDisplay.value !== '') {
            this.calculate()
        }

        this.previousDisplay.value =  this.currentDisplay.value
        this.operand.value = operation
        this.currentDisplay.value = ''
        this.isDecimal = false
        this.updateDisplay()
        
        console.log(this.operand)
    }

    swapSign() {
        console.log(this.currentDisplay.value)
        if(this.currentDisplay.value === '') return
        this.currentDisplay.value = (parseFloat(this.currentDisplay.value) * -1).toString()
        this.updateDisplay()
    }

    squareRoot() {
        const val = parseFloat(this.currentDisplay.value);
        if (isNaN(val)) return;
        if (val < 0) {
            window.alert("Cannot take square root of a negative number");
            return;
        }
        const result = Math.sqrt(val);
        this.currentDisplay.value = result.toFixed(7).replace(/\.?0+$/, ''); // trim trailing zeros
        this.updateDisplay();
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

        if (typeof result === "number" && !Number.isInteger(result)) {
            result = parseFloat(result.toFixed(7));
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

