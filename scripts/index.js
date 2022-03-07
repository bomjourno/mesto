import {popups, popupEditProfile, popupAddCard, popupFullScreen, nameInput, jobInput, placeNameInput,
  linkInput, picture, pictureCaption, btnEditProfile, btnAddCard, profileName, profilePos, elementsContainer, initialCards, validationSelectors} from './data.js';
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const profileFormValidator = new FormValidator(validationSelectors, popupEditProfile);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationSelectors, popupAddCard);
addCardFormValidator.enableValidation();
 
//Функция добавления карточки в контейнер 
function addCardToContainer(container, card) {
  container.prepend(card);
}

//Функция создания карточки через класс Card
function createCard(cardData) {
  const card = new Card(cardData, '.template', handleFullScreen);
  const cardElement = card.generateCard();
  return cardElement;
}

//Доcтаем карточки из коробки
initialCards.forEach((card) => {
  const startCard = createCard(card);
  addCardToContainer(elementsContainer, startCard);
});

//Открываем попапы
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
}

function openPopupEditProfile() {
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profilePos.textContent;
}

function openPopupAddCard() {
  openPopup(popupAddCard);
}

// Закрываем попапы
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
}

function closePopupEsc (evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function closePopupEditProfile() {
  closePopup(popupEditProfile);
}

function closePopupAddCard() {
  closePopup(popupAddCard);
}

//Открываем и закрываем попапs
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
        closePopup(popup);
      }
  })
}) 

//Функция добавления новой карточки
function handleAddCard(evt) {
  evt.preventDefault();
  const newCard = createCard({name: placeNameInput.value, link: linkInput.value});
  addCardToContainer(elementsContainer, newCard);
  closePopupAddCard();
  placeNameInput.value = '';
  linkInput.value = '';
  addCardFormValidator.toggleButtonState();
}

//Редактирование профиля
function handleEditProfile(evt) {
  evt.preventDefault();
  profilePos.textContent = jobInput.value;
  profileName.textContent = nameInput.value;
  closePopupEditProfile();
}

//Фулл скрин карточки
function handleFullScreen(name, link) {
  picture.alt = name;
  picture.src = link;
  pictureCaption.textContent = picture.alt;
  openPopup(popupFullScreen);
}

btnEditProfile.addEventListener('click', openPopupEditProfile);
btnAddCard.addEventListener('click', openPopupAddCard);
popupEditProfile.addEventListener('submit', handleEditProfile);
popupAddCard.addEventListener('submit', handleAddCard);