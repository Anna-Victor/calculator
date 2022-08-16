
class Calculator {
    constructor(previousValue, currentValue) {
        this.previousValue = previousValue;
        this.currentValue = currentValue;
        this.clear();
    }
    clear() {
        this.current = '';
        this.previous = '';
        this.operator = '';
    }

    delete() {
        this.current = this.current.slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.current.includes('.')) return
        this.current += number;
    } 

    addOperator(operator) {
        if (this.current === '') return
        if (this.previous !== '') {
            this.evaluate();
        }
        this.operator = operator;
        this.previous = this.current;
        this.current = '';
    }

    evaluate() {
        let answer;
        const prev = parseFloat(this.previous);
        const curr = parseFloat(this.current);
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operator) {
            case '+' :
                answer = prev + curr;
                break;
            case '-' :
                answer = prev - curr
                break;
            case 'x' :
                answer = prev * curr
                break; 
            case '÷' :
                if (curr !== 0) {
                answer = prev / curr
                } else {
                    if (curr === 0) {
                         answer = undefined;
                    }
                }
                break; 
            case '^' :
                answer = prev ** curr
                break; 
            default :
                return         
        }
        this.current = answer;
        this.operator = '';
        this.previous = '';
    }

    updateDisplay() {
        this.currentValue.innerText = this.current;
        if (this.operator !== null) {
            this.previousValue.innerText = `${this.previous} ${this.operator}`;
        }
    }
}



const numberOperations = document.querySelectorAll(".butt");
//console.log(numberOperations);
const equalsTo = document.querySelector(".btn-equals");
//console.log(equalsTo);
const deleted = document.querySelector(".btn-delete");
//console.log(deleted);
const clearAll = document.querySelector(".btn-clear");
//console.log(clearAll);
const signOperators = document.querySelectorAll(".operator");
//console.log(signOperators);
const previousValue = document.querySelector(".previousValue");
//console.log(previousValue);
const currentValue = document.querySelector(".displayedValue");
//console.log(currentValue);

const calculator = new Calculator(previousValue, currentValue);

numberOperations.forEach(number => {
    number.addEventListener('click', () => {
        //const fired_button = number.value;
        //alert(fired_button);
        calculator.appendNumber(number.innerText);
        calculator.updateDisplay();
    })
})

signOperators.forEach(number => {
    number.addEventListener('click', () => {
        calculator.addOperator(number.innerText);
        calculator.updateDisplay();
    })
})

equalsTo.addEventListener('click', () => {
   calculator.evaluate();
   calculator.updateDisplay();
})

clearAll.addEventListener('click',() => {
    calculator.clear();
    calculator.updateDisplay();
})

deleted.addEventListener('click',() => {
    calculator.delete();
    calculator.updateDisplay();
})
