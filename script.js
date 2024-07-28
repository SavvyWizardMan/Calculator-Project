const divCalculator = document.querySelector('.calculator');
const divButtonNumber = document.querySelector('.buttonNumbers');
const divButtonOperators = document.querySelectorAll('.buttonOperators > button');
const decimalButton = document.querySelector('button[value="."]');
const equalButton = document.querySelector('button[value="="]');
const divScreen = document.querySelector('.screen');
const divSpecials = document.querySelector('.specialButtonNumbers');
const spanError = document.querySelector('.error');
const clearBtn = document.querySelector('button[value="cmd"]');

for (let i = 9; i >= 0; i--) {
    let button = document.createElement('button');
    button.value = i;
    button.textContent = i;
    button.classList.add('buttonStyles');
    divButtonNumber.appendChild(button); 

    divButtonNumber.insertBefore(divSpecials, button);
}

const numberList = divButtonNumber.querySelectorAll('button.buttonStyles');

divButtonOperators.forEach(button => {
    button.classList.add('buttonOperatorStyles');

    button.addEventListener('click', () => {
        const o = operate();

        if (button.value === "/" && o) {
            divScreen.textContent = divScreen.textContent;
            return;
        } else if (o) {
            divScreen.textContent = 0 + button.value;
            return;
        }

        o;
        divScreen.textContent += button.value;
    });
});

// will need to change
decimalButton.addEventListener('click', () => {
    const operator = findOperator();
    const num1 = String(divScreen.textContent.split(operator)[0]);
    const num2 = String(divScreen.textContent.split(operator)[1]);
    
    if (num1.includes(".")) {
        if (divScreen.textContent.includes(operator)) {
            if (num2 === 'undefined') {
                return;
            }
            if (num2.includes(".")) {
                return;
            } else {
                divScreen.textContent += decimalButton.value;
            }
        }
    } else if (num2.includes(".")) {
        return;
    } else {
        divScreen.textContent += decimalButton.value;
    }
});

equalButton.addEventListener('click', () => {
    //compute the equation
    operate();
});

clearBtn.addEventListener('click', () => {
    divScreen.textContent = "";
});

const operate = () => {
    let output = 0;
    const operator = findOperator();
    let num1 = Number(divScreen.textContent.split(operator)[0]);
    const num2 = Number(divScreen.textContent.split(operator)[1]);

    const equations = {
        "+": (a,b) => a + b,
        "-": (a,b) => a - b,
        "*": (a,b) => a * b,
        "/": (a,b) => a / b
    }

    if (divScreen.textContent === "" || typeof operator !== 'string' || typeof num2 === "") {
        return;
    }

    if (num2 === 0 && operator === "/") {
        alert("don't do that...");
        return true;
    }

    output = equations[operator](num1, num2);

    if (output !== Math.floor(output)) {
        output = Math.round(output * 100) / 100;
    }

    divScreen.textContent = output;
}

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

const isSafeInteger = () => {
    const o = findOperator();
    const e = Number(divScreen.textContent);
    const e2 = Number(divScreen.textContent.split(o)[1]);

    if (e > Number.MAX_SAFE_INTEGER || e2 > Number.MAX_SAFE_INTEGER) {
        alert("Do not enter more than the safe integer count");
        return false;
    } else {
        return true;
    }
}

numberList.forEach(button => {
    button.addEventListener('click', () => {
        const addTo = isSafeInteger();

        if (addTo) {
            divScreen.textContent += button.value;
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.code === "Backspace") {
        let str = [];
        str = divScreen.textContent.split('');
        str.pop();
        divScreen.textContent = str.join('');
    } else if (e.code === "Slash") {
        operate();
        divScreen.textContent += "/";
    } else if (e.shiftKey && e.code === "Digit8") {
        operate();
        divScreen.textContent += "*";
    } else if (e.shiftKey && e.code === "Equal") {
        operate();
        divScreen.textContent += "+";
    } else if (e.code === "Minus") {
        operate();
        divScreen.textContent += "-";
    }else if (e.code === "Enter") {
        operate();
    } else if (e.code === "Period") {
        // const operator = findOperator();
        // const num1 = divScreen.textContent.split(operator)[0];
        // let num2 = divScreen.textContent.split(operator)[1];

        // if (num2 === undefined) {
        //     return;
        // }

        // if (num1.includes(".") && num2.includes(".")) {
        //     return;
        // }

        divScreen.textContent += ".";
    }

    const addTo = isSafeInteger();

    for (let i = 0; i <= 9; i++) {
        if (e.code === `Digit${i}` && e.shiftKey === false && addTo) {
            divScreen.textContent += i;
        }
    }
});

/* TO-DO - Abstract:
    Current Implementations: 
      - can compute equations now;
    Pending:
      - adding control to decimal button
*/