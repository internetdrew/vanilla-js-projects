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

// Show the hidden word
const displayWord = function () {
  wordEl.innerHTML = `
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
};

displayWord();
