const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operator");
const decimalBtn = document.getElementById("decimal");
const clearBtns = document.querySelectorAll(".clear-btn");
const display = document.getElementById("display");

let memoryCurrentNumber = 0;
let memoryNewNumber = false;
let memoryPendingOperation = "";

const numberPress = (numberAsString) => {
	if (memoryNewNumber) {
		display.value = +numberAsString;
		memoryNewNumber = false;
	} else {
		if (display.value === "0") {
			display.value = +numberAsString;
		} else {
			display.value += +numberAsString;
		}
	}
};

const selectAnOperation = (operationValue) => {
	localOperationMemory = parseFloat(display.value);
	if (memoryNewNumber && memoryPendingOperation !== "=") {
		display.value = memoryCurrentNumber;
	} else {
		memoryNewNumber = true;
		switch (memoryPendingOperation) {
			case "+":
				memoryCurrentNumber += localOperationMemory;
				break;
			case "-":
				memoryCurrentNumber -= localOperationMemory;
				break;
			case "/":
				memoryCurrentNumber /= localOperationMemory;
				break;
			case "x":
				memoryCurrentNumber *= localOperationMemory;
				break;
			default:
				memoryCurrentNumber = localOperationMemory;
		}
		display.value = memoryCurrentNumber;
		memoryPendingOperation = operationValue.trim();
	}
};

const clearDisplay = (id) => {
	if (id.trim() === "ce") {
		display.value = "0";
		memoryNewNumber = true;
	} else if (id.trim() === "c") {
		display.value = "0";
		memoryNewNumber = true;
		memoryNewNumber = 0;
		memoryPendingOperation = "";
	}
};

const setDecimalNumber = () => {
	let localDecimalMemory = display.value;

	if (memoryNewNumber) {
		localDecimalMemory = "0.";
		memoryNewNumber = false;
	} else {
		if (localDecimalMemory.indexOf(".") === -1) {
			localDecimalMemory += ".";
		}
	}
	display.value = localDecimalMemory;
};

const calculateMain = () => {
	decimalBtn.addEventListener("click", setDecimalNumber);

	for (let number of numbers) {
		number.addEventListener("click", function (e) {
			numberPress(e.target.textContent);
		});
	}

	for (let i = 0; i < operations.length; i++) {
		let operationBtn = operations[i];
		operationBtn.addEventListener("click", function (e) {
			selectAnOperation(e.target.textContent);
		});
	}
	for (let i = 0; i < clearBtns.length; i++) {
		let clearBtn = clearBtns[i];
		clearBtn.addEventListener("click", function (e) {
			clearDisplay(e.target.textContent);
		});
	}
};

calculateMain();
