import React, { useContext } from 'react'
import { MyContext } from '../Context/Context'
import { collection } from 'firebase/firestore'

function EditModal() {

    const {showEditModal, setShowEditModal, editDescRef, editTitleRef, editIsCompletedRef, updateTask, id, setId,closeEditModal} = useContext(MyContext)

  return (
    <div style={{display: showEditModal ? "flex" : "none"}} className='h-screen w-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center backdrop-blur-sm'>
        <div className='flex flex-col w-[420px] h-[530px] gap-4 bg-[#030303] p-4 rounded-xl border-[1px] border-[#2e2e2e] shadow-md shadow-[#1e1e1e]'>
            <h1 className='text-center font-semibold text-lg'>Edit Task</h1>
            <div>
                <label htmlFor="title">Title</label>
                <input className='mt-1 w-full bg-transparent border-[1px] border-[#2e2e2e] p-2 h-fit outline-none text-gray-100  rounded-md placeholder:text-white text-sm' ref={editTitleRef} placeholder='Title' type="text" />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea className='w-full h-full min-h-[190px] bg-transparent border-[1px] border-[#2e2e2e] p-2 outline-none text-white rounded-md  mt-1 placeholder:text-gray-300 text-sm resize-none' ref={editDescRef} 
                placeholder="Brief description ..." type="text"/>
            </div>
            <div className='flex flex-row items-center gap-3 pl-2 mt-4'>
                <input className='w-4 h-4' ref={editIsCompletedRef} type="checkbox"/>
                <label htmlFor="" className='text-sm'>Completed</label>
            </div>
            <div className='flex flex-col gap-4'>
            <button className='bg-blue-500 h-8 rounded-sm text-base font-medium' onClick={updateTask}>Edit</button>
            <button onClick={() => closeEditModal()} className='h-6 text-base text-gray-200'>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default EditModal