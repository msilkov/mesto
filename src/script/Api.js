export default class Api {
	constructor(baseUrl, token) {
		this._baseUrl = baseUrl;
		this._token = token;
	}
	getResponse(res) {
		then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка: ${res.status}`);
		});
	}

	getCards() {
		return fetch(`${this._baseUrl}/cards`, {
			headers: {
				authorization: this._token,
			},
		}).then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка: ${res.status}`);
		});
	}
	addCard({ name, link }) {
		return fetch(`${this._baseUrl}/cards`, {
			method: "POST",
			headers: {
				authorization: this._token,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, link }),
		}).then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(`Ошибка: ${res.status}`);
		});
	}
}
