import axios from 'axios';
import React, { useRef, useState } from 'react';
import { fetchService } from '../service/FetchService';
import { useLocalStorage } from '../service/localStorageService';

const CreatePost = ({action, user, setPosts, posts}) => {

    const [jwt, setJwt] = useLocalStorage("", "jwt");
    const inputRef = useRef(null);
    const hiddenFileInput = useRef(null);
    const [imageToPost, setImageToPost] = useState(null);

    function handleSubmit(event) {
        event.preventDefault();
        if (!inputRef.current.value) return;
        const formData = new FormData();
        formData.append("file", imageToPost);
        formData.append("post", inputRef.current.value);
        formData.append("user", JSON.stringify(user));
        const fetchData = {
            headers: {
                Authorization: `Bearer ${jwt}`
            },
            method: "POST",
            body: formData
        };
        fetch("/api/posts", fetchData)
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            }
          })
          .then((newPost) => {
            let newPosts = [...posts];
            newPosts.push(newPost);
            setPosts(newPosts.reverse());
          });
        action();
    }

    function handleClick(event) {
        hiddenFileInput.current.click();
    }

    function addImageToPost(event) {
        const reader = new FileReader();
        if  (event.target.files[0]) {
            reader.readAsDataURL(event.target.files[0]);
            reader.onload = (event) => {
                setImageToPost(event.target.result);
            }
        }
    }

    function removeImage() {
        setImageToPost(null);
    }

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
                    Create Post
                  </h3>
                </div>
                {/*body*/}
                <div className='h-[260px]'>
                    <form className='flex my-4'>
                        <input ref={inputRef} type="text"
                            className="rounded-full h-12 flex-grow focus:outline-none font-medium
                            bg-gray-100 px-4" 
                            placeholder="What's on your mind?"/>
                        <button onClick={handleSubmit} className="hidden"></button>
                    </form>

                    {imageToPost && (
                        <div onClick={removeImage} className='flex items-center px-4 py-2 space-x-4 filter hover:brightness-210 transition duration-150 cursor-pointer'>
                            <img src={imageToPost} className="h-20 object-contain"/>
                        </div>
                    )}

                    <div onClick={handleClick} 
                        className='flex items-center p-1 space-x-2 flex-grow justify-center hover:bg-gray-100 rounded-md cursor-pointer'>
                        <p className='font-semibold text-gray-600'>Photo/Video</p>
                        <input onChange={addImageToPost} type="file" hidden ref={hiddenFileInput} accept='image/*' />
                    </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => action()}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
};

export default CreatePost;