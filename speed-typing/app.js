'use strict';

const wordEl = document.getElementById('word'),
  text = document.getElementById('text'),
  scoreEl = document.getElementById('score'),
  timeEl = document.getElementById('time'),
  endGameEl = document.getElementById('end-game'),
  settingsBtn = document.getElementById('settings-btn'),
  settings = document.getElementById('settings'),
  settingsForm = document.getElementById('settings-form'),
  difficultySelect = document.getElementById('difficulty');

const game = {
  score: 0,
  time: 10,
};

const getRandomWord = async function () {
  const res = await fetch('https://random-word-api.herokuapp.com/word');
  if (!res.ok) throw new Error('Trouble getting response from API');

  const [word] = await res.json();
  return word;
};

const addWordToDOM = async function () {
  const word = await getRandomWord();
  wordEl.textContent = word;
};

addWordToDOM();
