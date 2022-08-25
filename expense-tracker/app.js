'use strict';

const balance = document.getElementById('balance'),
  money_plus = document.getElementById('money-plus'),
  money_minus = document.getElementById('money-minus'),
  list = document.getElementById('list'),
  form = document.getElementById('form'),
  text = document.getElementById('text'),
  amount = document.getElementById('amount');

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
     <li class="${transaction.amount < 0 ? 'minus' : 'plus'}">
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

const getFieldName = function (input) {
  const fieldName = input.id.charAt(0).toUpperCase() + input.id.slice(1);

  if (fieldName === 'Password2') return 'Password confirmation';
  return fieldName;
};

const showInputStatus = function (inputEl, errorMsg) {
  const formControl = inputEl.parentElement;
  const small = formControl.querySelector('small');

  small.style.visibility = 'visible';
  small.textContent = errorMsg;
};

const addTransaction = function (e) {
  e.preventDefault();

  const [...inputs] = form.querySelectorAll('.form-control input');
  inputs.forEach(input => {
    if (!input.value.trim()) {
      showInputStatus(input);
      return;
    }
  });
};

const init = function () {
  addTransactionsToDOM();
  updateValues();
};

window.addEventListener('load', init);
form.addEventListener('submit', addTransaction);
