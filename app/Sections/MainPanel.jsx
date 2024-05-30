"use client"

import React, { useContext } from 'react'
import Card from '../components/Card'
import { useState, useEffect } from 'react'
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { db } from '../Firebase/Firebase'
import { useRef } from 'react'
import { MyContext } from '../Context/Context'
import EditModal from '../components/EditModal'
import AddModal from '../components/AddModal'

function MainPanel() {


  const { showEditModal,renderedData, showAddModal, setShowAddModal, toast, ToastContainer } = useContext(MyContext)



  return (
    <> 
      <EditModal show={showEditModal}/>
      <AddModal show={showAddModal}/>
      <div className='w-full p-5 h-fit mb-10 grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-10 gap-x-2'> 
        {renderedData}
      </div>
      <ToastContainer store={toast}/>
      <button onClick={() => setShowAddModal(true)} className='fixed flex flex-row items-center justify-center gap-1 bottom-4 right-5 bg-[#2563eb] h-8 w-[100px] rounded-sm text-sm'>
        <span className='text-2xl flex items-center justify-center'>+</span> {"  "} Add Task
      </button>
    </>
  )
}

export default MainPanel