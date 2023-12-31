import './App.css';
import React, {useEffect, useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import routes from '../../routes';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import Api from "../../utils/Api";

const App = () => {
    const [profile, setProfile] = useState({});
    const [allMovies, setAllMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [token, setToken] = useState(localStorage.getItem(`jwt`) ?? null);

    useEffect(() => {
        if (!!token) {
            Api.request(`/users/me`, `GET`)
                .then((res) => {
                    if (!res._id) {
                        localStorage.removeItem(`jwt`);
                        setToken(null);
                    } else {
                        setProfile(res);
                    }
                })
                .catch(null);

            Api.request(`/movies`)
                .then(setSavedMovies)
                .catch(null);
        } else {
            setProfile(null);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return (
        <CurrentUserContext.Provider value={{profile, setProfile, token, setToken, allMovies, setAllMovies,savedMovies, setSavedMovies}}>
            <div className={`app`}>
                <Header />
                <Routes>
                    {routes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                </Routes>
                <Footer profile={profile} />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;