let popup = document.querySelector('.popup');
let buttonEdit = document.querySelector('.profile__edit-button');
let buttonEditClose = document.querySelector('.popup__close-button');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__form-name');
let jobInput = document.querySelector('.popup__form-position');
let profileName = document.querySelector('.profile__title');
let profilePos = document.querySelector('.profile__position');

buttonEdit.addEventListener('click', function() {
    popup.classList.add('popup__opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profilePos.textContent;
});

buttonEditClose.addEventListener('click', function() {
    popup.classList.remove('popup__opened');
});

function formSubmitHandler (evt) {
    evt.preventDefault();
    profilePos.textContent = jobInput.value;
    profileName.textContent = nameInput.value;
    popup.classList.remove('popup__opened');
}

formElement.addEventListener('submit', formSubmitHandler);