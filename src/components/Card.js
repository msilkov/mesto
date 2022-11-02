class Card {
	constructor(
		cardSelector,
		{ data, handleCardClick, handleDeleteClick, handleLikeClick }
	) {
		this._name = data.name;
		this._link = data.link;
		this._alt = data.alt;
		if (data.alt === undefined) {
			this._alt = `Изображение: ${data.name}`;
		}
		this._likes = data.likes;
		this._cardId = data._id;
		this._ownerId = data.owner._id;
		this._userId = data.currentUserId;
		this._cardSelector = cardSelector;
		this._handleCardClick = handleCardClick;
		this._handleDeleteClick = handleDeleteClick;
		this._handleLikeClick = handleLikeClick;
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
		this._likeCounter = this._element.querySelector(".card__like-counter");
		this._removeBtn = this._element.querySelector(".card__remove-btn");
		if (this._ownerId != this._userId) {
			this._removeBtn.remove();
		}
		this._cardTitle.textContent = this._name;
		this._cardImg.src = this._link;
		this._cardImg.alt = this._alt;
		this._showCardLikes();
		this._showLikeStatus();
		this._setEventListeners();
		return this._element;
	}

	_setEventListeners() {
		this._removeBtn.addEventListener("click", () => {
			this._handleDeleteClick();
		});

		this._likeBtn.addEventListener("click", () => {
			this._handleLikeClick();
		});

		this._cardImg.addEventListener("click", () => {
			this._handleCardClick(this._name, this._link, this._alt);
		});
	}

	removeCard() {
		this._element.remove();
		this._element = null;
	}

	_showLikeStatus() {
		if (this.hasLiked()) {
			this._likeBtn.classList.add("card__like-btn_active");
		} else {
			this._likeBtn.classList.remove("card__like-btn_active");
		}
	}
	_showCardLikes() {
		this._likeCounter.textContent = this._likes.length;

		if (this._likes.length > 0) {
			this._likeCounter.classList.add("card__like-counter_active");
		} else {
			this._likeCounter.classList.remove("card__like-counter_active");
		}
	}

	hasLiked() {
		return this._likes.find((item) => item._id === this._userId);
	}
	updateLikeCounter(data) {
		this._likes = data.likes;
		this._showCardLikes();
		this._showLikeStatus();
	}

	getCardId() {
		return this._cardId;
	}
}
export { Card };
