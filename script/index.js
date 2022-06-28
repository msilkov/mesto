enableValidation();
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

const popupAdd = document.querySelector(".popup_type_add-card");
const popupAddForm = popupAdd.querySelector(".popup__form");
const popupAddImgTitle = popupAddForm.querySelector(
	".popup__field_type_img-title"
);
const popupAddImgLink = popupAddForm.querySelector(
	".popup__field_type_img-link"
);
const popupZoom = document.querySelector(".popup_type_zoom-img");
const popupZoomImg = popupZoom.querySelector(".popup__img");
const popupZoomDesc = popupZoom.querySelector(".popup__img-desc");

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
		name: "Рим",
		link: "https://images.unsplash.com/photo-1569416078500-3857b00616f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1036&q=80",
		alt: "Вид на узкую улицу Рима",
	},
];

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
	popup.addEventListener("click", (e) => {
		if (e.target == popup) {
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

const openPopup = (popup) => {
	popup.classList.add("popup_opened");
	document.addEventListener("keydown", (e) => {
		const key = e.key;
		if (key === "Escape") {
			closePopup(popup);
		}
	});
};

const closePopup = (popup) => {
	popup.classList.remove("popup_opened");
};

const openPopupEdit = (e) => {
	e.preventDefault();
	setProfileData();
	openPopup(popupEdit);
};

const openPopupAdd = (e) => {
	e.preventDefault();
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
	if (card.name === "" || card.link === "") {
		alert("Введите данные");
	} else {
		addCard(card);
		closePopup(popupAdd);
		popupAddForm.reset();
	}
};

profileEditBtn.addEventListener("click", openPopupEdit);
popupEditForm.addEventListener("submit", handleSubmitProfileEdit);
profileAddBtn.addEventListener("click", openPopupAdd);
popupAddForm.addEventListener("submit", handleSubmitCardAdd);
