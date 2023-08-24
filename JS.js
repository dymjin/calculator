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
        if (typeof (a) == "number" && typeof (b) == "number" && `${op}` in calculator) {
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

// for (let key in calculator) {
//     if (calcDisplay.textContent.split("").includes(key)) {
//         parts = calcDisplay.textContent.split("");
//         op = parts.slice(parts.length - 1);
//         console.log(op);
//         console.log(parts)
//     }
// }

// while (typeof (+calcDisplay.textContent) == "number") {


//     continue;
// }

// for (let key in calculator) {
//     console.log(key)
// }
calculateBtn.addEventListener('click', () => {
    displayValue = calcDisplay.textContent;

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
    btn.blur();
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
        calcDisplay.textContent += e.key;
    }
});