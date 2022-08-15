'use strict';

const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');
const userList = document.getElementById('user-list');

let userArr = [];

const getRandomUser = async function () {
  const res = await fetch(`https://randomuser.me/api`);
  const data = await res.json();
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);

  updateDOM();
};

const addData = function (obj) {
  userArr.push(obj);
};

const clearHTML = function (parentEl) {
  while (parentEl.firstChild) {
    parentEl.removeChild(parentEl.firstChild);
  }
};

const formatAsMoney = function (num) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(num);
};

const updateDOM = function (providedData = userArr) {
  clearHTML(userList);

  providedData.forEach(user => {
    const markup = `
    <div class="person"><strong>${user.name}</strong> ${formatAsMoney(
      user.money
    )}</div>
    `;

    userList.insertAdjacentHTML('beforeend', markup);
  });
};

const doubleMoney = function () {
  userArr = userArr.map(user => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
};

const sortByRichest = function () {
  userArr = userArr.sort((a, b) => b.money - a.money);
  updateDOM();
};

const showMillionaires = function () {
  userArr = userArr.filter(user => user.money > 1000000);
  updateDOM();
};

const calculateWealth = function () {
  const totalWealth = userArr.reduce((acc, user) => (acc += user.money), 0);
  const markup = `
  <h3>Total Wealth: <strong>${formatAsMoney(totalWealth)}</strong></h3>
  `;
  main.insertAdjacentHTML('beforeend', markup);
};

getRandomUser();

addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
