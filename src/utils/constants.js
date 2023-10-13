export const EMAIL_REGEX =
  /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


 
export const DESKTPSIZE = 1000;
 
 export const TABSIZE = 768;

 export const IMAGE_URL = 'https://api.nomoreparties.co/';

 export const GETTIMEFORMINS = (mins) => {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + 'ч. ' + minutes + 'м.';
 }

export const API_URL = `https://api.mariatektova.diploma.nomoredomains.rocks`;

export const API_MOVIES = `https://api.nomoreparties.co/beatfilm-movies`;

export const MOVIESQUANTITYRENDER = (props) => props.width < 768 ? 5 : props.width < 1000 ? 8 : 12;

export const ADDMOREMOVIES = (props)=>props.width >= DESKTPSIZE ? 3 : 2;