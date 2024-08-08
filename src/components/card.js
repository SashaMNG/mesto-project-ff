import { deleteLikeCard, likeCard } from './api'

function addCard(myId, card, cardTemplate, openImgModal, openModalDeleteCard) {
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

	if (card.owner._id === myId) {
		deleteButton.addEventListener('click', evt => {
			evt.stopPropagation()
			openModalDeleteCard(card, cardElement)
		})
	} else {
		deleteButton.remove()
	}

	const countLikes = arrLikes => {
		const likeCounter = cardElement.querySelector('.card__like-counter')
		likeCounter.textContent = arrLikes.length
	}

	const likeButton = cardElement.querySelector('.card__like-button')
	likeButton.addEventListener('click', evt => {
		handleLike(evt.target, card._id, countLikes)
	})

	countLikes(card.likes)
	
	return cardElement
}

function handleLike(button, cardId, countLikes) {
	if (!button.classList.contains('card__like-button_is-active')) {
		likeCard(cardId)
			.then(cardData => {
				countLikes(cardData.likes)
				button.classList.add('card__like-button_is-active')
			})
			.catch(err => console.log(err))
	} else {
		deleteLikeCard(cardId)
			.then(cardData => {
				countLikes(cardData.likes)
				button.classList.remove('card__like-button_is-active')
			})
			.catch(err => console.log(err))
	}
}

export { addCard }
