import React, { useState } from 'react';
import {BsSearch} from "react-icons/bs"
import UserSearch from './UserSearch';

const SearchModal = ({action, users, user}) => {

    const [searchUsers, setSearchUsers] = useState(users.filter((userFilter) => userFilter.username !== user.username).slice(0, 5));
    const [searchKey, setSearchKey] = useState("");

    function updateSearch(event) {
        const newSearchKey = event.target.value;
        setSearchKey(newSearchKey);
        let newSearchUsers = [...searchUsers];
        newSearchUsers = users.filter((userFilter) => userFilter.username.includes(newSearchKey));
        setSearchUsers(newSearchUsers);
    }


    return (
        <>
      (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-[420px] my-6 mx-auto">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Search
                  </h3>
                </div>
                {/*body*/}
                <div className="px-10 my-5 h-56 overflow-auto">
                    <div className='flex border-2 px-2 pr-6 py-1 rounded-full justify-between items-center mt-2'>
                        <input className='w-64 focus:outline-none px-2 py-1 hover:cursor-pointer
                                    ' type="text" placeholder='Enter Username'
                                    value={searchKey || ""} onChange={(event) => updateSearch(event)}/>
                        <BsSearch size={25} className="text-gray-400 cursor-pointer"/>
                    </div>
                    <div className='flex flex-col mt-4'>
                        {searchUsers.map((userMap) => {
                            return (<UserSearch user={userMap} key={userMap.id}/>)
                        })}
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
      )
    </>
    );
};

export default SearchModal;