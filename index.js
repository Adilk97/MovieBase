const filmInfo = document.querySelector(".films__grid");
const spinner = document.querySelector(".films__fa");
const spinnerShowing = document.querySelector(".fa-spinner");

async function mainFilms(event) {
  const searchInput = event.target.value;
  spinnerShowing.classList += " films__loading--spinner";
  const fetchFilms = await fetch(
    `https://www.omdbapi.com/?apikey=96689458&s=${searchInput}`
  );

  const data = await fetchFilms.json();

  localStorage.setItem("filmSearch", event.target.value);

  return new Promise(() => {
    setTimeout(() => {
      if (!data.Search) {
      } else if (data.Search) {
        spinner.classList.remove("films__loading");
        filmInfo.innerHTML = data.Search.map((film) => {
          return showFilm(film);
        }).join("");

        if (filter === "LOW_TO_HIGH") {
          data.Search.sort((a, b) => a.Year - b.Year);
          filmInfo.innerHTML = data.Search.sort((a, b) => a.Year - b.Year);
        } else if (filter === "HIGH_TO_LOW") {
          data.Search.sort((a, b) => b.Year - a.Year);
          filmInfo.innerHTML = data.Search.sort((a, b) => b.Year - a.Year);
        }

        spinnerShowing.classList.remove("films__loading--spinner");
      }
    }, 1000);
  });
}
mainFilms();

function showFilm(film) {
  return `
  <div class="films__card">
  <img class="film__img" src="${film.Poster}" alt="">
  <h3 class="film__title">${film.Title}</h3>
  <h3 class="film__year">${film.Year}</h3>
  <h3 class="film__type">${film.Type}</h3>
  </div> `;
}

async function renderFilms(search, filter) {
  const fetchFilm = await fetch(
    `https://www.omdbapi.com/?apikey=96689458&s=${search}}`
  );
  const data = await fetchFilm.json();

  if (filter === "LOW_TO_HIGH") {
    data.Search.sort((a, b) => a.Year - b.Year);
  } else if (filter === "HIGH_TO_LOW") {
    data.Search.sort((a, b) => b.Year - a.Year);
  } else {
    data.Search.sort((a, b) => b.Year - a.Year);
    data.Search.sort((a, b) => a.Year - b.Year);
  }

  console.log(data.Search);

  filmInfo.innerHTML = data.Search.map((film) => {
    return showFilm(film);
  }).join("");
}

function filterFilms(event) {
  const filmSearch = localStorage.getItem("filmSearch");
  renderFilms(filmSearch, event.target.value);
}
