import React, { useContext } from 'react'
import { MyContext } from '../Context/Context'
import Image from 'next/image'

import p1 from '../../public/demo/1.png'
import p2 from '../../public/demo/2.png'
import p3 from '../../public/demo/3.png'
import p4 from '../../public/demo/4.png'
import p5 from '../../public/demo/5.png'


function Login() {
    
    const {signUser} = useContext(MyContext)
  
    return (
    <div className='h-screen w-screen flex items-start justify-start flex-col py-36 px-8 overflow-hidden'>
        <div className='mx-auto flex flex-col items-start max-w-[800px] gap-4 px-5 h-full mb-10'>
            <h1 className='md:text-6xl text-5xl  font-semibold'>Welcome to Task Master</h1>
            <p className='text-lg text-gray-300'>Convenient and easy way to organize and keep track of all your daily tasks.</p>
            <button className='bg-white text-black font-medium px-3 py-1.5 rounded-sm flex flex-row items-center justify-between gap-2 mt-6' onClick={signUser}>
                <span className='text-xl'><svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" x="0px" y="0px" viewBox="0 0 48 48" enable-background="new 0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
	c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
	c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
	C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg></span>
                Login / Register
                </button>
        </div>

        <div className='md:p-4 p-0 grid  grid-cols-3 w-screen'>
                <Image className='md:w-[400px] w-[200px] h-fit rounded-md rotate-6' src={p1}/>
                <Image className='md:w-[400px] w-[200px] h-fit rounded-md -rotate-6' src={p2}/>
                <Image className='md:w-[400px] w-[200px] h-fit rounded-md rotate-6' src={p3}/>
                <Image className='md:w-[400px] w-[200px] h-fit rounded-md -rotate-6 md:ml-48 ml-[25%]' src={p4}/>
                <Image className='md:w-[400px] w-[200px] h-fit rounded-md rotate-6 md:ml-48 ml-[40%]' src={p5}/>            
        </div>
    </div>
  )
}

export default Login