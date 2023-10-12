/* eslint-disable import/no-anonymous-default-export */
class ApiMovies {
  request = async () => {
      const res = await fetch(`https://api.nomoreparties.co/beatfilm-movies`, {
          method: `GET`,
          headers: {'Content-Type': `application/json`}
      });
      return await res.json();
  }
}

export default new ApiMovies();