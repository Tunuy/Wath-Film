"use strict";

let programsDB = JSON.parse(localStorage.getItem('programsDB')) || [];
let count = programsDB.length;

const programsInput = document.querySelector('.input-programs'),
programsAddButton = document.querySelector('.add-programs'),
  programsList = document.querySelector('.programs-list'),
  containerItem = document.querySelector('.container-item'),
  genreMain = document.querySelector('.genre-main');

  programsAddButton.addEventListener('click', addPrograms);

function addPrograms() {
  const newPrograms = document.createElement('u');
  const programsName = document.querySelector('.input-programs').value;
  const programsRating = 0; // новый фильм будет иметь оценку 0 по умолчанию
  programsDB.push({ id: count + 1, name: programsName, rating: programsRating }); // добавляем оценку в объект фильма
  localStorage.setItem('programsDB', JSON.stringify(programsDB));
  count = programsDB.length;
  newPrograms.innerHTML = `${count}. ${programsName} <i class="fa fa-trash"></i>`;
  programsList.appendChild(newPrograms);
  programsInput.value = '';
  const stars = document.createElement('div');
  stars.classList.add('stars');
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('i');
    star.classList.add('fa', 'fa-star');
    star.dataset.value = i;
    if (programsDB[count - 1].rating >= i) { // если оценка фильма больше или равна значению звезды, то зарисовываем ее
      star.classList.add('checked');
    }
    star.addEventListener('click', ratePrograms);
    star.addEventListener('mouseenter', () => {
      if (!star.classList.contains('checked')) {
        star.classList.add( 'fa-lg', 'fas', 'hovered');
      }
    });
    star.addEventListener('mouseleave', () => {
      if (!star.classList.contains('checked')) {
        star.classList.remove( 'fa-lg', 'fas', 'hovered');
      }
    });
    stars.appendChild(star);
  }
  newPrograms.appendChild(stars);
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

function ratePrograms(event) {
  const programsItem = event.target.parentNode.parentNode;
  const id = Number(programsItem.textContent.match(/^(\d+)./)[1]);
  const rating = Number(event.target.dataset.value);
  const programs = programsDB.find(programs => programs.id === id);
  programs.rating = rating; // обновляем оценку фильма
  localStorage.setItem('programsDB', JSON.stringify(programsDB)); // сохраняем изменения в Local Storage
  const stars = programsItem.querySelector('.stars'); // находим контейнер с звездами
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
        containerItem.style.height = `${programsList.clientHeight + 60}px`;
        genreMain.style.height = `${genreMain.clientHeight + 60}px`;
      }
      
      function updateStylesRemove() {
        containerItem.style.height = `${programsList.clientHeight - 60}px`;
        genreMain.style.height = `${genreMain.clientHeight - 60}px`;
      }
      

programsDB.forEach(programs => {
  const newPrograms = document.createElement('u');
  newPrograms.innerHTML = `${programs.id}. ${programs.name} <i class="fa fa-trash"></i>`;
  programsList.appendChild(newPrograms);
  const stars = document.createElement('div');
  stars.classList.add('stars');
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement('i');
    star.classList.add('fa');
    star.classList.add('fa-star');
    star.dataset.value = i;
    star.addEventListener('mouseover', highlightStar);
    star.addEventListener('mouseout', unhighlightStar);
    star.addEventListener('click', ratePrograms);
    if (programs.rating && i <= programs.rating) {
      star.classList.add('selected');
    }
    stars.appendChild(star);
  }
  newPrograms.appendChild(stars);
});

const deleteIcons = document.querySelectorAll('.fa-trash');
deleteIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    const programsItem = icon.parentNode;
    const id = Number(programsItem.textContent.match(/^(\d+)./)[1]);
    programsDB = programsDB.filter(programs => programs.id !== id);
    localStorage.setItem('programsDB', JSON.stringify(programsDB));
    programsItem.remove();
    count--;
    programsDB.forEach((programs, index) => {
        programs.id = index + 1;
    });
    updateRatings();
    updateStylesRemove();
  });
});


function updateMovieList() {
    programsList.innerHTML = '';
    programsDB.forEach(programs => {
const newPrograms = document.createElement('li');
newPrograms.innerHTML = `${programs.id}. ${programs.name} <i class="fa fa-trash"></i>`;
programsList.appendChild(newPrograms);
});
updateStylesAdd();
}

window.addEventListener('load', () => {
    programsDB.forEach(programs => {
    const programsItem = programsList.querySelector(`u:nth-child(${programs.id})`);
    const stars = programsItem.querySelector('.stars');
    for (let i = 1; i <= 5; i++) {
      const star = stars.querySelector(`[data-value="${i}"]`);
      if (programs.rating && i <= programs.rating) {
        star.classList.add('checked');
      } else {
        star.classList.remove('checked');
      }
    }
  });
updateStylesAdd();
});

function updateRatings() {
    programsDB.forEach(programs => {
    const programsItem = programsList.querySelector(`u:nth-child(${programs.id})`);
    const stars = programsItem.querySelector('.stars');
    for (let i = 1; i <= 5; i++) {
      const star = stars.querySelector(`[data-value="${i}"]`);
      if (programs.rating >= i) {
        star.classList.add('checked');
      } else {
        star.classList.remove('checked');
      }
    }
  });
  localStorage.setItem('programsDB', JSON.stringify(programsDB));
}
