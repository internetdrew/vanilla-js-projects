'use strict';

const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

const populateUI = function () {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (!selectedSeats || selectedSeats.length === 0) return;

  if (selectedSeats && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
};

let ticketPrice = +movieSelect.value;

const setMovieData = function (movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
};

const updateSelectedCount = function () {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;
  const runningTotal = selectedSeatsCount * ticketPrice;

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  count.textContent = selectedSeatsCount;
  total.textContent = runningTotal;
};

const selectSeats = function (e) {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
};

const changeMovie = function (e) {
  ticketPrice = e.target.value;
  setMovieData(e.target.selectedIndex, +e.target.value);
  updateSelectedCount();
};

const init = function () {
  populateUI();
  movieSelect.addEventListener('change', changeMovie);
  container.addEventListener('click', selectSeats);
  updateSelectedCount();
};

init();
