const filmInfo = document.querySelector(".films__grid");

async function mainFilms(event) {
  const searchInput = event.target.value;
  const fetchFilms = await fetch(
    `https://www.omdbapi.com/?apikey=96689458&s=${searchInput}`
  );

  const data = await fetchFilms.json();
  filmInfo.innerHTML = data.Search.map((film) => {
    return showFilm(film);
  }).join("");
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
