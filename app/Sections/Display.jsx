"use client"

import React, { useContext, useState } from 'react'
import Sidebar from './Sidebar'
import MainPanel from './MainPanel'
import { MyContext } from '../Context/Context'
import Login from './Login'

function Display() {
    
    const {user} = useContext(MyContext)

    return (  
    <div className='bg-[#111111] h-full min-h-screen  flex lg:flex-row flex-col'>
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