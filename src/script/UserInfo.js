export default class UserInfo {
	constructor(profileName, profileDesc, prifileAvatar) {
		this._name = document.querySelector(profileName);
		this._about = document.querySelector(profileDesc);
		this._avatar = document.querySelector(prifileAvatar);
	}
	getUserInfo() {
		const userData = {
			name: this._name.textContent,
			about: this._about.textContent,
			avatar: this._avatar.src,
		};
		return userData;
	}
	setUserInfo(data) {
		this._name.textContent = data.name;
		this._about.textContent = data.about;
	}
	setUserAvatar(data) {
		this._avatar.src = data.avatar;
	}
}
