const config = {
	baseUrl: 'https://nomoreparties.co/v1/wff-cohort-19',
	headers: {
		authorization: 'dfdf6d16-1fe4-4d3c-ac1e-4aed0a2c7236',
		'Content-Type': 'application/json',
	},
}

const handleResponse = res => {
	if (res.ok) {
		return res.json()
	}
	return Promise.reject(`Ошибка: ${res.status}`)
}

// Загрузка информации о пользователе с сервера
export const getDataUser = () => {
	return fetch(`${config.baseUrl}/users/me`, {
		headers: config.headers,
	}).then(handleResponse)
}

export const getInitialCards = () => {
	return fetch(`${config.baseUrl}/cards`, {
		headers: config.headers,
	}).then(handleResponse)
}

// изменение аватара
export const editAvatar = avatarLink => {
	return fetch(`${config.baseUrl}/users/me/avatar`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			avatar: avatarLink.avatar,
		}),
	}).then(handleResponse)
}

export const editedUserData = updateProfileData => {
	return fetch(`${config.baseUrl}/users/me`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			name: updateProfileData.name,
			about: updateProfileData.about,
		}),
	}).then(handleResponse)
}

// Добавление новой карточки
export const addNewCard = newCardData => {
	return fetch(`${config.baseUrl}/cards`, {
		headers: config.headers,
		method: 'POST',
		body: JSON.stringify({
			name: newCardData.name,
			link: newCardData.link,
		}),
	}).then(handleResponse)
}

// удаление карточки
export const deleteCard = card => {
	return fetch(`${config.baseUrl}/cards/${card._id}`, {
		headers: config.headers,
		method: 'DELETE',
	}).then(handleResponse)
}

export const likeCard = cardId => {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		headers: config.headers,
		method: 'PUT',
	}).then(handleResponse)
}

export const deleteLikeCard = cardId => {
	return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
		headers: config.headers,
		method: 'DELETE',
	}).then(handleResponse)
}
