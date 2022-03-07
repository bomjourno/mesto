export {FormValidator};

class FormValidator {
  constructor(validationSelectors, formElement) {
    this._form = formElement;
    this._buttonElement = this._form.querySelector(validationSelectors.submitButtonSelector);
    this._inactiveButtonClass = validationSelectors.inactiveButtonClass;
    this._inputList = Array.from(formElement.querySelectorAll(validationSelectors.inputSelector));
    this._inputErrorClass = validationSelectors.inputErrorClass;
    this._errorClass = validationSelectors.errorClass;
  }

  _showInputError(input, errorMessage) {
    const error = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    error.textContent = errorMessage;
    error.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    const error = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    error.classList.remove(this._errorClass);
    error.textContent = '';
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    })
  }

  toggleButtonState() {
    if(this._hasInvalidInput()) {
      this._buttonElement.setAttribute('disabled', true);
      this._buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this.toggleButtonState();
      })
    })
    this.toggleButtonState();
  }

  enableValidation() {
    this._form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    })
    this._setEventListeners();
  }
}