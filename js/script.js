const url__premier = "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2023&month=MAY";
const url__top = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const url__await = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=1';
const url__digital = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=2023&month=APRIL&page=1';
const url__search = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';
const API_key = 'dd519481-2d52-40d4-a685-866db3c05a7e';
const filmCover = document.querySelector('.film-cover');
const form = document.querySelector('form');
const search = document.querySelector('#search');




async function fetchMovies(url) {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_key,
        },
    });
    const responseData = await response.json();
    return responseData;
}

async function getFilms(url) {

    const response = await fetchMovies(url)
    showFilms('top', response.films);

}
async function getFilmsPremiere(url) {
    const response = await fetchMovies(url)
    showFilms('premieres', response.items);
}


async function getFilmsAwait(url) {
    const response = await fetchMovies(url)
    showFilms('await', response.films);

}

async function getFilmsDigital(url) {
    const response = await fetchMovies(url)
    showFilms('digital', response.releases);

}

function getClassByRate(rate) {
    const ratings = document.querySelector('.ratings')
    if (rate >= 7 || rate > " 70 %") {
        return "green";
    } else if (rate > 5 || rate > "50 %") {
        return 'orange';
    } else {
        return "red";
    }
}

let favoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [];

function handleFavorite(movieId, heartButton) {
    const index = favoriteMovies.findIndex(movie => movie.id === movieId);
    if (index >= 0) {
        favoriteMovies.splice(index, 1);
        heartButton.style.color = "white";
    } else {
        favoriteMovies.push({ id: movieId });
        heartButton.style.color = "red";
    }

    localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));
}

function showFilms(section, data) {
    const movies = document.querySelector('#film-' + section);

    data.forEach(movie => {
        const movie_card = document.createElement('div');
        movie_card.classList.add('films-card')
        movie_card.innerHTML = `
            <div class="film-cover">
                <img alt="${movie.nameRu}" class="film-img"
                    src="${movie.posterUrlPreview}">
            </div>
            ${movie.rating &&
            ` <div class="film-rating film-average-${getClassByRate(movie.rating)}">
                        <p class='ratings'>${movie.rating}</p>
                    </div>
              `}
            <div class="film-title">
                <h3>${movie.nameRu}</h3>
            </div>
            <div class="film-genre">
                <p>${movie.genres.map((genre) => ` ${genre.genre}`)}</p>
            </div>
            <div class="film-year">
                <p>${movie.year}</p>
            </div>

        `;
        const filmFavorite = document.createElement("div");
        filmFavorite.classList.add('film__heart');
        movie_card.appendChild(filmFavorite);
        const heartButton = document.createElement("button");
        heartButton.classList.add('fav_btn');
        filmFavorite.appendChild(heartButton);
        const icon = document.createElement('i');
        icon.classList.add('fa-regular');
        icon.classList.add('fa-heart');
        heartButton.appendChild(icon);
        heartButton.dataId = movie.filmId;
        heartButton.style.color = favoriteMovies.find(favoriteMovie => favoriteMovie.id === movie.filmId) ? "red" : "white";
        heartButton.addEventListener("click", () => handleFavorite(movie.filmId, heartButton));
        movies.appendChild(movie_card);
    })
}

const filmsTitle = document.querySelector('.films-section-title');
const filmsTop = document.querySelector('#film-top');
const filmsPremier = document.querySelector('#film-premieres');
const filmsAwait = document.querySelector('#film-await');
const filmsDigital = document.querySelector('#film-digital');
const digitalTitle = document.querySelector('#digitals');
const premiereTitle = document.querySelector('#premieres');
const awaitTitle = document.querySelector('#awaits');

form.addEventListener('submit', (e) => {
    e.preventDefault();


    const apiSearchUrl = `${url__search}${search.value}`;
    if (search.value) {
        getFilms(apiSearchUrl);

        search.value = '';
        filmsTitle.innerHTML = '';
        filmsTop.innerHTML = '';
        filmsPremier.innerHTML = '';
        filmsAwait.innerHTML = '';
        filmsDigital.innerHTML = '';
        digitalTitle.innerHTML = '';
        awaitTitle.innerHTML = '';
        premiereTitle.innerHTML = '';
    }
});

getFilmsPremiere(url__premier);
getFilms(url__top);
getFilmsAwait(url__await);
getFilmsDigital(url__digital);
