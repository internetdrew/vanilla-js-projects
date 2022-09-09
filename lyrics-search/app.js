'use strict';

const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');
const message = document.getElementById('result--message');
const songsList = document.getElementById('songs');

const apiURL = 'https://api.lyrics.ovh';

const showResultsMsg = function (msg) {
  message.textContent = msg;
};

const fetchSongsData = async function (term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  if (!res.ok) throw new Error('Trouble getting response from API');

  const data = await res.json();
  return data;
};

const showSongsInfo = function (data) {
  console.log(data);
  const searchResults = data;
  const songsData = searchResults.data;

  songsData.forEach(song => {
    const html = `
  <li>
  <span><strong>${song.title}</strong> — ${song.artist.name}</span>
  <button class="btn">Get Lyrics</button>
  </li>
  `;

    songsList.insertAdjacentHTML('beforeend', html);
  });
};

const init = function () {
  search.focus();
};

const handleSearch = async function (e) {
  e.preventDefault();
  const searchTerm = search.value.trim();
  search.value = '';

  if (!searchTerm) return;

  const results = await fetchSongsData(searchTerm);
  showResultsMsg(
    `Showing ${results.data.length} of ${results.total} results for "${searchTerm}":`
  );
  showSongsInfo(results);
};

window.addEventListener('load', init);

form.addEventListener('submit', handleSearch);
