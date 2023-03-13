import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '../service/localStorageService';
import jwt_decode from "jwt-decode";
import LeftSidebar from './LeftSidebar';
import Feed from './Feed';
import { useNavigate } from 'react-router-dom';
import UserService from '../service/UserService';
import { fetchService } from '../service/FetchService';
import RightSidebar from './RightSidebar';
import SearchModal from './SearchModal';
import CreatePost from './CreatePost';
import ViewProfile from './ViewProfile';

const Dashboard = () => {
    
    const [jwt, setJwt] = useLocalStorage("", "jwt");
    const navigate = useNavigate();
    const [users, setUsers] = useState(null);
    const [loggedUser, setLoggedUser] = useState(null);
    const [searchModal, setSearchModal] = useState(false);
    const [createPostModal, setCreatePostModal] = useState(false);
    const [followers, setFollowers] = useState(null);
    const [posts, setPosts] = useState(null);
    const [viewProfile, setViewProfile] = useState(false);

    useEffect(() => {
        fetchService("/api/posts", "GET", jwt, null)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then((postsDb) => {
                setPosts(postsDb.reverse());
            })
    }, []);

    function searchClicked() {
        setSearchModal(!searchModal);
    }

    function showCreatePostModal() {
        setCreatePostModal(!createPostModal);
    }

    useEffect(() => {
        if (jwt) {
            const jwtDecoded = jwt_decode(jwt);
            
            fetchService(`/api/users/${jwtDecoded.sub}`, "GET", jwt, null)
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    }
                })
                .then((user) => {
                    setLoggedUser(user);
                });

            fetchService("/api/users", "GET", jwt, null)
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    }
                })
                .then((data) => {
                    setUsers(data);
                })
         }
    }, [jwt]);

    useEffect(() => {
        if (loggedUser != null) {
            fetchService(`/api/followers/${loggedUser.id}`, "GET", jwt, null)
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    }
                })
                .then((data) => {
                    setFollowers(data);
                })
        }
    }, [loggedUser]);
    
    function logout() {
        localStorage.removeItem("jwt");
        navigate("/instagram/login")
    }

    function updateFollowers() {
        fetchService(`/api/followers/${loggedUser.id}`, "GET", jwt, null)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then((data) => {
                setFollowers(data);
            })
    }

    return (
        <div className='flex'>
            <LeftSidebar logout={logout} searchClicked={searchClicked} showCreatePostModal={showCreatePostModal} showViewProfile={setViewProfile}/>
            <Feed posts={posts} setPosts={setPosts}/>
            {loggedUser && users && followers && <RightSidebar user={loggedUser} logout={logout} users={users} 
                followers={followers} updateFollowers={updateFollowers}/>}
            { searchModal && loggedUser && users && followers && <SearchModal action={searchClicked} user={loggedUser} users={users} followers={followers} />}
            {createPostModal && loggedUser && <CreatePost action={showCreatePostModal} user={loggedUser} setPosts={setPosts} posts={posts.reverse()}/>}
            {viewProfile && loggedUser && <ViewProfile user={loggedUser} showViewProfile={setViewProfile} setLoggedUser={setLoggedUser}/>}
        </div>
    );
};

export default Dashboard;