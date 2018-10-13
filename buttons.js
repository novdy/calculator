let btns = document.querySelectorAll('button');
btns.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (btn.id === 'eq'){
            if (!['+', '-', '\u00D7', '\u00F7'].includes(expression[expression.length - 1]) && 
                !(buffer === undefined && expression.length <= 1)){
                    operate();
                    bufferIsPrimed = true;
                    expression = Array();
                    expression.push(buffer);
                    updateMini();
            }                    
        } else if (btn.id === 'bC'){
            expression = Array();
            update('0');
            bufferIsPrimed = false;
        } else if (btn.id === 'plus'){
            if(expression.length % 2 === 0 && expression.length != 0){
                expression[expression.length - 1] = '+';
                updateMini();
            } else if (expression.length % 2 === 1){
                expression.push('+');
                updateMini();
                operate();
            }
        } else if (btn.id === 'minus'){
            if(expression.length % 2 === 0 && expression.length != 0){
                expression[expression.length - 1] = '-';
                updateMini();
            } else if (expression.length % 2 === 1){
                expression.push('-');
                updateMini();
                operate();
            }
        } else if (btn.id === 'times'){
            if(expression.length % 2 === 0 && expression.length != 0){
                expression[expression.length - 1] = '\u00D7';
                updateMini();
            } else if (expression.length % 2 === 1){
                expression.push('\u00D7');
                updateMini();
                operate();
            }
        } else if (btn.id === 'divide'){
            if(expression.length % 2 === 0 && expression.length != 0){
                expression[expression.length - 1] = '\u00F7';
                updateMini();
            } else if (expression.length % 2 === 1){
                expression.push('\u00F7');
                updateMini();
                operate();
            }
        } else if (btn.id === 'del'){
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
        } else if (bufferIsPrimed && expression.length === 1){
            expression = Array();
            expression.push(btn.textContent);
            update(expression[expression.length - 1]);
            bufferIsPrimed = false;
        } else if (btn.id === 'dot'){
            if (expression.length % 2 == 0) {
                expression.push('.');
                update(expression[expression.length - 1]);
            } else if (!(bufferIsPrimed && expression.length === 1)){
                if (!expression[expression.length - 1].includes('.')){
                    expression[expression.length - 1] += '.';
                    update(expression[expression.length - 1]);    
                }
            } 
        } else if (expression.length % 2 == 0){
            expression.push(btn.textContent)
            update(expression[expression.length - 1]);
        } else {
            expression[expression.length - 1] += btn.textContent.toString();
            update(expression[expression.length - 1]);
        }
    })
})