// Функция, которая добавляет класс с ошибкой
const showInputError = (
	formElement,
	inputElement,
	errorMessage,
	validationConfig
) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
	inputElement.classList.add(validationConfig.inputErrorClass)
	errorElement.textContent = errorMessage
	errorElement.classList.add(validationConfig.errorClass)
}

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement, validationConfig) => {
	const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
	inputElement.classList.remove(validationConfig.inputErrorClass)
	errorElement.classList.remove(validationConfig.errorClass)
	errorElement.textContent = ''
}

// Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement, validationConfig) => {
	if (inputElement.validity.patternMismatch) {
		// встроенный метод setCustomValidity принимает на вход строку
		// и заменяет ею стандартное сообщение об ошибке
		inputElement.setCustomValidity(inputElement.dataset.errorMessage)
	} else {
		// если передать пустую строку, то будут доступны стандартные браузерные сообщения
		inputElement.setCustomValidity('')
	}
	if (!inputElement.validity.valid) {
		// теперь, если ошибка вызвана регулярным выражением, переменная validationMessage хранит наше кастомное сообщение
		showInputError(
			formElement,
			inputElement,
			inputElement.validationMessage,
			validationConfig
		)
	} else {
		// Если проходит, скроем
		hideInputError(formElement, inputElement, validationConfig)
	}
}

const hasInvalidInput = inputList => {
	return inputList.some(inputElement => {
		return !inputElement.validity.valid
	})
}

// функция, которая отвечает за блокировку кнопки «Отправить»
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
	if (hasInvalidInput(inputList)) {
		buttonElement.disabled = true
		buttonElement.classList.add(validationConfig.inactiveButtonClass)
	} else {
		buttonElement.disabled = false
		buttonElement.classList.remove(validationConfig.inactiveButtonClass)
	}
}

const setEventListeners = (formElement, validationConfig) => {
	const inputList = Array.from(
		formElement.querySelectorAll(validationConfig.inputSelector)
	)
	const buttonElement = formElement.querySelector(
		validationConfig.submitButtonSelector
	)
	toggleButtonState(inputList, buttonElement, validationConfig)

	inputList.forEach(inputElement => {
		inputElement.addEventListener('input', () => {
			checkInputValidity(formElement, inputElement, validationConfig)
			toggleButtonState(inputList, buttonElement, validationConfig)
		})
	})
}

const enableValidation = validationConfig => {
	const formList = Array.from(
		document.querySelectorAll(validationConfig.formSelector)
	)

	formList.forEach(formElement => {
		setEventListeners(formElement, validationConfig)
	})
}

const clearValidation = (formElement, validationConfig) => {
	const inputList = Array.from(
		formElement.querySelectorAll(validationConfig.inputSelector)
	)
	const buttonElement = formElement.querySelector(
		validationConfig.submitButtonSelector
	)

	inputList.forEach(inputElement => {
		hideInputError(formElement, inputElement, validationConfig)
	})
	toggleButtonState(inputList, buttonElement, validationConfig)
}

export { clearValidation, enableValidation }
