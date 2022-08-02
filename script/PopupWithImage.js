import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
	}
	openPopup(name, link, alt) {
		this._image = this._popup.querySelector(".popup__img");
		this._imageCaption = this._popup.querySelector(".popup__img-desc");
		this._image.scr = link;
		this._image.alt = alt;
		this._imageCaption.textContent = name;
		super.openPopup();
	}
}
