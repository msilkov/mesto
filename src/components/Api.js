export default class Api {
	constructor({ baseUrl, headers }) {
		this._baseUrl = baseUrl;
		this._headers = headers;
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
			headers: this._headers,
		}).then((res) => {
			return this._onResponse(res);
		});
	}

	getCards() {
		return fetch(`${this._baseUrl}/cards`, {
			method: "GET",
			headers: this._headers,
		}).then((res) => {
			return this._onResponse(res);
		});
	}

	addCard({ name, link }) {
		return fetch(`${this._baseUrl}/cards`, {
			method: "POST",
			headers: this._headers,
			body: JSON.stringify({ name, link }),
		}).then((res) => {
			return this._onResponse(res);
		});
	}

	deleteCard(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}`, {
			method: "DELETE",
			headers: this._headers,
		}).then((res) => {
			return this._onResponse(res);
		});
	}

	setUserInfo({ name, about }) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({ name, about }),
		}).then((res) => {
			return this._onResponse(res);
		});
	}

	setAvatar({ avatar }) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({ avatar }),
		}).then((res) => {
			return this._onResponse(res);
		});
	}

	toggleCardLikeStatus(cardId, method) {
		return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
			method: `${method}`,
			headers: this._headers,
			body: JSON.stringify(),
		}).then((res) => {
			return this._onResponse(res);
		});
	}
}
