import {
	likeCard,
	deleteLikeCard,
	addNewCard,
	deleteCard,
	editAvatar,
	editedUserData,
	getDataUser,
	getInitialCards,
} from './components/api'
import { addCard } from './components/card'
import { closeModal, openModal } from './components/modal'
import { clearValidation, enableValidation } from './components/validation'
import './pages/index.css'

// объект с настройками валидации
const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible',
}

const cardList = document.querySelector('.places__list')
const cardTemplate = document.querySelector('#card-template').content
const saveButton = document.querySelector('.popup__button')
let myId

// переменные для аватарки
const profileImage = document.querySelector('.profile__image')
const avatarPopup = document.querySelector('.popup_type_avatar')
const formAvatar = document.querySelector('form[name="avatar"]')
const avatarInput = formAvatar.querySelector('.popup__input_type_avatar')

profileImage.addEventListener('click', evt => {
	evt.stopPropagation()
	clearValidation(formAvatar, validationConfig)
	openModal(avatarPopup)
})
formAvatar.addEventListener('submit', handleFormAvatarSubmit)

function handleFormAvatarSubmit(evt) {
	evt.preventDefault()
	renderLoading(true, saveButton)

	const avatarLink = {
		avatar: avatarInput.value,
	}

	editAvatar(avatarLink)
		.then(data => {
			renderAvatar(data)
			closeModal(avatarPopup)
		})
		.catch(err => console.log(err))
		.finally(() => renderLoading(false, saveButton))
}

// загружаем аватар на основе данных с  сервера
function renderAvatar(data) {
	profileImage.style.backgroundImage = `url(${data.avatar})`
}

// <---------------------------------------------------->

// переменные для формы редактирования профиля
const editPopup = document.querySelector('.popup_type_edit')
const editButton = document.querySelector('.profile__edit-button')
const profileTitle = document.querySelector('.profile__title')
const profileDescription = document.querySelector('.profile__description')

const formEditProfile = document.querySelector('form[name="edit-profile"]')
const nameInput = formEditProfile.querySelector('.popup__input_type_name')
const jobInput = formEditProfile.querySelector('.popup__input_type_description')

editButton.addEventListener('click', openModalEditProfile)
formEditProfile.addEventListener('submit', handleFormEditSubmit)

function openModalEditProfile() {
	nameInput.value = profileTitle.textContent
	jobInput.value = profileDescription.textContent
	clearValidation(formEditProfile, validationConfig)
	openModal(editPopup)
}

function handleFormEditSubmit(evt) {
	evt.preventDefault()
	renderLoading(true, saveButton)

	const updateProfileData = {
		name: nameInput.value,
		about: jobInput.value,
	}
	editedUserData(updateProfileData)
		.then(userData => {
			renderUserData(userData)
			closeModal(editPopup)
		})
		.catch(err => console.log(err))
		.finally(() => renderLoading(false, saveButton))
}

// заполняем профиль на основе данных с сервера
function renderUserData(userData) {
	profileTitle.textContent = userData.name
	profileDescription.textContent = userData.about
	renderAvatar(userData)
}

// <--------------------------------------------------->

// переменные для формы добавления новой карточки
const addCardPopup = document.querySelector('.popup_type_new-card')
const addButton = document.querySelector('.profile__add-button')

const formNewPlace = document.querySelector('form[name="new-place"]')
const namePlaceInput = formNewPlace.querySelector(
	'.popup__input_type_card-name'
)
const linkInput = formNewPlace.querySelector('.popup__input_type_url')

// слушатель кнопки открытия попапа для добавления новой карточки
addButton.addEventListener('click', evt => {
	evt.stopPropagation()
	clearValidation(formNewPlace, validationConfig)
	openModal(addCardPopup)
})

formNewPlace.addEventListener('submit', evt => {
	evt.stopPropagation()
	handleNewCardSubmit(evt)
	closeModal(addCardPopup)
	document.querySelector('.popup__button').disabled = true
	clearValidation(formNewPlace, validationConfig)
	formNewPlace.reset()
})

// функция добавления новой карточки в начало страницы
function handleNewCardSubmit(evt) {
	evt.preventDefault()
	renderLoading(true, saveButton)

	const namePlaceValue = namePlaceInput.value
	const linkValue = linkInput.value

	const newCardData = {
		name: namePlaceValue,
		link: linkValue,
	}
	addNewCard(newCardData)
		.then(data => {
			cardList.prepend(
				addCard(myId, data, cardTemplate, openImgModal, openModalDeleteCard, handleLike)
			)
		})
		.catch(err => {
			console.log(err)
		})
		.finally(() => renderLoading(false, saveButton))
}

// <----------------------------------------------------------->

// переменные для открытия попапа с картинкой
const modalTypeImg = document.querySelector('.popup_type_image')
const modalImg = modalTypeImg.querySelector('.popup__image')
const modalCaption = modalTypeImg.querySelector('.popup__caption')

// функция открытия модального окна изображения карточки
function openImgModal(img) {
	modalImg.src = img.src
	modalImg.alt = img.alt
	modalCaption.textContent = img.alt
	openModal(modalTypeImg)
}

// <---------------------------------------------------------->

// переменные для попапа удаления карточки по корзине
const deleteCardPopup = document.querySelector('.popup_type_delete-card')
let cardDelete
let cardElementDelete
const deleteCardButton = document.querySelector('.popup__button_delete-card')

// функция открытия попапа для удаления карточки
function openModalDeleteCard(card, cardElement) {
	cardDelete = card
	cardElementDelete = cardElement
	openModal(deleteCardPopup)
}

// функция обработчик удаления карточки
function handleDeleteCard(evt, card, cardElement) {
	evt.preventDefault()
	deleteCard(card)
		.then(() => cardElement.remove())
		.catch(err => console.log(err))
}

// удаление карточки по кнопке согласия "да"
deleteCardButton.addEventListener('click', evt => {
	evt.stopPropagation()
	handleDeleteCard(evt, cardDelete, cardElementDelete)
	closeModal(deleteCardPopup)

})


// функция для постановки и снятия лайка
function handleLike(button, cardId, countLikes) {
	const likeMethod = button.classList.contains('card__like-button_is-active')
		? deleteLikeCard
		: likeCard
	likeMethod(cardId)
		.then(cardData => {
			countLikes(cardData.likes)
			button.classList.toggle('card__like-button_is-active')
		})
		.catch(err => console.log(err))
}

// <--------------------------------------------------->
// ЗАКРЫТИЕ ПОПАПОВ ПО КРЕСТИКУ
// все кнопки закрытия попапов
const closeButtons = document.querySelectorAll('.popup__close')

closeButtons.forEach(button => {
	button.addEventListener('click', evt => {
		const popup = evt.target.closest('.popup')
		closeModal(popup)
	})
})

// отображение загрузки
function renderLoading(isLoading, button) {
	if (isLoading) {
		button.textContent = 'Сохранение...'
	} else {
		button.textContent = 'Сохранить'
	}
}

// функция отрисовки всех карточек на странице
function renderCards(initialCards) {
	initialCards.forEach(cardData => {
		cardList.append(
			addCard(myId, cardData, cardTemplate, openImgModal, openModalDeleteCard, handleLike)
		)
	})
}

// включение валидации всех форм
enableValidation(validationConfig)

// когда оба запроса будут выполнены, отрисуются карточки
Promise.all([getInitialCards(), getDataUser()])
	.then(([cards, userData]) => {
		// id нужен для проверки на свой лайк и корзины
		myId = userData._id
		renderCards(cards)
		renderUserData(userData)
	})
	.catch(err => {
		console.log(err)
	})
