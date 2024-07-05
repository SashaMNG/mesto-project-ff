import { initialCards } from './components/cards'
import './pages/index.css'
import { openModal, closeModal } from './components/modal'
import { addCard, deleteCard, likeCard } from './components/card'

// в файле index.js описана инициализация приложения и основная логика страницы: 
// - поиск DOM-элементов на странице и навешивание на них обработчиков событий; 
// - обработчики отправки форм, 
// - функция-обработчик события открытия модального окна для редактирования профиля; 
// - функция открытия модального окна изображения карточки. 
// Также в index.js находится код, который отвечает за отображение шести карточек при открытии страницы.

const cardList = document.querySelector('.places__list')
const cardTemplate = document.querySelector('#card-template').content

// - функция-обработчик события открытия модального окна для редактирования профиля
const editPopup = document.querySelector('.popup_type_edit')
const editButton = document.querySelector('.profile__edit-button')

editButton.addEventListener('click', evt => {
	evt.stopPropagation()
	// nameInput.value = profileTitle.textContent
	// jobInput.value = profileDescription.textContent
	openModal(editPopup)
})

const addCardPopup = document.querySelector('.popup_type_new-card')
const addButton = document.querySelector('.profile__add-button')
addButton.addEventListener('click', evt => {
	evt.stopPropagation()
	openModal(addCardPopup)
})

// - функция открытия модального окна изображения карточки. 
function openImgModal(img) {
	const modalTypeImg = document.querySelector('.popup_type_image')
	const modalImg = modalTypeImg.querySelector('.popup__image')
	modalImg.src = img.src
	modalImg.alt = img.alt
	const modalCaption = modalTypeImg.querySelector('.popup__caption')
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

// // ФОРМЫ
// // - обработчик отправки формы редактирования профиля
// // Находим форму в DOM
// const formElement = document.querySelector('form[name="edit-profile"]')
// // Находим поля формы в DOM
// const nameInput = document.querySelector('input[name="name"]')
// const jobInput = document.querySelector('input[name="description"]')

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
// function handleFormSubmit(evt) {
// 	evt.preventDefault()
// 	// Получите значение полей jobInput и nameInput из свойства value
// 	const nameValue = nameInput.value
// 	const descriptionValue = jobInput.value
// 	// // Выберите элементы, куда должны быть вставлены значения полей
// 	const profileTitle = document.querySelector('.profile__title')
// 	const profileDescription = document.querySelector('.profile__description')
// 	// Вставьте новые значения с помощью textContent
// 	profileTitle.textContent = nameValue
// 	profileDescription.textContent = descriptionValue

// 	// formElement.reset();
// }

// // Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
// formElement.addEventListener('submit', handleFormSubmit)



initialCards.forEach(function (item) {
	cardList.append(addCard(cardTemplate, item, deleteCard, likeCard, openImgModal))
})
