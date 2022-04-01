export default class Card {
  constructor(cardData, cardSelector, handleFullScreen, handleDeleteCard, idOwner) {
    this._cardSelector = cardSelector;
    this._handleFullScreen = handleFullScreen;
    this._handleDeleteCard = handleDeleteCard;
    this._name = cardData.name;
    this._link = cardData.link;
    this._alt = cardData.name;
    this._like = cardData.like;
    this._id = cardData.id;
    this._idOwner = idOwner
    
    this._element = this._getTemplate();
    this._likeBtn = this._element.querySelector('.element__button');
    this._deleteBtn = this._element.querySelector('.element__remove');
    this._image = this._element.querySelector('.element__picture');
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);

    return cardElement;
  }

  _handleLike() {
    this._likeBtn.classList.toggle('element__button_active');
  }

  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => this._handleLike());
    this._deleteBtn.addEventListener('click', () => this._handleDeleteCard());
    this._image.addEventListener('click', () => this._handleFullScreen());
  }

  _checkIdUser() {
    if(this._idOwner === this._id) {
      this._deleteBtn.classList.add('element__remove_visible');
    } 
  }

  generateCard() {
    this._setEventListeners();
    this._checkIdUser();
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__num-like').textContent = this._like.length;
    this._image.src = this._link;
    this._image.alt = this._name;

    return this._element;
  }
};
