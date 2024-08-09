function addCard(
	myId,
	card,
	cardTemplate,
	openImgModal,
	openModalDeleteCard,
	handleLike
) {
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

export { addCard }
