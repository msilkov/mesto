export default class Popup {
	constructor(popupSelector) {
		this._popup = document.querySelector(popupSelector);
		this._closeBtn = this._popup.querySelector(".popup__close-btn");
		this._popupContainer = this._popup.querySelector(".popup__container");
		this._handleEscClose = this._handleEscClose.bind(this);
	}

	openPopup() {
		this._popup.classList.add("popup_opened");
		document.addEventListener("keydown", this._handleEscClose);
	}

	closePopup() {
		this._popup.classList.remove("popup_opened");
		document.removeEventListener("keydown", this._handleEscClose);
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
		this._popup.addEventListener(
			"mousedown",
			this._handleOverlayClose.bind(this)
		);
		this._closeBtn.addEventListener("click", this.closePopup.bind(this));
	}
}
