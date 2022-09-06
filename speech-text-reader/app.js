'use strict';

const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textArea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

const app = {
  message: new SpeechSynthesisUtterance(),
  voice: '',
};

const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty",
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry",
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired",
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt",
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy",
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry",
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad",
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared",
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside',
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home',
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School',
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas',
  },
];

const createBox = function (item) {
  const { image, text } = item;

  const box = `
      <div class="box">
        <img src="${image}" alt="${text}" />
        <p class="info">${text}</p>
      </div>
`;

  main.insertAdjacentHTML('beforeend', box);
};

const getVoices = function () {
  const voices = speechSynthesis.getVoices();

  voices.forEach(voice => {
    const voiceOption = `
     <option value="${voice.name}">${voice.name} ${voice.lang}</option>
    `;
    voicesSelect.insertAdjacentHTML('beforeend', voiceOption);
  });
};

const setMsgText = function (text) {
  app.message.text = text;
};

const speakText = function () {
  speechSynthesis.speak(app.message);
};

const handleBoxClick = function (e) {
  if (e.target.parentElement.className !== 'box') return;

  const box = e.target.parentElement;
  box.classList.add('active');
  setTimeout(() => box.classList.remove('active'), 800);
  const text = box.querySelector('.info').textContent;
  const msg = setMsgText(text);
  speakText(msg);
};

const setVoice = function (e) {
  app.voice = e.target.value;
};

const readUserMsg = function () {
  app.message.text = textArea.value;
  speakText();
};

const init = function () {
  data.forEach(createBox);
  app.voice = voicesSelect.value;
};

// Event listeners
window.addEventListener('load', init);

toggleBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.toggle('show')
);

closeBtn.addEventListener('click', () =>
  document.getElementById('text-box').classList.remove('show')
);

main.addEventListener('click', handleBoxClick);

speechSynthesis.addEventListener('voiceschanged', getVoices);
voicesSelect.addEventListener('change', setVoice);
readBtn.addEventListener('click', readUserMsg);
