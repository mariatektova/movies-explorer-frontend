import React from "react";
import loadable from "@loadable/component";

import Loader from "./components/Loader/Loader";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: `/`,
    element: loadable(() => import(`./components/Main/Main`), {
      fallback: <Loader />
    })
  },
  {
    path: `/signup`,
    element: loadable(() => import(`./components/Register/Register`), {
      fallback: <Loader />
    })
  },
  {
    path: `/signin`,
    element: loadable(() => import(`./components/Login/Login`), {
      fallback: <Loader />
    })
  },
  {
    path: `/profile`,
    element: loadable(() => import(`./components/Profile/Profile`), {
      fallback: <Loader />
    })
  },
  {
    path: `/movies`,
    element: loadable(() => import(`./components/Movies/Movies`), {
      fallback: <Loader />
    })
  },
  {
    path: `/saved-movies`,
    element: loadable(() => import(`./components/SavedMovies/SavedMovies`), {
      fallback: <Loader />
    })
  },
  {
    path: `*`,
    element: loadable(() => import(`./components/NotFound/NotFound`), {
      fallback: <Loader />
    })
  }
];
