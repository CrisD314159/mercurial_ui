import { create } from 'zustand'
import { Assignment, Checklist, Subject, Topic } from '../lib/types/entityTypes'

interface authState {
  isAuthenticated: boolean
  assignments: Assignment[]
  topics: Topic[]
  subjects: Subject[]
  checklists: Checklist[]
  setIsLoggedIn: ()=>void
  setIsNotLoggedIn: ()=>void
  setAssignments:(assignments : Assignment[]) => void
  setTopics: (topics: Topic[]) => void
  setSubject: (subjects : Subject[]) => void
  setChecklists: (checklists : Checklist[]) => void

}

// The store is created using the create function from zustand, this function receives a function that will be used to set the state of the store
export const useMercurialStore = create<authState>((set)=>({
  isAuthenticated : false,
  assignments:[],
  topics:[],
  subjects:[],
  checklists:[],
  checklistsNodes:[],
  setIsLoggedIn: ()=>{
    set({
      isAuthenticated : true
    })

  },
  setIsNotLoggedIn: ()=>{
    set({
      isAuthenticated : false
    })
  },
  setAssignments: (assignments: Assignment[]) => {
    set({
      assignments:assignments
    }) 
  },
  setChecklists: (checklists: Checklist[]) => {
    set({
      checklists: checklists
    })
  },
  setSubject: (subjects : Subject[]) => {
      set({
        subjects:subjects
      })
  },
  setTopics: (topics: Topic[]) => {
      set({
        topics: topics
      })
  },

}))