'use strict';

const container = document.getElementById('container');
const text = document.getElementById('text');

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

const breathAnimation = function () {
  text.textContent = 'Breathe in...';

  setTimeout(() => {
    text.textContent = 'Hold';

    setTimeout(() => {
      text.textContent = 'Breathe out...';
    }, holdTime);
  }, breatheTime);
};

breathAnimation();

setInterval(breathAnimation, totalTime);
