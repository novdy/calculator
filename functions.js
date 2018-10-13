let expression = Array();
let decimalPlaces = 10;
let buffer;
let bufferIsPrimed = false;
let equalsPressed = false;

function update(number){
    if(number === '.'){
        number = '0.';
    }
    let disp = document.getElementById('display');
    disp.removeChild(disp.firstChild);
    let res = document.createTextNode(number);
    disp.appendChild(res);
    updateMini();
}

function updateMini(){
    let dispmini = document.getElementById('display-mini');
    if(dispmini.firstChild){
        dispmini.removeChild(dispmini.firstChild);
        let resmini = "";
        for (let i = 0; i < expression.length; i++){
            numString = expression[i];
            if (i != 0){
                if (i % 2 === 0 && numString.includes('.') && numString[numString.length - 1] != '.'){
                    console.log(i + ': ' + expression[i] + ': ' + expression[i]);
                    expression[i] = (Math.round(+numString * 10**decimalPlaces) / 10**decimalPlaces).toString();
                } 
            }
            if (numString === '.'){
                expression[i] = '0.';
            }                  
            resmini += expression[i];
        }
        
        if (resmini.length > 0){
            dispmini.appendChild(document.createTextNode(resmini));
        } else {
            dispmini.appendChild(document.createTextNode('0'));
        }
    } else {
        dispmini.appendChild(document.createTextNode('0'));
    }
}

function bufferIsPrimedRelativeIndexOfOperator(index){
    if(expression[expression.length + index] === '+'){
        buffer += +expression[expression.length + index + 1];
    } else if(expression[expression.length + index] === '-'){
        buffer -= +expression[expression.length + index + 1];
    } else if(expression[expression.length + index] === '\u00D7'){
        buffer *= +expression[expression.length + index + 1];
    } else if(expression[expression.length + index] === '\u00F7'){
        buffer /= +expression[expression.length + index + 1];
    }
    buffer = Math.round(buffer * 10**decimalPlaces) / 10**decimalPlaces
    update(buffer);
}

function bufferIsNotPrimedRelativeIndexOfOperator(index){
    if(expression[expression.length + index] === '+'){
        buffer = +expression[expression.length + index - 1] + +expression[expression.length + index + 1];
    } else if(expression[expression.length + index] === '-'){
        buffer = +expression[expression.length + index - 1] - +expression[expression.length + index + 1];
    } else if(expression[expression.length + index] === '\u00D7'){
        buffer = +expression[expression.length + index - 1] * +expression[expression.length + index + 1];
    } else if(expression[expression.length + index] === '\u00F7'){
        buffer = +expression[expression.length + index - 1] / +expression[expression.length + index + 1];
    }
    buffer = Math.round(buffer * 10**decimalPlaces) / 10**decimalPlaces
    update(buffer);
}

function operate(){
    if (expression.length == 3){
        if (bufferIsPrimed){
            bufferIsPrimedRelativeIndexOfOperator(-2);
        } else {
            bufferIsNotPrimedRelativeIndexOfOperator(-2);
        }
    } else if (expression.length == 4){
        if (bufferIsPrimed){
            bufferIsPrimedRelativeIndexOfOperator(-3);
        } else {
            bufferIsNotPrimedRelativeIndexOfOperator(-3);
        }
    } else if (!['+', '-', '\u00D7', '\u00F7'].includes(expression[expression.length - 1])) {
        bufferIsPrimedRelativeIndexOfOperator(-2);
    } else if (expression.length > 4) {
        bufferIsPrimedRelativeIndexOfOperator(-3);
    } 
}