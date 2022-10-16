class Card {
	constructor(data, cardSelector, handleCardClick, handleDeleteClick) {
		this._name = data.name;
		this._link = data.link;
		this._alt = data.alt;
		if (data.alt === undefined) {
			this._alt = `Изображение: ${data.name}`;
		}

		this._cardSelector = cardSelector;
		this._handleCardClick = handleCardClick;
		this._handleDeleteClick = handleDeleteClick;
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
			this._handleDeleteClick(this);
		});

		this._likeBtn.addEventListener("click", () => {
			this.setCardLike();
		});

		this._cardImg.addEventListener("click", () => {
			this._handleCardClick(this._name, this._link, this._alt);
		});
	}

	removeCard() {
		this._element.remove();
		this._element = null;
	}

	_setCardLike() {
		this._likeBtn.classList.toggle("card__like-btn_active");
	}
}
export { Card };
