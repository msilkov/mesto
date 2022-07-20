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
	validationConfig,
} from "./data.js";
import { initialCards } from "./cards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const popupEditValidator = new FormValidator(validationConfig, popupEditForm);
popupEditValidator.enableValidation();
const popupAddValidator = new FormValidator(validationConfig, popupAddForm);
popupAddValidator.enableValidation();

const renderCard = (obj) => {
	const card = new Card(obj, ".card-template");
	cardsLayout.prepend(card.generateCard());
};

initialCards.forEach(renderCard);

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
	popupEditValidator.toggleButtonState(popupEditSubmitBtn, popupEditInputList);
	openPopup(popupEdit);
};

const openPopupAdd = (e) => {
	e.preventDefault();
	popupAddValidator.toggleButtonState(popupAddSubmitBtn, popupAddInputList);
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
	renderCard(card);
	closePopup(popupAdd);
	popupAddForm.reset();
};

profileEditBtn.addEventListener("click", openPopupEdit);
popupEditForm.addEventListener("submit", handleSubmitProfileEdit);
profileAddBtn.addEventListener("click", openPopupAdd);
popupAddForm.addEventListener("submit", handleSubmitCardAdd);

export { openPopupZoom };
