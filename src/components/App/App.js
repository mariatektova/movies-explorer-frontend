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
    const [savedMovies, setSavedMovies] = useState([]);
    const [token, setToken] = useState(localStorage.getItem(`jwt`) ?? null);

    useEffect(() => {
        if (!!token) {
            Api.requestApi(`/users/me`, `GET`)
                .then(setProfile)
                .catch(null);

            Api.requestApi(`/movies`)
                .then(setSavedMovies)
                .catch(null);
        } else {
            setProfile(null);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return (
        <CurrentUserContext.Provider value={{profile, setProfile, setToken, savedMovies, setSavedMovies}}>
            <div className={`app`}>
                <Header />
                <Routes>
                    {routes.map((route) => (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={route.element.render()}
                        />
                    ))}
                </Routes>
                <Footer profile={profile} />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;