// открытие попапов openModal
function openModal(popup) {
	popup.classList.add('popup_is-opened')
	popup.classList.add('popup_is-animated')
	popup.addEventListener('click', handleClickOverlay)
	document.addEventListener('keydown', handlePressEsc)
}

function closeModal(popup) {
	popup.classList.remove('popup_is-opened')
	popup.removeEventListener('click', handleClickOverlay)
	document.removeEventListener('keydown', handlePressEsc)
}

// функция-обработчик события клика по оверлею
function handleClickOverlay(evt) {
	evt.stopPropagation()

	if (evt.target.classList.contains('popup_is-opened')) {
		closeModal(evt.target.closest('.popup'))
	}
}

// функция-обработчик события нажатия Esc
function handlePressEsc(evt) {
	evt.stopPropagation()

	if (evt.code === 'Escape') {
		const popupIsOpened = document.querySelector('.popup_is-opened')
		closeModal(popupIsOpened)
	}
}

export { closeModal, openModal }
