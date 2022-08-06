export default class UserInfo {
	constructor({ profileName, profileDesc }) {
		this._name = document.querySelector(profileName);
		this._description = document.querySelector(profileDesc);
	}
	getUserInfo() {
		const userData = {
			name: this._name.textContent,
			description: this._description.textContent,
		};
		return userData;
	}
	setUserInfo(data) {
		this._name.textContent = data.name;
		this._description.textContent = data.description;
	}
}
