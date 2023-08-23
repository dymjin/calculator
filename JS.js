let sum, operationValue, num1, num2, op;
const equateBtn = document.querySelector("#calculate");
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
            console.log("ERROR: Invalid operation")
            return "";
        }
    }
}


equateBtn.addEventListener('click', () => {
    sum = calculator.calculate(operationValue);
    calcDisplay.textContent = sum;
});
clearBtn.addEventListener('click', () => {
    calcDisplay.textContent = "";
})
inputBtns.forEach(btn => btn.addEventListener('click', () => {
    calcDisplay.textContent += btn.textContent;
}))
calcBtns.forEach(btn => btn.addEventListener('click', () => {
    calcDisplay.textContent += btn.textContent;
}))

window.addEventListener('keypress', (e) => {
    if (e.key == "Enter") {
        sum = calculator.calculate();
        calcDisplay.textContent = sum;
    }
});