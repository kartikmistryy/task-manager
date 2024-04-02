"use client"

import { MdRadioButtonChecked } from "react-icons/md";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { useContext, useState } from "react";
import { MyContext } from "../Context/Context";


function Sidebar() {

    const { renderTask, renderIncompletedTask, renderCompletedTask, user, logOut, totalTask, setTotalTask,
        totalCompletedTask, setTotalCompletedTask,
        totalPendingTask, setTotalPendingTask, tasks, activeTab, setActiveTab } = useContext(MyContext)

  return (
    <div className='flex w-full lg:min-w-[200px] min-w-[100%] sidebar md:flex-col flex-col p-4 border-r-[1px] border-[#2e2e2e]'>
        <section className='w-full h-fit'>
            <div className='flex flex-row items-center gap-4 mt-2'>
                <div className='rounded-full flex justify-center items-center bg-red-400'>
                    <img className='rounded-full w-[40px] h-[40px]' src={user.photoURL}/>
                </div>
                <h2 className='text-lg font-medium'>Hey, {user.displayName.split(" ")[0]}</h2>
            </div>
        </section>

        <section className='flex lg:flex-col flex-row md:justify-evenly justify-start md:mt-[5rem] mt-8 gap-5 h-fit w-full'>
            <div onClick={() => renderTask()} className='h-7 w-full flex flex-row items-center justify-center lg:justify-between hover:bg-[#1f1f22] px-2 py-4 rounded-md cursor-pointer'>
                <p className={activeTab == 0 ? 'text-[#0A84FF] w-fit':"text-white w-full"}>All Tasks {" "}
                </p>
                <span className="bg-[#0f3058] text-[#52a9ff] rounded-full p-1.5 w-5 h-5 text-xs flex items-center justify-center ml-4">
                        <p>{tasks.length}</p>
                </span>
            </div>

            <div onClick={() => renderCompletedTask()} className="h-7 w-full flex items-center justify-center lg:justify-start hover:bg-[#1f1f22] px-2 py-4 rounded-md cursor-pointer">
            <button  className={`flex items-center justify-center  text-[15px] h-fit py-[1px]  w-fit tracking-tight font-medium ${activeTab == 1 ? "text-[#0A84FF]" : "text-white" }`}>
                    Completed 
            </button>
            </div>

            <div onClick={() => renderIncompletedTask()} className="h-7 w-full flex items-center justify-center lg:justify-start hover:bg-[#1f1f22] px-2 py-4 rounded-md cursor-pointer">
            <button className={`flex items-center justify-center  text-[15px] h-fit py-[1px]  w-fit tracking-tight font-medium ${activeTab == 2 ? "text-[#0A84FF]" : "text-white" }`}>
                    Ongoing 
                </button>

            </div>
        </section>

        <section className="md:mt-auto absolute top-8 right-2 md:bottom-4  md:left-0 h-fit w-fit">
            <button onClick={logOut} className="py-1 px-3 flex items-center gap-2 rounded-sm text-sm md:text-base h-fit w-fit">
            <CiLogout />
                <span className="text-sm">Sign Out</span>
            </button>
        </section>
    </div>
  )
}

export default Sidebar