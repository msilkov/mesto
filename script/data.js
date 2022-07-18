const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__desc");
const profileAddBtn = document.querySelector(".profile__add-btn");

const popupEdit = document.querySelector(".popup_type_edit-profile");
const popupEditForm = popupEdit.querySelector(".popup__form");
const popupEditName = popupEdit.querySelector(".popup__input_type_name");
const popupEditProfession = popupEdit.querySelector(
	".popup__input_type_profession"
);
const popupEditSubmitBtn = popupEdit.querySelector(".popup__submit-btn");
const popupEditInputList = Array.from(
	popupEdit.querySelectorAll(".popup__input")
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

export {
	profileEditBtn,
	profileName,
	profileProfession,
	profileAddBtn,
	popupEdit,
	popupEditForm,
	popupEditName,
	popupEditProfession,
	popupEditSubmitBtn,
	popupEditInputList,
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
};
