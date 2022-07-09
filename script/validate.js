const showInputError = (formElement, inputElement, config) => {
	const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
	inputElement.classList.add(config.inputErrorClass);
	errorElement.classList.add(config.errorClassActive);
	errorElement.textContent = inputElement.validationMessage;
};

const hideInputError = (formElement, inputElement, config) => {
	const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
	inputElement.classList.remove(config.inputErrorClass);
	errorElement.classList.remove(config.errorClassActive);
	errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, config) => {
	if (inputElement.validity.valid) {
		hideInputError(formElement, inputElement, config);
	} else {
		showInputError(formElement, inputElement, config);
	}
};
const includeInvalidInput = (inputList) => {
	return inputList.some((inputElement) => !inputElement.validity.valid);
};

const disableButtonElement = (buttonElement) => {
	buttonElement.disabled = true;
};

const enableButtonElement = (buttonElement) => {
	buttonElement.disabled = false;
};

const toggleButtonState = (buttonElement, inputList) => {
	if (includeInvalidInput(inputList)) {
		disableButtonElement(buttonElement);
	} else {
		enableButtonElement(buttonElement);
	}
};

const setEventListeners = (formElement, config) => {
	const inputList = Array.from(
		formElement.querySelectorAll(config.inputSelector)
	);

	const buttonElement = formElement.querySelector(config.submitButtonSelector);

	inputList.forEach((inputElement) => {
		inputElement.addEventListener("input", () => {
			checkInputValidity(formElement, inputElement, config);
			toggleButtonState(buttonElement, inputList);
		});
	});

	toggleButtonState(buttonElement, inputList);
};

const enableValidation = (config) => {
	const formList = Array.from(document.querySelectorAll(config.formSelector));

	formList.forEach((formElement) => {
		setEventListeners(formElement, config);
	});
};
