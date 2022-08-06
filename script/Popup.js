export default class Popup {
	constructor(popupSelector) {
		this._popup = document.querySelector(popupSelector);
		this._closeBtn = this._popup.querySelector(".popup__close-btn");
		this._popupContainer = this._popup.querySelector(".popup__container");
	}
	openPopup() {
		this._popup.classList.add("popup_opened");
		this.setEventListeners();
	}
	closePopup() {
		this._popup.classList.remove("popup_opened");
		this.removeEventListeners();
	}
	_handleEscClose(e) {
		if (e.key === "Escape") {
			this.closePopup();
		}
	}
	_handleOverlayClose(e) {
		if (e.target == this._popup || e.target == this._popupContainer) {
			this.closePopup();
		}
	}
	setEventListeners() {
		this._popup.addEventListener("click", this._handleOverlayClose.bind(this));
		this._closeBtn.addEventListener("click", this.closePopup.bind(this));
		document.addEventListener("keydown", this._handleEscClose.bind(this));
	}
	removeEventListeners() {
		this._popup.removeEventListener("click", this._handleOverlayClose.bind(this));
		this._closeBtn.removeEventListener("click", this.closePopup.bind(this));
		document.removeEventListener("keydown", this._handleEscClose.bind(this));
	}
}
