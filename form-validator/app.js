const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showErrorStatus(inputField, message) {
  const formControl = inputField.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

function showSuccessStatus(inputField) {
  const formControl = inputField.parentElement;
  formControl.className = 'form-control success';
}

function checkEmailValidity(inputField) {
  if (inputField.value !== '') {
    String(inputField.value)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
      ? showSuccessStatus(inputField)
      : showErrorStatus(inputField, 'Email is invalid');
  }
}

function checkRequired(inputFieldArr) {
  inputFieldArr.forEach((inputField) => {
    if (inputField.value.trim() === '') {
      showErrorStatus(inputField, `${getFieldName(inputField)} is required`);
    } else {
      showSuccessStatus(inputField);
    }
  });
}

function checkInputLength(inputField, min, max) {
  if (inputField.value.length < min) {
    showErrorStatus(
      inputField,
      `${getFieldName(inputField)} must be at least ${min} characters.`
    );
  } else if (inputField.value.length > max) {
    showErrorStatus(
      inputField,
      `${getFieldName(inputField)} should be less than ${max} characters.`
    );
  }
}

function checkPasswordsMatch(inputField1, inputField2) {
  if (inputField1.value !== '' && inputField2.value !== '') {
    if (inputField1.value !== inputField2.value) {
      showErrorStatus(inputField1, 'Passwords do not match');
      showErrorStatus(inputField2, 'Passwords do not match');
    } else {
      showSuccessStatus(inputField1);
      showSuccessStatus(inputField2);
    }
  }
}

function getFieldName(inputField) {
  return inputField.id.charAt(0).toUpperCase() + inputField.id.slice(1);
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkInputLength(username, 3, 15);
  checkInputLength(password, 6, 25);
  checkEmailValidity(email);
  checkPasswordsMatch(password, password2);
});
