const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show suucess outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Event listeners
form.addEventListener('submit', function (e) {
  e.preventDefault();

  username.value === ''
    ? showError(username, 'Username is required')
    : showSuccess(username);

  email.value === ''
    ? showError(email, 'Email is required')
    : showSuccess(email);

  password.value === ''
    ? showError(password, 'Password is required')
    : showSuccess(password);

  password2.value === ''
    ? showError(password2, 'Password 2 is required')
    : showSuccess(password2);
});
