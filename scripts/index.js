let popup = document.querySelector('.popup');
let buttonEdit = document.querySelector('.profile__edit-button');
let buttonEditClose = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__text_type_name');
let jobInput = document.querySelector('.popup__text_type_position');
let profileName = document.querySelector('.profile__title');
let profilePos = document.querySelector('.profile__position');

function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profilePos.textContent;
}

function clsPopup() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profilePos.textContent = jobInput.value;
    profileName.textContent = nameInput.value;
    popup.classList.remove('popup_opened');
}

buttonEdit.addEventListener('click', openPopup);
buttonEditClose.addEventListener('click', clsPopup);
formElement.addEventListener('submit', formSubmitHandler);