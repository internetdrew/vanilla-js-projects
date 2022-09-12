'use strict';

const draggableList = document.getElementById('draggable-list');
const checkBtn = document.getElementById('check-order');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffet',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page',
];

const listObjects = richestPeople.map((person, index) => ({
  index,
  person,
}));

const createList = function () {
  [...richestPeople]
    .map(person => ({ value: person, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(person => person.value)
    .forEach((person, index) => {
      const html = `
         <li data-index="${index}">
           <span class="number">${index + 1}</span>
           <div class="draggable" draggable="true">
             <p class="person-name">${person}</p>
             <i class="fas fa-grip-lines"></i>
           </div>
         </li>
   `;

      draggableList.insertAdjacentHTML('beforeend', html);
    });
};

const init = function () {
  createList();
};

window.addEventListener('load', init);
