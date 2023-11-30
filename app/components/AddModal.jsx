import React, { useContext } from 'react'
import { MyContext } from '../Context/Context'

function AddModal() {

    const {showAddModal, setShowAddModal, titleRef, descRef, isCompletedRef, addTask } = useContext(MyContext)

  return (
    <div style={{display: showAddModal ? "flex" : "none"}} className='h-screen w-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center'>
        <div className='flex flex-col w-[450px] h-[350px]  gap-10 bg-[#1f1f22] p-4 rounded-md'>
            <h1 className='text-center font-semibold text-2xl'>New Task</h1>
            <div>
                <input className='w-full bg-transparent border-b-[1px] border-[#2e2e2e] px-2 h-7 outline-none text-white placeholder:text-white text-lg' ref={titleRef} type="text" placeholder='Title'/>
            </div>
            <div>
                <input className='w-full bg-transparent border-b-[1px] border-[#2e2e2e] px-2 h-7 outline-none text-white placeholder:text-white text-lg' ref={descRef} type="text" placeholder='Enter text...' />
            </div>
            <div className='flex flex-row items-center gap-3 pl-2'>
                <input className='w-4 h-4' ref={isCompletedRef} type="checkbox"/>
                <label htmlFor="">Completed</label>
            </div>
            <button className='bg-blue-500 h-8 rounded-sm text-base font-medium' onClick={() => addTask()}>Add</button>
        </div>
    </div>
  )
}

export default AddModal