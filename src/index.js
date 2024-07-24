import { addCard, deleteCard, likeCard } from './components/card'
import { initialCards } from './components/cards'
import { closeModal, openModal } from './components/modal'
import { clearValidation, enableValidation } from './components/validation'
import './pages/index.css'

const cardList = document.querySelector('.places__list')
const cardTemplate = document.querySelector('#card-template').content

// переменные для формы редактирования профиля
const editPopup = document.querySelector('.popup_type_edit')
const editButton = document.querySelector('.profile__edit-button')
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

const formEditProfile = document.querySelector('form[name="edit-profile"]')
const nameInput = formEditProfile.querySelector('.popup__input_type_name')
const jobInput = formEditProfile.querySelector('.popup__input_type_description')

const form = document.querySelector('.popup__form')
const formInput = form.querySelector('.popup__input')
// const formError = form.querySelector(`.${formInput.id}-error`)

// переменные для формы добавления новой карточки
const addCardPopup = document.querySelector('.popup_type_new-card')
const addButton = document.querySelector('.profile__add-button')

const formNewPlace = document.querySelector('form[name="new-place"]')
const namePlaceInput = formNewPlace.querySelector(
	'.popup__input_type_card-name'
)
const linkInput = formNewPlace.querySelector('.popup__input_type_url')

// переменные для открытия попапа с картинкой
const modalTypeImg = document.querySelector('.popup_type_image')
const modalImg = modalTypeImg.querySelector('.popup__image')
const modalCaption = modalTypeImg.querySelector('.popup__caption')

// все кнопки закрытия попапов
const closeButtons = document.querySelectorAll('.popup__close')

// объект с настройками валидации
const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible',
}

// включение валидации всех форм
enableValidation(validationConfig)

// ФОРМА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
// функция-обработчик события открытия модального окна для редактирования профиля
editButton.addEventListener('click', evt => {
	evt.stopPropagation()
	clearValidation(formEditProfile, validationConfig)
	nameInput.value = profileTitle.textContent
	jobInput.value = profileDescription.textContent
	openModal(editPopup)
})

// обработчик отправки формы редактирования профиля, хотя пока она никуда отправляться не будет
function handleFormEditSubmit(evt) {
	evt.preventDefault()
	// clearValidation(formEditProfile, validationConfig);
	const nameValue = nameInput.value
	const descriptionValue = jobInput.value

	profileTitle.textContent = nameValue
	profileDescription.textContent = descriptionValue
	closeModal(editPopup)
	formEditProfile.reset()
}

formEditProfile.addEventListener('submit', handleFormEditSubmit)

// ФОРМА СОЗДАНИЯ НОВОЙ КАРТОЧКИ
// слушатель кнопки открытия попапа для добавления новой карточки
addButton.addEventListener('click', evt => {
	evt.stopPropagation()
	clearValidation(formNewPlace, validationConfig)
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
	document.querySelector('.popup__button').disabled = true
	clearValidation(formNewPlace, validationConfig)
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
closeButtons.forEach(button => {
	button.addEventListener('click', evt => {
		const popup = evt.target.closest('.popup')
		closeModal(popup)
	})
})

initialCards.forEach(item => {
	cardList.append(
		addCard(cardTemplate, item, deleteCard, likeCard, openImgModal)
	)
})
