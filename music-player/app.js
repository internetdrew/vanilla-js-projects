'use strict';

const musicContainer = document.getElementById('music-container');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');

const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song titles
const songs = ['hey', 'summer', 'ukulele'];
const songIndex = 2;

// Initially load song details into DOM
const loadSong = function (song) {
  title.textContent = song;
  audio.src = `./music/${song}.mp3`;
  cover.src = `./images/${song}.jpg`;
};

const playSong = function () {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
  return;
};
const pauseSong = function () {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  audio.pause();
  return;
};

const togglePlay = function (e) {
  if (!musicContainer.classList.contains('play')) {
    playSong();
  }

  if (musicContainer.classList.contains('play')) {
    pauseSong();
  }
};

const prevSong = function () {
  songIndex--;
};

const nextSong = function () {};

const init = function () {
  loadSong(songs[songIndex]);
};

window.addEventListener('load', init);
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
