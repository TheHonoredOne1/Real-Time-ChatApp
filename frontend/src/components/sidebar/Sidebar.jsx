import React from 'react'
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
function Sidebar() {
    return (

        <div className='border-r border-slate-500 p-4 flex flex-col gap-2'>
            <SearchInput />
            <div className='divider px-3'></div>
            <Conversations />
            <LogoutButton />
        </div>

    )
}

export default Sidebar
