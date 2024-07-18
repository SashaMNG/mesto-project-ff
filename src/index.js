import { addCard, deleteCard, likeCard } from './components/card'
import { initialCards } from './components/cards'
import { closeModal, openModal } from './components/modal'
import './pages/index.css'

const cardList = document.querySelector('.places__list')
const cardTemplate = document.querySelector('#card-template').content

const editPopup = document.querySelector('.popup_type_edit')
const editButton = document.querySelector('.profile__edit-button')
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

const form = document.querySelector('.popup__form')
const formInput = form.querySelector('.popup__input')
// const formError = form.querySelector(`.${formInput.id}-error`)

const formEditProfile = document.querySelector('form[name="edit-profile"]')
const nameInput = document.querySelector('input[name="name"]')
const jobInput = document.querySelector('input[name="description"]')

const addCardPopup = document.querySelector('.popup_type_new-card')
const addButton = document.querySelector('.profile__add-button')

const formNewPlace = document.querySelector('form[name="new-place"]')
const namePlaceInput = document.querySelector('input[name="place-name"]')
const linkInput = document.querySelector('input[name="link"]')

const modalTypeImg = document.querySelector('.popup_type_image')
const modalImg = modalTypeImg.querySelector('.popup__image')
const modalCaption = modalTypeImg.querySelector('.popup__caption')

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
	inputElement.classList.add('popup__input_type_error')
	// Показываем сообщение errorMessage об ошибке
	errorElement.textContent = errorMessage
	// 3. Добавьте formError класс form__input-error_active.
	errorElement.classList.add('popup__input-error_active')
}

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
	inputElement.classList.remove('popup__input_type_error')
	// 1. Удалите активный класс ошибки c formError.
	errorElement.classList.remove('popup__input-error_active')
	// 2. Очистите свойство textContent элемента formError.
	errorElement.textContent = ''
}

// Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement) => {
	if (!inputElement.validity.valid) {
		// Если поле не проходит валидацию, покажем ошибку
		showInputError(formElement, inputElement, inputElement.validationMessage)
	} else {
		// Если проходит, скроем
		hideInputError(formElement, inputElement)
	}
}

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
  })
}; 

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
        buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_inactive');
  } else {
        // иначе сделай кнопку активной
        buttonElement.disabled = false;
    buttonElement.classList.remove('popup__button_inactive');
  }
};

const setEventListeners = formElement => {
	const inputList = Array.from(formElement.querySelectorAll('.popup__input'))
	const buttonElement = formElement.querySelector('.popup__button');
	toggleButtonState(inputList, buttonElement);

	inputList.forEach(inputElement => {
		// каждому полю добавим обработчик события input
		inputElement.addEventListener('input', () => {
			// Внутри колбэка вызовем isValid,
			// передав ей форму и проверяемый элемент
			checkInputValidity(formElement, inputElement)
			toggleButtonState(inputList, buttonElement);
		})
	})
}

const enableValidation = () => {
	const formList = Array.from(document.querySelectorAll('.popup__form'))

	formList.forEach(formElement => {
		formElement.addEventListener('submit', evt => {
			evt.preventDefault()
		})

		const fieldsetList = Array.from(formElement.querySelectorAll('.popup__fieldset'))

		fieldsetList.forEach(fieldSet => {
			setEventListeners(fieldSet)
		})
	})
}

// Вызовем функцию
enableValidation()

///////////////////////////////////////////////////////

// ФОРМА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
// функция-обработчик события открытия модального окна для редактирования профиля
editButton.addEventListener('click', evt => {
	evt.stopPropagation()
	nameInput.value = profileTitle.textContent
	jobInput.value = profileDescription.textContent
	openModal(editPopup)
})

// обработчик отправки формы редактирования профиля, хотя пока она никуда отправляться не будет
function handleFormEditSubmit(evt) {
	evt.preventDefault()
	const nameValue = nameInput.value
	const descriptionValue = jobInput.value

	profileTitle.textContent = nameValue
	profileDescription.textContent = descriptionValue
	closeModal(editPopup)
	formEditProfile.reset()
}

formEditProfile.addEventListener('submit', handleFormEditSubmit)

// ФОРМА СОЗДАНИЯ НОВОЙ КАРТОЧКИ
addButton.addEventListener('click', evt => {
	evt.stopPropagation()
	openModal(addCardPopup)
})

// функция добавления новой карточки в начало страницы
function handleImgSubmit(evt, ul, template) {
	evt.preventDefault()
	const namePlaceValue = namePlaceInput.value
	const linkValue = linkInput.value

	const newCardObj = {
		name: namePlaceValue,
		link: linkValue,
	}
	ul.prepend(addCard(template, newCardObj, deleteCard, likeCard, openImgModal))
}

formNewPlace.addEventListener('submit', evt => {
	evt.stopPropagation()
	handleImgSubmit(evt, cardList, cardTemplate)
	closeModal(addCardPopup)
	formNewPlace.reset()
})

// функция открытия модального окна изображения карточки.
function openImgModal(img) {
	modalImg.src = img.src
	modalImg.alt = img.alt
	modalCaption.textContent = img.alt
	openModal(modalTypeImg)
}

// ЗАКРЫТИЕ ПОПАПОВ ПО КРЕСТИКУ
const closeButtons = document.querySelectorAll('.popup__close')
closeButtons.forEach(button => {
	button.addEventListener('click', evt => {
		const popup = evt.target.closest('.popup')
		closeModal(popup)
	})
})

initialCards.forEach(function (item) {
	cardList.append(
		addCard(cardTemplate, item, deleteCard, likeCard, openImgModal)
	)
})
