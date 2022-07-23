class FormValidator {
	constructor(config, formElement) {
		this._config = config;
		this._formElement = formElement;
		this._inputList = Array.from(
			this._formElement.querySelectorAll(this._config.inputSelector)
		);
		this._buttonElement = this._formElement.querySelector(
			this._config.submitButtonSelector
		);
	}

	_hideInputError(inputElement) {
		const errorElement = this._formElement.querySelector(
			`#${inputElement.id}-error`
		);
		inputElement.classList.remove(this._config.inputErrorClass);
		errorElement.classList.remove(this._config.errorClassActive);
		errorElement.textContent = "";
	}

	_showInputError(inputElement) {
		const errorElement = this._formElement.querySelector(
			`#${inputElement.id}-error`
		);
		inputElement.classList.add(this._config.inputErrorClass);
		errorElement.classList.add(this._config.errorClassActive);
		errorElement.textContent = inputElement.validationMessage;
	}

	_includeInvalidInput() {
		return this._inputList.some((inputElement) => {
			return !inputElement.validity.valid;
		});
	}

	_checkInputValidity(inputElement) {
		if (inputElement.validity.valid) {
			this._hideInputError(inputElement);
		} else {
			this._showInputError(inputElement);
		}
	}

	_disableButtonElement() {
		this._buttonElement.disabled = true;
	}

	_enableButtonElement() {
		this._buttonElement.disabled = false;
	}

	_setEventListeners() {
		this._inputList.forEach((inputElement) => {
			inputElement.addEventListener("input", () => {
				this._checkInputValidity(inputElement);
				this._toggleButtonState();
			});
		});

		this._toggleButtonState();
	}

	_toggleButtonState() {
		if (this._includeInvalidInput()) {
			this._disableButtonElement();
		} else {
			this._enableButtonElement();
		}
	}

	enableValidation() {
		this._setEventListeners();
	}

	resetValiadtion() {
		this._toggleButtonState();

		this._inputList.forEach((inputElement) => {
			this._hideInputError(inputElement);
		});
	}
}

export { FormValidator };
