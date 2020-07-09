// переменные
let openPopupButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let form = document.querySelector('.popup__container');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_position');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__position');

// открытие и закрытие попапа
function openPopUp() {
  popup.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function closePopUp() {
  popup.classList.remove('popup_opened');
}

// кнопка "сохранить"
function formSubmitHandler (evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  closePopUp();
}

formElement.addEventListener('submit', formSubmitHandler);

// слушатели событий
openPopupButton.addEventListener('click', openPopUp);
closePopupButton.addEventListener('click', closePopUp);
