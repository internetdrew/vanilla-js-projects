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
  while (parentEl.firstChild) {
    parentEl.removeChild(parentEl.firstChild);
  }
};

// Show the hidden word
const displayWord = function () {
  const html = `
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
  wordEl.insertAdjacentHTML('afterbegin', html);

  const innerWord = wordEl.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    finalMessage.textContent = 'Congratulations! You won!';
    popup.style.display = 'flex';
  }
};

const handleLetter = function (e) {
  if (e.code !== `Key${e.key.toUpperCase()}`) return;

  const letter = e.key;

  if (selectedWord.includes(letter) && !correctLetters.includes(letter)) {
    correctLetters.push(letter);
    displayWord();
  }

  if (!selectedWord.includes(letter)) wrongLetters.push(letter);
};

window.addEventListener('keydown', handleLetter);

displayWord();
