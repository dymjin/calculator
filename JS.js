let ans, displayValue, num1 = null, num2 = null, op = null, opList = [];
let allowedKeys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "+", "-", "/", "*"];
const calculateBtn = document.querySelector("#calculate");
const calcDisplay = document.querySelector("#calc-display");
const clearBtn = document.querySelector("#clear");
const inputBtns = document.querySelectorAll(".input-button");
const opBtns = document.querySelectorAll(".op-button");
const inverseBtn = document.querySelector("#inverse");

let calculator = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
    calculate(a, b, op) {
        if (a !== null && b !== null && `${op}` in calculator) {
            return `${op}` in calculator == true ? calculator[op](+a, +b) : "";
        } else {
            console.log("ERROR:invalid operation");
            return "";
        }
    }
};

calculateBtn.addEventListener('click', () => {
    if (num1 == null || op == null || num2 == null) {
        num1 = null;
        num2 = null;
        op = null;
        calcDisplay.textContent = "";
        console.log('ERROR:one or more fields are empty');
        return;
    }
    ans = calculator.calculate(num1, num2, op);
    calcDisplay.textContent = ans;
    num1 = ans;
    num2 = null;
    op = null;
    opList = [];
});

clearBtn.addEventListener('click', () => {
    calcDisplay.textContent = "";
    num1 = null;
    num2 = null;
    op = null;
    opList = [];
});

inverseBtn.addEventListener('click', () => {
    if (num1 !== null && num2 == null) {
        num1 = num1 * -1;
        calcDisplay.textContent = num1 + op;
    } else if (num1 !== null && num2 !== null) {
        num2 = num2 * -1;
        calcDisplay.textContent = num1 + op + num2;
    }
})

inputBtns.forEach(btn => btn.addEventListener('click', () => {
    calcDisplay.textContent += btn.textContent;
    if (op == null && num1 == null) {
        num1 = btn.textContent;
    } else if (op == null && num1 !== null) {
        num1 += btn.textContent;
    } else if (op !== null && num2 == null) {
        num2 = btn.textContent;
    } else if (op !== null && num2 !== null) {
        num2 += btn.textContent;
    }
}));

opBtns.forEach(btn => btn.addEventListener('click', () => {
    if (num1 !== null && opList < 1 && btn.textContent !== "+/-") {
        op = btn.textContent;
        opList.push(btn.textContent);
        calcDisplay.textContent += btn.textContent;
    } else if (btn.textContent !== "+/-" && num1 !== null && num2 !== null) {
        ans = calculator.calculate(num1, num2, op);
        calcDisplay.textContent = ans + btn.textContent;
        num1 = `${ans}`;
        num2 = null;
        op = btn.textContent;
        opList.push(btn.textContent)
    } else if (num1 == null && num2 == null) {
        calcDisplay.textContent = "";
        opList = [];
        op = null;
    } else if (btn.textContent !== "+/-") {
        op = btn.textContent
        calcDisplay.textContent = num1 + op;
        opList = [];
        opList.push(btn.textContent);
    }
}));

window.addEventListener('keydown', (e) => {
    if (e.key == "Enter") {
        if (num1 == null || op == null || num2 == null) {
            num1 = null;
            num2 = null;
            op = null;
            calcDisplay.textContent = "";
            console.log('ERROR:one or more fields are empty');
            return;
        }
        ans = calculator.calculate(num1, num2, op);
        calcDisplay.textContent = ans;
        num1 = ans;
        num2 = null;
        op = null;
        opList = [];
    } else if (e.key == "Delete") {
        calcDisplay.textContent = null;
        num1 = null;
        num2 = null;
        op = null;
        opList = [];
    } else if (e.key == "Backspace") {
        if (num1.split("").length > 1) {
            num1Parts.splice(num1.length - 1).join("")
            console.log(num1Parts)
        }
        /*
        if num1 is not 0 or empty string, delete last member of num1, update display
        if num1 is empty string or 0, set display to empty
        */

    } else if (allowedKeys.includes(+e.key) && +e.key !== NaN) {
        calcDisplay.textContent += e.key;
        if (op == null && num1 == null) {
            num1 = e.key;
        } else if (op == null && num1 !== null) {
            num1 += e.key;
        } else if (op !== null && num2 == null) {
            num2 = e.key;
        } else if (op !== null && num2 !== null) {
            num2 += e.key;
        }
    } else if (allowedKeys.includes(e.key)) {
        if (num1 !== null && opList < 1 && e.key !== "+/-") {
            op = e.key;
            opList.push(e.key);
            calcDisplay.textContent += e.key;
        } else if (e.key !== "+/-" && num1 !== null && num2 !== null) {
            ans = calculator.calculate(num1, num2, op);
            calcDisplay.textContent = ans + e.key;
            num1 = `${ans}`;
            num2 = null;
            op = e.key;
            opList.push(e.key)
        } else if (num1 == null && num2 == null) {
            calcDisplay.textContent = "";
            opList = [];
            op = null;
        } else if (e.key !== "+/-") {
            op = e.key
            calcDisplay.textContent = num1 + op;
            opList = [];
            opList.push(e.key);
        }
    }
});