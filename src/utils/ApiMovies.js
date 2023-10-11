/* eslint-disable import/no-anonymous-default-export */
class ApiMovies {
  moviesUrl = `https://api.nomoreparties.co/beatfilm-movies`;

  request = async (url, method, params, headers = {}) => {
      const res = await fetch(url, {
          method,
          headers: {
              ...{'Content-Type': `application/json`},
              ...headers
          },
          body: JSON.stringify(params)
      });
      return await res.json();
  }


    requestMovies = async (endpoint = ``, method, params, headers) => {
        return await this.request(`${this.moviesUrl}${endpoint}`, method, params, headers);
    }
}

export default new ApiMovies();