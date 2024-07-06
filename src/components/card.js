// в файле card.js описаны функции для работы с карточками:
// функция создания карточки,
// функции-обработчики событий удаления и лайка карточки;

function addCard(cardTemplate, card, deleteCard, likeCard, openImgModal) {
	const cardElement = cardTemplate
		.querySelector('.places__item')
		.cloneNode(true)

	const cardImage = cardElement.querySelector('.card__image')
	cardImage.src = card.link
	cardImage.alt = card.name
	cardElement.querySelector('.card__title').textContent = card.name

	cardImage.addEventListener('click', evt => {
		evt.stopPropagation()
		openImgModal(cardImage)
	})

	const deleteButton = cardElement.querySelector('.card__delete-button')
	deleteButton.addEventListener('click', evt => {
		deleteCard(cardElement)
	})

	const likeButton = cardElement.querySelector('.card__like-button')
	likeButton.addEventListener('click', evt => {
		likeCard(likeButton)
	})

	return cardElement
}

function deleteCard(el) {
	el.remove()
}

function likeCard(button) {
	button.classList.toggle('card__like-button_is-active')
}

export { addCard, deleteCard, likeCard }
