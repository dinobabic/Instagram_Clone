import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoImage from "../images/instagram-logo.jpg"
import AuthService from '../service/AuthService';
import { useLocalStorage } from '../service/localStorageService';

const Login = () => {

    const [jwt, setJwt] = useLocalStorage("", "jwt");
    const navigate = useNavigate();

    const [loginRequest, setLoginRequest] = useState({
        username: "",
        password: ""
    });

    function updateLoginRequest(field, value) {
        const newLoginRequest = {...loginRequest};
        newLoginRequest[field] = value;
        setLoginRequest(newLoginRequest);
    }

    function login() {
        AuthService.login(loginRequest)
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.headers.get("authorization"));
                    setJwt(response.headers.get("authorization"));
                    return response.data;
                }
            })
    }

    useEffect(() => {
        if (jwt !== "") {
            navigate("/instagram/dashboard")
        }
    }, [jwt]);

    return (
        <div className="w-full max-w-xl container mx-auto mt-48">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className='flex justify-center'>
                    <img src={LogoImage} width={200}/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input onChange={(event) => updateLoginRequest("username", event.target.value)}
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input onChange={(event) => updateLoginRequest("password", event.target.value)}
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                </div>
                <div className="flex items-center justify-between">
                <button onClick={() => login()}
                    className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Sign In
                </button>
                <a className="inline-block align-baseline font-bold text-sm text-blue-400 hover:text-blue-500" href="#">
                    Forgot Password?
                </a>
                </div>
            </div>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className='flex justify-center items-center'>
                    <p className='text-gray-500 mr-2 text-md'>You don't have account?</p>
                    <a onClick={() => navigate("/instagram/register")} className="cursor-pointer text-md inline-block align-baseline font-bold text-sm text-blue-400 hover:text-blue-500">Register</a>
                </div>
            </div>
            <p className="text-center text-gray-500 text-xs">
                &copy;Instagram Clone. All rights reserved.
            </p>
        </div>
    );
};

export default Login;