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

	_request(url, options) {
		return fetch(url, options).then(this._onResponse);
	}

	getUserInfo() {
		return this._request(`${this._baseUrl}/users/me`, {
			method: "GET",
			headers: this._headers,
		});
	}

	getCards() {
		return this._request(`${this._baseUrl}/cards`, {
			method: "GET",
			headers: this._headers,
		});
	}

	addCard({ name, link }) {
		return this._request(`${this._baseUrl}/cards`, {
			method: "POST",
			headers: this._headers,
			body: JSON.stringify({ name, link }),
		});
	}

	deleteCard(cardId) {
		return this._request(`${this._baseUrl}/cards/${cardId}`, {
			method: "DELETE",
			headers: this._headers,
		});
	}

	setUserInfo({ name, about }) {
		return this._request(`${this._baseUrl}/users/me`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({ name, about }),
		});
	}

	setAvatar({ avatar }) {
		return this._request(`${this._baseUrl}/users/me/avatar`, {
			method: "PATCH",
			headers: this._headers,
			body: JSON.stringify({ avatar }),
		});
	}

	toggleCardLikeStatus(cardId, method) {
		return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
			method: `${method}`,
			headers: this._headers,
			body: JSON.stringify(),
		});
	}
}
