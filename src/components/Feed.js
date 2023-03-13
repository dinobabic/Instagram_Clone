import React, { useEffect, useState } from 'react';
import { fetchService } from '../service/FetchService';
import { useLocalStorage } from '../service/localStorageService';
import Post from './Post';


const Feed = ({setPosts, posts}) => {

    const [jwt, setJwt] = useLocalStorage("", "jwt");

    return (
        <div className='mx-auto flex flex-col mt-40'>
            <div>
                {posts && posts.map((post) => {
                    return (
                        <Post key={post.id} post={post}/>
                    )
                })}
            </div>
        </div>
    );
};

export default Feed;