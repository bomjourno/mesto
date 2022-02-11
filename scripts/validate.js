const showInputError = (formElement, inputElement, errorMessage, validationSelectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationSelectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSelectors.errorClass);
}

const hideInputError = (formElement, inputElement, validationSelectors) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationSelectors.inputErrorClass);
  errorElement.classList.remove(validationSelectors.errorClass);
  errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement, validationSelectors) => {
  if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, validationSelectors);
  } else {
      hideInputError(formElement, inputElement, validationSelectors);
  }
}

const setEventListeners = (formElement, inputSelector, validationSelectors) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(validationSelectors.submitButtonSelector);
  // Отключили кнопку создания места при первом открытии попапа
  const checkExclusion = formElement.querySelector(validationSelectors.exclusion) ? toggleButtonState(inputList, buttonElement, validationSelectors):'';
  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
          checkInputValidity(formElement, inputElement, validationSelectors);
          toggleButtonState(inputList, buttonElement, validationSelectors);
      });
  });
}
  
function hasInvalidInput(inputList) { 
  return inputList.some(inputElement => {
      return !inputElement.validity.valid
  })
}

function toggleButtonState(inputList, buttonElement, validationSelectors) {
  if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(validationSelectors.inactiveButtonClass);
  } else {
      buttonElement.classList.remove(validationSelectors.inactiveButtonClass);
  }
}

const enableValidation = ({formSelector, inputSelector}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
          evt.preventDefault();
      });
      setEventListeners(formElement, inputSelector, validationSelectors);
  });
}

const validationSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__text_type_error',
  errorClass: 'popup__text-error_active',
  exclusion: '#place-input'
}

enableValidation(validationSelectors);
