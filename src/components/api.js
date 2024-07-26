// функция создания карточки принимает в качестве параметров данные карточки,
// функции обработки её событий и id текущего пользователя;

// Когда самые простые запросы написаны, переходите к запросам другого типа. Мы рекомендуем взяться за POST-запросы. С ними связана работа модальных окон приложения, например создания карточки. Здесь задача сложнее, ведь перед написанием fetch()-запроса нужно взять из полей ввода данные и передать их в функцию, которая выполняет запрос к серверу. В остальном логика работы такая же, как и с GET-запросами: сервер прислал какие-то данные, а вы их отрисовали в DOM.

// Напоследок оставьте PATCH- и DELETE-запросы.

const config = {
	baseUrl: 'https://nomoreparties.co/v1/wff-cohort-19',
	headers: {
		authorization: 'dfdf6d16-1fe4-4d3c-ac1e-4aed0a2c7236',
		'Content-Type': 'application/json',
	},
}

const handleResponse = (res) => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

export const getInitialCards = () => {
	return fetch(`${config.baseUrl}/cards`, {
		headers: config.headers,
	})
		.then(handleResponse)
		.then(initialCards => {
			return initialCards
		})
		.catch(err => {
			return err
		})
}

export const getIdUsers = () => {
	return fetch(`${config.baseUrl}/users/me`, {
		headers: config.headers,
	})
		.then(res => {
			if (res.ok) {
				return res.json()
			}
			return Promise.reject(`Ошибка: ${res.status}`)
		})
		.then(userId => {
			return userId
		})
		.catch(err => {
			return err
		})
}

export const editedUserData = () => {
	return fetch(`${config.baseUrl}/users/me`, {
		method: 'PATCH',
		headers: config.headers,
		body: JSON.stringify({
			name: 'Aleksandra',
			about: 'frontend'
		})
	})
		.then(res => {
			return res.json()
		})
		.then(userData => {
			console.log(userData)
		})
		.catch(err => {
			return err
		})
}

export const addNewCard = () => {
	return fetch(`${config.baseUrl}/cards`, {
		headers: config.headers,
		method: 'POST',
		body: JSON.stringify({
			name: 'Калининград',
			link: 'https://images.unsplash.com/photo-1665918610757-0313b714f8df?q=80&w=2268&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		}),
	})
		.then(res => {
			return res.json()
		})
		.then(newCard => {
			console.log(newCard)
		})
		.catch(err => {
			return err
		})
}
