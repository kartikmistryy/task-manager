"use client"

import { doc, setDoc, getDocs, collection, addDoc, deleteDoc, query, where, updateDoc} from 'firebase/firestore'
import { db } from '../Firebase/Firebase'
import { useEffect, useRef } from 'react'

import { createContext, useState } from 'react'
import Card from '../components/Card'
import { auth, provider } from '../Firebase/Firebase'
import {signInWithPopup, signOut} from 'firebase/auth'
import uuid from 'react-uuid'
import {useAuthState} from 'react-firebase-hooks/auth'
import {ToastContainer, toast} from 'react-toast'

export const MyContext = createContext()

export const MyContextProvider = ({ children }) => {
  
    const [user, loading] = useAuthState(auth)

    const [renderedData, setRenderedData] = useState()
    const [tasks, setTasks] = useState([])
    const [showEditModal, setShowEditModal]= useState(false)
    const [showAddModal, setShowAddModal] = useState(false)

    const editTitleRef = useRef(null)
    const editDescRef = useRef(null)
    const editIsCompletedRef = useRef(null)
    const editDeadlineRef = useRef(null)

    const titleRef = useRef(null) 
    const descRef = useRef(null) 
    const isCompletedRef = useRef(null) 

    const [id, setId] = useState("")
    const [uid, setUid] = useState(null)

    const [totalTask, setTotalTask] = useState(0)
    const [totalCompletedTask, setTotalCompletedTask] = useState(0)
    const [totalPendingTask, setTotalPendingTask] = useState(0)

    const [currentTask, setCurrentTask] = useState({})

    const [activeTab, setActiveTab] = useState(0)

    const signUser = async() => {
      await signInWithPopup(auth, provider).then((data) => {
        getData(data.user.uid)

      })
    }

    const startEdit = (entity) => {
      console.log(entity);

      // Extract day, month, and year from "DD-MM-YYYY"
      const [day, month, year] = entity.data.date.split('-').map(Number);
    
      // Rearrange to "YYYY-MM-DD" format for the date input
      const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
      // Set the values of the inputs
      editTitleRef.current.value = entity.data.title;
      editDescRef.current.value = entity.data.desc;
      editIsCompletedRef.current.checked = entity.data.isCompleted;
      editDeadlineRef.current.value = formattedDate; // Correct format for date input
    
      // Show the edit modal and set the task ID
      setShowEditModal(true);
      setId(entity.id);
    }

    const updateTask = () => {
      const docRef = doc(db, 'tasks', id)
      try {
          updateDoc(docRef,  {
            title: editTitleRef.current.value,
            desc: editDescRef.current.value,
            isCompleted: editIsCompletedRef.current.checked,
          })
          setTasks(tasks)
          setShowEditModal(false)
          getData(uid)

          editTitleRef.current.value = ""
          editDescRef.current.value = ""
          editIsCompletedRef.current.checked = false
          setRenderedData(tasks.map((task) => {
            return <Card entity={task}/>
          }))
      }
      catch(err){
          console.log(err)
      }
      setActiveTab(0)
      toast.info('Task Updated');
    }

    useEffect(() => {
      setRenderedData(tasks.map((task) => {
        return <Card entity={task}/>
      }))
    }, [tasks])

    const getData = async(x) => {
      setUid(x)
      const collectionRef =  collection(db, 'tasks')
      const q = query(collectionRef, where("uid", "==", x))
      const snap = await getDocs(q)  
      const data = snap.docs.map((el) => {
        return {
          data: el.data(),
          id: el.id,
          uid: uid
        }
      })
      setTasks([...data])
    }

    const renderTask = () => {
      setActiveTab(0)
      getData(uid)
    }

    const renderCompletedTask = () => {
      setActiveTab(1)
      setRenderedData(tasks.map((task) => {
        if(task.data.isCompleted == true){
          return <Card entity={task}/>
        }
        else {
          return ""
        }
      }))
    }

    const renderIncompletedTask = () => {
      setActiveTab(2)
      setRenderedData(tasks.map((task) => {
        if(task.data.isCompleted != true){
          return <Card entity={task}/>
        }
        else {
          return ""
        }
      }))
    }

    const addTask = () => {
      const docRef = collection(db, 'tasks')
      const dateData = new Date()
      const day = dateData.getDate()
      const month = dateData.getMonth()
      const year = dateData.getFullYear()
      if(titleRef.current.value != "" && descRef.current.value != ""){
        addDoc(docRef, {
          title: titleRef.current.value, 
          desc: descRef.current.value, 
          isCompleted: isCompletedRef.current.checked, 
          id: uuid(),
          uid: uid,
          // date: `${day}-${month}-${year}`
          date: `${11}-${12}-${2024}`
        })
        toast.success("Task added successfully!")
        titleRef.current.value = ""
        descRef.current.value = ""
        const x = Date.now()
        console.log(Date.parse(x))
      }
      else {
        toast.warn("Fields cannot be empty")
      }
      titleRef.current.value = ""
      descRef.current.value = ""
      isCompletedRef.current.checked = false
      getData(uid)
      setShowAddModal(false)
      setTotalTask(prev => prev + 1)
      setActiveTab(0)
    }

    const removeTask = async(id) => {
      await deleteDoc(doc(db, 'tasks', id))
      getData(uid)
      setActiveTab(0)
      toast.error("Task deleted")
    }

    const closeAddModal = () => {
      setShowAddModal(false)
      titleRef.current.value = ""
      descRef.current.value = ""
      isCompletedRef.current.checked = false
    }

    const closeEditModal = () => {
      setShowEditModal(false)
    }

    const logOut = () => {
      signOut(auth).then(() => {
        console.log("Signed out")
      }).catch((err) => {
        console.log(err)
      })
    }

    useEffect(() => {
      window.addEventListener('beforeunload', () => {
        logOut()
      })
    })

    return( 
     <MyContext.Provider value={{ 
      tasks, setTasks,
       getData,
      showEditModal, setShowEditModal,
      editDescRef, editTitleRef, editIsCompletedRef,editDeadlineRef, updateTask,
      startEdit, 
      id, setId, 
      renderedData, setRenderedData, 
      getData, 
      showAddModal, setShowAddModal,
      titleRef, descRef, isCompletedRef,
      addTask,
      removeTask,
      renderTask, renderIncompletedTask, renderCompletedTask,
      user,
      signUser,
      logOut,
      uid, setUid,
      totalTask, setTotalTask,
      totalCompletedTask, setTotalCompletedTask,
      totalPendingTask, setTotalPendingTask,
      tasks,
      activeTab, setActiveTab,
      closeAddModal, closeEditModal,
      currentTask, setCurrentTask,ToastContainer, toast
      }}>
        {children}
    </MyContext.Provider>
    )
}
