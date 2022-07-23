import { getCardByEvent, popupZoomDesc, popupZoomImg } from "./data.js";
import { openPopupZoom } from "./index.js";

class Card {
	constructor(obj, cardSelector, openCardPopupZoom) {
		this._name = obj.name;
		this._link = obj.link;
		this._alt = obj.alt;
		this._cardSelector = cardSelector;
		this._openCardPopupZoom = openCardPopupZoom;
	}

	_getTemplate() {
		const cardElement = document
			.querySelector(this._cardSelector)
			.content.cloneNode(true)
			.querySelector(".card");

		return cardElement;
	}

	generateCard() {
		this._element = this._getTemplate();
		this._cardTitle = this._element.querySelector(".card__title");
		this._cardImg = this._element.querySelector(".card__image");
		this._likeBtn = this._element.querySelector(".card__like-btn");
		this._removeBtn = this._element.querySelector(".card__remove-btn");
		this._cardTitle.textContent = this._name;
		this._cardImg.src = this._link;
		this._cardImg.alt = this._alt;
		this._setEventListeners();
		return this._element;
	}

	_setEventListeners() {
		this._removeBtn.addEventListener("click", () => {
			this._removeCard();
		});

		this._likeBtn.addEventListener("click", () => {
			this._setCardLike();
		});

		this._cardImg.addEventListener("click", () => {
			this._openCardPopupZoom();
		});
		this._cardImg.addEventListener("click", () => {
			this._openCardPopupZoom(this._name, this._link, this._alt);
		});
	}

	_removeCard() {
		this._element.remove();
		this._element = null;
	}
	_setCardLike() {
		this._likeBtn.classList.toggle("card__like-btn_active");
	}
	// _openCardPopupZoom() {
	// 	popupZoomDesc.textContent = this._name;
	// 	popupZoomImg.src = this._link;
	// 	popupZoomImg.alt = this._alt;
	// 	openPopupZoom();
	// }
}
export { Card };
