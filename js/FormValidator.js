// массив объектов валидации
const object = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_invalid',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  errorClass: 'popup__error_visible'
}

// валидация полей формы
export default class FormValidator {
  constructor(formElements) {
    this._formSelector = formElements.formSelector;
    this._inputSelector = formElements.inputSelector;
    this._inputErrorClass = formElements.inputErrorClass;
    this._submitButtonSelector = formElements.submitButtonSelector;
    this._inactiveButtonClass = formElements.inactiveButtonClass;
    this._errorClass = formElements.errorClass;
  }

  // функция, которая добавляет обработчики всем формам
  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners(formElement);
    });
  }

  // функция, которая добавляет обработчики всем полям ввода
  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  // функция, которая блокирует кнопку
  _disableButton(buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disabled = true;
  }

  // функция, которая изменяет состояние кнопки
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._disableButton(buttonElement, this._inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  // валидация кнопки
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // функция, которая добавляет класс с ошибкой
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  // функция, которая удаляет класс с ошибкой
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  // функция, которая проверяет валидность поля
  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }
}

const validate = new FormValidator(object);
validate.enableValidation();
