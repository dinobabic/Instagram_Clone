import React from 'react';
import TextLogo from "../images/text-logo.png"
import {AiOutlineHeart, AiOutlineInstagram, AiOutlineSearch} from "react-icons/ai"
import SidebarItem from './SidebarItem';
import { AiFillHome } from 'react-icons/ai';
import DinoProfile from "../images/dino-profile.jpg";
import {IoIosNavigate} from "react-icons/io"
import {BiAddToQueue, BiMoviePlay} from "react-icons/bi"
import {RiShareForwardLine} from "react-icons/ri"
import {RxHamburgerMenu} from "react-icons/rx"
import { useLocalStorage } from '../service/localStorageService';
import { useNavigate } from 'react-router-dom';

const LeftSidebar = ({logout, searchClicked, showCreatePostModal, showViewProfile}) => {

    const [jwt, setJwt] = useLocalStorage("", "jwt");

    return (
        <div style={{borderRightWidth: "1px"}} className='h-screen fixed flex-col py-2 px-2
                 lg:max-w-[260px] md:max-w-[80px] hidden sm:inline-flex border-gray-300'>
            <div className='mt-8 mb-12 mx-4'>
                <img className='hidden lg:inline-flex' src={TextLogo} width={120} height={120}/>
                <AiOutlineInstagram className='lg:hidden md:inline-flex sm:inline-flex'
                        size={30}/>
            </div>
            <SidebarItem Icon={AiFillHome} text={"Home"}/>
            <SidebarItem Icon={AiOutlineSearch} text={"Search"} action={searchClicked}/>
            <SidebarItem Icon={IoIosNavigate} text={"Explore"}/>
            <SidebarItem Icon={BiMoviePlay} text={"Reels"}/>
            <SidebarItem Icon={RiShareForwardLine} text={"Messages"}/>
            <SidebarItem Icon={AiOutlineHeart} text={"Notifications"}/>
            <SidebarItem Icon={BiAddToQueue} text={"Create"} action={showCreatePostModal}/>
            <div className='mx-4 mb-6 lg:hover:bg-gray-200 hover:rounded-full lg:py-2 lg:pl-2
                            hover:cursor-pointer'>
                <div className='flex justify-start items-center align-middle' onClick={() => showViewProfile(true)}>
                    <img width={30} height={30} src={DinoProfile} className="rounded-full mr-6"/>
                    <p className='hidden lg:inline font-bold'>Profile</p>
                </div>
            </div>
            <div className='mx-4 mb-6 absolute bottom-0 lg:hover:bg-gray-200 hover:rounded-full lg:py-2 lg:pl-2
                            hover:cursor-pointer' onClick={() => logout()}>
                <div className=' flex justify-start items-center align-middle'>
                    <RxHamburgerMenu size={30} className="lg:mr-6"/>
                    <p className='hidden lg:inline'>More</p>
                </div>
            </div>
        </div>
    );
};

export default LeftSidebar;