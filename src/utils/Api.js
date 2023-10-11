/* eslint-disable import/no-anonymous-default-export */

class Api {
  apiUrl = `http://api.mariatektova.diploma.nomoredomains.rocks`;
  moviesUrl = `https://api.nomoreparties.co/beatfilm-movies`;

  request = async (url, method, params, headers = {}) => {
      const token = localStorage.getItem(`jwt`);
      const res = await fetch(url, {
          method,
          headers: {
              ...{'Content-Type': `application/json`, 'Authorization': `Bearer ${token}`},
              ...headers
          },
          body: JSON.stringify(params)
      });
      return await res.json();
  }

    requestApi = async (endpoint = ``, method, params, headers) => {
        return await this.request(`${this.apiUrl}${endpoint}`, method, params, headers);
    }

    requestMovies = async (endpoint = ``, method, params, headers) => {
        return await this.request(`${this.moviesUrl}${endpoint}`, method, params, headers);
    }
}

export default new Api();

