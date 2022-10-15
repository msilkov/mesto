import "./pages/index.css";
import {
	profileEditBtn,
	profileAddBtn,
	popupEditForm,
	popupAddForm,
	cardsLayout,
	validationConfig,
} from "./script/data.js";
import { initialCards } from "./script/cards.js";
import { Card } from "./script/Card.js";
import { FormValidator } from "./script/FormValidator.js";
import Section from "./script/Section.js";
import PopupWithImage from "./script/PopupWithImage.js";
import PopupWithForm from "./script/PopupWithForm.js";
import UserInfo from "./script/UserInfo.js";
import Api from "./script/Api.js";

const api = new Api({
	baseUrl: "https://mesto.nomoreparties.co/v1/cohort-51",
	headers: {
		authorization: "a86c3d3e-174b-4d9f-bd44-c500fe855ebc",
		"Content-Type": "application/json",
	},
});

api.getInitialCArds().then((data)=>{
	const initialCardsList = new Section(
		{
			items: data,
			renderer: (cardItem) => {
				const card = createCard(cardItem);
				initialCardsList.addItem(card);
			},
		},
		".cards-layout"
	);
	initialCardsList.renderItems();
})

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
		renderCard(formData);
		newCardRenderer.closePopup();
	},
});

newCardRenderer.setEventListeners();

const cardImgZoom = new PopupWithImage(".popup_type_zoom-img");

cardImgZoom.setEventListeners();

const handleCardClick = (name, link, alt) => {
	cardImgZoom.openPopup(name, link, alt);
};

const createCard = (data) => {
	const card = new Card(data, ".card-template", handleCardClick).generateCard();
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
