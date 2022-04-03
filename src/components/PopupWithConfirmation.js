import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(selectorPopup, submitForm){
    super(selectorPopup);
    this._submitForm = submitForm;
  }

  open(el, btn) {
    super.open();
    this._el = el
    btn.textContent = 'Да'
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._submitForm(this._el);
    })
  }
}