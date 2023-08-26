let sum, displayValue, num1 = "", num2 = "", op = null, opList = [];
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
        if (typeof (+a) == "number" && typeof (+b) == "number" && `${op}` in calculator) {
            return `${op}` in calculator == true ? calculator[op](+a, +b) : "";
        } else {
            console.log("ERROR:invalid operation");
            return "";
        }
    }
};
/*
 if (user clicks calculate btn) {
    displayValue = calcDisplay;
    store calculate(first num, second num, operator) in sum
    update calcDisplay with sum
}

while (user inputs first num) {
    if (user input is any operator(+/-*)) {
        split displayValue and slice off end value,
        store sliced off value as operator
        store rest of nums.join("") as first num
        if (second num == undefined) {
            continue
        } else if (typeof(+second num) == typeof(0)) {
            calculator.calculate(first num, second num, operator)
            first num = null;
            second num = nul;
            operator = null;
        }
    }
}

*/
calculateBtn.addEventListener('click', () => {
    sum = calculator.calculate(num1, num2, op);
    calcDisplay.textContent = sum;
    num1 = `${sum}`;
    num2 = "";
    op = null;
    if (num1 == "" || op == null || num2 == "") {
        num1 = "";
        num2 = "";
        op = null;
        calcDisplay.textContent = "";
        console.log('ERROR:one or more fields are empty');
    }
});

clearBtn.addEventListener('click', () => {
    calcDisplay.textContent = "";
    num1 = "";
    num2 = "";
    op = null;
});

inputBtns.forEach(btn => btn.addEventListener('click', () => {
    calcDisplay.textContent += btn.textContent;
    if (op == null) {
        num1 += btn.textContent;
    } else if (op !== null) {
        num2 += calcDisplay.textContent.split("").pop();
    }
}));

calcBtns.forEach(btn => btn.addEventListener('click', () => {
    calcDisplay.textContent += btn.textContent;
    opList = calcDisplay.textContent
        .replaceAll(/[^-+*\/]/g, "")
        .split("");
    if (opList.length > 1) {
        calcDisplay.textContent = calculator.calculate(num1, num2, op) + btn.textContent;
        num1 = calcDisplay.textContent.replaceAll(/[^0-9]/g, "");
        num2 = "";
        op = btn.textContent;
    } else if (typeof (+num1) == "number") {
        op = calcDisplay.textContent.slice(num1.length)[0];
    }

}));

window.addEventListener('keypress', (e) => {
    if (e.key == "Enter") {
        displayValue = calcDisplay.textContent;
        sum = calculator.calculate(displayValue);
        calcDisplay.textContent = sum;
    } else if (e.key == "Delete") {
        calcDisplay.textContent = "";
        num1 = "";
        num2 = "";
        op = null;
    } else if (e.key == "c") {
        let calcDisplayArr = calcDisplay.textContent.split("");
        if (calcDisplayArr.length < 1) {
            return;
        } else if (num2 !== "") {
            calcDisplayArr.splice(calcDisplayArr.length - 1, 1);
            calcDisplay.textContent = calcDisplayArr.join("");
        }
    } else if (allowedKeys.includes(+e.key) && +e.key !== NaN) {
        calcDisplay.textContent += +(e.key);
        num1 += e.key;
    } else if (allowedKeys.includes(e.key)) {
        calcDisplay.textContent += e.key;
        if (num1 == "") {
            console.log('hwelo');
        }
    }
});