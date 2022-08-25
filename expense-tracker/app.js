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

// Add transactions to DOM list
const addTransactionsToDOM = function () {
  clearHTMLFrom(list);

  transactions.forEach(transaction => {
    const sign = transaction.amount < 0 ? '-' : '+';

    const html = `
     <li class="${transaction.amount < 0 ? 'minus' : 'plus'}">
      ${
        transaction.text.charAt(0).toUpperCase() + transaction.text.slice(1)
      } <span>${sign}${Math.abs(
      transaction.amount
    )}</span><button class="delete-btn">x</button>
     </li>
  `;

    list.insertAdjacentHTML('afterbegin', html);
  });
};

window.addEventListener('load', addTransactionsToDOM);
