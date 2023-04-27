"use strict";

let moviesDB = JSON.parse(localStorage.getItem('moviesDB')) || [];
let count = moviesDB.length;

const movieInput = document.querySelector('.input-film'),
  movieAddButton = document.querySelector('.add-film'),
  movieList = document.querySelector('.film-list'),
  containerItem = document.querySelector('.container-item'),
  genreMain = document.querySelector('.genre-main');

movieAddButton.addEventListener('click', addMovie);
movieInput.addEventListener('keydown', function(e) {
  if (e.keyCode === 13){
    addMovie();
  }
});

function addMovie() {
  const newMovie = document.createElement('u');
  const movieName = document.querySelector('.input-film').value;
  const movieRating = 0; // новый фильм будет иметь оценку 0 по умолчанию
  moviesDB.push({ id: count + 1, name: movieName, rating: movieRating }); // добавляем оценку в объект фильма
  localStorage.setItem('moviesDB', JSON.stringify(moviesDB));
  count = moviesDB.length;
  newMovie.innerHTML = `${count}. ${movieName} <i class="fa fa-trash"></i>`;
  movieList.appendChild(newMovie);
  movieInput.value = '';
  const stars = document.createElement('div');
  stars.classList.add('stars');
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('i');
    star.classList.add('fa', 'fa-star');
    star.dataset.value = i;
    if (moviesDB[count - 1].rating >= i) { // если оценка фильма больше или равна значению звезды, то зарисовываем ее
      star.classList.add('checked');
    }
    star.addEventListener('click', rateMovie);
    star.addEventListener('mouseenter', () => {
      if (!star.classList.contains('checked')) {
        star.classList.add('fa-lg', 'fas', 'hovered');
      }
    });
    star.addEventListener('mouseleave', () => {
      if (!star.classList.contains('checked')) {
        star.classList.remove('fa-lg', 'fas', 'hovered');
      }
    });
    
    stars.appendChild(star);
  }
  newMovie.appendChild(stars);
  updateStylesAdd();
 
}


function highlightStar(event) {
  const selectedValue = event.target.dataset.value;
  const stars = event.target.parentNode.children;
  for (let i = 0; i < selectedValue; i++) {
    stars[i].classList.add('highlighted');
    stars[i + 1].classList.add('hide');
  }
}

function unhighlightStar(event) {
  const stars = event.target.parentNode.children;
  for (let i = 0; i < stars.length; i++) {
    stars[i].classList.remove('highlighted');
  }
}

function rateMovie(event) {
  const movieItem = event.target.parentNode.parentNode;
  const id = Number(movieItem.textContent.match(/^(\d+)./)[1]);
  const rating = Number(event.target.dataset.value);
  const movie = moviesDB.find(movie => movie.id === id);
  movie.rating = rating; // обновляем оценку фильма
  localStorage.setItem('moviesDB', JSON.stringify(moviesDB)); // сохраняем изменения в Local Storage
  const stars = movieItem.querySelector('.stars'); // находим контейнер с звездами
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
  containerItem.style.height = `${movieList.clientHeight + 60}px`;
  genreMain.style.height = `${genreMain.clientHeight + 60}px`;
}

function updateStylesRemove() {
  containerItem.style.height = `${movieList.clientHeight - 60}px`;
  genreMain.style.height = `${genreMain.clientHeight - 60}px`;
}


moviesDB.forEach(movie => {
  const newMovie = document.createElement('u');
  newMovie.innerHTML = `${movie.id}. ${movie.name} <i class="fa fa-trash"></i> `;
  movieList.appendChild(newMovie);
  const stars = document.createElement('div');
  stars.classList.add('stars');
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('i');
    star.classList.add('fa');
    star.classList.add('fa-star');
    star.dataset.value = i;
    star.addEventListener('mouseover', highlightStar);
    star.addEventListener('mouseout', unhighlightStar);
    star.addEventListener('click', rateMovie);
    if (movie.rating && i <= movie.rating) {
      star.classList.add('selected');
    }
    stars.appendChild(star);
  }
  newMovie.appendChild(stars);
});

const deleteIcons = document.querySelectorAll('.fa-trash');
deleteIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    const movieItem = icon.parentNode;
    const id = Number(movieItem.textContent.match(/^(\d+)./)[1]);
    moviesDB = moviesDB.filter(movie => movie.id !== id);
    localStorage.setItem('moviesDB', JSON.stringify(moviesDB));
    movieItem.remove();
    count--;
    moviesDB.forEach((movie, index) => {
      movie.id = index + 1;
    });
    updateRatings();
    updateStylesRemove();
  });
});


function updateMovieList() {
movieList.innerHTML = '';
moviesDB.forEach(movie => {
const newMovie = document.createElement('li');
newMovie.innerHTML = `${movie.id}. ${movie.name} <i class="fa fa-trash"></i>`;
movieList.appendChild(newMovie);
});
updateStylesAdd();
}

window.addEventListener('load', () => {
  moviesDB.forEach(movie => {
    const movieItem = movieList.querySelector(`u:nth-child(${movie.id})`);
    const stars = movieItem.querySelector('.stars');
    for (let i = 1; i <= 5; i++) {
      const star = stars.querySelector(`[data-value="${i}"]`);
      if (movie.rating && i <= movie.rating) {
        star.classList.add('checked');
      } else {
        star.classList.remove('checked');
      }
    }
    updateStylesAdd();
  });

});

function updateRatings() {
  moviesDB.forEach(movie => {
    const movieItem = movieList.querySelector(`u:nth-child(${movie.id})`);
    const stars = movieItem.querySelector('.stars');
    for (let i = 1; i <= 5; i++) {
      const star = stars.querySelector(`[data-value="${i}"]`);
      if (movie.rating >= i) {
        star.classList.add('checked');
      } else {
        star.classList.remove('checked');
      }
    }
  });
  localStorage.setItem('moviesDB', JSON.stringify(moviesDB));
}

