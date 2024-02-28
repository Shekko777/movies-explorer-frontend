class Auth {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
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
      headers: this._headers,
      body: JSON.stringify({ name, email, password }),
    }).then(this._getResponce);
  }

  signIn(email, password) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ email, password }),
    }).then(this._getResponce)
  }

  checkToken() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._getResponce);
  }

  signOut() {
    return fetch(`${this._url}/signout`, {
      method: "post",
      headers: this._headers,
    }).then(this._getResponce)
  }
}

const config = {
  // url: "http://127.0.0.1:3000",
  url: "https://api-shekko-movie.nomoredomainsmonster.ru",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  }
}

const auth = new Auth(config);

export default auth;
