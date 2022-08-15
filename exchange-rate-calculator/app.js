'use strict';
import { API_KEY } from './config.js';

const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.getElementById('amount-one');
const amountEl_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swapBtn = document.getElementById('swap');

const clearHTML = function (parentEl) {
  while (parentEl.firstChild) {
    parentEl.removeChild(parentEl.firstChild);
  }
};
const renderSpinner = function (parentEl) {
  clearHTML(parentEl);
  const html = `
  <ion-icon name="reload-outline" class="spinner"></ion-icon>
  `;
  parentEl.insertAdjacentHTML('afterbegin', html);
};

const renderRate = function () {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  renderSpinner(rateEl);
};

// Fetch exchange rates and update DOM
const calculate = async function () {
  try {
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;
    const amount = amountEl_one.value;

    const myHeaders = new Headers();
    myHeaders.append('apikey', API_KEY);

    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders,
    };

    const res = await fetch(
      `https://api.apilayer.com/currency_data/convert?to=${currency_two}&from=${currency_one}&amount=${amount}`,
      requestOptions
    );
    if (!res.ok) throw new Error('Response not ok.');

    const data = await res.json();

    const rate = data.info.quote;
    rateEl.textContent = `1 ${currency_one} = ${rate.toFixed(
      2
    )} ${currency_two}`;

    amountEl_two.value = amountEl_one.value * rate.toFixed(2);
  } catch (err) {
    console.log(err);
  }
};

// Swap rates
const swapCurrency = function () {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
};

[(currencyEl_one, currencyEl_two)].forEach(el => {
  el.addEventListener('change', calculate);
});

[amountEl_one, amountEl_two].forEach(el =>
  el.addEventListener('input', calculate)
);

swapBtn.addEventListener('click', swapCurrency);
