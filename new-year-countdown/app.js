'use strict';

const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minsEl = document.getElementById('mins');
const secsEl = document.getElementById('secs');
const countdownEl = document.getElementById('countdown');
const yearEl = document.getElementById('year');
const loading = document.getElementById('loading');

const currentYear = new Date().getFullYear();
const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

yearEl.textContent = currentYear + 1;

const updateCountdown = function () {
  const currentTime = new Date();
  const diff = newYearTime - currentTime;

  const days = Math.floor(diff / 1000 / 60 / 60 / 24);
  const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
  const mins = Math.floor(diff / 1000 / 60) % 60;
  const secs = Math.floor(diff / 1000) % 60;

  daysEl.textContent = days;
  hoursEl.textContent = hours < 10 ? `0${hours}` : hours;
  minsEl.textContent = mins < 10 ? `0${mins}` : mins;
  secsEl.textContent = secs < 10 ? `0${secs}` : secs;
};

setTimeout(() => {
  loading.remove();
  countdownEl.style.display = 'flex';
}, 800);

setInterval(updateCountdown, 1000);

window.addEventListener('load', updateCountdown);
