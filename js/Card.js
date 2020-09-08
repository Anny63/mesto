const popupImage = document.querySelector('.popup_type_image');
const closeImagePopupButton = popupImage.querySelector('.popup__close-button');
const titleImage = document.querySelector('.popup__text');
const pictureImage = document.querySelector('.popup__image');
import {openPopupImg} from './index.js';

// создание карточки
export default class Card {
  constructor (data, cardSelector) {
    this._text = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
    this._closePopUpEsc = () => {
      this._handleImageClick ();
      this._closePopUpImage ();
    }
    this._openPopupImg = () => {
      openPopupImg ();
      this._handleImageClick ();
    }
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.cards')
      .cloneNode(true);
    return cardElement;
  }

  renderCard() {
    this._card = this._getTemplate();
    const cardImage = this._card.querySelector('.cards__image');
    const cardText = this._card.querySelector('.cards__text');
    this._setEventListener()
    this._like()
    this._delete()
    cardImage.src = this._image;
    cardImage.alt = this._text;
    cardText.textContent = this._text;
    return this._card;
  }

  // клик на попап с картинкой
  _handleImageClick() {
    pictureImage.src = this._image;
    pictureImage.alt = this._text;
    titleImage.textContent = this._text;
    document.addEventListener('keydown', this._closePopUpEsc);
  }

  // закрытие попапа с картинкой
  _closePopUpImage() {
    popupImage.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closePopUpEsc);
  }

  _setEventListener() {
    this._card.querySelector('.cards__image').addEventListener('click', () => {
      this._openPopupImg ();
    });
    closeImagePopupButton.addEventListener('click', this._closePopUpImage);
    popupImage.addEventListener('click', this._closePopUpImage);
  }

  //лайк на карточку
  _like() {
    const cardLikeButtom = this._card.querySelector('.cards__like');
    cardLikeButtom.addEventListener('click', (evt) => {
      evt.target.classList.toggle('cards__like_active');
    });
  }

  // удаление карточки
  _delete() {
    const cardDeleteButtom = this._card.querySelector('.cards__delete');
    cardDeleteButtom.addEventListener('click', (evt) => {
      evt.target.closest('.cards').remove();
    });
  }
}
