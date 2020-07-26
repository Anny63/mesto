// обёртки
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
const closeImagePopupButton = popupImage.querySelector('.popup__close-button');

const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__position');
const titleImage = document.querySelector('.popup__text');
const pictureImage = document.querySelector('.popup__image');

const cardTemplate = document.querySelector('.template-card').content.querySelector('.cards');
const list = document.querySelector('.elements__list');

// данные форм
const nameInput = popupEdit.querySelector('.popup__input_type_name');
const jobInput = popupEdit.querySelector('.popup__input_type_position');
const placeInput = popupAdd.querySelector('.popup__input_type_place');
const linkInput = popupAdd.querySelector('.popup__input_type_link');

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

// открытие и закрытие попапа профайла
function openPopUpEdit() {
  popupEdit.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function closePopUpEdit() {
  popupEdit.classList.remove('popup_opened');
}

// кнопка "сохранить"
function formEditSubmitHandler(evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  closePopUpEdit(popupEdit);
}

formElementEdit.addEventListener('submit', formEditSubmitHandler);

// открытие и закрытие попапа добавления фото
function openPopUpAdd() {
  popupAdd.classList.add('popup_opened');
}

function closePopUpAdd() {
  popupAdd.classList.remove('popup_opened');
}

// кнопка "создать"
function formAddSubmitHandler(evt) {
  evt.preventDefault();

  renderCard({ name: placeInput.value, link: linkInput.value });

  closePopUpAdd(popupAdd);
}

formElementAdd.addEventListener('submit', formAddSubmitHandler);

// слушатели событий
editPopupButton.addEventListener('click', openPopUpEdit);
closeEditPopupButton.addEventListener('click', closePopUpEdit);
addPopupButton.addEventListener('click', openPopUpAdd);
closeAddPopupButton.addEventListener('click', closePopUpAdd);

// добавление карточек
function createCard(data) {

  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.cards__image');
  const cardText = cardElement.querySelector('.cards__text');
  const cardLikeButtom = cardElement.querySelector('.cards__like');
  const cardDeleteButtom = cardElement.querySelector('.cards__delete');

  cardText.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  // слушатели событий
  cardLikeButtom.addEventListener('click', () => {
    hadleLikeClick(cardLikeButtom);
  });
  cardDeleteButtom.addEventListener('click', () => {
    hadleDeleteClick(cardDeleteButtom);
  });
  closeImagePopupButton.addEventListener('click', closePopUpImage);
  cardImage.addEventListener('click', () => {
    hadleImageClick(data.name, data.link);
  });

  return cardElement;
}

function renderCard(data) {
  list.prepend(createCard(data));
}

initialCards.forEach((data) => {
  renderCard(data);
});

//лайк на карточку
function hadleLikeClick(likeButtomClick) {
  likeButtomClick.classList.toggle('cards__like_active');
}

// удаление карточки
function hadleDeleteClick(deleteButtomClick) {
  const deleteItem = deleteButtomClick.closest('.cards');
  deleteItem.remove();
}

 // открытие и закрытие попапа с картинкой
 function hadleImageClick(name, link) {
  popupImage.classList.add('popup_opened');
  titleImage.textContent = name;
  pictureImage.src = link;
  pictureImage.alt = name;
}

function closePopUpImage() {
  popupImage.classList.remove('popup_opened');
}
