import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
	constructor(popupSelector, { handleFormSubmit }) {
		super(popupSelector);
		this._handleFormSubmit = handleFormSubmit;
		this._form = this._popup.querySelector(".popup__form");
		this._submitBtn = this._popup.querySelector(".popup__submit-btn");
	}

	setEventListeners() {
		this._form.addEventListener("submit", (e) => {
			e.preventDefault();
			this._handleFormSubmit(this.setAction());
		});
		super.setEventListeners();
	}
	openPopup() {
		super.openPopup();
	}
	setAction(action) {
		this._handleFormSubmit = action;
	}
}
