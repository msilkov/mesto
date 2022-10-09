import "./pages/index.css";
import {
	profileEditBtn,
	profileAddBtn,
	popupEditForm,
	popupEditName,
	popupEditProfession,
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

const initialCardsList = new Section(
	{
		items: initialCards,
		renderer: (cardItem) => {
			const card = createCard(cardItem);
			initialCardsList.addItem(card);
		},
	},
	".cards-layout"
);

initialCardsList.renderItems();

profileEditBtn.addEventListener("click", () => {
	const profData = profileInfo.getUserInfo();
	popupEditName.value = profData.name;
	popupEditProfession.value = profData.description;
	popupEditValidator.resetValiadtion();
	profileEditor.openPopup();
});

profileAddBtn.addEventListener("click", () => {
	popupAddValidator.resetValiadtion();
	newCardRenderer.openPopup();
});
