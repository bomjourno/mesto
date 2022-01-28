const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupFullScreen = document.querySelector('.popup_fullscreen-card')
const btnClsEditProfile = popupEditProfile.querySelector('.popup__close-button');
const btnClsAddCard = popupAddCard.querySelector('.popup__close-button');
const btnClsFullScreen = popupFullScreen.querySelector('.popup__close-button');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_position');
const placeNameInput = document.querySelector('.popup__text_type_place');
const linkInput = document.querySelector('.popup__text_type_link');
const btnEditProfile = document.querySelector('.profile__edit-button');
const btnAddCard = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const profilePos = document.querySelector('.profile__position');
const elementsContainer = document.querySelector('.elements__list');
const templateCard = document.querySelector('.template').content;
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Готовим коробку карточек
function render() {
  initialCards.reverse().forEach(newItem);
}

//Достаем из коробки карточки
render();

//Обработчики
function handleAddCard(evt) {
  evt.preventDefault();
  newItem({name: placeNameInput.value, link: linkInput.value, alt: placeNameInput.value});
  closePopupAddCard();
}

function handleEditProfile(evt) {
  evt.preventDefault();
  profilePos.textContent = jobInput.value;
  profileName.textContent = nameInput.value;
  closePopupEditProfile();
}

function handleLike(evt) {
  evt.target.classList.toggle('element__button_active');
}

function handleRemove(evt) {
  evt.target.closest('.element').remove();
}

function handleFullScreen(evt) {
  togglePopup(popupFullScreen);
  let picture = popupFullScreen.querySelector('.popup__picture');
  let pictureCaption = popupFullScreen.querySelector('.popup__figcaption');
  let picturePopup = evt.target;
  picture.src = picturePopup.src;
  picture.alt = picturePopup.alt;
  pictureCaption.textContent = picture.alt;
}

//У каждой карточки есть листенеры
function addListeners(el) {
  el.querySelector('.element__button').addEventListener('click', handleLike);
  el.querySelector('.element__remove').addEventListener('click', handleRemove)
  el.querySelector('.element__picture').addEventListener('click', handleFullScreen);
}

//Здесь рождается каждая карточка на страничке
function newItem(card) {
  const newCard = templateCard.querySelector('.element').cloneNode(true);
  newCard.querySelector('.element__title').textContent = card.name;
  newCard.querySelector('.element__picture').src = card.link;
  newCard.querySelector('.element__picture').alt = card.name;
  addListeners(newCard);
  elementsContainer.prepend(newCard);
}

//Открываем попапы
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

function openPopupEditProfile() {
  togglePopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profilePos.textContent;
}

function openPopupAddCard() {
  togglePopup(popupAddCard);
  placeNameInput.value = '';
  linkInput.value = '';
}

// Закрываем попапы
function closePopupEditProfile() {
  togglePopup(popupEditProfile);
}

function closePopupAddCard() {
  togglePopup(popupAddCard);
}

function closePopupFullScreen() {
  togglePopup(popupFullScreen);
}

btnEditProfile.addEventListener('click', openPopupEditProfile);
btnAddCard.addEventListener('click', openPopupAddCard);
btnClsAddCard.addEventListener('click', closePopupAddCard);
btnClsEditProfile.addEventListener('click', closePopupEditProfile);
btnClsFullScreen.addEventListener('click', closePopupFullScreen);
popupEditProfile.addEventListener('submit', handleEditProfile);
popupAddCard.addEventListener('submit', handleAddCard);