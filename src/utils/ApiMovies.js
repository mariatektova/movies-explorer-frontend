/* eslint-disable import/no-anonymous-default-export */
import { API_MOVIES } from "./constants"; 
class ApiMovies {
  request = async () => {
      const res = await fetch(API_MOVIES, {
          method: `GET`,
          headers: {'Content-Type': `application/json`}
      });
      return await res.json();
  }
}

export default new ApiMovies();