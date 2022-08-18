'use strict';

const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('single-meal'),
  resultCount = document.getElementById('result-count');

const removeChildElementsFrom = function (parentEl) {
  while (parentEl.firstChild) {
    parentEl.removeChild(parentEl.firstChild);
  }
};

const clearElValue = function (el) {
  el.value = '';
};

const showResult = function (msg) {
  resultCount.textContent = msg;
};

// Search meal and fetch from API
const searchMeal = async function (e) {
  try {
    e.preventDefault();

    // Clear single meal element
    removeChildElementsFrom(single_mealEl);

    // Get search term
    const term = search.value.toLowerCase().trim();
    // Check for empty search on submit
    if (!term.trim()) return;

    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
    );
    if (!res.ok) throw new Error('Trouble fetching response');
    const data = await res.json();

    const { meals } = data;

    if (!meals) {
      showResult(`There are no ${term} recipes available at this time.`);
      search.value = '';
      throw new Error('No meal available matching search term.');
    }

    if (term === 'dick') {
      showResult(
        `What the... there's actually ${
          meals.length === 1
            ? `${meals.length} recipe`
            : `${meals.length} recipes`
        } made with ${term}!`
      );
      clearElValue(search);
      return;
    }

    showResult(`Showing ${meals.length} meals made with ${term}:`);
    clearElValue(search);
  } catch (error) {
    // console.error(error);
  }

  //
};

submit.addEventListener('submit', searchMeal);
