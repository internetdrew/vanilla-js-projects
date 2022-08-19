'use strict';

const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mealsEl = document.getElementById('meals'),
  resultHeading = document.getElementById('result-heading'),
  single_mealEl = document.getElementById('single-meal');

const removeChildElementsFrom = function (parentEl) {
  while (parentEl.firstChild) {
    parentEl.removeChild(parentEl.firstChild);
  }
};

const clearElValue = function (el) {
  el.value = '';
};

const showResult = function (msg) {
  resultHeading.textContent = msg;
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
      clearElValue(search);
      removeChildElementsFrom(mealsEl);
      showResult(
        `There are no ${term} recipes available at this time. Please try again.`
      );
      return;
    }

    if (meals) {
      showResult(`Showing ${meals.length} meals made with ${term}:`);
      clearElValue(search);
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
    }

    removeChildElementsFrom(mealsEl);

    meals
      .map(meal => {
        const markup = `
      <div class="meal">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div class="meal-info" data-mealID="${meal.idMeal}">
         <h3>${meal.strMeal}</h3>
        </div>
      </div>
      `;

        mealsEl.insertAdjacentHTML('afterbegin', markup);
      })
      .join('');
  } catch (error) {
    // console.error(error);
  }

  //
};

const getMealIngredients = function (meal) {
  const entries = Object.entries(meal);

  const ingredients = entries
    .filter(
      entry =>
        entry[0].includes('strIngredient') &&
        entry[1] !== null &&
        entry[1].trim()
    )
    .map(entry => entry[1]);

  const measurements = entries
    .filter(
      entry =>
        entry[0].includes('strMeasure') && entry[1] !== null && entry[1].trim()
    )
    .map(entry => entry[1]);

  if (ingredients.length !== measurements.length)
    throw new Error(
      'The ingredients and measurements arrays are not the same length.'
    );

  const allIngredients = measurements.map(
    (measurement, index) => `${measurement} ${ingredients[index]}`
  );

  return allIngredients;
};

// Add the meal to the DOM
const addMealToDOM = function (meal) {
  const ingredients = getMealIngredients(meal);

  const markup = `
  <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <ul class="ingredients">
    ${ingredients
      .map(ing => {
        return `<li class="ingredient">${ing}</li>`;
      })
      .join('')}
    </ul>
    
  </div>
  `;

  removeChildElementsFrom(single_mealEl);

  single_mealEl.insertAdjacentHTML('afterbegin', markup);
};

// Fetch meal by ID
const getMealByID = async function (mealID) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  const data = await res.json();
  const meal = data.meals[0];
  addMealToDOM(meal);
};

const getMealInfo = function (e) {
  const mealInfo = e.path.find(item =>
    item.classList ? item.classList.contains('meal-info') : false
  );

  if (!mealInfo) return;

  const mealID = mealInfo.getAttribute('data-mealID');

  getMealByID(mealID);
};

submit.addEventListener('submit', searchMeal);
mealsEl.addEventListener('click', getMealInfo);
