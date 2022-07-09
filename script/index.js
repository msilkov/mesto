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

enableValidation(validationConfig);
