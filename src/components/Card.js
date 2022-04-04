export default class Card {
  constructor(
    cardData,
    cardSelector,
    handleFullScreen,
    handleDeleteCard,
    handleLike,
    getUserId
  ) {
    this._cardSelector = cardSelector;
    this._handleFullScreen = handleFullScreen;
    this._handleDeleteCard = handleDeleteCard;
    this._name = cardData.name;
    this._link = cardData.link;
    this._alt = cardData.name;
    this._like = cardData.likes;
    this._userId = getUserId;
    this._idCard = cardData._id;
    this._idOwner = cardData.owner;
    this._isLiked = false;
    this._element = this._getTemplate();
    this._handleLike = handleLike;
    this._likeCount = this._element.querySelector(".element__num-like");
    this._likeBtn = this._element.querySelector(".element__button");
    this._deleteBtn = this._element.querySelector(".element__remove");
    this._image = this._element.querySelector(".element__picture");
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._likeBtn.addEventListener("click", () => this._handleLike(this));
    this._deleteBtn.addEventListener("click", () =>
      this._handleDeleteCard(this)
    );
    this._image.addEventListener("click", () => this._handleFullScreen());
  }

  _checkIdUser() {
    if (this._idOwner === this._userId) {
      this._deleteBtn.classList.add("element__remove_visible");
    }
  }

  _setLikeBtn() {
    this._likeBtn.classList.add("element__button_active");
  }

  _unsetLikeBtn() {
    this._likeBtn.classList.remove("element__button_active");
  }

  delete() {
    this._element.remove();
    this._element = null;
  }

  setLike(like) {
    this._likeCount.textContent = like.length;
    this._like = like;
    this.toggleLike();
  }

  isLiked() {
    return this._like.find((item) => item._id === this._userId);
  }

  toggleLike() {
    if (this.isLiked()) {
      this._setLikeBtn();
    } else {
      this._unsetLikeBtn();
    }
  }

  generateCard() {
    this._setEventListeners();
    this._checkIdUser();
    this.toggleLike();
    this._element.querySelector(".element__title").textContent = this._name;
    this._likeCount.textContent = this._like.length;
    this._image.src = this._link;
    this._image.alt = this._name;

    return this._element;
  }
}
