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




const profileFormValidator = new FormValidator(validationSelectors, popupEditProfile);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationSelectors, popupAddCard);
addCardFormValidator.enableValidation();

const openFullScreen = new PopupWithImage('.popup_fullscreen-card');
const user = new UserInfo({userName, userInfo});

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      createCard(item);
    }
  }, elementsContainer
)

cardsList.renderItems();

//Функция создания карточки через класс Card
function createCard(cardData) {
  const card = new Card(cardData, '.template', function handleFullScreen() {
    openFullScreen.open(cardData)
  });
  const cardElement = card.generateCard();
  cardsList.addItem(cardElement);
}

const userProfilePopup = new PopupWithForm('.popup_edit-profile', function submitForm(data) {
  user.setUserInfo(data);
})

const addCardPopup = new PopupWithForm('.popup_add-card', (cardData) => {
  createCard(cardData);
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