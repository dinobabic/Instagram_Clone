import React from 'react';
import SearchModal from './SearchModal';

const SidebarItem = ({Icon, text, action}) => {

    return (
        <div onClick={action} className='mx-4 mb-6 hover:cursor-pointer lg:hover:bg-gray-200 hover:rounded-full lg:py-2 lg:pl-2'>
            <div className='flex justify-start items-center align-middle'>
                <Icon size={30} className="lg:mr-6"/>
                <p className='hidden lg:inline'>{text}</p>
            </div>
        </div>
    );
};

export default SidebarItem;