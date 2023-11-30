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
import {toast} from 'react-toast'

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

    const titleRef = useRef(null) 
    const descRef = useRef(null) 
    const isCompletedRef = useRef(null) 

    const [id, setId] = useState("")
    const [uid, setUid] = useState(null)

    const [totalTask, setTotalTask] = useState(0)
    const [totalCompletedTask, setTotalCompletedTask] = useState(0)
    const [totalPendingTask, setTotalPendingTask] = useState(0)


    const signUser = async() => {
      await signInWithPopup(auth, provider).then((data) => {
        getData(data.user.uid)

      })
    }

    const startEdit = (entity) => {
      editTitleRef.current.value = entity.data.title
      editDescRef.current.value = entity.data.desc
      editIsCompletedRef.current.checked = entity.data.isCompleted
      setShowEditModal(true)
      setId(entity.id)
      setUid(entity.data.uid)
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
      getData(uid)
    }

    const renderCompletedTask = () => {
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
      setRenderedData(tasks.map((task) => {
        if(task.data.isCompleted != true){
          return <Card entity={task}/>
        }
        else {
          return ""
        }
      }))
    }

    // useEffect(() => {
    //   getData(uid)
    //   tasks.filter((task) => {
    //     if(task.data.isCompleted == true){
    //       setTotalCompletedTask(prev => prev + 1)
    //     }
    //     else{
    //       setTotalPendingTask(prev => prev + 1)
    //     }
    //   })
    // }, [totalTask])

    const addTask = () => {
      const docRef = collection(db, 'tasks')
      if(titleRef != " " && descRef != " "){
        addDoc(docRef, {
          title: titleRef.current.value, 
          desc: descRef.current.value, 
          isCompleted: isCompletedRef.current.checked, 
          id: uuid(),
          uid: uid
        })
        toast.success("Task added successfully!")
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
    }

    const removeTask = async(id) => {
      await deleteDoc(doc(db, 'tasks', id))
      getData(uid)
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
      editDescRef, editTitleRef, editIsCompletedRef, updateTask,
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
      tasks
      }}>
        {children}
    </MyContext.Provider>
    )
}