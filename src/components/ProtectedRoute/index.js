import React, {useContext} from "react";
import {Navigate} from "react-router-dom";

import { CurrentUserContext } from '../../context/CurrentUserContext';

const ProtectedRoute = (props) => {
    const { token } = useContext(CurrentUserContext);
    if (!token) return <Navigate to={`/`} />;
    return props.children;
};

export default ProtectedRoute;