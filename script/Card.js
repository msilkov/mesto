import { getCardByEvent, popupZoomDesc, popupZoomImg } from "./data.js";
import { openPopupZoom } from "./index.js";

class Card {
	constructor(obj, cardSelector) {
		this._name = obj.name;
		this._link = obj.link;
		this._alt = obj.alt;
		this._cardSelector = cardSelector;
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
		this._setEventListeners();
		const cardTitle = this._element.querySelector(".card__title");
		const cardImg = this._element.querySelector(".card__image");
		cardTitle.textContent = this._name;
		cardImg.src = this._link;
		cardImg.alt = this._alt;
		this._title = cardTitle;
		return this._element;
	}

	_setEventListeners() {
		this._element
			.querySelector(".card__remove-btn")
			.addEventListener("click", (e) => {
				this._removeCard(e);
			});
		this._element
			.querySelector(".card__like-btn")
			.addEventListener("click", (e) => {
				this._setCardLike(e);
			});

		this._element
			.querySelector(".card__image")
			.addEventListener("click", () => {
				this._openCardPopupZoom();
			});
	}

	_removeCard(e) {
		const card = getCardByEvent(e);
		card.remove();
	}
	_setCardLike(e) {
		const likeBtn = e.currentTarget;
		likeBtn.classList.toggle("card__like-btn_active");
	}
	_openCardPopupZoom() {
		popupZoomDesc.textContent = this._name;
		popupZoomImg.src = this._link;
		popupZoomImg.alt = this._alt;
		openPopupZoom();
	}
}
export { Card };
