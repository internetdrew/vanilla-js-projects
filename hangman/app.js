'use strict';

const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-btn');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

const clearHTML = function (parentEl) {
  while (parentEl.childElement) {
    parentEl.removeChild(parentEl.childElement);
  }
};

// Show the hidden word
const displayWord = function () {
  const markup = `
 ${selectedWord
   .split('')
   .map(
     letter => `
 <span class="letter">
 ${correctLetters.includes(letter) ? letter : ''}
 </span>
 `
   )
   .join('')}
 `;

  clearHTML(wordEl);
  wordEl.insertAdjacentHTML('afterbegin', markup);
};

displayWord();
