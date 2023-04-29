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








async function getFilms(url) {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_key,
        },
    });
    const responseData = await response.json();
    showFilms(responseData);

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

function showFilms(data) {
    const movies = document.querySelector('.films-row');

//    const wrapper = document.querySelector('.wrapper');
//     wrapper.innerHTML = '';

    data.films.forEach(movie => {
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
                `;
        movies.appendChild(movie_card);

    })
}
async function getFilmsPremier(url) {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_key,
        },
    });
    const responseData = await response.json();

    showFilmsPremier(responseData);
}

function showFilmsPremier(movies) {
    const moviesPremier = document.querySelector('.films-row-premier');

    movies.items.forEach(movie => {
        const movie_card = document.createElement('div');
        movie_card.classList.add('films-card')
        movie_card.innerHTML = `
        <div class="film-cover">
                    <img alt="${movie.nameRu}" class="film-img"
                        src="${movie.posterUrlPreview}">
                </div>
               
                <div class="film-title">
                    <h3>${movie.nameRu}</h3>
                </div>
                <div class="film-genre">
                    <p>${movie.genres.map((genre) => ` ${genre.genre}`)}</p>
                </div>
                <div class="film-year">
                <p>${movie.premiereRu}</p>
            </div>
                `;
        moviesPremier.appendChild(movie_card);

    })
}

async function getFilmsAwait(url) {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_key,
        },
    });
    const responseData = await response.json();
    showFilmsAwait(responseData);

}
function showFilmsAwait(data) {
    const movies = document.querySelector('.films-row-await');
    data.films.forEach(movie => {
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
                `;
        movies.appendChild(movie_card);

    })
}
async function getFilmsDigital(url) {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_key,
        },
    });
    const responseData = await response.json();
    showFilmsDigital(responseData);

}
function showFilmsDigital(data) {
    const movies = document.querySelector('.films-row-digital');
    data.releases.forEach(movie => {
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
                <p>${movie.releaseDate}</p>
            </div>
                `;
        movies.appendChild(movie_card);

    })
}

// form.addEventListener('submit', (e)=>{
//     e.preventDefault();
//     const apiSearchUrl = `${url__search}${search.value}`
//     if(search.value){
//         getFilms(apiSearchUrl);

//         search.value ='';
//     }
// })

getFilmsPremier(url__premier);
getFilms(url__top);
getFilmsAwait(url__await);
getFilmsDigital(url__digital);
