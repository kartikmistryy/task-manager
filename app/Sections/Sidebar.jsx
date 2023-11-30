"use client"

import { MdRadioButtonChecked } from "react-icons/md";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { useContext } from "react";
import { MyContext } from "../Context/Context";


function Sidebar() {

    const { renderTask, renderIncompletedTask, renderCompletedTask, user, logOut, totalTask, setTotalTask,
        totalCompletedTask, setTotalCompletedTask,
        totalPendingTask, setTotalPendingTask, tasks } = useContext(MyContext)

  return (
    <div className='flex flex-col flex-[0.13] p-6 border-r-[1px] border-[#2e2e2e]'>
        <section className='w-full h-fit'>
            <div className='flex flex-row items-center gap-4'>
                <div className='rounded-full flex justify-center items-center bg-red-400'><img className='rounded-full w-[40px] h-[40px]' src={user.photoURL}/></div>
                <h2 className='text-lg font-medium'>Hey, {user.displayName.split(" ")[0]} 👋 </h2>
            </div>
        </section>

        <section className='flex flex-col mt-[5rem] gap-5 h-full'>
            <div onClick={() => renderTask()} className='h-7 w-full flex items-center hover:bg-[#1f1f22] px-2 py-4 rounded-md cursor-pointer'>
                <p>All Tasks</p>
                <span className="ml-auto">
                {/* {tasks.length} */}
                </span>
            </div>

            <div onClick={() => renderCompletedTask()} className="h-7 w-full flex items-center hover:bg-[#1f1f22] px-2 py-4 rounded-md cursor-pointer">
            <button className="flex items-center justify-center  text-[15px] h-fit py-[1px]  w-fit tracking-tight font-medium">
                    Completed 
            </button>
            <span className=" ml-auto">
            {/* {totalCompletedTask} */}
            </span>
            </div>

            <div onClick={() => renderIncompletedTask()} className="h-7 w-full flex items-center hover:bg-[#1f1f22] px-2 py-4 rounded-md cursor-pointer">
            <button className="flex items-center justify-center  text-[15px] h-fit py-[1px]  w-fit tracking-tight font-medium">
                    Ongoing 
                </button>
                <span className=" ml-auto">
                    {/* {totalPendingTask} */}
                </span>
            </div>
        </section>

        <section className="mt-auto">
            <button onClick={logOut} className="flex gap-2 items-center"><CiLogout />Sign Out</button>
        </section>
    </div>
  )
}

export default Sidebar