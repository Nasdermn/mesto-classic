function showInputError(form, input, errorMessage, config) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  error.textContent = errorMessage;
  error.classList.add(config.errorClass);
}

function hideInputError(form, input, config) {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  error.textContent = '';
  error.classList.remove(config.errorClass);
}

function isValid(form, input, config) {
    if (input.validity.valid) {
      hideInputError(form, input, config);
    }
    else{
      showInputError(form, input, input.validationMessage, config);
    }
}

function setEventListeners(form, config) {
  const inputs = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.buttonSelector);
  toggleButtonState(inputs, button, config);
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      isValid(form, input, config);
      toggleButtonState(inputs, button, config);
    });
  });
}

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, button, config) {
  if (hasInvalidInput(inputList)) {
    button.classList.add(config.inactiveButtonSelector);
    button.disabled = true;
  }
  else {
    button.classList.remove(config.inactiveButtonSelector);
    button.disabled = false;
  }
}