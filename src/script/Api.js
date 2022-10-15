export default class Api {
	constructor(options) {}

	getInitialCArds() {
		return fetch("https://mesto.nomoreparties.co/v1/cohort-51/cards", {
			headers: {
				authorization: "a86c3d3e-174b-4d9f-bd44-c500fe855ebc",
			},
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}

				// если ошибка, отклоняем промис
				return Promise.reject(`Ошибка: ${res.status}`);
			})
		
	}
}
