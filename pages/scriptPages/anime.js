"use strict";

let animeDB = JSON.parse(localStorage.getItem('animeDB')) || [];
let count = animeDB.length;

const animeInput = document.querySelector('.input-anime'),
animeAddButton = document.querySelector('.add-anime'),
  animeList = document.querySelector('.anime-list'),
  containerItem = document.querySelector('.container-item'),
  genreMain = document.querySelector('.genre-main');

  animeAddButton.addEventListener('click', addAnime);
  animeInput.addEventListener('keydown', function(e) {
    if (e.keyCode === 13){
      addAnime();
    }
  });

function addAnime() {
  const newAnime = document.createElement('u');
  const animeName = document.querySelector('.input-anime').value;
  const animeRating = 0; // новый фильм будет иметь оценку 0 по умолчанию
  animeDB.push({ id: count + 1, name: animeName, rating: animeRating }); // добавляем оценку в объект фильма
  localStorage.setItem('animeDB', JSON.stringify(animeDB));
  count = animeDB.length;
  newAnime.innerHTML = `${count}. ${animeName} <i class="fa fa-trash"></i>`;
  animeList.appendChild(newAnime);
  animeInput.value = '';
  const stars = document.createElement('div');
  stars.classList.add('stars');
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('i');
    star.classList.add('fa', 'fa-star');
    star.dataset.value = i;
    if (animeDB[count - 1].rating >= i) { // если оценка фильма больше или равна значению звезды, то зарисовываем ее
      star.classList.add('checked');
    }
    star.addEventListener('click', rateAnime);
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
  newAnime.appendChild(stars);
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

function rateAnime(event) {
  const animeItem = event.target.parentNode.parentNode;
  const id = Number(animeItem.textContent.match(/^(\d+)./)[1]);
  const rating = Number(event.target.dataset.value);
  const anime = animeDB.find(anime => anime.id === id);
  anime.rating = rating; // обновляем оценку фильма
  localStorage.setItem('animeDB', JSON.stringify(animeDB)); // сохраняем изменения в Local Storage
  const stars = animeItem.querySelector('.stars'); // находим контейнер с звездами
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
        containerItem.style.height = `${animeList.clientHeight + 60}px`;
        genreMain.style.height = `${genreMain.clientHeight + 60}px`;
      }
      
      function updateStylesRemove() {
        containerItem.style.height = `${animeList.clientHeight - 60}px`;
        genreMain.style.height = `${genreMain.clientHeight - 60}px`;
      }
      

animeDB.forEach(anime => {
  const newAnime = document.createElement('u');
  newAnime.innerHTML = `${anime.id}. ${anime.name} <i class="fa fa-trash"></i>`;
  animeList.appendChild(newAnime);
  const stars = document.createElement('div');
  stars.classList.add('stars');
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('i');
    star.classList.add('fa');
    star.classList.add('fa-star');
    star.dataset.value = i;
    star.addEventListener('mouseover', highlightStar);
    star.addEventListener('mouseout', unhighlightStar);
    star.addEventListener('click', rateAnime);
    if (anime.rating && i <= anime.rating) {
      star.classList.add('selected');
    }
    stars.appendChild(star);
  }
  newAnime.appendChild(stars);
});

const deleteIcons = document.querySelectorAll('.fa-trash');
deleteIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    const animeItem = icon.parentNode;
    const id = Number(animeItem.textContent.match(/^(\d+)./)[1]);
    animeDB = animeDB.filter(anime => anime.id !== id);
    localStorage.setItem('animeDB', JSON.stringify(animeDB));
    animeItem.remove();
    count--;
    animeDB.forEach((anime, index) => {
        anime.id = index + 1;
    });
    updateRatings();
    updateStylesRemove();
  });
});


function updateAnimeList() {
    animeList.innerHTML = '';
    animeDB.forEach(anime => {
const newAnime = document.createElement('li');
newAnime.innerHTML = `${anime.id}. ${anime.name} <i class="fa fa-trash"></i>`;
animeList.appendChild(newAnime);
});
updateStylesAdd();
}

window.addEventListener('load', () => {
    animeDB.forEach(anime => {
    const animeItem = animeList.querySelector(`u:nth-child(${anime.id})`);
    const stars = animeItem.querySelector('.stars');
    for (let i = 1; i <= 5; i++) {
      const star = stars.querySelector(`[data-value="${i}"]`);
      if (anime.rating && i <= anime.rating) {
        star.classList.add('checked');
      } else {
        star.classList.remove('checked');
      }
    }
    updateStylesAdd();
  });

});

function updateRatings() {
    animeDB.forEach(anime => {
    const cartoonsItem = animeList.querySelector(`u:nth-child(${anime.id})`);
    const stars = cartoonsItem.querySelector('.stars');
    for (let i = 1; i <= 5; i++) {
      const star = stars.querySelector(`[data-value="${i}"]`);
      if (anime.rating >= i) {
        star.classList.add('checked');
      } else {
        star.classList.remove('checked');
      }
    }
  });
  localStorage.setItem('animeDB', JSON.stringify(animeDB));
}
