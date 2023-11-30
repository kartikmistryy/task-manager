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

  const titleRef = useRef(null)
  const descRef = useRef(null)

  const { tasks, showEditModal,renderedData, showAddModal, setShowAddModal } = useContext(MyContext)



  return (
    <> 
      <EditModal show={showEditModal}/>
      <AddModal show={showAddModal}/>
      <div className='flex-1 grid-cols-1 grid md:grid-cols-3 lg:grid-cols-3
      xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-5 h-fit mb-10'> 
        {renderedData}
      </div>
      
      <button onClick={() => setShowAddModal(true)} className='fixed flex flex-row items-center justify-center gap-1 bottom-2 right-5 bg-[#007AFF] h-8 w-[100px] rounded-sm text-sm'>
        <span className='text-2xl flex items-center justify-center'>+</span> {"  "} Add Task
      </button>
    </>
  )
}

export default MainPanel