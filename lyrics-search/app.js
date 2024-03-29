'use strict';

const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');
const message = document.getElementById('result--message');
const songsList = document.getElementById('songs');

const apiURL = 'https://api.lyrics.ovh';

const clearElsFrom = function (parentEl) {
  while (parentEl.firstChild) {
    parentEl.removeChild(parentEl.firstChild);
  }
};

const getQueryFrom = function (results) {
  return results.next.split('q=')[1].split('&')[0];
};

const getResultsIndexes = function (results) {
  const indexes = {
    start: +`${
      results.prev ? +results.next.split('index=')[1] - results.data.length : 1
    }`,
    end: +results.next.split('index=')[1],
  };

  return indexes;
};

const showResultsMsg = function (results) {
  if (results.total === 0)
    return (message.textContent = `Sorry. No matching results. Try another name!`);

  const query = getQueryFrom(results);
  const { start, end } = getResultsIndexes(results);

  message.textContent = `Showing results ${start} — ${end} for "${query}":`;
};

const showNavButtons = function (data) {
  if (data.prev || data.next) {
    const buttons = `
    ${
      data.prev
        ? `<button class="btn" data-direction="${data.prev}">Prev</button>`
        : ''
    }
    ${
      data.next
        ? `<button class="btn" data-direction="${data.next}">Next</button>`
        : ''
    }
`;

    more.insertAdjacentHTML('beforeend', buttons);
  }
};

const fetchSongsMatching = async function (term) {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  if (!res.ok) throw new Error('Trouble getting response from API');

  const data = await res.json();
  return data;
};

const showSongsInfo = function (data) {
  clearElsFrom(songsList);
  const songsData = data.data;

  songsData
    .map(song => {
      const html = `
          <li>
            <span><strong>${song.title}</strong> — ${song.artist.name}</span>
            <button class="btn" data-artist="${song.artist.name}" data-song-title="${song.title}">Get Lyrics</button>
          </li>
  `;

      songsList.insertAdjacentHTML('beforeend', html);
    })
    .join('');

  clearElsFrom(more);
  showNavButtons(data);
};

const getMoreSongs = async function (url) {
  try {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);

    if (!res.ok) throw new Error('Trouble getting more songs');
    const data = await res.json();

    showSongsInfo(data);
    showResultsMsg(data);
  } catch (error) {
    console.log(error);
  }
};

const handleSearch = async function (e) {
  e.preventDefault();
  const searchTerm = search.value.trim();
  search.value = '';

  if (!searchTerm) return;

  const results = await fetchSongsMatching(searchTerm);

  showResultsMsg(results);

  clearElsFrom(songsList);
  showSongsInfo(results);
};

const handleNavigation = function (e) {
  if (e.target.classList.contains('btn')) {
    getMoreSongs(e.target.dataset.direction);
  }
};

const getLyrics = async function (artist, songTitle) {
  try {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
    if (!res.ok) {
      console.log(res);
      throw new Error('Trouble getting lyrics');
    }

    const data = await res.json();
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

const init = function () {
  search.focus();
};

window.addEventListener('load', init);

form.addEventListener('submit', handleSearch);

more.addEventListener('click', handleNavigation);

result.addEventListener('click', e => {
  const clickedEl = e.target;
  if (clickedEl.nodeName === 'BUTTON') {
    const artist = clickedEl.getAttribute('data-artist');
    const songTitle = clickedEl.getAttribute('data-song-title');

    getLyrics(artist, songTitle);
  }
});
