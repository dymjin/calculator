let sum, displayValue, num1, num2, op;
let allowedKeys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "+", "-", "/", "*"];
const calculateBtn = document.querySelector("#calculate");
const calcDisplay = document.querySelector("#calc-display");
const clearBtn = document.querySelector("#clear");
const inputBtns = document.querySelectorAll(".input-button");
const calcBtns = document.querySelectorAll(".calc-button");

let calculator = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
    calculate(a, b, op) {
        if (typeof (a) == typeof (0) && typeof (b) == typeof (0) && `${op}` in calculator) {
            return `${op}` in calculator == true ? calculator[op](+a, +b) : "";
        } else {
            console.log("ERROR: Invalid operation");
            return "";
        }
    }
};

/*
 if (user clicks calculate btn) {
    displayValue = calcDisplay;
    take displayValue and split into 3 parts:
        1. first number(any length, can be negative, can be decimal)
        2. operator(+,-,*,/,etc.)
        3. second number(same stuff as first num)
    store calculate(first num, second num, operator) in sum
    update calcDisplay with sum
}
*/

calculateBtn.addEventListener('click', () => {
    displayValue = calcDisplay.textContent;
    console.log(displayValue)
    sum = calculator.calculate(displayValue);
    calcDisplay.textContent = sum;
});
clearBtn.addEventListener('click', () => {
    calcDisplay.textContent = "";
});
inputBtns.forEach(btn => btn.addEventListener('click', () => {
    calcDisplay.textContent += btn.textContent;
}));
calcBtns.forEach(btn => btn.addEventListener('click', () => {
    calcDisplay.textContent += btn.textContent;
}));

window.addEventListener('keypress', (e) => {
    if (e.key == "Enter") {
        displayValue = calcDisplay.textContent;
        sum = calculator.calculate(displayValue);
        calcDisplay.textContent = sum;
    } else if (e.key == "Delete") {
        calcDisplay.textContent = "";
    } else if (e.key == "c") {
        let calcDisplayArr = calcDisplay.textContent.split("");
        if (calcDisplayArr.length < 1) {
            return;
        } else {
            calcDisplayArr.splice(calcDisplayArr.length - 1, 1);
            calcDisplay.textContent = calcDisplayArr.join("");
        }

    } else if (allowedKeys.includes(+e.key) && +e.key !== NaN) {
        calcDisplay.textContent += +(e.key);
    } else if (allowedKeys.includes(e.key)) {
        calcDisplay.textContent += " " + e.key + " ";
    }
});