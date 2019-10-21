class calcController{

    constructor(){

        this._operation = [];
        this._lastNumber = false;       
        this._lastOperator = false;
        this._displayEl = document.querySelector("#display");
        this.addDisplay;
        this.initButtonsNumbers();
        this.initButtonsOthers();
        this.initKeyBoard();
        this.initialize();

    }
    
    initialize(){

        this.showDisplay();
    }

    initButtonsOthers(){

        let buttonsOthersEl = document.querySelectorAll(".btn.btn-others");

        buttonsOthersEl.forEach(btn=>{

            this.addEventListenerAll(btn, "click drag", e=>{

                this.execButtonOthers(btn.outerText);

            })

        });

    }

    initButtonsNumbers(){

        let buttonsNumbersEl = document.querySelectorAll('.btn.btn-number');

        buttonsNumbersEl.forEach(btn=>{

            this.addEventListenerAll(btn, 'click drag', e=>{

                this.execButtonNumbers(btn.outerText);

            });

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e=>{

                btn.style.cursor = 'pointer';

            });
        });
    }

    addEventListenerAll(element, events, fn){

        events.split(' ').forEach(event=>{

            element.addEventListener(event, fn, false);

        });

    }

    initKeyBoard(){

        document.addEventListener("keyup", e=>{

            if(isNaN(e.key)){

                if(e.key.toString() == "Backspace"){

                    this.deleteNumber();

                }

            }else{

                this.addOperation(e.key);

            }

        });

    }

    execButtonNumbers(value){

        switch(value){

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(value);
                break;
        }
    }

    execButtonOthers(value){

        switch(value){

            case 'C':
                this.clearDisplay();
                break;
            case 'CE':
                this.clearEntry();
                break;
            case '←':

                this.deleteNumber();

                break;
            case "±":

                if(this._operation.length == 1 && !(isNaN(this.getLastOperation()))){

                    let number = this.getLastOperation();
                    this.convertNumberSignal(number);

                }else if(this._operation.length == 2 && isNaN(this.getLastOperation())){

                    if(!(isNaN(this._operation[0]))){

                        let number = this._operation[0];
                        this.convertNumberSignal(number, false);        //This true and false are parameters to case if the program has to change the last number at the array or add the last number at the array. 

                    }else{

                        this.setError();

                    }

                }else if(this._operation.length == 3 && !(isNaN(this.getLastOperation()))){

                    let number = this.getLastOperation();
                    this.convertNumberSignal(number);

                }else{

                    this.setError();

                }
                break;
            case '%':

                if(this._operation.length == 1){

                    this.setError();

                }else{

                    this.addOperation(value);

                }
                
                break;
            case '+':
            case '-':
                this.addOperation(value);
                break;
            case '÷':
                this.addOperation('/');
                break;
            case 'X':
                this.addOperation('*');
                break;
            case "x²":

                if(this._operation.length == 1 && !(isNaN(this.getLastItem(false)))){       //The code can be improved

                    this._operation.push("*");
                    this._lastNumber = this.getLastItem(false);
                    this.calc();
                    this._lastNumber = this.getLastItem(false);

                }else if(this._operation.length == 2 && (isNaN(this.getLastItem()))){

                    this._lastNumber = this.getLastItem(false);
                    let newValue = this._lastNumber * this._lastNumber;
                    this._operation.push(newValue);
                    this.setLastNumberToDisplay();

                }else if(this._operation.length == 3 && !(isNaN(this.getLastItem(false)))){

                    this._lastNumber = this.getLastItem(false);
                    let newValue = this._lastNumber * this._lastNumber;
                    this.setLastOperation(newValue);
                    this.setLastNumberToDisplay();

                }else{

                    this.setError();

                }

                break;

            case "¹/x":

                if(this._operation[0] == 0 || this._operation.length == 0){
                    
                    this.setError();

                }else if(this.getLastOperation() != 0 && !(this.isOperator(this.getLastOperation()))){

                    let number = parseFloat(this.getLastOperation());
                    let newValue = (1 / number);
                    let newValueString = newValue.toString();
                    this.setLastOperation(newValueString);
                    this.setLastNumberToDisplay();

                }else if(this.isOperator(this.getLastOperation()) && this._operation.length > 1){

                    let number = parseFloat(this.getLastItem(false));
                    let newValue = (1 / number);
                    let newValueString = newValue.toString();
                    this.addOperation(newValueString);

                }else{

                    this.setError();

                }

                break;
            case '=':

                if(this._operation.length == 2 && this._operation[this._operation.length - 1] == "%"){

                    this.clearDisplay();

                }else if(this._operation.length == 3){

                    this.calc();

                }else{

                    if(this._lastNumber != false && this._lastOperator != false && this._operation.length == 1){        //When the user types more one time the equal button

                        if(this._lastNumber < 0 && this._lastOperator == '-'){      //In case the user types, for example, '5' '+' '5' '+-' '=' '='

                            let array = [];
                            let number = this._lastNumber;
                            let newValue = (number * (-1));
                            let newValueString = newValue.toString();                    
                            array.push(this._operation[0]);
                            array.push('+');
                            array.push(newValueString);
                            let result = eval(array.join('')).toString();
                            this._operation = [result];
                            this.setLastNumberToDisplay();

                        }else{

                            this.calc();

                        }

                    }else if(this._operation.length == 2){      //when the user types an operator button and types the equal button

                        if(this._lastNumber == false && this._lastOperator == false){

                            this._lastNumber = this.getLastItem(false);
                            this._lastOperator = this.getLastItem();

                        }

                        this.calc();

                    }else{

                        this.setError();

                    }

                }
                break;
            case "√":

                if(this.getLastItem(false) >= 0){

                    let number = Math.sqrt(this.getLastItem(false));
                    let numberString = number.toString();

                    if(isNaN(this.getLastOperation())){

                        this.addOperation(numberString);

                    }else{

                        this.setLastOperation(numberString);

                    }

                    this.setLastNumberToDisplay();

                }else{

                    this.setError();

                }

                break;
        }

    }

    addOperation(value){

        if(isNaN(this.getLastOperation())){

            if(this.isOperator(value)){

                if(value == '%'){

                    this.setError();

                }else{

                    this.setLastOperation(value);

                }
                

            }else if(isNaN(value)){


            }else{

                this.pushOperation(value);

                this.setLastNumberToDisplay();

            }

        }else{

            if(this.isOperator(value)){

                this.pushOperation(value);

            }else{

                let number = this.getLastOperation();

                if(number == 0){

                    this.setLastOperation(value);        //To avoid that the number has 0 in the front

                }else{

                    let newValue = this.getLastOperation() + value;
                    this.setLastOperation(newValue);

                }

            }
            
            this.setLastNumberToDisplay();

        }

    }

    calc(){

        if(this._operation.length == 1){        //When the user types more one time the equal button

            this._operation.push(this._lastOperator);
            this._operation.push(this._lastNumber);
            let result = eval(this._operation.join("")).toString();
            this._operation = [result];
            this.setLastNumberToDisplay();


        }else if(this._operation.length == 2){  //when the user types an operator button and types the equal button

            this._operation.push(this._lastNumber);
            let result = eval(this._operation.join("")).toString();
            this._operation = [result];
            this.setLastNumberToDisplay();

        }else if(this._operation.length == 3 && this._operation[this._operation.length - 1] != "%"){        //When the user click at the equal signal

            this._lastOperator = this.getLastItem();
            this._lastNumber = this.getLastItem(false);
            
            if(this._lastOperator == '-' && this._lastNumber < 0){

                let number = this._lastNumber;
                this.convertNumberSignal(number);
                this._operation[1] = '+';
                
            }

            let result = eval(this._operation.join("")).toString();
            this._operation = [result];
            this.setLastNumberToDisplay();

        }else{

            if(this._operation[this._operation.length - 1] == "%"){

                if(this._operation[1] == "*"){
    
                    this.processCalcI();
    
                }else{
    
                    this.setError();
    
                }
    
            }else{
    
                if(this._operation[1] != "%"){
    
                    this.processCalcI();
    
                }else{
    
                    this.setError();
    
                }
                
            }    

        }
        
    }

    processCalcI(){

        let lastElement = this._operation.pop();
        this._lastOperator = this.getLastItem();
        let result = eval(this._operation.join("")).toString();

        if(lastElement == "%"){

            result /= 100;
            this._operation = [result];
            this._lastNumber = false;

        }else{

            this._operation = [result, lastElement];
            this._lastNumber = this.getLastItem(false);

        }
        

    }

    convertNumberSignal(value, condition = true){

        let newValue = (value * (-1));
        let newValueString = newValue.toString();
        
        if(condition){

            this.setLastOperation(newValueString);

        }else{

            this.addOperation(newValueString);

        }
        
        this.setLastNumberToDisplay();

    }

    pushOperation(element){

        this._operation.push(element);

        if(this._operation.length > 3){

            this.calc();

        }

    }

    deleteNumber(){

        if(this._operation.length != 0){

            if(!(isNaN(this.getLastOperation())) && this.getLastItem(false) != 0){      //Case that it does not to have a number at last position in the array and if it is not 0

                let number = this.getLastOperation();

                if(number.length > 1){

                    let newValue = number.substring(number.length - 1, 0);
                    this.setLastOperation(newValue);
                    this.setLastNumberToDisplay();

                }else{

                    this.setLastOperation('0');
                    this.setLastNumberToDisplay();

                }

            }

        }

    }

    getLastItem(isOperator = true){     //Checks the this._operator and saves the item that the user wishs(if it's a number, than isOperator is false, but if it's an operator, so isOperator is true)

        let lastItem;

        for(let i = this._operation.length - 1; i >= 0; i--){

            if(this.isOperator(this._operation[i]) == isOperator){

                lastItem = this._operation[i];
                break;

            }

        }

        return lastItem;
    }

    setLastNumberToDisplay(){       //Shows the last number at the this._operator in the display

        let lastNumber;

        if(this._operation.length != 0){

            lastNumber = this.getLastItem(false);
            this.addDisplay = lastNumber;

        }else{

            this.addDisplay = "0";

        }

    }

    getLastOperation(){

        return this._operation[this._operation.length - 1];

    }

    clearDisplay(){

        this._operation = [];
        this._lastOperator = false;
        this._lastNumber = false;
        this.addDisplay = "0";

    }
    
    clearEntry(){

        if(this.isOperator(this._operation[this._operation.length - 1])){

            this.addDisplay = "0";

        }else{

            this._operation.pop();
            this.setLastNumberToDisplay();

        }

        this._lastOperator = false;
        this._lastNumber = false;

    }

    setLastOperation(element){

        this._operation[this._operation.length - 1] = element;

    }

    showDisplay(){

        return this.addDisplay = "0";

    }

    isOperator(element){

        return (['+', '-', '*', '/', '%'].indexOf(element) > -1);

    }

    setError(){

        this.addDisplay = "Error";
        this._operation = [];

    }

    set addDisplay(value){

        this._displayEl.innerHTML = value;

    }

}