import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoImage from "../images/instagram-logo.jpg"
import AuthService from '../service/AuthService';
import { useLocalStorage } from '../service/localStorageService';
import DatePicker from 'react-date-picker'

const Register = () => {

    const [jwt, setJwt] = useLocalStorage("", "jwt");
    const navigate = useNavigate();

    const [registerRequest, setRegisterRequest] = useState({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        email: "",
        birthday: new Date()
    });

    function updateRegisterRequest(field, value) {
        const newRegisterRequest = {...registerRequest};
        newRegisterRequest[field] = value;
        setRegisterRequest(newRegisterRequest);
    }

    function register() {
        let newRegisterRequest = registerRequest;
        newRegisterRequest["birthday"] = `${registerRequest.birthday.getFullYear()}-${(registerRequest.birthday.getUTCMonth() + 1).toString().padStart(2, "0")}-${registerRequest.birthday.getDate().toString().padStart(2, "0")}`;
        setRegisterRequest(newRegisterRequest);
        AuthService.register(newRegisterRequest)
            .then((response) => {
                if (response.status === 200) {
                    navigate("/instagram/login");
                }
            })
    }

    return (
        <div className="w-full max-w-xl container mx-auto mt-48">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className='flex justify-center'>
                    <img src={LogoImage} width={200}/>
                </div>
                <div className='flex items-center justify-center'>
                    <p className='text-xl text-gray-400 font-semibold mb-3 text-center'>
                        Register so you could se your friends <br></br>photos and videos.
                    </p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                        First Name
                    </label>
                    <input value={registerRequest.firstName} onChange={(event) => updateRegisterRequest("firstName", event.target.value)}
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text" placeholder="First Name" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                        Last Name
                    </label>
                    <input value={registerRequest.lastName} onChange={(event) => updateRegisterRequest("lastName", event.target.value)}
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text" placeholder="Last Name" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input value={registerRequest.username} onChange={(event) => updateRegisterRequest("username", event.target.value)}
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input value={registerRequest.password} onChange={(event) => updateRegisterRequest("password", event.target.value)}
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input value={registerRequest.email} onChange={(event) => updateRegisterRequest("email", event.target.value)}
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Birthday
                    </label>
                    <DatePicker className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(event) => updateRegisterRequest("birthday", event)} value={registerRequest.birthday} />
                </div>
                <div className="flex items-center justify-end">
                    <button onClick={() => register()}
                        className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Register
                    </button>
                </div>
            </div>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className='flex justify-center items-center'>
                    <p className='text-gray-500 mr-2 text-md'>Already have account?</p>
                    <a onClick={() => navigate("/instagram/login")} className="cursor-pointer text-md inline-block align-baseline font-bold text-sm text-blue-400 hover:text-blue-500">Sign in</a>
                </div>
            </div>
            <p className="text-center text-gray-500 text-xs">
                &copy;Instagram Clone. All rights reserved.
            </p>
        </div>
    );
};

export default Register;