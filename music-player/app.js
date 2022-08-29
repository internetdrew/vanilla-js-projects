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

const songs = ['hey', 'summer', 'ukulele'];

const loadSong = function () {
  const song = songs[Math.floor(Math.random() * songs.length)];
  title.textContent = song;
  audio.src = `./music/${song}.mp3`;
  cover.src = `./images/${song}.jpg`;
};

const playSong = function () {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
};
const pauseSong = function () {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  audio.pause();
};

const togglePlay = function (e) {
  if (!musicContainer.classList.contains('play')) {
    playSong();
    return;
  }

  if (musicContainer.classList.contains('play')) {
    pauseSong();
    return;
  }
};

const prevSong = function () {
  let songIndex = songs.indexOf(title.textContent);

  songIndex--;

  if (songIndex < 0) songIndex = songs.length - 1;

  loadSong();
  playSong();
};

const nextSong = function () {
  let songIndex = songs.indexOf(title.textContent);

  songIndex++;

  if (songIndex > songs.length - 1) songIndex = 0;

  loadSong();
  playSong();
};

const updateProgress = function (e) {
  const { duration, currentTime } = e.srcElement;
};

window.addEventListener('load', loadSong);
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);
