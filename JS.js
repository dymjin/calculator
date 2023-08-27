let sum, displayValue, num1 = "", num2 = "", op = null, opList = [];
let allowedKeys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "+", "-", "/", "*"];
const calculateBtn = document.querySelector("#calculate");
const calcDisplay = document.querySelector("#calc-display");
const clearBtn = document.querySelector("#clear");
const inputBtns = document.querySelectorAll(".input-button");
const opBtns = document.querySelectorAll(".op-button");

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

calculateBtn.addEventListener('click', () => {
    if (num1 == "" || op == null || num2 == "" || num1 == "-" || num2 == "-") {
        num1 = "";
        num2 = "";
        op = null;
        calcDisplay.textContent = "";
        console.log('ERROR:one or more fields are empty');
    }
    sum = calculator.calculate(num1, num2, op);
    calcDisplay.textContent = sum;
    ans = `${sum}`
    num1 = "";
    num2 = "";
    op = null;
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

opBtns.forEach(btn => btn.addEventListener('click', () => {

    calcDisplay.textContent += btn.textContent;
    opList = calcDisplay.textContent
        .replaceAll(/[^-+*\/]/g, "")
        .split("");
   
    if (btn.textContent == "-" && num1 == "") {
        num1 += "-";
    } else if (opList.length > 1 && num1 !== "" && num2 !== "") {
        sum = calculator.calculate(num1, num2, op);
        ans = `${sum}`;
        if (ans.split("").includes("-")) {
            ans.split("").unshift("-");
        }
        calcDisplay.textContent = sum + btn.textContent;
        num1 = ans;
        num2 = "";
        op = btn.textContent;
    } else if (opList.length > 1 && num2 == "") {
        calcDisplay.textContent = num1 + op + num2;
    } else if (typeof (+num1) == "number") {
        op = calcDisplay.textContent.slice(num1.length)[0];
    }

}));

window.addEventListener('keypress', (e) => {
    if (e.key == "Enter") {
        if (num1 == "" || op == null || num2 == "" || num1 == "-" || num2 == "-") {
            num1 = "";
            num2 = "";
            op = null;
            calcDisplay.textContent = "";
            console.log('ERROR:one or more fields are empty');
        }
        sum = calculator.calculate(num1, num2, op);
        calcDisplay.textContent = sum;
        ans = `${sum}`
        num1 = "";
        num2 = "";
        op = null;
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
        calcDisplay.textContent += e.key;
        if (op == null) {
            num1 += e.key;
        } else if (op !== null) {
            num2 += calcDisplay.textContent.split("").pop();
        }
    } else if (allowedKeys.includes(e.key)) {
        calcDisplay.textContent += e.key;
        if (e.key == "-" && num1 == "") {
            num1 += "-";
        } else if (opList.length > 1 && num1 !== "" && num2 !== "") {
            sum = calculator.calculate(num1, num2, op);
            ans = `${sum}`;
            if (ans.split("").includes("-")) {
                ans.split("").unshift("-");
            }
            calcDisplay.textContent = sum + e.key;
            num1 = ans;
            num2 = "";
            op = e.key;
        } else if (opList.length > 1 && num2 == "") {
            calcDisplay.textContent = num1 + op + num2;
        } else if (typeof (+num1) == "number") {
            op = calcDisplay.textContent.slice(num1.length)[0];
        }
    }
});

