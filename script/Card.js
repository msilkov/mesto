class Card {
	constructor(name, link) {
		this._name = name;
		this._link = link;
	}

	createCard() {
		return this._element;
	}
	_deleteCard() {}
	_like() {}
	_openCardPopUpImg() {}
}

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._alt =data.alt;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__avatar').src = this._image;
    this._element.querySelector('.card__paragraph').textContent = this._text;

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.card__text').addEventListener('click', () => {
      this._handleMessageClick();
    });
  }

  _handleMessageClick() {
    this._element.querySelector('.card__text').classList.toggle('card__text_is-active');
  }
}

messageList.forEach((item) => {
  const card = new Card(item, '.card-template_type_default');
  const cardElement = card.generateCard();

  document.body.append(cardElement);
}); 