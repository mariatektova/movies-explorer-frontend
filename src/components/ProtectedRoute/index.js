import React, {useContext} from "react";
import {Navigate} from "react-router-dom";

import { CurrentUserContext } from '../../context/CurrentUserContext';

const ProtectedRoute = (props) => {
    const { profile } = useContext(CurrentUserContext);
    if (!profile || !profile._id) return <Navigate to={`/`} />;
    return props.children;
};

export default ProtectedRoute;