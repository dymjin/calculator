let ans, displayValue, num1 = null, num2 = null, op = null, opList = [];
let allowedKeys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ".", "+", "-", "/", "*"];
const calculateBtn = document.querySelector("#calculate");
const calcDisplay = document.querySelector("#calc-display");
const clearBtn = document.querySelector("#clear");
const inputBtns = document.querySelectorAll(".input-button");
const opBtns = document.querySelectorAll(".op-button");
const inverseBtn = document.querySelector("#inverse");
const undoBtn = document.querySelector("#undo");

let roundToDecimals = (num) => {
    decimals = num.slice(num.indexOf(".") + 1);
    while (decimals.slice(decimals.length - 1) == "0") {
        arr = decimals.split("");
        arr.pop();
        decimals = arr.join("");
    }
    if (decimals.length < 8) {
        return (+num).toFixed(decimals.length);
    } else {
        return (+num).toFixed(2) == "0.00" ? 0 : 0;
    }
}

let calculator = {
    "+": (a, b) => (a + b),
    "-": (a, b) => (a - b),
    "*": (a, b) => (a * b),
    "/": (a, b) => (a / b),
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
    ans = ans.toString();
    if (ans.split("").includes(".")) {
        ans = roundToDecimals(ans);
    }
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

undoBtn.addEventListener('click', () => {
    if (typeof (num1) == "number") num1 = num1.toString();
    if (typeof (num2) == "number") num2 = num2.toString();
    if (num2 !== null) {
        if (num2.length == 1) {
            num2 = null;
            calcDisplay.textContent = num1 + op;
        } else if (num2.length == 2 && num2[0] == "-") {
            num2 = null;
            calcDisplay.textContent = num1 + op;
        } else {
            arr = num2.split("");
            arr.pop();
            num2 = arr.join("");
            calcDisplay.textContent = calcDisplay.textContent.substring(0, calcDisplay.textContent.length - 1);
        }
    }
    else if (op !== null) {
        op = null;
        calcDisplay.textContent = num1;
    }
    else if (num1 !== null) {
        if (num1.length == 1) {
            num1 = null;
            calcDisplay.textContent = "";
        } else if (num1.length == 2 && num1[0] == "-") {
            num1 = null;
            calcDisplay.textContent = num1;
        } else {
            arr = num1.split("");
            arr.pop();
            num1 = arr.join("");
            calcDisplay.textContent = calcDisplay.textContent.substring(0, calcDisplay.textContent.length - 1);
        }
    }
})

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
    if (typeof (num1) == "number") num1 = num1.toString();
    if (typeof (num2) == "number") num2 = num2.toString();
    if (btn.textContent !== ".") {
        calcDisplay.textContent += btn.textContent;
        if (num1 == null && btn.textContent !== ".") {
            num1 = btn.textContent;
        } else if (op == null && num1 !== null && btn.textContent !== ".") {
            num1 += btn.textContent;
        } else if (op !== null && num2 == null && btn.textContent !== ".") {
            num2 = btn.textContent;
        } else if (op !== null && num2 !== null && btn.textContent !== ".") {
            num2 += btn.textContent;
        }
    } else if (btn.textContent == ".") {
        if (op !== null && num2 == null) {
            num2 = "0.";
            calcDisplay.textContent += "0.";
        } else if (op !== null && num2 !== null && !num2.split("").includes(".")) {
            num2 += ".";
            calcDisplay.textContent += ".";
        } else if (op == null && num1 == null) {
            num1 = "0.";
            calcDisplay.textContent += "0.";
        } else if (op == null && num1 !== null && !num1.split("").includes(".")) {
            num1 += ".";
            calcDisplay.textContent += ".";
        }
    }
}));

opBtns.forEach(btn => btn.addEventListener('click', () => {
    if (num1 !== null && opList < 1 && btn.textContent !== "+/-") {
        op = btn.textContent;
        opList.push(btn.textContent);
        calcDisplay.textContent += btn.textContent;
    } else if (btn.textContent !== "+/-" && num1 !== null && num2 !== null) {
        ans = calculator.calculate(num1, num2, op);
        ans = ans.toString();
        if (ans.split("").includes(".")) {
            console.log(ans)
            ans = roundToDecimals(ans);
        }
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
        ans = ans.toString();
        if (ans.split("").includes(".")) {
            ans = roundToDecimals(ans);
        }
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
        if (typeof (num1) == "number") {
            num1 = num1.toString();
        }
        if (typeof (num2) == "number") {
            num2 = num2.toString();
        }
        if (num2 !== null) {
            if (num2.length == 1) {
                num2 = null;
                calcDisplay.textContent = num1 + op;
            } else if (num2.length == 2 && num2[0] == "-") {
                num2 = null;
                calcDisplay.textContent = num1 + op;
            } else {
                arr = num2.split("");
                arr.pop();
                num2 = arr.join("");
                calcDisplay.textContent = calcDisplay.textContent.substring(0, calcDisplay.textContent.length - 1);
            }
        }
        else if (op !== null) {
            op = null;
            calcDisplay.textContent = num1;
        }
        else if (num1 !== null) {
            if (num1.length == 1) {
                num1 = null;
                calcDisplay.textContent = "";
            } else if (num1.length == 2 && num1[0] == "-") {
                num1 = null;
                calcDisplay.textContent = num1;
            } else {
                arr = num1.split("");
                arr.pop();
                num1 = arr.join("");
                calcDisplay.textContent = calcDisplay.textContent.substring(0, calcDisplay.textContent.length - 1);
            }
        }
    } else if (allowedKeys.includes(+e.key) && typeof (+e.key) == "number" || e.key == ".") {
        if (typeof (num1) == "number") num1 = num1.toString();
        if (typeof (num2) == "number") num2 = num2.toString();
        if (e.key !== ".") {
            calcDisplay.textContent += e.key;
            if (num1 == null && e.key !== ".") {
                num1 = e.key;
            } else if (op == null && num1 !== null && e.key !== ".") {
                num1 += e.key;
            } else if (op !== null && num2 == null && e.key !== ".") {
                num2 = e.key;
            } else if (op !== null && num2 !== null && e.key !== ".") {
                num2 += e.key;
            }
        } else if (e.key == ".") {
            if (op !== null && num2 == null) {
                num2 = "0.";
                calcDisplay.textContent += "0.";
            } else if (op !== null && num2 !== null && !num2.split("").includes(".")) {
                num2 += ".";
                calcDisplay.textContent += ".";
            } else if (op == null && num1 == null) {
                num1 = "0.";
                calcDisplay.textContent += "0.";
            } else if (op == null && num1 !== null && !num1.split("").includes(".")) {
                num1 += ".";
                calcDisplay.textContent += ".";
            }
        }
    } else if (allowedKeys.includes(e.key)) {
        if (num1 !== null && opList < 1 && e.key !== "+/-") {
            op = e.key;
            opList.push(e.key);
            calcDisplay.textContent += e.key;
        } else if (e.key !== "+/-" && num1 !== null && num2 !== null) {
            ans = calculator.calculate(num1, num2, op);
            ans = ans.toString();
            if (ans.split("").includes(".")) {
                console.log(ans)
                ans = roundToDecimals(ans);
            }
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