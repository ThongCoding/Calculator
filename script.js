/* dark-light theme control*/

const theme_toggle_btn = document.querySelector('.theme-toggle-btn');
const calculator = document.querySelector('.calculator');
let isDark = true;
theme_toggle_btn.onclick = () => {
    calculator.classList.toggle('dark-mode');
    theme_toggle_btn.classList.toggle('active');
    isDark = !isDark;
}

/*display operation and result*/
const display_screen = document.querySelector('#display');
const buttons = document.querySelectorAll('button');

buttons.forEach((item) => {
    item.onclick = () => {
        if (item.id == 'clear') {
            display_screen.innerText = '';
        }

        else if(item.id == 'equal'){
            if(display_screen.innerText == ''){
                display_screen.innerText = 'Math ERROR';
                setTimeout( () => (display_screen.innerText = ''), 2000);
            }
            else{
                display_screen.innerText = evaluate(display_screen.innerText);
            }
        }
        else{
            display.innerText += item.id;
        }
    }
})


function evaluate(expression)
    {
        // Values Stack
        let values = [];
  
        // Operators Stack
        let ops = [];

        let tokens = expression.split('');
  
        for (let i = 0; i < tokens.length; i++)
        {
             // Skip whitespace
            if (tokens[i] == ' '){
                continue;
            }
  
            // Current token is a number, push it to stack for numbers
            if (tokens[i] >= '0' && tokens[i] <= '9')
            {
                let sbuf = "";
                  
                // Take care of number over 1 digit: 99 999 9999
                while (i < tokens.length && tokens[i] >= '0' && tokens[i] <= '9'){
                    sbuf = sbuf + tokens[i++];
                }

                // turn the string into a number, then push it into values stack
                values.push(parseInt(sbuf, 10));
                i--;
            }
            
            // else if it is operators
            else if (tokens[i] == '+' || tokens[i] == '-' || tokens[i] == '*' || tokens[i] == '/')
            {       
                // check it with hasPrecedence
                while (ops.length > 0 &&
                         hasPrecedence(tokens[i], ops[ops.length - 1]))
                {
                  values.push(calculateOperator(ops.pop(), values.pop(), values.pop()));
                }
  
                // Push current token to operators stack
                ops.push(tokens[i]);
            }
        }
  
        // Calculate again:
        while (ops.length > 0)
        {
            let b = values.pop();
            let a = values.pop();
            values.push(calculateOperator(ops.pop(), a, b));
        }
  
        return values.pop();
    }

function hasPrecedence(operator, operator_after)
{
    if ((operator == '*' || operator == '/') && (operator_after == '+' || operator_after == '-')){
        return false;
    }
    else{
        return true;
    }
}


function calculateOperator(operator, a, b){
    switch (operator){
    case '+':
        return a + b;
    case '-':
        return a - b;
    case '*':
        return a * b;
    case '/':
        if (b == 0){
            document.write("Cannot divide by zero");
        }
        return parseInt(a / b, 10);
    }
    return 0;
}