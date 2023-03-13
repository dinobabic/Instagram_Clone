import React from 'react';
import DinoProfile from "../images/dino-profile.jpg";
import { fetchService } from '../service/FetchService';
import { useLocalStorage } from '../service/localStorageService';

const UserSearch = ({user, following, loggedUser, updateFollowers}) => {

    const [jwt, setJwt] = useLocalStorage("", "jwt");

    function follow(event) {
        const body = {
            "user": loggedUser,
            "follower": user
        }
        fetchService("/api/followers", "POST", jwt, body)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then((data) => {
                updateFollowers();
            })
    }

    return (
        <div className='flex justify-between items-center mt-2'>
            <div className='flex items-center gap-x-2'>
                <img src={DinoProfile} className="h-8 w-8 rounded-full"/>
                <p className='font-semibold'>{user.username}</p>
            </div>
            <div>
                {
                following ? 
                    <p className='font-semibold text-md text-blue-600 cursor-pointer'>Firends</p>
                :
                    <p className='font-semibold text-md text-blue-600 cursor-pointer'
                        onClick={(event) => follow(event)}>Follow</p>
                }
            </div>
        </div>
    );
};

export default UserSearch;