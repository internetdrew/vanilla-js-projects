'use strict';

const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

const searchSongs = async function (searchTerm) {
  const res = await fetch(`${apiURL}/suggest/${searchTerm}`);
  console.log(res);
};

const init = function () {
  search.focus();
};

window.addEventListener('load', init);

form.addEventListener('submit', e => {
  e.preventDefault();
  const searchTerm = search.value.trim();

  if (!searchTerm) alert('Please type in a search term.');
  console.log(searchTerm);
  searchSongs(searchTerm);
});
