let sum, displayValue, num1 = "", num2 = "", op = null, opList = [];
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
    num1 = ans;
    num2 = "";
    op = null;
    opList = [];
});

clearBtn.addEventListener('click', () => {
    calcDisplay.textContent = "";
    num1 = "";
    num2 = "";
    op = null;
    opList = [];
});

inverseBtn.addEventListener('click', () => {
    if (num1 !== "" && num2 == "") {
        num1 = num1 * -1;
        calcDisplay.textContent = num1 + op + num2
    } else if (num1 !== "" && num2 !== "") {
        num2 = num2 * -1;
        calcDisplay.textContent = num1 + op + num2
    }
})

inputBtns.forEach(btn => btn.addEventListener('click', () => {
    calcDisplay.textContent += btn.textContent;
    if (op == null) {
        num1 += btn.textContent;
    } else if (op !== null) {
        num2 += calcDisplay.textContent.split("").pop();
    }
}));

opBtns.forEach(btn => btn.addEventListener('click', () => {
    if (num1 !== "" && opList < 1 && btn.textContent !== "+/-") {
        op = btn.textContent;
        opList.push(btn.textContent);
        calcDisplay.textContent += btn.textContent;
    } else if (btn.textContent !== "+/-" && num1 !== "" && num2 !== "") {
        console.log('hello')
        ans = calculator.calculate(num1, num2, op);
        calcDisplay.textContent = ans + btn.textContent;
        num1 = `${ans}`;
        num2 = "";
        op = btn.textContent;
        opList.push(btn.textContent)
    } else if (btn.textContent !== "+/-") {
        op = btn.textContent
        calcDisplay.textContent = num1 + op;
        opList = [];
        opList.push(btn.textContent);
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

