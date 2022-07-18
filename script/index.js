import {
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
} from "./data.js";
import { initialCards } from "./cards.js";

const createCard = (obj) => {
	const card = cardTemplate.content.cloneNode(true).querySelector(".card");
	const cardTitle = card.querySelector(".card__title");
	const cardImg = card.querySelector(".card__image");
	cardTitle.textContent = obj.name;
	cardImg.src = obj.link;
	cardImg.alt = obj.alt;
	card.querySelector(".card__remove-btn").addEventListener("click", (e) => {
		const card = getCardByEvent(e);
		card.remove();
	});
	card.querySelector(".card__like-btn").addEventListener("click", (e) => {
		const likeBtn = e.currentTarget;
		likeBtn.classList.toggle("card__like-btn_active");
	});
	cardImg.addEventListener("click", () => {
		popupZoomDesc.textContent = obj.name;
		popupZoomImg.src = obj.link;
		popupZoomImg.alt = obj.alt;
		openPopupZoom();
	});

	return card;
};

const addCard = (obj) => {
	const card = createCard(obj);
	cardsLayout.prepend(card);
};

initialCards.forEach(addCard);

popups.forEach((popup) => {
	const popupContainer = popup.querySelector(".popup__container");
	popup.addEventListener("click", (e) => {
		if (e.target == popup || e.target == popupContainer) {
			closePopup(popup);
		}
	});
});

closeButtons.forEach((button) => {
	const closestPopup = button.closest(".popup");
	button.addEventListener("click", () => {
		closePopup(closestPopup);
	});
});

const closeByEsc = function (e) {
	if (e.key === "Escape") {
		const closestPopup = document.querySelector(".popup_opened");
		closePopup(closestPopup);
	}
};

const openPopup = (popup) => {
	popup.classList.add("popup_opened");
	document.addEventListener("keydown", closeByEsc);
};
const closePopup = (popup) => {
	document.removeEventListener("keydown", closeByEsc);
	popup.classList.remove("popup_opened");
};

const openPopupEdit = (e) => {
	e.preventDefault();
	setProfileData();
	toggleButtonState(popupEditSubmitBtn, popupEditInputList);
	openPopup(popupEdit);
};

const openPopupAdd = (e) => {
	e.preventDefault();
	toggleButtonState(popupAddSubmitBtn, popupAddInputList);
	openPopup(popupAdd);
};

const openPopupZoom = () => {
	openPopup(popupZoom);
};

const setProfileData = () => {
	popupEditName.value = profileName.textContent;
	popupEditProfession.value = profileProfession.textContent;
};

const handleSubmitProfileEdit = (e) => {
	e.preventDefault();
	profileName.textContent = popupEditName.value;
	profileProfession.textContent = popupEditProfession.value;
	closePopup(popupEdit);
};

const handleSubmitCardAdd = (e) => {
	e.preventDefault();
	const card = { name: "", link: "", alt: "" };
	card.name = popupAddImgTitle.value;
	card.link = popupAddImgLink.value;
	card.alt = popupAddImgTitle.value;
	addCard(card);
	closePopup(popupAdd);
	popupAddForm.reset();
};

profileEditBtn.addEventListener("click", openPopupEdit);
popupEditForm.addEventListener("submit", handleSubmitProfileEdit);
profileAddBtn.addEventListener("click", openPopupAdd);
popupAddForm.addEventListener("submit", handleSubmitCardAdd);

const validationConfig = {
	formSelector: ".popup__form",
	inputSelector: ".popup__input",
	submitButtonSelector: ".popup__submit-btn",
	inactiveButtonClass: "popup__button_disabled",
	inputErrorClass: "popup__input_type_error",
	errorClass: "popup__input-error",
	errorClassActive: "popup__input-error_active",
};

import { enableValidation, toggleButtonState } from "./validate.js";

enableValidation(validationConfig);
