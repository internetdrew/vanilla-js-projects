const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// const showErrorStatus = function (inputField, message) {
//   const formControl = inputField.parentElement;
//   formControl.className = 'form-control error';
//   const small = formControl.querySelector('small');
//   small.textContent = message;
// };

// const showSuccessStatus = function (inputField) {
//   const formControl = inputField.parentElement;
//   formControl.className = 'form-control success';
// };

const showInputStatus = function (input, errorMsg) {
  const formControl = input.parentElement;

  if (!errorMsg) {
    formControl.className = 'form-control success';
  }

  if (errorMsg) {
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.textContent = errorMsg;
  }
};

const checkEmail = function (input) {
  if (input.value === '') return showInputStatus(input, 'Email is required');
  String(input.value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    ? showInputStatus(input)
    : showInputStatus(input, `Email address is invalid`);
};

const getFieldName = function (input) {
  const fieldName = input.id.charAt(0).toUpperCase() + input.id.slice(1);

  if (fieldName === 'Password2') return 'Password confirmation';
  return fieldName;
};

// Check required fields
const checkRequired = function (inputArr) {
  inputArr.forEach(input => {
    if (input.value.trim() === '') {
      showInputStatus(input, `${getFieldName(input)} is required`);
    }
  });
};

// Check input length
const checkLength = function (input, min, max) {
  if (input.value.length === 0) return;

  if (input.value.length < min)
    return showInputStatus(
      input,
      `${getFieldName(input)} must be at least ${min} characters long.`
    );

  if (input.value.length > max)
    return showInputStatus(
      input,
      `${getFieldName(input)} must be less than ${max} characters.`
    );

  showInputStatus(input);
};

// Check for matching passwords
const checkPasswordMatch = function (input1, input2) {
  if (input1.value !== input2.value) {
    showInputStatus(input2, 'Passwords do not match');
  }
};

const submitForm = function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkLength(password2, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, password2);
};

// Event listener
form.addEventListener('submit', submitForm);
