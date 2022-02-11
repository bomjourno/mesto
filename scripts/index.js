const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupFullScreen = document.querySelector('.popup_fullscreen-card')
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_position');
const placeNameInput = document.querySelector('.popup__text_type_place');
const linkInput = document.querySelector('.popup__text_type_link');
const picture = popupFullScreen.querySelector('.popup__picture');
const pictureCaption = popupFullScreen.querySelector('.popup__figcaption'); 
const btnEditProfile = document.querySelector('.profile__edit-button');
const btnAddCard = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const profilePos = document.querySelector('.profile__position');
const elementsContainer = document.querySelector('.elements__list');
const templateCard = document.querySelector('.template').content;
const initialCards = [
  {
    name: 'Алтай',
    link: 'https://images.unsplash.com/photo-1628534795682-94f707b4ce9e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  },
  {
    name: 'Владивосток',
    link: 'https://images.unsplash.com/photo-1629813366051-b58137b2792c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dmxhZGl2b3N0b2t8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Байкал',
    link: 'https://media.istockphoto.com/photos/lake-baikal-is-a-frosty-winter-day-largest-fresh-water-lake-lake-is-picture-id936808648?b=1&k=20&m=936808648&s=170667a&w=0&h=97renKIB9dQADe7ezTwijerH0rDWdFecgDvPuTBGmgA='
  },
  {
    name: 'Лондон',
    link: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmlnJTIwYmVufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Нью-Йорк',
    link: 'https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGltZXMlMjBzcXVhcmV8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'
  },
  {
    name: 'Новая Зеландия',
    link: 'https://images.unsplash.com/photo-1535666669445-e8c15cd2e7d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
  }
];

//Добавляем в контейнер карточки
function addCardToContainer(container, card) {
  container.prepend(card);
}

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

function closePopupFullScreen() {
  closePopup(popupFullScreen);
}

//Готовим карточки из коробки
function render() {
  initialCards.forEach((card) => {
    const startCard = createCard(card);
    addCardToContainer(elementsContainer, startCard);
  });
}

//Достаем из коробки карточки
render();

//Обработчики
function handleAddCard(evt) {
  evt.preventDefault();
  const newCard = createCard({name: placeNameInput.value, link: linkInput.value, alt: placeNameInput.value});
  addCardToContainer(elementsContainer, newCard);
  closePopupAddCard();
  placeNameInput.value = '';
  linkInput.value = '';
  const submitBtn = evt.target.querySelector('.popup__submit');
  submitBtn ? submitBtn.classList.add('popup__submit_inactive'):'';
  submitBtn ? submitBtn.setAttribute("disabled", true):'';
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

function handleFullScreen(cardData) {
  picture.src = cardData.link;
  picture.alt = cardData.name;
  pictureCaption.textContent = picture.alt;
  openPopup(popupFullScreen);
}

//У каждой карточки есть листенеры
function addListeners(element, cardData) {
  element.querySelector('.element__button').addEventListener('click', (evt) => {
    handleLike(evt);
  });
  element.querySelector('.element__remove').addEventListener('click', (evt) => {
    handleRemove(evt);
  });
  element.querySelector('.element__picture').addEventListener('click', () => {
    handleFullScreen(cardData);
  }); 
}

//Здесь каждая карточка проходит через шаблон
function createCard(card) {
  const newCard = templateCard.querySelector('.element').cloneNode(true);
  const elementPicture = newCard.querySelector('.element__picture');
  const elementTitle = newCard.querySelector('.element__title');
  elementTitle.textContent = card.name;
  elementPicture.src = card.link;
  elementPicture.alt = card.name;
  addListeners(newCard, card);
  return newCard;
}

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closePopup(popup)
      }
      if (evt.target.classList.contains('popup__close-button')) {
        closePopup(popup)
      } 
  })
}) 

btnEditProfile.addEventListener('click', openPopupEditProfile);
btnAddCard.addEventListener('click', openPopupAddCard);
popupEditProfile.addEventListener('submit', handleEditProfile);
popupAddCard.addEventListener('submit', handleAddCard);