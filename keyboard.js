$(document).ready(() => {
    $("button").hover(function(){
        $(this).css("background-color", "white");
        $(this).css("color", "crimson");
    }, function(){
        $(this).css("background-color", "crimson");
        $(this).css("color", "white");
    });

    let map = {}
    onkeydown = onkeyup = (e) => {
        map[e.code] = e.type == 'keydown';
    
        let digitPressed = map['Digit1'] || map['Digit2'] || map['Digit3'] ||
                           map['Digit4'] || map['Digit5'] || map['Digit6'] ||
                           map['Digit7'] || map['Digit8'] || map['Digit9'] ||
                                            map['Digit0'];
    
        if (map['Enter'] || (map['Equal'] && !(map['ShiftLeft'] || map['ShiftRight']))){
            document.querySelector('#eq').setAttribute('style', 'background-color: white; color: crimson;');
            if (!['+', '-', '\u00D7', '\u00F7'].includes(expression[expression.length - 1]) && 
                !(buffer === undefined && expression.length <= 1)){
                    operate();
                    bufferIsPrimed = true;
                    expression = Array();
                    expression.push(buffer);
                    updateMini();
            }                    
        } else if (map['KeyC']){
            document.querySelector('#bC').setAttribute('style', 'background-color: white; color: crimson;');
            expression = Array();
            update('0');
            bufferIsPrimed = false;
        } else if (map['Equal'] && (map['ShiftLeft'] || map['ShiftRight'])){
            document.querySelector('#plus').setAttribute('style', 'background-color: white; color: crimson;');
            if(expression.length % 2 === 0 && expression.length != 0){
                expression[expression.length - 1] = '+';
                updateMini();
            } else if (expression.length % 2 === 1){
                expression.push('+');
                updateMini();
                operate();
            }
        } else if (map['Minus']){
            document.querySelector('#minus').setAttribute('style', 'background-color: white; color: crimson;');
            if(expression.length % 2 === 0 && expression.length != 0){
                expression[expression.length - 1] = '-';
                updateMini();
            } else if (expression.length % 2 === 1){
                expression.push('-');
                updateMini();
                operate();
            }
        } else if (map['KeyX'] || (map['Digit8'] && (map['ShiftLeft'] || map['ShiftRight']))){
            document.querySelector('#times').setAttribute('style', 'background-color: white; color: crimson;');
            if(expression.length % 2 === 0 && expression.length != 0){
                expression[expression.length - 1] = '\u00D7';
                updateMini();
            } else if (expression.length % 2 === 1){
                expression.push('\u00D7');
                updateMini();
                operate();
            }
        } else if (map['Slash']){
            document.querySelector('#divide').setAttribute('style', 'background-color: white; color: crimson;');
            if(expression.length % 2 === 0 && expression.length != 0){
                expression[expression.length - 1] = '\u00F7';
                updateMini();
            } else if (expression.length % 2 === 1){
                expression.push('\u00F7');
                updateMini();
                operate();
            }
        } else if (map['Backspace'] || map['Delete']){
            document.querySelector('#del').setAttribute('style', 'background-color: white; color: crimson;');
            if (expression.length != 0){
                if(bufferIsPrimed && expression.length === 1){
                    expression.pop();
                    update('0');
                    bufferIsPrimed = false;
                } else if (!['+','-','\u00D7','\u00F7'].includes(expression[expression.length - 1])) {
                    expression[expression.length - 1] = expression[expression.length - 1].slice(0,-1);
                    if (expression[expression.length - 1] === ''){
                        expression.pop();
                        if (expression.length === 0){
                            update('0');
                        } else {
                            update(expression[expression.length - 2]);
                        }
                    } else if (!['+','-','\u00D7','\u00F7'].includes(expression[expression.length - 1])){
                        update(expression[expression.length - 1]);
                    }
                }
            }
        } else if (map['Period']){
            document.querySelector('#dot').setAttribute('style', 'background-color: white; color: crimson;');
            if (expression.length % 2 == 0) {
                expression.push('.');
                update(expression[expression.length - 1]);
            } else if (bufferIsPrimed && expression.length === 1){
                expression = Array();
                expression.push('.');
                update(expression[expression.length - 1]);
                bufferIsPrimed = false;
            } else if (!(bufferIsPrimed && expression.length === 1)){
                if (!expression[expression.length - 1].includes('.')){
                    expression[expression.length - 1] += '.';
                    update(expression[expression.length - 1]);    
                }
            } 
        } else if (digitPressed){
            document.querySelector('#b' + e.code[e.code.length - 1]).setAttribute('style', 'background-color: white; color: crimson;');
            if (bufferIsPrimed && expression.length === 1){
                expression = Array();
                expression.push(e.code[e.code.length - 1]);
                update(expression[expression.length - 1]);
                bufferIsPrimed = false;
            } else if (expression.length % 2 == 0){
                expression.push(e.code[e.code.length - 1])
                update(expression[expression.length - 1]);
            } else {
                expression[expression.length - 1] += e.code[e.code.length - 1].toString();
                update(expression[expression.length - 1]);
            }        
        } 
    
        if(!map['Digit1']){
            document.querySelector('#b1').setAttribute('style', 'background-color: crimson; color: white;');
        }
        if(!map['Digit2']){
            document.querySelector('#b2').setAttribute('style', 'background-color: crimson; color: white;');
        }
        if(!map['Digit3']){
            document.querySelector('#b3').setAttribute('style', 'background-color: crimson; color: white;');
        }
        if(!map['Digit4']){
            document.querySelector('#b4').setAttribute('style', 'background-color: crimson; color: white;');
        }
        if(!map['Digit5']){
            document.querySelector('#b5').setAttribute('style', 'background-color: crimson; color: white;');
        }
        if(!map['Digit6']){
            document.querySelector('#b6').setAttribute('style', 'background-color: crimson; color: white;');
        }
        if(!map['Digit7']){
            document.querySelector('#b7').setAttribute('style', 'background-color: crimson; color: white;');
        }
        if(!map['Digit8']){
            document.querySelector('#b8').setAttribute('style', 'background-color: crimson; color: white;');
        }
        if(!map['Digit9']){
            document.querySelector('#b9').setAttribute('style', 'background-color: crimson; color: white;');
        }
        if(!map['Digit0']){
            document.querySelector('#b0').setAttribute('style', 'background-color: crimson; color: white;');
        }
        if(!map['Equal']){
            document.querySelector('#plus').setAttribute('style', 'background-color: crimson; color: white;');
        }
        if(!map['Minus']){
            document.querySelector('#minus').setAttribute('style', 'background-color: crimson; color: white;');
        }
        if(!map['Digit8'] && !map['KeyX']){
            document.querySelector('#times').setAttribute('style', 'background-color: crimson; color: white;');
        }
        if(!map['Slash']){
            document.querySelector('#divide').setAttribute('style', 'background-color: crimson; color: white;');
        }
        if(!map['Period']){
            document.querySelector('#dot').setAttribute('style', 'background-color: crimson; color: white;');
        }
        if(!map['KeyC']){
            document.querySelector('#bC').setAttribute('style', 'background-color: crimson; color: white;');
        }
        if(!map['Backspace'] && !map['Delete']){
            document.querySelector('#del').setAttribute('style', 'background-color: crimson; color: white;');
        }
        if(!map['Enter'] && !map['Equal']){
            document.querySelector('#eq').setAttribute('style', 'background-color: crimson; color: white;');
        }
    }
});
