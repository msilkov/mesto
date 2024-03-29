import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
	constructor(popupSelector, defaultSubmitText, { handleFormSubmit }) {
		super(popupSelector);
		this.handleFormSubmit = handleFormSubmit;
		this._form = this._popup.querySelector(".popup__form");
		this._submitBtn = this._popup.querySelector(".popup__submit-btn");
		this._defaultSubmitText = defaultSubmitText;
		this._submitBtn.textContent = this._defaultSubmitText;
		this._inputList = this._popup.querySelectorAll(".popup__input");
		this._formValues = {};
	}
	_getInputValues() {
		this._inputList.forEach((input) => {
			this._formValues[input.name] = input.value;
		});

		return this._formValues;
	}
	setEventListeners() {
		//  add submit handler добавлять обработчик сабмита формы.
		this._form.addEventListener("submit", (e) => {
			e.preventDefault();
			this.handleFormSubmit(this._getInputValues());
		});
		super.setEventListeners();
	}
	setInputValues(data) {
		this._inputList.forEach((input) => {
			input.value = data[input.name];
		});
	}
	closePopup() {
		//close popup and reset form
		super.closePopup();
		this._form.reset();
	}
	loadingIndicator(isFetching) {
		this._submitBtn.textContent = isFetching
			? "Сохранение..."
			: this._defaultSubmitText;
	}
}
