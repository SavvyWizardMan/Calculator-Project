const divCalculator = document.querySelector('.calculator');
const divButtonNumber = document.querySelector('.buttonNumbers');
const divButtonOperators = document.querySelectorAll('.buttonOperators > button');
const decimalButton = document.querySelector('button[value="."]');
const equalButton = document.querySelector('button[value="="]');
const divScreen = document.querySelector('.screen');
const divSpecials = document.querySelector('.specialButtonNumbers');
const spanError = document.querySelector('.error');
const clearBtn = document.querySelector('button[value="AC"]');
const backspaceBtn = document.querySelector('button[value=cmd');
const nightBtn = document.querySelector('.night');

// creates the number buttons
for (let i = 9; i >= 0; i--) {
    let button = document.createElement('button');
    button.value = i;
    button.textContent = i;
    button.classList.add('buttonStyles');
    divButtonNumber.appendChild(button); 

    divButtonNumber.insertBefore(divSpecials, button);
}

const numberList = divButtonNumber.querySelectorAll('button.buttonStyles');

// finds the operator in the divScreen
const findOperator = () => {
    let operator = divScreen.textContent.split('');

    operator.forEach((elem) => {
        switch(elem) {
        case '+':
            operator = "+";
        break;
        case '-':
            operator = "-";
        break;
        case '*':
            operator = "*";
        break;
        case '/':
            operator = "/";
        break;
    }
    });

    return operator;
}

// detects whether there is a decimal in both the first and second operand
const findDecimal = () => {
    let operator = findOperator();
    const num1 = String(divScreen.textContent.split(' ')[0]);
    let num2 = String(divScreen.textContent.split(operator)[1]);

    if (num1.includes(".") || num1 === ".") {
        if ((divScreen.textContent.includes("*") || 
            divScreen.textContent.includes("/") ||
            divScreen.textContent.includes("-") ||
            divScreen.textContent.includes("+")
        )) {
            if (divScreen.textContent.indexOf('-') === 0) {
                num2 = String(divScreen.textContent.split('-')[2]);

                if (num2 === "undefined" || num2 === "") {
                    if (operator === "*" || operator === "/" || operator === "+") {
                        num2 = String(divScreen.textContent.split(operator)[1]);
                    } else {
                        return;
                    }
                }
            }
            
            if (num2.includes(".")) {
                return;
            } else if (num2 === "" || num2 === 'undefined') {
                num2 = "0.";
                divScreen.textContent += num2;
                return;
            } else {
                divScreen.textContent += ".";
            }
        }
    } else if (num1 === "") {
        divScreen.textContent += "0.";
    } else if (num2 === ""){
        divScreen.textContent += ".";
    } else {
        divScreen.textContent += ".";
    }
}

decimalButton.addEventListener('click', () => findDecimal());


equalButton.addEventListener('click', () => {
    //compute the equation
    operate();
});

clearBtn.addEventListener('click', () => {
    divScreen.textContent = "";
});

backspaceBtn.addEventListener('click', () => {
    divScreen.textContent = divScreen.textContent.slice(0, divScreen.textContent.length - 1);
});

// computes the equation given by the user
const operate = () => {
    let output = 0;
    const operator = findOperator();
    let num1 = Number(divScreen.textContent.split(" ")[0]);
    let num2 = divScreen.textContent.split(operator)[1];
    
    if (operator === "+" || operator === "-" || operator === "*" || operator === "/") {
        num1 = Number(divScreen.textContent.split(operator)[0]);
    }

    if (num2 === 'undefined' || num2 === "" || num2 === undefined) {
        return true;
    }

    /* for negative numbers */
    if (!num1) {
        num1 = divScreen.textContent.slice(0, String(num1).length);
        if (num1.indexOf('-') === 0) {
            num1 = Number('-' + divScreen.textContent.split("-")[1]);
            if (divScreen.textContent.split('-')[2] === undefined) return;
              num2 = divScreen.textContent.split("-")[2];
        } else {
            num1 = Number(num1);
            num2 = Number(num2);
        }
    } else {
        num1 = Number(num1);
        num2 = Number(num2);
    }

    const equations = {
        "+": (a,b) => a + b,
        "-": (a,b) => a - b,
        "*": (a,b) => a * b,
        "/": (a,b) => a / b
    };

    if (divScreen.textContent === "" || typeof operator !== 'string' || typeof num2 === "") {
        return;
    }

    if (num2 === 0 && operator === "/") {
        alert("don't do that...");
        divScreen.textContent = "";
        return true;
    }

    output = equations[operator](num1, num2);

    if (output !== Math.floor(output)) {
        output = Math.round(output * 10000) / 10000;
    }

    divScreen.textContent = output;
}

// determines if user's number input is larger than max-safe-integer
const isSafeInteger = () => {
    const o = findOperator();
    let e = Number(divScreen.textContent);
    let e2 = Number(divScreen.textContent.split(o)[1]);

    if (o === '-') {
        if (divScreen.textContent.indexOf(o) === 0) {
            e2 = Number(divScreen.textContent.split(o)[2]);
        }
    }

    if (e > Number.MAX_SAFE_INTEGER || e2 > Number.MAX_SAFE_INTEGER ||
        e < Number.MIN_SAFE_INTEGER || e2 < Number.MIN_SAFE_INTEGER
    ) {
        alert("Do not enter more than the safe integer count");
        return false;
    } else {
        return true;
    }
}

// determines if there are too many decimal numbers
const decimalDigitCount = () => {
    const op = findOperator();
    
    const num1Decimal = String(divScreen.textContent.split('.')[1]);
    const num2Decimal = String(divScreen.textContent.split(op)[1]).split('.')[1];
    
    if (num1Decimal === 'undefined' || num1Decimal === undefined ||
        num1Decimal === ""
    ) {
        return true;
    }

    if (num1Decimal.length >= 10) {
        if (divScreen.textContent.includes(op)) {
            if (num2Decimal === "undefined" || num2Decimal === undefined ||
                num2Decimal === ""
            ) {
                return true;
            } else {
                if (num2Decimal.length >= 10) {
                    alert('Do not enter more than 10 digits after decimal');
                    return false;
                } else {
                    return true;
                }
            }
        }
    } else if (divScreen.textContent.includes(op)) {
            if (num2Decimal === "undefined" || num2Decimal === undefined ||
                num2Decimal === ""
            ) {
                return true;
            } else {
                if (num2Decimal.length >= 10) {
                    alert('Do not enter more than 10 digits after decimal');
                    return false;
                } else {
                    return true;
                }
            }
    } else {
        return true;
    }

    alert('Do not enter more than 10 digits after decimal');
    return false;
}

const hasZeroInFront = () => {
    const operator = findOperator();
    let num1 = String(divScreen.textContent.split(" ")[0]);
    let num2 = String(divScreen.textContent.split(operator)[1]);

    if (operator === "+" || operator === '-' || operator === "*" || operator === "/") {
        num1 = String(divScreen.textContent.split(operator)[0]);
    }

    if (operator === '-') {
        if (divScreen.textContent.indexOf(operator) === 0) {
            num1 = String("-" + divScreen.textContent.split(operator)[1]);
            num2 = String(divScreen.textContent.split(operator)[2]);
        }
    }
 
    if (num1.includes('0')) {
        if (num1.indexOf('0') === 0) {
            if (num1.includes('.')) {
                divScreen.textContent = divScreen.textContent;
            } else if (divScreen.textContent.includes("+") || 
            divScreen.textContent.includes("-") || 
            divScreen.textContent.includes("*") || 
            divScreen.textContent.includes("/")) {
                divScreen.textContent = divScreen.textContent.slice(0, num1.length) + operator + divScreen.textContent.slice(num1.length + 1);
            } else {
                divScreen.textContent = divScreen.textContent.slice(1,2);
            }
        }
    } 
    if (divScreen.textContent.includes(operator)) {
        if (num2.includes('0')) {
            if (num2.indexOf('0') === 0) {
                divScreen.textContent = divScreen.textContent.slice(0, num1.length + 1) + num2.slice(1, 2);
                return;
            }   
            if (num2.includes('.')) {
                divScreen.textContent = divScreen.textContent;
            } else {
                if (divScreen.textContent.indexOf('-') === 0) {
                    divScreen.textContent = divScreen.textContent;
                } else {
                    divScreen.textContent = divScreen.textContent.slice(0, num1.length + 1) + num2.slice(0, num2.length);
                }
            }
        } 
    }
}
    
// implements safeInteger and decimalDigitCount function
numberList.forEach(button => button.addEventListener('click', () => {
    hasZeroInFront();

    if (isSafeInteger()) {
        if (decimalDigitCount()) {
            divScreen.textContent += button.value;
        }
    }
}));

// adds the operator to screen and prevents operate from performing on num2 when undefined
const operateButtons = (op) => {
    const operator = findOperator();
    let num1 = divScreen.textContent.split(" ")[0];

    if (op === "+" || op === "-" || op === "*" || op === "/") {
        num1 = Number(divScreen.textContent.split(operator)[0]);
    }

    if (divScreen.textContent.includes('-')) {
        if (divScreen.textContent.indexOf('-') === 0) {
            if (isNaN(num1) || num1 === "") {
                return;
            }
        }
    }
    
    if (operate() && (isNaN(num1) || num1 === "")) {
        divScreen.textContent = 0 + op;
        return;
    } 

    if (operate()) {
        divScreen.textContent = divScreen.textContent.slice(0, String(num1).length) + op;

        if (divScreen.textContent.indexOf(op) === String(num1).length) {
            divScreen.textContent = divScreen.textContent.slice(0, String(num1).length) + op;
        }
        return;
    }

    operate();
    divScreen.textContent += op;
}

divButtonOperators.forEach(button => {
    button.classList.add('buttonOperatorStyles');

        button.addEventListener('click', () => {
            const op = findOperator();
            let num1 = divScreen.textContent.split(" ")[0];
            let num2 = divScreen.textContent.split(op)[1];
            if (op === "+" || op === "-" || op === "*" || op === "/") {
                num1 = Number(divScreen.textContent.split(op)[0]);
            }

            if (divScreen.textContent.includes('-')) {
                if (divScreen.textContent.indexOf('-') === 0) {
                    if (isNaN(num1) || num1 === "") {
                        return;
                    }
                }
            }

            if (operate() && (isNaN(num1) || num1 === "")) {
                divScreen.textContent = 0 + button.value;
                return;
            } 

            if (operate()) {
                divScreen.textContent = divScreen.textContent.slice(0, String(num1).length + 1) + button.value;

                if (divScreen.textContent.indexOf(op) === String(num1).length) {
                    divScreen.textContent = divScreen.textContent.slice(0, String(num1).length) + button.value;
                }
                return;
            }

            operate();
            divScreen.textContent += button.value;
    });
});

// keyboard support
/* later ill make it so when equating with keys, the sign pressed to 
equate will also appear at the start of the new expression */
document.addEventListener('keydown', (e) => {
    const op = findOperator();
    let num1 = divScreen.textContent.split(" ")[0];
    let num2 = divScreen.textContent.split(op)[1];

    switch (e.code) {
        case "Backspace":
            let str = [];
            str = divScreen.textContent.split('');
            str.pop();
            divScreen.textContent = str.join('');
        break;
        case "Slash":
            operate();
            operateButtons('/');
        break;
        case "Digit8":
            if (e.shiftKey) {
                operate();
                operateButtons('*');
        }
        break;
        case "Equal":
            if (e.shiftKey) {
                operate();
                operateButtons('+');
            }
        break;
        case "Minus":
            operate();
            operateButtons('-');
        break;
        case "Enter":
            e.preventDefault();
            operate();
            divScreen.textContent = divScreen.textContent;
        break;
        case "Period":
            findDecimal();
        break;
    }

    for (let i = 0; i <= 9; i++) {
        if (e.code === `Digit${i}` && e.shiftKey === false && isSafeInteger()) {
            if (decimalDigitCount()) {
                hasZeroInFront();

                divScreen.textContent += i;
            }
        }
    }
});

// toggles night styles
nightBtn.addEventListener('click', () => {
    document.body.classList.toggle('night-mode');
});

/* TO-DO - Abstract:
    Current Implementations (From my testing): 
      - can compute equations now;
      - decimal amount has been controlled 
      - restriction to amount of number/decimal numbers -- X
      - operator buttons perform on the equation
      - message when dividing by zero
      - clear button clearing the entire screen
      - keyboard support (still fixing)
      - can now get proper negative results
      - restriction to how many zeros you can add before numbers
      - no longer will pressing operator buttons when num2 
        equals nothing equate on the expression
      - keyboard support now implemented
    Current Issues:
      - pressing enter even with an equation will give a blank screen
      (most prevalent when using the onscreen buttons then keybinds,
      but not a consistent cause)
    Future Improvements: 
      - reduce redundancy (lots of copy n pasting I did 💀) and also declaring num1 and num2 a million times
      - when using keybinds and second operator is empty, 
      allow users to shuffle operators (though you could just backspace)
      - make numbers not overflow the screen;
*/