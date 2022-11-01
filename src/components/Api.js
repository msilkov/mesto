export default class Api {
	constructor(baseUrl, token) {
		this._baseUrl = baseUrl;
		this._token = token;
	}

	_onResponse(res) {
		if (res.ok) {
			return res.json();
		}
		return Promise.reject(`Ошибка: ${res.status}`);
	}

	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			method: "GET",
			headers: {
				authorization: this._token,
			},
		}).then((res) => {
			return this._onResponse(res);
		});
	}

	getCards() {
		return fetch(`${this._baseUrl}/cards`, {
			method: "GET",
			headers: {
				authorization: this._token,
			},
		}).then((res) => {
			return this._onResponse(res);
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
			return this._onResponse(res);
		});
	}

	deleteCard(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}`, {
			method: "DELETE",
			headers: {
				authorization: this._token,
			},
		}).then((res) => {
			return this._onResponse(res);
		});
	}

	setUserInfo({ name, about }) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: "PATCH",
			headers: {
				authorization: this._token,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, about }),
		}).then((res) => {
			return this._onResponse(res);
		});
	}
	
	setAvatar({ avatar }) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: "PATCH",
			headers: {
				authorization: this._token,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ avatar }),
		}).then((res) => {
			return this._onResponse(res);
		});
	}

	setCardLike(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
			method: "PUT",
			headers: {
				authorization: this._token,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(),
		}).then((res) => {
			return this._onResponse(res);
		});
	}

	removeCardLike(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
			method: "DELETE",
			headers: {
				authorization: this._token,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(),
		}).then((res) => {
			return this._onResponse(res);
		});
	}
}
