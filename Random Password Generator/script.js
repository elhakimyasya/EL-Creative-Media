// Clear the Console every Refresh
console.clear();

// Range Slider Properties
const sliderProps = {
	fill: "#0b1edf",
	background: "rgba(255, 255, 255, 0.214)"
}

// Selecting the range slider container wich will effect the LENGTH property of the password
const slider = document.querySelector(".range-slider");

// Text wich will show the value of the range slider
const sliderValue = document.querySelector(".length-title");

// Using Event Listener to Apply the fill and also change the value of the text
slider.querySelector("input").addEventListener("input", event => {
	sliderValue.setAttribute("data-length", event.target.value);
	applyFill(event.target);
});

// Selecting the range input and passing it in the applyFill function
applyFill(slider.querySelector("input"));

// Create the trailling color and setting the fill
function applyFill(slider) {
	const presentage = 100 * (slider.value - slider.min) / (slider.max - slider.min);
	const bg = `linear-gradient(90deg, ${sliderProps.fill} ${presentage}%, ${sliderProps.background} ${presentage + 0.1}%)`;
	slider.style.background = bg;
	sliderValue.setAttribute("data-length", slider.value);
}

// Object of all the function names that we will use to create random letter of passwords
const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
};

// Random Secure Value
function secureMathRandom() {
	return (window.crypto.getRandomValues(new Uint32Array(1))[0] / (Math.pow(2, 32) - 1));
}

// Generator Functions
function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
	return String.fromCharCode(Math.floor(secureMathRandom() * 10) + 48);
}
function getRandomSymbol() {
	const symbol = '~!@#$%^&*()_+}{|":?><`-=[];/.,';
	return symbol[Math.floor(Math.random() * symbol.length)];
}

// The Box where the result will be shown
const resultEl = document.getElementById("result");

// The input slider, will be used for change the length of password
const lengthEl = document.getElementById("slider");

// Checkboxes representing the option that is responsible to create different type of password
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");

// Button to generate the password
const generateBtn = document.getElementById("generate");

// Button to copy the password
const copyBtn = document.getElementById("copy-btn");

// Result Box container
const resultContainer = document.querySelector(".result");

// Text info showed after generate button is clicked
const copyInfo = document.querySelector(".result-info.right");

// Text appear after copy button is clicked
const copiedInfo = document.querySelector(".result-info.left");

// Update CSS Property of Copy button
let resultContainerBound = {
	left: resultContainer.getBoundingClientRect().left,
	top: resultContainer.getBoundingClientRect().top
};

// Update the position of the copy button based on mouse position
resultContainer.addEventListener("mousemove", e => {
	copyBtn.style.setProperty("--x", `${e.x - resultContainerBound.left}px`);
	copyBtn.style.setProperty("--y", `${e.y - resultContainerBound.top}px`);
});
window.addEventListener("resize", e => {
	resultContainerBound = {
		left: resultContainer.getBoundingClientRect().left,
		top: resultContainer.getBoundingClientRect().top
	};
});

// Copy Password in Clipboard
copyBtn.addEventListener("click", () => {
	const textarea = document.createElement("textarea");
	const password = resultEl.innerText;

	if (!password || password == "CLICK GENERATE") {
		return;
	}

	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand("copy");
	textarea.remove();

	copyInfo.style.transform = "translateY(200%)";
	copyInfo.style.opacity = "0";
	copiedInfo.style.transform = "translateY(0%)";
	copiedInfo.style.opacity = "0.75";
});

// When generate button is clicked, password id will generated 
generateBtn.addEventListener("click", () => {
	const length = +lengthEl.value;
	const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumber = numberEl.checked;
	const hasSymbol = symbolEl.checked;

	resultEl.innerText = generatePassword(length, hasLower, hasUpper, hasNumber, hasSymbol);

	copyInfo.style.transform = "translateY(0%)";
	copyInfo.style.opacity = "0.75";
	copiedInfo.style.transform = "translateY(200%)";
	copiedInfo.style.opacity = "0";
});

// Functions to generate password and returning it
function generatePassword(length, lower, upper, number, symbol) {
	let generatedPassword = "";
	const typesCount = lower + upper + number + symbol;
	const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);

	if (typesCount === 0) {
		return "";
	}

	for (let i = 0; i < length; i++){
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}
	return generatedPassword.slice(0, length);
}