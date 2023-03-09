class Calculator {

    constructor() {
        this.calculator = document.querySelector('[data-js-calculator]');
        this.inputCalculator = this.calculator.querySelectorAll('td');
        this.display = this.calculator.querySelector('.display');
        this.endCompute = false;

        this.init();
    }

    //Initial processing
    init = () => {
        for(let i = 0; i < this.inputCalculator.length; i++) {
            let inputCalculator = this.inputCalculator[i].dataset.jsInput; //Each input

            switch(inputCalculator) {
                case '=':
                    this.inputCalculator[i].addEventListener("click", this.calculate);
                    break;
                case 'clear':
                    this.inputCalculator[i].addEventListener("click", this.clear);
                    break;
                case 'return':
                    this.inputCalculator[i].addEventListener("click", this.clearOne);
                    break;
                default:
                    this.inputCalculator[i].addEventListener("click", this.input);
            }
        }
    }

    //Displays the result of the computation
    calculate = () => {
        let equation = this.display.innerHTML.replaceAll('&nbsp;','').replaceAll('÷', '/').replaceAll('×', '*').replaceAll(',','.'),
            result = Function(`return ${equation}`)();
        
        this.display.innerHTML = '&nbsp;' + result.toString().replace('.', ',');
        this.endCompute = true; //End of one equation
    }

    //Displays the user input
    input = (e) => {
        let uInput = e.target.innerHTML; //Current input
        
        //Prevents signs to be input twice in a row
        if((uInput == '÷' || uInput == '×' || uInput == '+' || uInput == '-') && isNaN(this.display.innerHTML.slice(-1)) && this.display.innerHTML.slice(-1) != ')')
            return;

        //Verifies that the closing bracket comes with an opening bracket
        if(uInput == ')' && !this.display.innerHTML.includes('('))
            return;

        if(this.endCompute) { //New equation process
            this.endCompute = false;

            switch(uInput) {
                case '÷': case '×': case '+': case '-': //If the user wants to calculate with the previous result
                    this.display.innerHTML += uInput;
                    break;
                case ',':
                    this.display.innerHTML = '&nbsp;' + 0 + uInput; //If the user only inputs the comma
                    break;
                default:
                    this.display.innerHTML = '&nbsp;' + uInput; //Displays the input
            }
        } else { //Equation still in progress
            switch(true) {
                case (uInput == ',' && isNaN(this.display.innerHTML.slice(-1))): 
                    this.display.innerHTML += 0 + uInput; //Adds a 0 in front of comma if there is no number before
                    break;
                case (uInput == '(' && (!isNaN(this.display.innerHTML.slice(-1)) || this.display.innerHTML.slice(-1) == ')')):
                    this.display.innerHTML += '×' + uInput; //Adds a 'x' in front of opening round bracket
                    break;
                default:
                    this.display.innerHTML += uInput; //Adds the input to the equation
            }   
        }
    }

    //Clears the display
    clear = () => {
        this.display.innerHTML = '&nbsp;';
    }

    //Clears the previous character
    clearOne = () => {
        if(this.endCompute || this.display.innerHTML == '') //Doesn't allow to do a return on a result or after the display is empty
            return;
        else 
            this.display.innerHTML = this.display.innerHTML.substring(0, this.display.innerHTML.length-1);
    }
}