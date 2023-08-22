let sum, operationValue, num1, num2, op;
const equateBtn = document.querySelector("#calculate");
const calcDisplay = document.querySelector("#calc-display");
const clearBtn = document.querySelector("#clear");
let calculator = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
    calculate(str) {
        if (typeof (str) === typeof ("")) {
            parts = str.replaceAll(/[^0-9\.\-+*\/]/g, "");
            parts.split("");
            return `${parts[1]}` in calculator == true ? calculator[`${parts[1]}`](+parts[0], +parts[2]) : "";
        } else {
            console.log("ERROR: no numbers")
            return "";
        }
    }
}

calcDisplay.addEventListener('input', (e) => {
    operationValue = calcDisplay.value;
   
});

equateBtn.addEventListener('click', () => {
    sum = calculator.calculate(operationValue);
    calcDisplay.value = sum;
});
clearBtn.addEventListener('click', () => {
    calcDisplay.value = "";
})

window.addEventListener('keypress', (e) => {
    console.log(e.key);

    if (e.key == "Enter") {
        sum = calculator.calculate(operationValue);
        console.log(sum);
        calcDisplay.value = sum;
    }
});