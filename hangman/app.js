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

const clearElementsFrom = function (parentEl) {
  while (parentEl.firstChild) {
    parentEl.removeChild(parentEl.firstChild);
  }
};

const showPopup = function () {
  popup.style.display = 'flex';
};

const updateWrongLettersEl = function () {
  clearElementsFrom(wrongLettersEl);

  const html = `
 ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''} 
 ${wrongLetters.map(
   (letter, index) => `<span>${index === 0 ? letter : ` ${letter}`}</span>`
 )}
 `;

  wrongLettersEl.insertAdjacentHTML('afterbegin', html);
};

const showNotification = function () {
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
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

  clearElementsFrom(wordEl);
  wordEl.insertAdjacentHTML('afterbegin', html);

  const innerWord = wordEl.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    finalMessage.textContent = 'Congratulations! You won!';
    showPopup();
  }
};

const handleLetter = function (e) {
  if (e.code !== `Key${e.key.toUpperCase()}`) return;

  const letter = e.key;

  if (correctLetters.includes(letter) || wrongLetters.includes(letter))
    return showNotification();

  if (selectedWord.includes(letter) && !correctLetters.includes(letter)) {
    correctLetters.push(letter);
    displayWord();
  }

  if (!selectedWord.includes(letter) && !wrongLetters.includes(letter)) {
    wrongLetters.push(letter);
    updateWrongLettersEl();
  }
};

window.addEventListener('load', displayWord);
window.addEventListener('keydown', handleLetter);
