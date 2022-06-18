const editButton = document.querySelector(".profile__edit-btn");
const popup = document.querySelector(".popup");
const popupForm = popup.querySelector(".popup__form");
const closeButton = popup.querySelector(".popup__close-btn");
const popupName = popup.querySelector(".popup__field_type_name");
const popupProfession = popup.querySelector(".popup__field_type_profession");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__desc");
// перемиеновать название сначала глагол
const popupOpen = function (e) {
	e.preventDefault();
	popup.classList.add("popup_opened");
	document.body.style.overflowY = "hidden";
	popupName.value = profileName.textContent;
	popupProfession.value = profileProfession.textContent;
};

const popupClose = function (e) {
	e.preventDefault();
	popup.classList.remove("popup_opened");
	document.body.style.overflowY = "auto";
};
// rewrite personal data
const formSubmitHandler = function (e) {
	e.preventDefault();
	profileName.textContent = popupName.value;
	profileProfession.textContent = popupProfession.value;
	popup.classList.remove("popup_opened");
	document.body.style.overflowY = "auto";
};

editButton.addEventListener("click", popupOpen);
closeButton.addEventListener("click", popupClose);
popupForm.addEventListener("submit", formSubmitHandler);
