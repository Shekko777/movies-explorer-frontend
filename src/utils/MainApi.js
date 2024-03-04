// Класс API для работы с сервером.
class MainApi {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  // Функция проверки ответа от сервера.
  _getResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(console.log(`Oops: ${res.status}`));
  }

  saveMovies(
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN
  ) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        thumbnail,
        movieId,
        nameRU,
        nameEN
      })
    }).then(this._getResponce)
  }

  removeMovies(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    }).then(this._getResponce);
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(this._getResponce);
  }

  changeInfo(name, email) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ name, email })
    }).then(this._getResponce)
  }
 
}

const apiConfig = {
  // url: "http://127.0.0.1:3000", <= оставил для работы с локальной БД
  url: "https://api-shekko-movie.nomoredomainsmonster.ru",
};

const mainApi = new MainApi(apiConfig);

export default mainApi;