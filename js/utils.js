// функция, которая блокирует кнопку
export function disableButton(buttonElement) {
  buttonElement.classList.add('popup__save-button_disabled');
  buttonElement.disabled = true;
}
