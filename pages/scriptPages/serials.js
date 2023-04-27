"use strict";

let serialsDB = JSON.parse(localStorage.getItem('serialsDB')) || [];
let count = serialsDB.length;

const serialsInput = document.querySelector('.input-serials'),
  serialsAddButton = document.querySelector('.add-serials'),
  serialsList = document.querySelector('.serials-list'),
  containerItem = document.querySelector('.container-item'),
  genreMain = document.querySelector('.genre-main');

serialsAddButton.addEventListener('click', addSerials);

function addSerials() {
  const newSerials = document.createElement('u');
  const serialsName = document.querySelector('.input-serials').value;
  const movieRating = 0; // новый фильм будет иметь оценку 0 по умолчанию
  serialsDB.push({ id: count + 1, name: serialsName, rating: movieRating }); // добавляем оценку в объект фильма
  localStorage.setItem('serialsDB', JSON.stringify(serialsDB));
  count = serialsDB.length;
  newSerials.innerHTML = `${count}. ${serialsName} <i class="fa fa-trash"></i>`;
  serialsList.appendChild(newSerials);
  serialsInput.value = '';
  const stars = document.createElement('div');
  stars.classList.add('stars');
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('i');
    star.classList.add('fa', 'fa-star');
    star.dataset.value = i;
    if (serialsDB[count - 1].rating >= i) { // если оценка фильма больше или равна значению звезды, то зарисовываем ее
      star.classList.add('checked');
    }
    star.addEventListener('click', rateSerials);
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
  newSerials.appendChild(stars);
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

function rateSerials(event) {
  const serialsItem = event.target.parentNode.parentNode;
  const id = Number(serialsItem.textContent.match(/^(\d+)./)[1]);
  const rating = Number(event.target.dataset.value);
  const serials = serialsDB.find(serials => serials.id === id);
  serials.rating = rating; // обновляем оценку фильма
  localStorage.setItem('serialsDB', JSON.stringify(serialsDB)); // сохраняем изменения в Local Storage
  const stars = serialsItem.querySelector('.stars'); // находим контейнер с звездами
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
        containerItem.style.height = `${serialsList.clientHeight + 60}px`;
        genreMain.style.height = `${genreMain.clientHeight + 60}px`;
      }
      
      function updateStylesRemove() {
        containerItem.style.height = `${serialsList.clientHeight - 60}px`;
        genreMain.style.height = `${genreMain.clientHeight - 60}px`;
      }
      

serialsDB.forEach(serials => {
  const newMovie = document.createElement('u');
  newMovie.innerHTML = `${serials.id}. ${serials.name} <i class="fa fa-trash"></i>`;
  serialsList.appendChild(newMovie);
  const stars = document.createElement('div');
  stars.classList.add('stars');
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('i');
    star.classList.add('fa');
    star.classList.add('fa-star');
    star.dataset.value = i;
    star.addEventListener('mouseover', highlightStar);
    star.addEventListener('mouseout', unhighlightStar);
    star.addEventListener('click', rateSerials);
    if (serials.rating && i <= serials.rating) {
      star.classList.add('selected');
    }
    stars.appendChild(star);
  }
  newMovie.appendChild(stars);
});

const deleteIcons = document.querySelectorAll('.fa-trash');
deleteIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    const serialsItem = icon.parentNode;
    const id = Number(serialsItem.textContent.match(/^(\d+)./)[1]);
    serialsDB = serialsDB.filter(serials => serials.id !== id);
    localStorage.setItem('serialsDB', JSON.stringify(serialsDB));
    serialsItem.remove();
    count--;
    serialsDB.forEach((movie, index) => {
      movie.id = index + 1;
    });
    updateRatings();
    updateStylesRemove();
  });
});


function updateMovieList() {
serialsList.innerHTML = '';
serialsDB.forEach(serials => {
const newSerials = document.createElement('li');
newSerials.innerHTML = `${serials.id}. ${serials.name} <i class="fa fa-trash"></i>`;
serialsList.appendChild(newSerials);
});
updateStylesAdd();
}

window.addEventListener('load', () => {
  serialsDB.forEach(serials => {
    const movieItem = serialsList.querySelector(`u:nth-child(${serials.id})`);
    const stars = movieItem.querySelector('.stars');
    for (let i = 1; i <= 5; i++) {
      const star = stars.querySelector(`[data-value="${i}"]`);
      if (serials.rating && i <= serials.rating) {
        star.classList.add('checked');
      } else {
        star.classList.remove('checked');
      }
    }
    updateStylesAdd();
  });

});

function updateRatings() {
  serialsDB.forEach(serials => {
    const serialsItem = serialsList.querySelector(`u:nth-child(${serials.id})`);
    const stars = serialsItem.querySelector('.stars');
    for (let i = 1; i <= 5; i++) {
      const star = stars.querySelector(`[data-value="${i}"]`);
      if (serials.rating >= i) {
        star.classList.add('checked');
      } else {
        star.classList.remove('checked');
      }
    }
  });
  localStorage.setItem('serialsDB', JSON.stringify(serialsDB));
}
