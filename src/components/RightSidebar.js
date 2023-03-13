import React, { useState } from 'react';
import DinoProfile from "../images/dino-profile.jpg";
import {BsSearch} from "react-icons/bs"
import UserSearch from './UserSearch';

const RightSidebar = ({user, logout, users, followers, updateFollowers}) => {

    const [searchUsers, setSearchUsers] = useState(users.filter((userFilter) => userFilter.username !== user.username).slice(0, 5));
    const [searchKey, setSearchKey] = useState("");

    function updateSearch(event) {
        const newSearchKey = event.target.value;
        setSearchKey(newSearchKey);
        let newSearchUsers = [...searchUsers];
        newSearchUsers = users.filter((userFilter) => userFilter.username !== user.username).slice(0, 5).filter((userFilter) => userFilter.username.includes(newSearchKey));
        setSearchUsers(newSearchUsers);
    }

    return (
        <>
        <div className='hidden xl:inline-flex flex-col right-0 mt-24 w-96 h-52 mr-16'>
            <div className='flex justify-between w-96 mr-8 h-16 items-center'>
                <div className='flex gap-x-4 items-center'>
                    <img src={DinoProfile} className="h-16 w-16 rounded-full hover:cursor-pointer" />
                    <div className='flex flex-col'>
                        <p className='font-semibold hover:cursor-pointer'>{user.username}</p>
                        <p className='text-gray-400'>{user.firstName} {user.lastName}</p>
                    </div>
                </div>
                <div>
                    <p className='text-blue-600 font-semibold text-md hover:cursor-pointer'
                        onClick={() => logout()}>Logout</p>
                </div>
            </div>
            <div className='w-96 mt-3'>
                <div className=''>
                    <p className='text-sm text-gray-400'>Search Users</p>
                </div>
                <div className='flex border-2 px-2 pr-6 py-1 rounded-full justify-between items-center mt-2'>
                    <input className='w-64 focus:outline-none px-2 py-1 hover:cursor-pointer
                                ' type="text" placeholder='Enter Username'
                                value={searchKey || ""} onChange={(event) => updateSearch(event)}/>
                    <BsSearch size={25} className="text-gray-400 cursor-pointer"/>
                </div>
            </div>

            <div className='mt-4 flex flex-col'>
                <div className='overflow-auto h-56'>
                    {searchUsers.map((userMap) => {
                        return (<UserSearch user={userMap} key={userMap.id} updateFollowers={updateFollowers} 
                            loggedUser={user} following={
                            followers.filter((follower) => userMap.id === follower.follower).length === 1
                        }/>)
                    })}
                </div>
            </div>
        </div>

        <div className='hidden lg:inline-flex xl:hidden h-52 w-48 mr-8'>
            <div className='flex gap-x-4 items-center'>
                <img src={DinoProfile} className="h-16 w-16 rounded-full hover:cursor-pointer" />
                <p className='text-blue-600 font-semibold text-md hover:cursor-pointer'
                        onClick={() => logout()}>Logout</p>
            </div>
        </div>
        </>
    );
};

export default RightSidebar;