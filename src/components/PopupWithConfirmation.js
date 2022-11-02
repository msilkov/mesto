import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
	constructor(popupSelector, defaultSubmitText, { handleFormSubmit }) {
		super(popupSelector);
		this._handleFormSubmit = handleFormSubmit;
		this._form = this._popup.querySelector(".popup__form");
		this._submitBtn = this._popup.querySelector(".popup__submit-btn");
		this._defaultSubmitText = defaultSubmitText;
		this._submitBtn.textContent = this._defaultSubmitText;
	}

	setEventListeners() {
		this._form.addEventListener("submit", (e) => {
			e.preventDefault();
			this._handleFormSubmit(this._submitAction());
		});
		super.setEventListeners();
	}
	openPopup() {
		super.openPopup();
	}
	setSubmitAction(action) {
		this._submitAction = action;
	}
	loadingIndicator(isFetching) {
		this._submitBtn.textContent = isFetching
			? "Удаление..."
			: this._defaultSubmitText;
	}
}
