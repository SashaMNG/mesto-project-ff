const cardList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function addCard(card, deleteCard) {
	const cardElement = cardTemplate
		.querySelector('.places__item')
		.cloneNode(true);

	const cardImage = cardElement.querySelector('.card__image');
	cardImage.src = card.link;
	cardImage.alt = card.name;
	cardElement.querySelector('.card__title').textContent = card.name;

	const deleteButton = cardElement.querySelector('.card__delete-button');
	deleteButton.addEventListener('click', function (evt) {
		deleteCard(cardElement);
	})
	return cardElement;
}

function deleteCard(el) {
	el.remove();
}

initialCards.forEach(function (item) {
	cardList.append(addCard(item, deleteCard));
})
