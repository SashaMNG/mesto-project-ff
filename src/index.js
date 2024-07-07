import { addCard, deleteCard, likeCard } from './components/card'
import { initialCards } from './components/cards'
import { closeModal, openModal } from './components/modal'
import './pages/index.css'

// в файле index.js описана инициализация приложения и основная логика страницы:
// - поиск DOM-элементов на странице и навешивание на них обработчиков событий;
// - обработчики отправки форм,
// - функция-обработчик события открытия модального окна для редактирования профиля;
// - функция открытия модального окна изображения карточки.
// Также в index.js находится код, который отвечает за отображение шести карточек при открытии страницы.

const cardList = document.querySelector('.places__list')
const cardTemplate = document.querySelector('#card-template').content

// функция-обработчик события открытия модального окна для редактирования профиля
const editPopup = document.querySelector('.popup_type_edit')
const editButton = document.querySelector('.profile__edit-button')

const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')
const nameInput = document.querySelector('input[name="name"]')
const jobInput = document.querySelector('input[name="description"]')

editButton.addEventListener('click', evt => {
	evt.stopPropagation()
	nameInput.value = profileTitle.textContent
	jobInput.value = profileDescription.textContent
	openModal(editPopup)
})

const addCardPopup = document.querySelector('.popup_type_new-card')
const addButton = document.querySelector('.profile__add-button')
addButton.addEventListener('click', evt => {
	evt.stopPropagation()
	openModal(addCardPopup)
})

// функция открытия модального окна изображения карточки.
const modalTypeImg = document.querySelector('.popup_type_image')
const modalImg = modalTypeImg.querySelector('.popup__image')
const modalCaption = modalTypeImg.querySelector('.popup__caption')

function openImgModal(img) {
	modalImg.src = img.src
	modalImg.alt = img.alt
	modalCaption.textContent = img.alt
	openModal(modalTypeImg)
}

const closeButtons = document.querySelectorAll('.popup__close')
closeButtons.forEach(button => {
	button.addEventListener('click', evt => {
		const popup = evt.target.closest('.popup')
		closeModal(popup)
	})
})

// обработчик отправки формы редактирования профиля, хотя пока она никуда отправляться не будет
const formEditProfile = document.querySelector('form[name="edit-profile"]')

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

// функция добавления новой карточки в начало страницы
const formNewPlace = document.querySelector('form[name="new-place"]')
const namePlaceInput = document.querySelector('input[name="place-name"]')
const linkInput = document.querySelector('input[name="link"]')

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

initialCards.forEach(function (item) {
	cardList.append(
		addCard(cardTemplate, item, deleteCard, likeCard, openImgModal)
	)
})
