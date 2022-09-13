'use strict';

const msgEl = document.getElementById('message');
const box = document.querySelector('.box');
const body = document.querySelector('body');
const playAgain = document.getElementById('play-again');

const clearChildElsFrom = function (parentEl) {
  while (parentEl.firstChild) parentEl.removeChild(parentEl.firstChild);
};

const getRandomNumber = function () {
  return Math.floor(Math.random() * 100) + 1;
};

const randomNum = getRandomNumber();
console.log(randomNum);

const writeMsg = function (msg) {
  clearChildElsFrom(msgEl);

  const markup = `
    <div>You said:</div>
      <span class="box">${msg}</span>
  `;

  msgEl.insertAdjacentHTML('beforeend', markup);
};

const checkNumber = function (msg) {
  const num = +msg;

  if (Number.isNaN(num)) {
    const markup = `
   <div id="msg-text">That is not a number. Try again.</div>
   `;

    msgEl.insertAdjacentHTML('beforeend', markup);
    return;
  }

  if (num > 100 || num < 1) {
    const markup = `
   <div id="msg-text">The number must be between 1 and 100. Try again.</div>
   `;

    msgEl.insertAdjacentHTML('beforeend', markup);
    return;
  }

  if (num > randomNum || num < randomNum) {
    const markup = `
   <div id="msg-text">Too ${num > randomNum ? 'high' : 'low'}. Try again.</div>
   `;

    msgEl.insertAdjacentHTML('beforeend', markup);
    return;
  }

  if (num === randomNum) {
    const markup = `
   <h2>Congrats! You guessed the number! <br /><br />
   It was ${randomNum}!</h2>
   <button class="play-again" id="play-again">Play again</button>
   `;

    clearChildElsFrom(body);
    body.insertAdjacentHTML('beforeend', markup);
  }
};

// Capture user speak
const onSpeak = function (e) {
  const msg = e.results[0][0].transcript;

  writeMsg(msg);
  checkNumber(msg);
};

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

// Speak the result
recognition.addEventListener('result', onSpeak);
recognition.addEventListener('end', () => recognition.start());

body.addEventListener('click', e => {
  if (e.target.id === 'play-again') window.location.reload();
});
