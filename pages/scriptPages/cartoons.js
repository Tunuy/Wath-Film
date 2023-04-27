"use strict";

let cartoonsDB = JSON.parse(localStorage.getItem('cartoonsDB')) || [];
let count = cartoonsDB.length;

const cartoonsInput = document.querySelector('.input-cartoons'),
cartoonsAddButton = document.querySelector('.add-cartoons'),
  cartoonsList = document.querySelector('.cartoons-list'),
  containerItem = document.querySelector('.container-item'),
  genreMain = document.querySelector('.genre-main');

  cartoonsAddButton.addEventListener('click', addCartoons);

function addCartoons() {
  const newCartoons = document.createElement('u');
  const cartoonsName = document.querySelector('.input-cartoons').value;
  const cartoonsRating = 0; // новый фильм будет иметь оценку 0 по умолчанию
  cartoonsDB.push({ id: count + 1, name: cartoonsName, rating: cartoonsRating }); // добавляем оценку в объект фильма
  localStorage.setItem('cartoonsDB', JSON.stringify(cartoonsDB));
  count = cartoonsDB.length;
  newCartoons.innerHTML = `${count}. ${cartoonsName} <i class="fa fa-trash"></i>`;
  cartoonsList.appendChild(newCartoons);
  cartoonsInput.value = '';
  const stars = document.createElement('div');
  stars.classList.add('stars');
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('i');
    star.classList.add('fa', 'fa-star');
    star.dataset.value = i;
    if (cartoonsDB[count - 1].rating >= i) { // если оценка фильма больше или равна значению звезды, то зарисовываем ее
      star.classList.add('checked');
    }
    star.addEventListener('click', rateCartoons);
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
  newCartoons.appendChild(stars);
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

function rateCartoons(event) {
  const cartoonsItem = event.target.parentNode.parentNode;
  const id = Number(cartoonsItem.textContent.match(/^(\d+)./)[1]);
  const rating = Number(event.target.dataset.value);
  const cartoons = cartoonsDB.find(cartoons => cartoons.id === id);
  cartoons.rating = rating; // обновляем оценку фильма
  localStorage.setItem('cartoonsDB', JSON.stringify(cartoonsDB)); // сохраняем изменения в Local Storage
  const stars = cartoonsItem.querySelector('.stars'); // находим контейнер с звездами
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
        containerItem.style.height = `${cartoonsList.clientHeight + 60}px`;
        genreMain.style.height = `${genreMain.clientHeight + 60}px`;
      }
      
      function updateStylesRemove() {
        containerItem.style.height = `${cartoonsList.clientHeight - 60}px`;
        genreMain.style.height = `${genreMain.clientHeight - 60}px`;
      }
      

cartoonsDB.forEach(cartoons => {
  const newCartoons = document.createElement('u');
  newCartoons.innerHTML = `${cartoons.id}. ${cartoons.name} <i class="fa fa-trash"></i>`;
  cartoonsList.appendChild(newCartoons);
  const stars = document.createElement('div');
  stars.classList.add('stars');
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('i');
    star.classList.add('fa');
    star.classList.add('fa-star');
    star.dataset.value = i;
    star.addEventListener('mouseover', highlightStar);
    star.addEventListener('mouseout', unhighlightStar);
    star.addEventListener('click', rateCartoons);
    if (cartoons.rating && i <= cartoons.rating) {
      star.classList.add('selected');
    }
    stars.appendChild(star);
  }
  newCartoons.appendChild(stars);
});

const deleteIcons = document.querySelectorAll('.fa-trash');
deleteIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    const serialsItem = icon.parentNode;
    const id = Number(serialsItem.textContent.match(/^(\d+)./)[1]);
    cartoonsDB = cartoonsDB.filter(cartoons => cartoons.id !== id);
    localStorage.setItem('cartoonsDB', JSON.stringify(cartoonsDB));
    serialsItem.remove();
    count--;
    cartoonsDB.forEach((cartoons, index) => {
        cartoons.id = index + 1;
    });
    updateRatings();
    updateStylesRemove();
  });
});


function updateMovieList() {
    cartoonsList.innerHTML = '';
    cartoonsDB.forEach(cartoons => {
const newCartoons = document.createElement('li');
newCartoons.innerHTML = `${cartoons.id}. ${cartoons.name} <i class="fa fa-trash"></i>`;
cartoonsList.appendChild(newCartoons);
});
updateStylesAdd();
}

window.addEventListener('load', () => {
    cartoonsDB.forEach(cartoons => {
    const cartoonsItem = cartoonsList.querySelector(`u:nth-child(${cartoons.id})`);
    const stars = cartoonsItem.querySelector('.stars');
    for (let i = 1; i <= 5; i++) {
      const star = stars.querySelector(`[data-value="${i}"]`);
      if (cartoons.rating && i <= cartoons.rating) {
        star.classList.add('checked');
      } else {
        star.classList.remove('checked');
      }
    }
    updateStylesAdd();
  });

});

function updateRatings() {
    cartoonsDB.forEach(cartoons => {
    const cartoonsItem = cartoonsList.querySelector(`u:nth-child(${cartoons.id})`);
    const stars = cartoonsItem.querySelector('.stars');
    for (let i = 1; i <= 5; i++) {
      const star = stars.querySelector(`[data-value="${i}"]`);
      if (cartoons.rating >= i) {
        star.classList.add('checked');
      } else {
        star.classList.remove('checked');
      }
    }
  });
  localStorage.setItem('cartoonsDB', JSON.stringify(cartoonsDB));
}
