const karachaevskImg = new URL(
	"../images/cards/karachaevsk.jpg",
	import.meta.url
);
const dombayImg = new URL("../images/cards/dombay.jpg", import.meta.url);
const elbrusImg = new URL("../images/cards/elbrus.jpg", import.meta.url);

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
		link: karachaevskImg,
		alt: "Вид на монастырь в Карачаевске",
	},
	{
		name: "Домбай",
		link: dombayImg,
		alt: "Вид на горы в Домбае",
	},
	{
		name: "Гора Эльбрус",
		link: elbrusImg,
		alt: "Вид на Эльбрус",
	},
	{
		name: "Рим",
		link: "https://images.unsplash.com/photo-1569416078500-3857b00616f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1036&q=80",
		alt: "Вид на узкую улицу Рима",
	},
];

export { initialCards };
