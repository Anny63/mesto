// массив объектов валидации
const object = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: '.popup__input_invalid',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: '.popup__save-button_disabled',
  errorClass: '.popup__error_visible',
}

// функция, которая добавляет обработчики всем формам
const enableValidation = ({ formSelector, ...rest }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, rest);
  });
}

// функция, которая добавляет обработчики всем полям ввода
const setEventListeners = (formElement, { inputSelector, submitButtonSelector, ...rest}) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, rest);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement, rest);
    });
  });
}

// функция, которая изменяет состояние кнопки
const toggleButtonState = (inputList, buttonElement, { inactiveButtonClass, ...rest }) => {
  if (hasInvalidInput(inputList, rest)) {
    buttonElement.classList.add('popup__save-button_disabled');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('popup__save-button_disabled');
    buttonElement.disabled = false;
  }
}

// валидация кнопки
const hasInvalidInput = (inputList, { inputErrorClass, errorClass }) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

// функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

// функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
}

// функция, которая проверяет валидность поля
  const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: '.popup__input_invalid',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: '.popup__save-button_disabled',
  errorClass: '.popup__error_visible'
});
