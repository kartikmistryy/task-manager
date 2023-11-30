"use client"

import React, { useContext, useState } from 'react'
import Sidebar from './Sidebar'
import MainPanel from './MainPanel'
import { MyContext } from '../Context/Context'
import Login from './Login'

function Display() {
    
    const {user} = useContext(MyContext)

    return (  
    <div className='bg-[#121213] h-screen flex flex-row'>
        {user && (
            <>
                <Sidebar />
                <MainPanel />
            </>
        )}
        {!user && <Login/>}
    </div> 
  )
}

export default Display