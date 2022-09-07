'use strict';

const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

const app = {
  currentActiveCard: 0,
  cardsData: [
    {
      question: 'What must a variable begin with?',
      answer: 'A letter, $, or _',
    },
    {
      question: 'What is a variable?',
      answer: 'Container for a piece of data',
    },
    {
      question: 'Example of a case sensitive variable',
      answer: 'thisIsAVariable',
    },
  ],
  cardEls: [],
};

const createCard = function (data, index) {
  const card = `
      <div class="${index === 0 ? 'card active' : 'card'}">
        <div class="inner-card">
          <div class="inner-card-front"><p>${data.question}</p></div>
          <div class="inner-card-back"><p>${data.answer}</p></div>
        </div>
      </div>
 `;

  cardsContainer.insertAdjacentHTML('beforeend', card);
};

const pushCardsToCardEls = function () {
  const cards = cardsContainer.querySelectorAll('.card');
  cards.forEach(card => app.cardEls.push(card));
};

const createCards = function () {
  app.cardsData.forEach((data, index) => createCard(data, index));
};

const toggleShowAnswer = function (e) {
  app.cardEls.forEach(cardEl => cardEl.classList.toggle('show-answer'));
};

const init = function () {
  createCards();
  pushCardsToCardEls();
};

window.addEventListener('load', init);
cardsContainer.addEventListener('click', toggleShowAnswer);
