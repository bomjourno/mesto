export default class UserInfo {
  constructor({userName, userInfo}) {
    this._user = document.querySelector(userName);
    this._userInfo = document.querySelector(userInfo);
  }

  getUserInfo() {
    const userData = {
      name: this._user.textContent,
      position: this._userInfo.textContent
    }
    return userData;
  }

  setUserInfo(data) {
    this._user.textContent = data.name;
    this._userInfo.textContent = data.position;
  }
}