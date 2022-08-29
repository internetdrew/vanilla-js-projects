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

// Keep track of song
let songIndex = 1;

// Initially load song details into DOM
const loadSong = function () {
  const song = songs[songIndex];

  title.textContent = song;
  audio.src = `./music/${song}.mp3`;
  cover.src = `./images/${song}.jpg`;
};

const playSong = function (e) {
  musicContainer.classList.contains('play')
    ? musicContainer.classList.remove('play')
    : musicContainer.classList.add('play');
};

window.addEventListener('load', loadSong);
playBtn.addEventListener('click', playSong);
