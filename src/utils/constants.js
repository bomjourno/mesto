const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupProfileAvatar = document.querySelector('.popup_change-avatar');


const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_position');

const btnEditProfile = document.querySelector('.profile__edit-button');
const btnAddCard = document.querySelector('.profile__add-button');
const btnEditAvatar = document.querySelector('.profile__hover');
const btnDeleteCard = document.querySelector('#delete-card')

const elementsContainer = document.querySelector('.elements__list');
const btnPopupSubmit = '.popup__submit';
const userName = '.profile__title';
const userInfo = '.profile__position';

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

const validationSelectors = {
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_active',
}

export {
  popupEditProfile, popupAddCard, userName, nameInput, jobInput, userInfo,
  btnEditProfile, btnAddCard, elementsContainer, initialCards, validationSelectors,
  btnDeleteCard, btnEditAvatar, popupProfileAvatar, btnPopupSubmit
}