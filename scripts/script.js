const popups = document.querySelectorAll('.popup');
const elements = document.querySelector('.elements');
const popupEditElement = document.querySelector('.popup_edit-element');
const popupAddElement = document.querySelector('.popup_add-element');
const popupFullImage = document.querySelector('.popup_full-image');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const template = document.querySelector('#elements-template').content;
const popupImage = document.querySelector('.popup__image');
const popupFigcaption = document.querySelector('.popup__figcaption');
const popupEditForm = popupEditElement.querySelector('.popup__form');
const popupAddForm = popupAddElement.querySelector('.popup__form');
const inputUserName = popupEditElement.querySelector('.popup__input_field_name');
const inputUserDescription = popupEditElement.querySelector('.popup__input_field_description');
const inputCardTitle = popupAddElement.querySelector('.popup__input_field_place');
const inputCardLink = popupAddElement.querySelector('.popup__input_field_link');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__button',
  inactiveButtonSelector: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'input-error_active',
};

//Создание элементов
function createElement(elName, elLink) {
  const element = template.querySelector('.elements__element').cloneNode(true);
  const elementRemove = element.querySelector('.elements__remove');
  const elementPicture = element.querySelector('.elements__picture');
  const elementText = element.querySelector('.elements__text');
  const elementLike = element.querySelector('.elements__like');

  elementPicture.src = elLink;
  elementPicture.alt = elName;
  elementText.textContent = elName;

  elementLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_active');
  })

  elementRemove.addEventListener('click', function () {
    element.remove();
  })

 elementPicture.addEventListener('click', function (evt) {
    openPopup(popupFullImage);
    popupImage.alt = evt.target.alt;
    popupImage.src = evt.target.src;
    popupFigcaption.textContent = elementText.textContent;
  })
  return element;
}

//Добавление элемента в начало
function addElement(el) {
  elements.prepend(el);
}

//Добавление элементов из шаблона
function addDefaultElements() {
  for (let i = 0; i < initialCards.length; i++) {
    addElement(createElement(initialCards[i].name, initialCards[i].link));
  }
}

addDefaultElements();

//Закрытие попапа на клавишу Escape
function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  };
}

//Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  //Удаление слушателя для закрытия попапа при нажатии клавиши escape
  document.removeEventListener('keydown', closePopupEsc);
}

//Открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  //Добавление слушателя для закрытия попапа при нажатии клавиши escape
  document.addEventListener('keydown', closePopupEsc);
}

//Сохранение формы
function submitEditProfileForm() {
  event.preventDefault();
  profileName.textContent = inputUserName.value;
  profileDescription.textContent = inputUserDescription.value;
  closePopup(popupEditElement);
}

//Нажатие на кнопку редактирования профиля
buttonEdit.addEventListener('click', function(){
  openPopup(popupEditElement);
  inputUserName.value=profileName.textContent;
  inputUserDescription.value=profileDescription.textContent;
});

//Нажатие на кнопку добавления элемента
buttonAdd.addEventListener('click', function(){
  openPopup(popupAddElement);
  popupAddForm.reset();
  toggleButtonState(Array.from(popupAddForm.querySelectorAll(validationConfig.inputSelector)), popupAddForm.querySelector(validationConfig.buttonSelector), validationConfig);
});

//Сохранение изменений формы попапа изменения элемента
popupEditForm.addEventListener('submit', submitEditProfileForm);

//Сохранение изменений формы попапа добавление элемента
popupAddForm.addEventListener('submit', () => {
  event.preventDefault();
  const place = inputCardTitle.value;
  const link = inputCardLink.value;
  const element = createElement(place, link);
  addElement(element);
  closePopup(popupAddElement);
});

//Закрытие любого попапа при нажатии на оверлей или крестик
popups.forEach((popup) =>{
  popup.addEventListener('click', (evt)=>{
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains("popup__cross")) {
      closePopup(popup);
    }
  });
});

enableValidation(validationConfig);