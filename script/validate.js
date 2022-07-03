const showInputError = (formElement, inputElement) => {
	const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
	inputElement.classList.add("popup__field_active");
	errorElement.classList.add("popup__field-error_active");
	errorElement.textContent = inputElement.validationMessage;
};

const hideInputError = (formElement, inputElement) => {
	const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
	inputElement.classList.remove("popup__field_active");
	errorElement.classList.remove("popup__field-error_active");
	errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
	if (inputElement.validity.valid) {
		hideInputError(formElement, inputElement);
	} else {
		showInputError(formElement, inputElement);
	}
};
const includeInvalidInput = (inputList) => {
	return inputList.some(inputElement => !inputElement.validity.valid);
};

const toggleButtonState = (buttonElement, inputList) => {
	if (includeInvalidInput(inputList)) {
		buttonElement.disabled = true;
	} else {
		buttonElement.disabled = false;
	}
};

const setEventListeners = (formElement) => {

	const inputList = Array.from(formElement.querySelectorAll(".popup__field"));

	const buttonElement = formElement.querySelector(".popup__submit-btn");

	inputList.forEach((inputElement) => {
		inputElement.addEventListener("input", () => {
			checkInputValidity(formElement, inputElement);
			toggleButtonState(buttonElement, inputList);
		});
	});

	toggleButtonState(buttonElement, inputList);
};

const enableValidation = () => {
	const formList = Array.from(document.querySelectorAll(".popup__form"));

	formList.forEach((formElement) => {
		setEventListeners(formElement);
	});
};
