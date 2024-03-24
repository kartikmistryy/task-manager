import React, { useContext } from 'react'
import { MyContext } from '../Context/Context'
import { collection } from 'firebase/firestore'

function EditModal() {

    const {showEditModal, setShowEditModal, editDescRef, editTitleRef, editIsCompletedRef, updateTask, id, setId} = useContext(MyContext)

  return (
    <div style={{display: showEditModal ? "flex" : "none"}} className='h-screen w-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center'>
        <div className='flex flex-col w-[420px] h-[350px]  gap-10 bg-[#1a1a1a] p-4 rounded-md'>
        <h1 className='text-center font-semibold text-2xl'>Edit Task</h1>
            <div className='flex w-full'>
                <input className='w-full bg-transparent border-b-[1px] border-[#2e2e2e] px-2 h-7 outline-none text-white placeholder:text-white text-lg' type="text" ref={editTitleRef} placeholder='Title'/>
            </div>
            <div>
                <input className='w-full bg-transparent border-b-[1px] border-[#2e2e2e] px-2 h-7 outline-none text-white placeholder:text-white text-lg' type="text" ref={editDescRef} placeholder='Enter text hrere...'/>
            </div>
            <div className='flex flex-row items-center gap-3'>
                <input className='w-4 h-4' type="checkbox" ref={editIsCompletedRef} />
                <label htmlFor="">Completed</label>
            </div>
            <button className='bg-blue-500 h-8 rounded-sm text-base font-medium' onClick={updateTask}>Edit</button>
        </div>
    </div>
  )
}

export default EditModal