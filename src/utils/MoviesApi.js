import moviesApiURL from "./constants";

// Класс API для работы с сервером.
class MoviesApi {
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

  getMovies() {
    return fetch(`${this._url}`, {
      headers: this._headers,
    }).then(this._getResponce);

  }
}

const apiConfig = {
  url: `${moviesApiURL}beatfilm-movies`,
  headers: {
    "Content-Type": "application/json",
  },
};

const moviesApi = new MoviesApi(apiConfig);

export default moviesApi;