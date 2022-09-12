'use strict';

const draggableList = document.getElementById('draggable-list');
const checkBtn = document.getElementById('check-btn');

const app = {
  listItems: [],
  dragStartIndex: 0,
  richestPeople: [
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
  ],
};

const getListItems = function () {
  const items = draggableList.querySelectorAll('li');
  items.forEach(item => app.listItems.push(item));
};

const swapItems = function (fromIndex, toIndex) {
  const itemOne = app.listItems[fromIndex].querySelector('.draggable');
  const itemTwo = app.listItems[toIndex].querySelector('.draggable');

  app.listItems[fromIndex].appendChild(itemTwo);
  app.listItems[toIndex].appendChild(itemOne);
};

const dragStart = function () {
  app.dragStartIndex = +this.closest('li').getAttribute('data-index');
};

const dragOver = function (e) {
  e.preventDefault();
};

const dragDrop = function () {
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(app.dragStartIndex, dragEndIndex);

  this.classList.remove('over');
};

const dragEnter = function () {
  this.classList.add('over');
};
const dragLeave = function () {
  this.classList.remove('over');
};

const addEventListeners = function () {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
};

const createList = function () {
  [...app.richestPeople]
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
  getListItems();
  addEventListeners();
};

const checkOrder = function () {
  app.listItems.forEach((item, index) => {
    console.log(item);
    const personName = item.querySelector('.person-name').textContent;

    if (personName !== app.richestPeople[index]) {
      item.classList.add('wrong');
    }
    if (personName === app.richestPeople[index]) {
      item.classList.remove('wrong');
      item.classList.add('right');
    }
  });
};

const init = function () {
  createList();
};

window.addEventListener('load', init);
checkBtn.addEventListener('click', checkOrder);
