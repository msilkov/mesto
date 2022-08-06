import {
	profileEditBtn,
	profileName,
	profileDescription,
	profileAddBtn,
	popupEdit,
	popupEditForm,
	popupEditName,
	popupEditProfession,
	popupAdd,
	popupAddForm,
	popupAddImgTitle,
	popupAddImgLink,
	popupZoom,
	popupZoomImg,
	popupZoomDesc,
	cardsLayout,
	popups,
	closeButtons,
	validationConfig,
} from "./data.js";
import { initialCards } from "./cards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

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

const newCardRenderer = new PopupWithForm(".popup_type_add-card", {
	handleFormSubmit: (formData) => {
		renderCard(formData);
		newCardRenderer.closePopup();
	},
});

const cardImgZoom = new PopupWithImage(".popup_type_zoom-img");

const handleCardClick = (name, link, alt) => {
	cardImgZoom.openPopup(name, link, alt);
};

const createCard = (obj) => {
	const card = new Card(obj, ".card-template", handleCardClick).generateCard();
	return card;
};

const renderCard = (obj) => {
	cardsLayout.prepend(createCard(obj));
};

const initialCardsList = new Section(
	{
		data: initialCards,
		renderer: (cardItem) => {
			const card = new Card(cardItem, ".card-template", handleCardClick);
			const cardElement = card.generateCard();
			initialCardsList.addItem(cardElement);
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
