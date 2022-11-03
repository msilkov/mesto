import "./index.css";
import {
	profileEditBtn,
	profileAddBtn,
	profileAvatarEditBtn,
	popupEditAvatar,
	popupEditProfileForm,
	popupAddForm,
	cardsLayout,
	validationConfig,
	baseUrl,
	token,
} from "../utils/data.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const popupEditValidator = new FormValidator(
	validationConfig,
	popupEditProfileForm
);
popupEditValidator.enableValidation();

const popupAddValidator = new FormValidator(validationConfig, popupAddForm);
popupAddValidator.enableValidation();

const popupAvatarValidator = new FormValidator(
	validationConfig,
	popupEditAvatar
);
popupAvatarValidator.enableValidation();

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

let currentUserId = 0;

const profileEditor = new PopupWithForm(
	".popup_type_edit-profile",
	"Сохранить",
	{
		handleFormSubmit: (formData) => {
			profileEditor.loadingIndicator(true);
			api
				.setUserInfo(formData)
				.then((data) => {
					profileInfo.setUserInfo(data);
					profileEditor.closePopup();
				})
				.catch((err) => {
					console.log(`Ошибка при изменении данных пользователя: ${err}`);
				})
				.finally(() => {
					profileEditor.loadingIndicator(false);
				});
		},
	}
);

profileEditor.setEventListeners();

const newCardRenderer = new PopupWithForm(".popup_type_add-card", "Создать", {
	handleFormSubmit: (formData) => {
		newCardRenderer.loadingIndicator(true);
		api
			.addCard(formData)
			.then((item) => {
				renderCard(item);
				newCardRenderer.closePopup();
			})
			.catch((err) => {
				console.log(`Ошибка при добавлении новой карточки: ${err}`);
			})
			.finally(() => {
				newCardRenderer.loadingIndicator(false);
			});
	},
});

newCardRenderer.setEventListeners();

const userAvatarEditor = new PopupWithForm(
	".popup_type_edit-avatar",
	"Сохранить",
	{
		handleFormSubmit: (formUrl) => {
			userAvatarEditor.loadingIndicator(true);
			api
				.setAvatar(formUrl)
				.then((data) => {
					profileInfo.setUserAvatar(data);
					userAvatarEditor.closePopup();
				})
				.catch((err) => {
					console.log(`Ошибка при изменении аватара пользователя: ${err}`);
				})
				.finally(() => {
					userAvatarEditor.loadingIndicator(false);
				});
		},
	}
);

userAvatarEditor.setEventListeners();

const cardImgZoom = new PopupWithImage(".popup_type_zoom-img");

cardImgZoom.setEventListeners();

const userConfirmation = new PopupWithConfirmation(
	".popup_type_confirmation",
	"Да",
	{
		handleFormSubmit: () => {},
	}
);

userConfirmation.setEventListeners();

const createCard = (data) => {
	const card = new Card(".card-template", {
		data: { ...data, currentUserId },
		handleCardClick: (name, link, alt) => {
			cardImgZoom.openPopup(name, link, alt);
		},
		handleDeleteClick: () => {
			userConfirmation.openPopup();
			userConfirmation.setSubmitAction(() => {
				userConfirmation.loadingIndicator(true);
				api
					.deleteCard(card.getCardId())
					.then(() => {
						card.removeCard();
						userConfirmation.closePopup();
					})
					.catch((err) => {
						console.log(`Ошибка при удалении карточки: ${err}`);
					})
					.finally(() => {
						userConfirmation.loadingIndicator(false);
					});
			});
		},
		handleLikeClick: () => {
			if (card.hasLiked()) {
				api
					.toggleCardLikeStatus(card.getCardId(), "DELETE")
					.then((data) => {
						card.updateLikeCounter(data);
					})
					.catch((err) => {
						console.log(
							`Ошибка при отображении лайка карточки с сервера: ${err}`
						);
					});
			} else {
				api
					.toggleCardLikeStatus(card.getCardId(), "PUT")
					.then((data) => {
						card.updateLikeCounter(data);
					})
					.catch((err) => {
						console.log(
							`Ошибка при отображении лайка карточки с сервера: ${err}`
						);
					});
			}
		},
	});
	return card.generateCard();
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

profileAvatarEditBtn.addEventListener("click", () => {
	popupAvatarValidator.resetValiadtion();
	userAvatarEditor.openPopup();
});

profileAddBtn.addEventListener("click", () => {
	popupAddValidator.resetValiadtion();
	newCardRenderer.openPopup();
});

const api = new Api({
	baseUrl: baseUrl,
	headers: {
		authorization: token,
		"Content-Type": "application/json",
	},
});

api
	.getCards()
	.then((items) => {
		CardsList.setItems(items.reverse());
		CardsList.renderItems();
	})
	.catch((err) => {
		console.log(`Ошибка при загрузке карточек с сервера: ${err}`);
	});
api
	.getUserInfo()
	.then(({ name, about, avatar, _id }) => {
		currentUserId = _id;
		profileInfo.setUserInfo({ name, about });
		profileInfo.setUserAvatar({ avatar });
	})
	.catch((err) => {
		console.log(`Ошибка при загрузке данных пользователя: ${err}`);
	});