import React from "react";

import Main from "./components/Main/Main";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Movies from "./components/Movies/Movies";
import SavedMovies from "./components/SavedMovies/SavedMovies";
import NotFound from "./components/NotFound/NotFound";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: `/`,
    element: <Main />
  },
  {
    path: `/signup`,
    element: <Register />
  },
  {
    path: `/signin`,
    element: <Login />
  },
  {
    path: `/profile`,
    element: (
        <ProtectedRoute>
          <Profile/>
        </ProtectedRoute>
    )
  },
  {
    path: `/movies`,
    element: (
      <ProtectedRoute>
        <Movies/>
      </ProtectedRoute>
    )
  },
  {
    path: `/saved-movies`,
    element: (
      <ProtectedRoute>
      <SavedMovies/>
      </ProtectedRoute>
    )
  },
  {
    path: `*`,
    element: <NotFound />
  }
];