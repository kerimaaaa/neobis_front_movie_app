const url__premier = "https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2023&month=MAY";
const url__top = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const url__await = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=1';
const url__digital = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/releases?year=2023&month=APRIL&page=1';
const url__search = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';
const API_key = 'dd519481-2d52-40d4-a685-866db3c05a7e';
const filmCover = document.querySelector('.film-cover');
const form = document.querySelector('form');
const search = document.querySelector('#search');
const searchBtn = document.querySelector('.search-btn');
const favSection = document.querySelector('#favorites')
const favorites = []
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
    if (rate >= 7 || rate > " 70 %") {
        return "green";
    } else if (rate >= 5 || rate > "50 %") {
        return 'orange';
    } else {
        return "red";
    }
}

function showFilms(section, data) {
    const movies = document.querySelector('#film-'+section);

    data.forEach(movie => {
        const movie_card = document.createElement('div');
        movie_card.classList.add('films-card')
        movie_card.innerHTML = `
            <div class="film-cover">
                <img alt="${movie.nameRu}" class="film-img"
                    src="${movie.posterUrlPreview}">
            </div>
            ${movie.rating &&
                `
                    <div class="film-rating film-average-${getClassByRate(movie.rating)}">
                        <p>${movie.rating}</p>
                    </div>
                `
            }
            <div class="film-title">
                <h3>${movie.nameRu}</h3>
            </div>
            <div class="film-genre">
                <p>${movie.genres.map((genre) => ` ${genre.genre}`)}</p>
            </div>
            <div class="film-year">
                <p>${movie.year}</p>
            </div>
            <div class="film__heart"><button data-id="${movie.filmId}"  class="fav_btn" id="btns">
            <i class="fa-regular fa-heart"></i></button></div>
        `;
        movies.appendChild(movie_card);
    })
    const favoriteBtns = document.querySelector('#btns')
    for(let i=0; i< favoritebtns.length; i++){
       favorites.push(favoritebtns[i].dateset)
         localStorage.setItem('favorites', JSON.stringify(favorites));
}
function showFavFilms() {
    favorites.innerHTML = localStorage.getItem('favorites') ||[];
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const filmsTitle = document.querySelector('.films-section-title');
    const filmsTop = document.querySelector('#film-top');
    const filmsPremier = document.querySelector('#film-premieres');
    const filmsAwait = document.querySelector('#film-await');
    const filmsDigital = document.querySelector('#film-digital');
    const digitalTitle = document.querySelector('#digitals');
    const premiereTitle = document.querySelector('#premieres');
    const awaitTitle = document.querySelector('#awaits');

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
