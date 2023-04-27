"use strict";

let doramsDB = JSON.parse(localStorage.getItem('doramsDB')) || [];
let count = doramsDB.length;

const doramsInput = document.querySelector('.input-dorams'),
doramsAddButton = document.querySelector('.add-dorams'),
  doramsList = document.querySelector('.dorams-list'),
  containerItem = document.querySelector('.container-item'),
  genreMain = document.querySelector('.genre-main');

  doramsAddButton.addEventListener('click', addDorams);
function addDorams() {
  const newDorams = document.createElement('u');
  const doramsName = document.querySelector('.input-dorams').value;
  const doramsRating = 0; // новый фильм будет иметь оценку 0 по умолчанию
  doramsDB.push({ id: count + 1, name: doramsName, rating: doramsRating }); // добавляем оценку в объект фильма
  localStorage.setItem('doramsDB', JSON.stringify(doramsDB));
  count = doramsDB.length;
  newDorams.innerHTML = `${count}. ${doramsName} <i class="fa fa-trash"></i>`;
  doramsList.appendChild(newDorams);
  doramsInput.value = '';
  const stars = document.createElement('div');
  stars.classList.add('stars');
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('i');
    star.classList.add('fa', 'fa-star');
    star.dataset.value = i;
    if (doramsDB[count - 1].rating >= i) { // если оценка фильма больше или равна значению звезды, то зарисовываем ее
      star.classList.add('checked');
    }
    star.addEventListener('click', rateDorams);
    star.addEventListener('mouseenter', () => {
      if (!star.classList.contains('checked')) {
        star.classList.add('fa-star', 'fa-lg', 'fas', 'hovered');
      }
    });
    star.addEventListener('mouseleave', () => {
      if (!star.classList.contains('checked')) {
        star.classList.remove('fa-star', 'fa-lg', 'fas', 'hovered');
      }
    });
    stars.appendChild(star);
  }
  newDorams.appendChild(stars);
  updateStylesAdd();

}


function highlightStar(event) {
  const selectedValue = event.target.dataset.value;
  const stars = event.target.parentNode.children;
  for (let i = 0; i < selectedValue; i++) {
    stars[i].classList.add('highlighted');
  }
}

function unhighlightStar(event) {
  const stars = event.target.parentNode.children;
  for (let i = 0; i < stars.length; i++) {
    stars[i].classList.remove('highlighted');
  }
}

function rateDorams(event) {
  const doramsItem = event.target.parentNode.parentNode;
  const id = Number(doramsItem.textContent.match(/^(\d+)./)[1]);
  const rating = Number(event.target.dataset.value);
  const dorams = doramsDB.find(dorams => dorams.id === id);
  dorams.rating = rating; // обновляем оценку фильма
  localStorage.setItem('doramsDB', JSON.stringify(doramsDB)); // сохраняем изменения в Local Storage
  const stars = doramsItem.querySelector('.stars'); // находим контейнер с звездами
  for (let i = 1; i <= 5; i++) { // обновляем зарисовку звезд
    const star = stars.querySelector(`[data-value="${i}"]`);
    if (rating >= i) {
      star.classList.add('checked');
    } else {
      star.classList.remove('checked');
      }
      }
      }



      function updateStylesAdd() {
        containerItem.style.height = `${doramsList.clientHeight + 60}px`;
        genreMain.style.height = `${genreMain.clientHeight + 60}px`;
      }
      
      function updateStylesRemove() {
        containerItem.style.height = `${doramsList.clientHeight - 60}px`;
        genreMain.style.height = `${genreMain.clientHeight - 60}px`;
      }
      
doramsDB.forEach(dorams => {
  const newDorams = document.createElement('u');
  newDorams.innerHTML = `${dorams.id}. ${dorams.name} <i class="fa fa-trash"></i>`;
  doramsList.appendChild(newDorams);
  const stars = document.createElement('div');
  stars.classList.add('stars');
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('i');
    star.classList.add('fa');
    star.classList.add('fa-star');
    star.dataset.value = i;
    star.addEventListener('mouseover', highlightStar);
    star.addEventListener('mouseout', unhighlightStar);
    star.addEventListener('click', rateDorams);
    if (dorams.rating && i <= dorams.rating) {
      star.classList.add('selected');
    }
    stars.appendChild(star);
  }
  newDorams.appendChild(stars);
});

const deleteIcons = document.querySelectorAll('.fa-trash');
deleteIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    const doramsItem = icon.parentNode;
    const id = Number(doramsItem.textContent.match(/^(\d+)./)[1]);
    doramsDB = doramsDB.filter(dorams => dorams.id !== id);
    localStorage.setItem('doramsDB', JSON.stringify(doramsDB));
    doramsItem.remove();
    count--;
    doramsDB.forEach((dorams, index) => {
        dorams.id = index + 1;
    });
    updateRatings();
    updateStylesRemove();
  });
});


function updateMovieList() {
    doramsList.innerHTML = '';
    doramsDB.forEach(dorams => {
const newDorams = document.createElement('li');
newDorams.innerHTML = `${dorams.id}. ${dorams.name} <i class="fa fa-trash"></i>`;
doramsList.appendChild(newDorams);
});
updateStylesAdd();
}

window.addEventListener('load', () => {
    doramsDB.forEach(dorams => {
    const doramsItem = doramsList.querySelector(`u:nth-child(${dorams.id})`);
    const stars = doramsItem.querySelector('.stars');
    for (let i = 1; i <= 5; i++) {
      const star = stars.querySelector(`[data-value="${i}"]`);
      if (dorams.rating && i <= dorams.rating) {
        star.classList.add('checked');
      } else {
        star.classList.remove('checked');
      }
    }
  });
updateStylesAdd();
});

function updateRatings() {
    doramsDB.forEach(dorams => {
    const doramsItem = doramsList.querySelector(`u:nth-child(${dorams.id})`);
    const stars = doramsItem.querySelector('.stars');
    for (let i = 1; i <= 5; i++) {
      const star = stars.querySelector(`[data-value="${i}"]`);
      if (dorams.rating >= i) {
        star.classList.add('checked');
      } else {
        star.classList.remove('checked');
      }
    }
  });
  localStorage.setItem('doramsDB', JSON.stringify(doramsDB));
}
