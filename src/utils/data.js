const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__desc");
const profileAddBtn = document.querySelector(".profile__add-btn");

const profileAvatarEditBtn = document.querySelector(".profile__avatar-btn");
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");

const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupEditProfileForm = popupEditProfile.querySelector(".popup__form");
const popupEditProfileName = popupEditProfile.querySelector(
	".popup__input_type_name"
);
const popupEditProfileProfession = popupEditProfile.querySelector(
	".popup__input_type_profession"
);
const popupEditProfileSubmitBtn =
	popupEditProfile.querySelector(".popup__submit-btn");
const popupEditProfileInputList = Array.from(
	popupEditProfile.querySelectorAll(".popup__input")
);

const popupAdd = document.querySelector(".popup_type_add-card");
const popupAddForm = popupAdd.querySelector(".popup__form");
const popupAddImgTitle = popupAddForm.querySelector(
	".popup__input_type_img-title"
);
const popupAddImgLink = popupAddForm.querySelector(
	".popup__input_type_img-link"
);
const popupAddSubmitBtn = popupAdd.querySelector(".popup__submit-btn");
const popupAddInputList = Array.from(
	popupAdd.querySelectorAll(".popup__input")
);

const popupZoom = document.querySelector(".popup_type_zoom-img");
const popupZoomImg = popupZoom.querySelector(".popup__img");
const popupZoomDesc = popupZoom.querySelector(".popup__img-desc");

const cardsLayout = document.querySelector(".cards-layout");
const cardTemplate = document.querySelector(".card-template");

const popups = document.querySelectorAll(".popup");
const closeButtons = document.querySelectorAll(".popup__close-btn");
const getCardByEvent = (e) => e.currentTarget.closest(".card");

const validationConfig = {
	formSelector: ".popup__form",
	inputSelector: ".popup__input",
	submitButtonSelector: ".popup__submit-btn",
	inactiveButtonClass: "popup__button_disabled",
	inputErrorClass: "popup__input_type_error",
	errorClass: "popup__input-error",
	errorClassActive: "popup__input-error_active",
};

const baseUrl = "https://mesto.nomoreparties.co/v1/cohort-52";
const token = "e0e4f5fc-61ac-48ee-ab02-f5c2e770cefc";

export {
	profileEditBtn,
	profileName,
	profileDescription,
	profileAddBtn,
	profileAvatarEditBtn,
	popupEditAvatar,
	popupEditProfile,
	popupEditProfileForm,
	popupEditProfileName,
	popupEditProfileProfession,
	popupEditProfileSubmitBtn,
	popupEditProfileInputList,
	popupAdd,
	popupAddForm,
	popupAddImgTitle,
	popupAddImgLink,
	popupAddSubmitBtn,
	popupAddInputList,
	popupZoom,
	popupZoomImg,
	popupZoomDesc,
	cardsLayout,
	cardTemplate,
	popups,
	closeButtons,
	getCardByEvent,
	validationConfig,
	baseUrl,
	token,
};
