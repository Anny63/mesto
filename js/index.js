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
const popupEdit = document.querySelector('.popup_type_edit-profile');
const popupAdd = document.querySelector('.popup_type_add-card');

const formElementEdit = popupEdit.querySelector('.popup__form');
const formElementAdd = popupAdd.querySelector('.popup__form');

// кнопки и другие элементы
const editPopupButton = document.querySelector('.profile__edit-button');
const closeEditPopupButton = popupEdit.querySelector('.popup__close-button');
const addPopupButton = document.querySelector('.profile__add-button');
const closeAddPopupButton = popupAdd.querySelector('.popup__close-button');

const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__position');
const list = document.querySelector('.elements__list');

// данные форм
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_position');
const placeInput = popupAdd.querySelector('.popup__input_type_place');
const linkInput = popupAdd.querySelector('.popup__input_type_link');

// открытие и закрытие попапа профайла
function openPopUpEdit() {
  popupEdit.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  document.addEventListener('keydown', closePopUpEsc);
}

function closePopUpEdit() {
  popupEdit.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopUpEsc);
}

// кнопка "сохранить"
function formEditSubmitHandler(evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  closePopUpEdit(popupEdit);
}

// открытие и закрытие попапа добавления фото
function openPopUpAdd() {
  popupAdd.classList.add('popup_opened');
  placeInput.value = "";
  linkInput.value = "";
  document.addEventListener('keydown', closePopUpEsc);
}

function closePopUpAdd() {
  popupAdd.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopUpEsc);
}

// кнопка "создать"
function formAddSubmitHandler(evt) {
  evt.preventDefault();

  renderCard({ name: placeInput.value, link: linkInput.value });

  closePopUpAdd(popupAdd);
}

// слушатели событий
editPopupButton.addEventListener('click', openPopUpEdit);
closeEditPopupButton.addEventListener('click', closePopUpEdit);
addPopupButton.addEventListener('click', openPopUpAdd);
closeAddPopupButton.addEventListener('click', closePopUpAdd);
formElementEdit.addEventListener('submit', formEditSubmitHandler);
formElementAdd.addEventListener('submit', formAddSubmitHandler);

// закрытие попапов по нажатию Esc
function closePopUpEsc(evt) {
  if (evt.key === 'Escape') {
    closePopUpEdit(evt.target);
    closePopUpAdd(evt.target);
  }
}

// закрытие папапов через клик
function closeOpenPopupOverlay() {
  const popupForm = Array.from(document.querySelectorAll('.popup__container'));
  popupForm.forEach(function () {
    document.addEventListener('click', (evt) => {
      if(evt.target.classList.contains('popup_opened')) {
        evt.target.classList.remove('popup_opened');
      }
    });
  });
}
closeOpenPopupOverlay();

// добавление карточек
function createCard(item) {

  const card = new Card(item, '.tepmlate-card');
  return card.renderCard(item);
}

function renderCard(data) {
  list.append(createCard(data));
}

initialCards.forEach(function (item) {
  const cardElement = createCard(item);
  list.append(cardElement);
})
