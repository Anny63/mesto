let openPopupButton = document.querySelector('.profile__edit-button');
let closePopupButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let form = document.querySelector('.popup__container');
let formElement = document.querySelector('.popup__form');
let savePopupButton = document.querySelector('.popup__save-button');


function togglePopup() {
  popup.classList.toggle('popup_opened');
}

openPopupButton.addEventListener('click', togglePopup)
closePopupButton.addEventListener('click', togglePopup)
savePopupButton.addEventListener('click', togglePopup)


function formSubmitHandler (evt) {
  evt.preventDefault();

  let nameInput = document.querySelector('.popup__input_type_name');
  let jobInput = document.querySelector('.popup__input_type_position');

  let nameProfile = document.querySelector('.profile__name');
  let jobProfile = document.querySelector('.profile__position');

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);
