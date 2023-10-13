/* eslint-disable import/no-anonymous-default-export */
export { API_URL } from './constants';

class Api {
    url = `https://api.mariatektova.diploma.nomoredomains.rocks`;

    request = async (endpoint, method = `GET`, params = {}) => {
        const token = localStorage.getItem(`jwt`);

        const settings = {
            method,
            headers: {
                'Content-Type': `application/json`, 'Authorization': `Bearer ${token}`
            }
        };

        if (method !== `GET`) {
            settings['body'] = JSON.stringify(params);
        }

        const res = await fetch(`${this.url}${endpoint}`, settings);
        return await res.json();
    }
}

export default new Api();
