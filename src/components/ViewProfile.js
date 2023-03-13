import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchService } from '../service/FetchService';
import { useLocalStorage } from '../service/localStorageService';

const ViewProfile = ({user, showViewProfile, setLoggedUser}) => {
    const [jwt, setJwt] = useLocalStorage("", "jwt");
    const [updatedUser, setUpdatedUser] = useState(() => {
        let userWithPasswordBlank = {...user};
        userWithPasswordBlank.password = "";
        return userWithPasswordBlank;
    });
    const navigate = useNavigate();

    function updateUser(fieldToUpdate, value) {
        const newUpdateUser = {...updatedUser};
        newUpdateUser[fieldToUpdate] = value;
        setUpdatedUser(newUpdateUser);
    }

    function saveUpdates() {
        fetchService("/api/users", "PUT", jwt, updatedUser)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then((userDb) => {
                setLoggedUser(userDb);
                localStorage.removeItem("jwt");
                navigate("/instagram/login");
            })
    }

    function showPasswordFiled() {
        const btnShowPasswordFiled = document.querySelector(".show-password-field-button");
        const passwordFiled = document.querySelector(".password-field");
        btnShowPasswordFiled.classList.add("hidden");
        passwordFiled.classList.remove("hidden");
    }

    console.log(updatedUser);

    return (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-[640px] my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Hi {user?.username}
                  </h3>
                </div>
                {/*body*/}
                <div className=''>
                    <div className='px-8 pt-6 pb-2'>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                                First Name
                            </label>
                            <input value={updatedUser.firstName}  onChange={(event) => updateUser("firstName", event.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text" placeholder="First Name" />
                        </div>
                    </div>
                    <div className='px-8 pb-2'>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                                Last Name
                            </label>
                            <input value={updatedUser.lastName}  onChange={(event) => updateUser("lastName", event.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text" placeholder="First Name" />
                        </div>
                    </div>
                    <div className='px-8 pb-2'>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input value={updatedUser.username}  onChange={(event) => updateUser("username", event.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text" placeholder="First Name" />
                        </div>
                    </div>
                    <div className='px-8 pb-2'>
                        <div className="mb-4 hidden password-field">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input value={updatedUser.password}  onChange={(event) => updateUser("password", event.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text" placeholder="First Name" />
                        </div>
                        <div className='mb-4 show-password-field-button'>
                            <button onClick={() => showPasswordFiled()} className='text-md text-white bg-red-400 px-6 py-2 rounded-full'>
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
                {/*footer*/}
                <div className='flex items-center justify-between border-t border-solid border-slate-200 rounded-b'>
                    <div>
                        <p className='text-md font-semibold text-gray-400 ml-4'>Note: After update you will be logged out!</p>
                    </div>
                    <div className="flex items-center justify-end p-6">
                        <button
                            className="text-green-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => saveUpdates()}
                        >
                            Update
                        </button>
                        <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => showViewProfile(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
};

export default ViewProfile;