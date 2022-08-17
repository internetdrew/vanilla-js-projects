'use strict';

const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('single-meal');

const clearElementsFrom = function (parentEl) {
  while (parentEl.firstChild) {
    parentEl.removeChild(parentEl.firstChild);
  }
};

// Search meal and fetch from API
const searchMeal = function (e) {
  e.preventDefault();

  // Clear single meal element
  clearElementsFrom(single_mealEl);

  // Get search term
  const term = search.value;

  // Check for empty search on submit
  if (!term.trim()) return;
};

submit.addEventListener('submit', searchMeal);
