import React, { useEffect, useState } from 'react';
import DinoProfile from "../images/dino-profile.jpg";
import {BsThreeDots} from "react-icons/bs"
import PostExample from "../images/post-example.jpg"
import PostExampleWide from "../images/nature-example-wide.jpg"
import {AiOutlineHeart} from "react-icons/ai"
import {FaRegComment} from "react-icons/fa"
import {RiShareForwardLine} from "react-icons/ri"
import {CiSaveDown2} from "react-icons/ci"
import {BsSave} from "react-icons/bs"
import { useLocalStorage } from '../service/localStorageService';
import { fetchService } from '../service/FetchService';

const Post = ({post}) => {

    const [jwt, setJwt] = useLocalStorage("", "jwt");
    const [userPost, setUserPost] = useState(null);
    
    useEffect(() => {
        fetchService(`/api/users/byId/${post.user_id}`, "GET", jwt, null)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then((user) => {
                setUserPost(user);
            })
    }, []);

    return (
        <div className='w-96 flex flex-col border-b mb-16'>
            <div className='flex justify-between items-center'> 
                <div className='flex items-center gap-x-4'> 
                    <img src={DinoProfile} className="rounded-full" width={40}
                        height={40}/>
                    <div className='flex items-center'>
                        <p className='font-semibold mr-2'>{userPost?.username}</p>
                        <div className='w-1.5 h-1.5 bg-gray-400 mr-2 rounded-full'></div>
                        <p className='text-gray-400'>{post?.timeStamp}</p>
                    </div>
                </div>
                <div>
                    <BsThreeDots className='hover:cursor-pointer' size={20}/>
                </div> 
            </div>
            <img src={post?.file} className="mt-6 rounded-md h-[480px]"/>
            <div className='flex justify-between items-center mt-3'>
                <div className='flex justify-start gap-x-4'>
                    <AiOutlineHeart size={25} className="hover:cursor-pointer"/>
                    <FaRegComment size={25} className="hover:cursor-pointer" />
                    <RiShareForwardLine size={25} className="hover:cursor-pointer"/>
                </div>
                <div>
                    <BsSave size={25} className="hover:cursor-pointer"/>
                </div>
            </div>
            <div className='my-4'>
                <p className="font-semibold">Likes: {post?.likes}</p>
            </div>
            <div className=''>
                <p className='text-md font-semibold'>{userPost?.username}: {post?.post}</p>
            </div>
        </div>
    );
};

export default Post;