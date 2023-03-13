import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import AuthService from '../service/AuthService';
import { useLocalStorage } from '../service/localStorageService';

const PrivateRoute = ({children}) => {

    const [jwt, setJwt] = useLocalStorage("", "jwt");
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState(null);
    const navigate = useNavigate();

    useEffect(() =>  {
        if (jwt === "") {
            setIsLoading(false);
            setIsValid(false);
        }
        else {
            AuthService.validateJwt(jwt)
            .then((response) => {
                setIsLoading(false);
                if (response.data) {
                    setIsValid(true);
                }
                else {
                    setIsValid(false);
                }
            })
        }
    }, [jwt]);

    function removeOldJwt() {
        localStorage.removeItem("jwt");
        return <Navigate to={"/instagram/login"}></Navigate>
    }

    return (
        isLoading ? <div>Loading...</div> : (
            isValid ? children : removeOldJwt()
        )
    );
};

export default PrivateRoute;