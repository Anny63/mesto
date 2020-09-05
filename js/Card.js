const popupImage = document.querySelector('.popup_type_image');
const closeImagePopupButton = popupImage.querySelector('.popup__close-button');
const titleImage = document.querySelector('.popup__text');
const pictureImage = document.querySelector('.popup__image');

// создание карточки
export default class Card {
  constructor (data, cardElement) {
    this._text = data.name;
    this._image = data.link;
    this._cardElement = cardElement;
    this._closePopUpEsc = () => {
      this._hadleImageClick ();
      this._closePopUpImage ();
    }
  }

  _getTemplate() {
    const cardElement = document
      .querySelector('.template-card')
      .content
      .querySelector('.cards')
      .cloneNode(true);
    return cardElement;
  }

  renderCard() {
    this._card = this._getTemplate();
    this._setEventListener()
    this._card.querySelector('.cards__image').src = this._image;
    this._card.querySelector('.cards__image').alt = this._text;
    this._card.querySelector('.cards__text').textContent = this._text;
    return this._card;
  }

  // открытие и закрытие попапа с картинкой
  _hadleImageClick() {
    pictureImage.src = this._image;
    pictureImage.alt = this._text;
    titleImage.textContent = this._text;
    popupImage.classList.add('popup_opened');
    document.addEventListener('keydown', this._closePopUpEsc);
  }

  _closePopUpImage() {
    popupImage.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closePopUpEsc);
  }

  // добавление карточки по нажатию Enter
  _createCardEnter(evt) {
    if (evt.key === 'Enter') {
      hadleImageClick(evt.target);
    }
  }

  _setEventListener() {
    this._card.querySelector('.cards__image').addEventListener('click', () => {
      this._hadleImageClick();
    });
    closeImagePopupButton.addEventListener('click', () => {
      this._closePopUpImage()
    });
    popupImage.addEventListener('click', () => {
      this._closePopUpImage()
    });

    //лайк на карточку
    this._card.querySelector('.cards__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('cards__like_active');
    });

    // удаление карточки
    this._card.querySelector('.cards__delete').addEventListener('click', (evt) => {
      evt.target.closest('.cards').remove();
    });
  }
}
