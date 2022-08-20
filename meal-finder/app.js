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
    if (!res.ok) throw new Error('Trouble fetching from the API');

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
    console.error(error);
  }
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
  console.log(meal);

  const ingredients = getMealIngredients(meal);
  const instructions = meal.strInstructions
    .split(/\r\n/g)
    .filter(el => el !== '')
    .map(instruction => {
      const reg = /\d\W /;
      return instruction.replace(reg, '');
    });
  console.log(instructions);

  const markup = `
  <div class="single-meal">
    <h2>${meal.strMeal}</h2>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
    <div class="single-meal-info">
      ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
      ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
    </div>
    <div class="main">
      <h2>Ingredients</h2>
      <ul class="ingredients">
       ${ingredients.map(ing => `<li class="ingredient">${ing}</li>`).join('')}
      </ul>

      <h2>Instructions</h2>
      <ul class="instructions">
      ${instructions
        .map(instruction => `<li class="instruction">${instruction}</li>`)
        .join('')}
      </ul>
    </div>
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
