import "./pages/index.css";
import {
	profileEditBtn,
	profileAddBtn,
	profileAvatar,
	popupEditProfileForm,
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
import PopupWithConfirmation from "./script/PopupWithConfirmation.js";
import UserInfo from "./script/UserInfo.js";
import Api from "./script/Api.js";

const popupEditValidator = new FormValidator(
	validationConfig,
	popupEditProfileForm
);
popupEditValidator.enableValidation();
const popupAddValidator = new FormValidator(validationConfig, popupAddForm);
popupAddValidator.enableValidation();

const CardsList = new Section(
	{
		renderer: (cardItem) => {
			const card = createCard(cardItem);
			CardsList.addItem(card);
		},
	},
	".cards-layout"
);

const profileInfo = new UserInfo(
	".profile__name",
	".profile__desc",
	".profile__avatar"
);

const profileEditor = new PopupWithForm(".popup_type_edit-profile", {
	handleFormSubmit: (formData) => {
		api.setUserInfo(formData).then((data) => {
			profileInfo.setUserInfo(data);
		});
		profileEditor.closePopup();
		console.log("data set");
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

const userAvatarEditor = new PopupWithForm(".popup_type_edit-avatar", {
	handleFormSubmit: (formData) => {
		profileInfo.setUserInfo(formData);
	},
});
userAvatarEditor.setEventListeners();

const cardImgZoom = new PopupWithImage(".popup_type_zoom-img");

cardImgZoom.setEventListeners();

const userConfirmation = new PopupWithConfirmation(".popup_type_confirmation", {
	handleFormSubmit: () => {
		// вызываю удаление с сервера при сабмите формы
		// api.deleteCard(card);
	},
});

userConfirmation.setEventListeners();

const handleCardClick = (name, link, alt) => {
	cardImgZoom.openPopup(name, link, alt);
};

const handleDeleteClick = (card) => {
	userConfirmation.openPopup();
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

profileAvatar.addEventListener('click',()=>{
	const profData = profileInfo.getUserInfo();
	userAvatarEditor.setInputValues(profData);
	popupEditValidator.resetValiadtion();
	userAvatarEditor.openPopup();
})

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
api.getUserInfo().then(({ name, about, avatar }) => {
	profileInfo.setUserInfo({ name, about });
	profileInfo.setUserAvatar({ avatar });
});
