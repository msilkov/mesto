const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__desc");
const profileAddBtn = document.querySelector(".profile__add-btn");

const popupEdit = document.querySelector(".popup_type_edit-profile");
const popupEditForm = popupEdit.querySelector(".popup__form");
const popupEditName = popupEdit.querySelector(".popup__field_type_name");
const popupEditProfession = popupEdit.querySelector(
	".popup__field_type_profession"
);
const popupEditCloseBtn = popupEdit.querySelector(".popup__close-btn");

const popupAdd = document.querySelector(".popup_type_add-card");
// const popupZoomImg = popup.querySelector(".popup");
const popupAddCloseBtn = popupAdd.querySelector(".popup__close-btn");
const popupAddForm = popupAdd.querySelector(".popup__form");
const popupAddImgTitle = popupAddForm.querySelector(
	".popup__field_type_img-title"
);
const popupAddImgLink = popupAddForm.querySelector(
	".popup__field_type_img-link"
);

const cardsLayout = document.querySelector(".cards-layout");
const cardTemplate = document.querySelector(".card-template");
const initialCards = [
	{
		name: "Байкал",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
		alt: "Байкал",
	},
	{
		name: "Камчатка",
		link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
		alt: "Камчатка",
	},
	{
		name: "Карачаево-Черкесская республика",
		link: "./images/cards/karachaevsk.jpg",
		alt: "Вид на монастырь в Карачаевске",
	},
	{
		name: "Домбай",
		link: "./images/cards/dombay.jpg",
		alt: "Вид на горы в Домбае",
	},
	{
		name: "Гора Эльбрус",
		link: "./images/cards/elbrus.jpg",
		alt: "Вид на Эльбрус",
	},
	{
		name: "Карачаевск",
		link: "./images/cards/karachaevsk.jpg",
		alt: "Вид на монастырь в Карачаевске",
	},
];

const createCard = (obj) => {
	const card = cardTemplate.content.cloneNode(true).querySelector(".card");
	card.querySelector(".card__title").textContent = obj.name;
	card.querySelector(".card__image").src = obj.link;
	card.querySelector(".card__image").alt = obj.alt;
	return card;
};
const addCard = (obj) => {
	const card = createCard(obj);
	cardsLayout.prepend(card);
};

initialCards.forEach(addCard);

const openPopup = (popup) => {
	popup.classList.add("popup_opened");
	document.body.style.overflowY = "hidden";
};
const closePopup = (popup) => {
	popup.classList.remove("popup_opened");
	document.body.style.overflowY = "auto";
};

const openPopupEdit = (e) => {
	e.preventDefault();
	setProfileData();
	openPopup(popupEdit);
};
const closePopupEdit = (e) => {
	e.preventDefault();
	closePopup(popupEdit);
};

const openPopupAdd = (e) => {
	e.preventDefault();
	openPopup(popupAdd);
};
const closePopupAdd = (e) => {
	e.preventDefault();
	closePopup(popupAdd);
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
	document.body.style.overflowY = "auto";
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
popupEditCloseBtn.addEventListener("click", closePopupEdit);
popupEditForm.addEventListener("submit", handleSubmitProfileEdit);
profileAddBtn.addEventListener("click", openPopupAdd);
popupAddCloseBtn.addEventListener("click", closePopupAdd);
popupAddForm.addEventListener("submit", handleSubmitCardAdd);
