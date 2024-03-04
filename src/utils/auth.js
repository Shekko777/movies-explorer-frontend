class Auth {
  constructor(config) {
    this._url = config.url;
  }

  _getResponce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  signUp(name, email, password) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }).then(this._getResponce);
  }

  signIn(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(this._getResponce)
  }

  checkToken() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(this._getResponce);
  }

  signOut() {
    return fetch(`${this._url}/signout`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(this._getResponce)
  }
}

const config = {
  // url: "http://127.0.0.1:3000", <= оставил для работы с локальной БД
  url: "https://api-shekko-movie.nomoredomainsmonster.ru",
}

const auth = new Auth(config);

export default auth;
