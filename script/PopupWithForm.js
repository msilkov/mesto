import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
	constructor(popupSelector, { handleFormSubmit }) {
		super(popupSelector);
		this.handleFormSubmit = handleFormSubmit;
		this._form = this._popup.querySelector(".popup__form");
		this._submitBtn = this._popup.querySelector(".popup__submit-btn");
	}
	_getInputValues() {
		// get values from all form inputs
		this._inputList = this._popup.querySelectorAll(".popup__input");

		this._formValues = {};

		this._inputList.forEach(input => {
			this._formValues[input.name] = input.value;
		});
		console.log(this._formValues);
		return this._formValues;
	}
	setEventListeners() {
		//  add submit handler добавлять обработчик сабмита формы.
		super.setEventListeners();
		this._form.addEventListener("submit", (e) => {
			e.preventDefault();
			console.log(this._getInputValues());
			this.handleFormSubmit(this._getInputValues());
			this._form.reset();
		});
	}
	closePopup() {
		//close popup and reset form
		super.closePopup();
		this._form.reset();
	}
}
