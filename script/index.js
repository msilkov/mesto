const editButton = document.querySelector(".profile__edit-btn");
const popup = document.querySelector(".popup");
const closeButton = popup.querySelector(".popup__close-btn");
const popupName = popup.querySelector(".popup__field_type_name");
const popupProfession = popup.querySelector(".popup__field_type_profession");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__desc");

popupName.value = profileName.textContent;
popupProfession.value = profileProfession.textContent;

const popupOpen = function (e) {
	e.preventDefault();
	console.log("click");
	popup.classList.add("popup_opened");
};

const popupClose = function (e) {
	e.preventDefault();
	console.log("click");
	popup.classList.remove("popup_opened");
};

const formSubmitHandler = function (e) {
	e.preventDefault();
	profileName.textContent = popupName.value;
	profileProfession.textContent = popupProfession.value;
	popup.classList.remove("popup_opened");
};

editButton.addEventListener("click", popupOpen);
closeButton.addEventListener("click", popupClose);
popup.addEventListener("submit", formSubmitHandler);
