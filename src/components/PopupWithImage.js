import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._picture = document.querySelector('.popup__picture');
    this._pictureCaption = document.querySelector('.popup__figcaption');
  }

  open(data) {
    super.open();
    this._picture.src = data.link;
    this._picture.alt = data.name
    this._pictureCaption.textContent = data.name;    
  }
}