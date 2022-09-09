'use strict';

const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

const fetchSongsData = async function (term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  if (!res.ok) throw new Error('Trouble getting response from API');

  const data = await res.json();
  return data;
};

const showSongsData = function (data) {
  console.log(data);
};

const init = function () {
  search.focus();
};

window.addEventListener('load', init);

form.addEventListener('submit', e => {
  e.preventDefault();
  const searchTerm = search.value.trim();

  if (!searchTerm) alert('Please type in a search term.');
  const songsData = fetchSongsData(searchTerm);
  showSongsData(songsData);
});
