import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._image = this._popup.querySelector(".popup__img");
		this._imageCaption = this._popup.querySelector(".popup__img-desc");
	}
	openPopup(name, link, alt) {
		this._image.src = link;
		this._image.alt = alt;
		this._imageCaption.textContent = name;
		super.openPopup();
	}
}
