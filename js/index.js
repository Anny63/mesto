import FormValidator from './FormValidator.js';
import Card from './Card.js';

// массив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// обёртки
const popupWindow = document.querySelector('.popup');
const popupEdit = document.querySelector('.popup_type_edit-profile');
const popupAdd = document.querySelector('.popup_type_add-card');
const popupImage = document.querySelector('.popup_type_image');

const formElementEdit = popupEdit.querySelector('.popup__form');
const formElementAdd = popupAdd.querySelector('.popup__form');

// кнопки и другие элементы
const editPopupButton = document.querySelector('.profile__edit-button');
const closeEditPopupButton = popupEdit.querySelector('.popup__close-button');
const addPopupButton = document.querySelector('.profile__add-button');
const closeAddPopupButton = popupAdd.querySelector('.popup__close-button');
const buttonElement = popupAdd.querySelector('.popup__save-button');
const closeImagePopupButton = popupImage.querySelector('.popup__close-button');

const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__position');
const list = document.querySelector('.elements__list');

// данные форм
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_position');
const placeInput = popupAdd.querySelector('.popup__input_type_place');
const linkInput = popupAdd.querySelector('.popup__input_type_link');

// массив объектов валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputErrorClass: 'popup__input_invalid',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  errorClass: 'popup__error_visible'
}

// открытие попапов
export function openPopUpWindow(popupWindow) {
  popupWindow.classList.add('popup_opened');
  document.addEventListener('keydown', closePopUpEsc);
}

// открытие модального окна редактирования профиля
function openModalEdit(popupEdit) {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  validateEdit.disableButton(buttonElement);
  openPopUpWindow(popupEdit);
}

// открытие модального окна добавления карточки
function openModalAdd(popupAdd) {
  placeInput.value = "";
  linkInput.value = "";
  validateAdd.disableButton(buttonElement);
  openPopUpWindow(popupAdd);
}

// закрытие попапов
function closePopUpWindow(popupWindow) {
  popupWindow.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopUpEsc);
}

// кнопка "сохранить"
function formEditSubmitHandler(evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  closePopUpWindow(popupEdit);
}

// кнопка "создать"
function formAddSubmitHandler(evt) {
  evt.preventDefault();

  renderCard({ name: placeInput.value, link: linkInput.value });

  closePopUpWindow(popupAdd);
}

// слушатели событий
editPopupButton.addEventListener('click', () => {
  openModalEdit(popupEdit);
});
addPopupButton.addEventListener('click', () => {
  openModalAdd(popupAdd);
});
closeEditPopupButton.addEventListener('click', () => {
  closePopUpWindow(popupEdit);
});
closeAddPopupButton.addEventListener('click', () => {
  closePopUpWindow(popupAdd);
});
closeImagePopupButton.addEventListener('click', () => {
  closePopUpWindow(popupImage);
});
formElementEdit.addEventListener('submit', formEditSubmitHandler);
formElementAdd.addEventListener('submit', formAddSubmitHandler);

// закрытие попапов по нажатию Esc
function closePopUpEsc(evt) {
  const activePopUp = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopUpWindow(activePopUp);
  }
}

// закрытие папапов через клик
function closeOpenPopupOverlay() {
  const popupForm = Array.from(document.querySelectorAll('.popup__container'));
  popupForm.forEach(function (evt) {
    document.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('popup_opened')) {
        closePopUpWindow(evt.target);
      }
    });
  });
}
closeOpenPopupOverlay();

// добавление карточек
function createCard(item) {

  const card = new Card(item, '#tepmlate-card');
  return card.renderCard(item);
}

function renderCard(data) {
  list.append(createCard(data));
}

initialCards.forEach(function (item) {
  const cardElement = createCard(item);
  list.append(cardElement);
})

const validateAdd = new FormValidator(validationConfig);
validateAdd.enableValidation();
const validateEdit = new FormValidator(validationConfig);
validateEdit.enableValidation();
