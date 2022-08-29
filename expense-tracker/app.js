'use strict';

const balance = document.getElementById('balance'),
  money_plus = document.getElementById('money-plus'),
  money_minus = document.getElementById('money-minus'),
  list = document.getElementById('list'),
  form = document.getElementById('form'),
  text = document.getElementById('text'),
  amount = document.getElementById('amount'),
  [...inputs] = document.querySelectorAll('.form-control input');

const dummyTransactions = [
  { id: 1, text: 'flowers', amount: -20 },
  { id: 2, text: 'car', amount: 300 },
  { id: 3, text: 'liquor', amount: -10 },
  { id: 4, text: 'wool sweater', amount: 150 },
];

let transactions = dummyTransactions;

const clearHTMLFrom = function (parentEl) {
  while (parentEl.firstChild) parentEl.removeChild(parentEl.firstChild);
};

const capFirstLetter = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const formatUSD = function (number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(number);
};

// Add transactions to DOM list
const addTransactionsToDOM = function () {
  clearHTMLFrom(list);

  transactions.forEach(transaction => {
    const sign = transaction.amount < 0 ? '-' : '+';

    const html = `
     <li class="${transaction.amount < 0 ? 'minus' : 'plus'}" data-id="${
      transaction.id
    }">
      ${capFirstLetter(transaction.text)} <span>${
      sign === '+' ? sign : ''
    }${formatUSD(
      transaction.amount
    )}</span><button class="delete-btn">x</button>
     </li>
  `;

    list.insertAdjacentHTML('afterbegin', html);
  });
};

// Update the balance income and expense
const updateValues = function () {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  balance.textContent = `${formatUSD(total)}`;

  const income = amounts
    .filter(amount => amount > 0)
    .reduce((acc, item) => (acc += item), 0);
  money_plus.textContent = `+${formatUSD(income)}`;

  const expense = amounts
    .filter(amount => amount < 0)
    .reduce((acc, item) => (acc += item), 0);
  money_minus.textContent = `${formatUSD(expense)}`;
};

const getFieldName = inputEl =>
  inputEl.id.charAt(0).toUpperCase() + inputEl.id.slice(1);

const showInputStatus = function (inputEl, errorMsg) {
  const formControl = inputEl.parentElement;

  if (!errorMsg) {
    formControl.className = 'form-control success';
  }

  if (errorMsg) {
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.textContent = errorMsg;
  }
};

const checkRequired = function (inputArr) {
  inputArr.forEach(input => {
    if (!input.value.trim()) {
      showInputStatus(input, `${getFieldName(input)} is required.`);
    }

    if (input.value.trim()) showInputStatus(input);
  });
};

const isValidInput = function (input) {
  return input.value !== '';
};

const resetInputs = function () {
  inputs.forEach(input => {
    const formControl = input.parentElement;
    formControl.className = 'form-control';

    input.value = '';
  });
};

const addTransaction = function (e) {
  e.preventDefault();

  checkRequired(inputs);

  const allInputsValid = inputs.every(isValidInput);
  if (!allInputsValid) return;

  const transaction = {
    id: +`${transactions.length + 1}`,
    text: text.value,
    amount: +amount.value,
  };

  transactions.push(transaction);
  resetInputs();
  addTransactionsToDOM();
  updateValues();
};

const removeTransaction = function (e) {
  if (e.target.className === 'delete-btn') {
    const transactionID = +e.target.parentElement.getAttribute('data-id');
    removeTransaction(transactionID);
  }
};

const deleteTransaction = function (id) {};

const init = function () {
  addTransactionsToDOM();
  updateValues();
};

window.addEventListener('load', init);
form.addEventListener('submit', addTransaction);
list.addEventListener('click', deleteTransaction);
