let sum, operationValue, num1, num2, op;
const calculateBtn = document.querySelector(".calculate");
const operationInput = document.querySelector("#operation-input");

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

operationInput.addEventListener('input', () => {
    operationValue = operationInput.value;
});
calculateBtn.addEventListener('click', () => {
    sum = calculator.calculate(operationValue);
    operationInput.value = sum;
});

window.addEventListener('keypress', (e) => {
    console.log(e.key);
    if (e.key == "Enter") {
        sum = calculator.calculate(operationValue);
        console.log(sum);
        operationInput.value = sum;
    }
});