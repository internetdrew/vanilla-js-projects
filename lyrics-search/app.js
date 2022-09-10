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

const showResultsMsg = function (msg) {
  message.textContent = msg;
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
  console.log(data);

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

const getMoreSongs = async function (url) {
  try {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);

    if (!res.ok) throw new Error(res);
    const data = await res.json();

    showSongsInfo(data);
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

  showResultsMsg(
    `${
      results.total === 0
        ? `There are no search results matching "${searchTerm}".`
        : `Showing ${results.data.length} of ${results.total} results for "${searchTerm}"`
    }`
  );

  clearElsFrom(songsList);
  showSongsInfo(results);
};

const handleNavigation = function (e) {
  const buttons = more.querySelectorAll('.btn');
  buttons.forEach(button => getMoreSongs(button.dataset.direction));

  if (button.textContent.toLowerCase() === 'prev') {
  }

  if (button.textContent.toLowerCase() === 'next') {
  }
};

const init = function () {
  search.focus();
};

window.addEventListener('load', init);

form.addEventListener('submit', handleSearch);

more.addEventListener('click', handleNavigation);
