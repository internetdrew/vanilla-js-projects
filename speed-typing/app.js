'use strict';

const wordEl = document.getElementById('word'),
  text = document.getElementById('text'),
  scoreEl = document.querySelector('.score-container'),
  timeEl = document.getElementById('time'),
  endGameEl = document.getElementById('end-game'),
  settingsBtn = document.getElementById('settings-btn'),
  settings = document.getElementById('settings'),
  settingsForm = document.getElementById('settings-form'),
  difficultySelect = document.getElementById('difficulty');

const game = {
  score: 0,
  time: 10,
  words: [],
  wordCount: 50,
  activeWord: '',
  difficulty: difficultySelect.value,
};

const fetchWordsArr = async function () {
  const res = await fetch(
    `https://random-word-api.herokuapp.com/word?number=${game.wordCount}`
  );
  if (!res.ok) throw new Error('Trouble getting response from API');

  const wordsArr = await res.json();
  return wordsArr;
};

const addWordsToGame = async function () {
  game.words = await fetchWordsArr();
};

const getRandomWord = function () {
  const word = game.words[Math.floor(Math.random() * game.words.length)];
  game.activeWord = word;
  return word;
};

const addWordToDOM = function () {
  const word = getRandomWord();
  wordEl.textContent = word;
};

const increaseScore = function () {
  game.score++;
  scoreEl.querySelector('span').textContent = game.score;
};

const init = async function () {
  fetchWordsArr();
  await addWordsToGame();
  text.focus();
  getRandomWord();
  addWordToDOM();
};

const handleInput = function (e) {
  const insertedText = e.target.value;

  if (insertedText === game.activeWord) {
    addWordToDOM();
    increaseScore();
    e.target.value = '';
  }
};

const changeDifficulty = function (e) {
  game.difficulty = e.target.value;
};

window.addEventListener('load', init);
text.addEventListener('input', handleInput);
difficultySelect.addEventListener('change', changeDifficulty);
