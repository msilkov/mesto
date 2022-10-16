import "./pages/index.css";
import {
	profileEditBtn,
	profileAddBtn,
	popupEditForm,
	popupAddForm,
	cardsLayout,
	validationConfig,
	baseUrl,
	token,
} from "./script/data.js";
import { Card } from "./script/Card.js";
import { FormValidator } from "./script/FormValidator.js";
import Section from "./script/Section.js";
import PopupWithImage from "./script/PopupWithImage.js";
import PopupWithForm from "./script/PopupWithForm.js";
import UserInfo from "./script/UserInfo.js";
import Api from "./script/Api.js";

const CardsList = new Section(
	{
		renderer: (cardItem) => {
			const card = createCard(cardItem);
			CardsList.addItem(card);
		},
	},
	".cards-layout"
);

const popupEditValidator = new FormValidator(validationConfig, popupEditForm);
popupEditValidator.enableValidation();
const popupAddValidator = new FormValidator(validationConfig, popupAddForm);
popupAddValidator.enableValidation();

const profileInfo = new UserInfo(".profile__name", ".profile__desc");

const profileEditor = new PopupWithForm(".popup_type_edit-profile", {
	handleFormSubmit: (formData) => {
		profileInfo.setUserInfo(formData);
		profileEditor.closePopup();
	},
});

profileEditor.setEventListeners();

const newCardRenderer = new PopupWithForm(".popup_type_add-card", {
	handleFormSubmit: (formData) => {
		api.addCard(formData).then((item) => {
			renderCard(item);
			newCardRenderer.closePopup();
		});
	},
});

newCardRenderer.setEventListeners();

const cardImgZoom = new PopupWithImage(".popup_type_zoom-img");

cardImgZoom.setEventListeners();

const handleCardClick = (name, link, alt) => {
	cardImgZoom.openPopup(name, link, alt);
};

const handleDeleteClick = (card) => {
	console.log(card);
	api.deleteCard(card);
};

const createCard = (data) => {
	const card = new Card(
		data,
		".card-template",
		handleCardClick,
		handleDeleteClick
	).generateCard();
	return card;
};

const renderCard = (data) => {
	cardsLayout.prepend(createCard(data));
};

profileEditBtn.addEventListener("click", () => {
	const profData = profileInfo.getUserInfo();
	profileEditor.setInputValues(profData);
	popupEditValidator.resetValiadtion();
	profileEditor.openPopup();
});

profileAddBtn.addEventListener("click", () => {
	popupAddValidator.resetValiadtion();
	newCardRenderer.openPopup();
});

const api = new Api(baseUrl, token);

api
	.getCards()
	.then((items) => {
		CardsList.setItems(items);
		CardsList.renderItems();
	})
	.catch((err) => {
		console.log(err);
	});
