import './index.css';
import {
  popupEditProfile, popupAddCard, userName, nameInput, jobInput, userInfo,
  btnEditProfile, btnAddCard, elementsContainer, initialCards, validationSelectors
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: 'db8791fd-f46d-4615-b308-f5256d937c0b',
    'Content-Type': 'application/json'
  }
});

// Подгружаем данные пользователя с сервера
api.takeUserData({name: document.querySelector(userName), position: document.querySelector(userInfo)})


// Подгружаем карточки с сервера
let startCardArr = [];
let cardsList;

api.getInitialCards().then((data) => {
  console.log('Карточки загружены с сервера')
  startCardArr = data.map(item => {
    return {name: item.name, link: item.link}
  })
}).catch(err => {
  console.log(`Не удалось загрузить данные с сервера, ошибка: ${err.status}`);
  startCardArr = initialCards;
}).finally(() => {
  cardsList = new Section(
    {
      items: startCardArr,
      renderer: (item) => {
        cardsList.addItem(createCard(item));
      }
    }, elementsContainer
  )
  cardsList.renderItems();
})

const profileFormValidator = new FormValidator(validationSelectors, popupEditProfile);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationSelectors, popupAddCard);
addCardFormValidator.enableValidation();

const openFullScreen = new PopupWithImage('.popup_fullscreen-card');
const user = new UserInfo({userName, userInfo});



//Функция создания карточки через класс Card
function createCard(cardData) {
  const card = new Card(cardData, '.template', function handleFullScreen() {
    openFullScreen.open(cardData)
  });
  const cardElement = card.generateCard();
  return cardElement;
}

const userProfilePopup = new PopupWithForm('.popup_edit-profile', function submitForm(data) {
  user.setUserInfo(data);  
})

const addCardPopup = new PopupWithForm('.popup_add-card', (cardData) => {
  cardsList.addItem(createCard(cardData));
})

btnEditProfile.addEventListener('click', () => {
  const userData = user.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.position;
  userProfilePopup.open();
});

btnAddCard.addEventListener('click', () => {
  addCardFormValidator.toggleButtonState(); 
  addCardPopup.open();
});