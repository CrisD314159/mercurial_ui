'use client'

import { checkIsloggedIn } from "@/lib/Auth/authChecks"
import { GetUserTodoAssignmentsServer } from "@/lib/ServerActions/AssignmentActions"
import { Assignment } from "@/lib/types/entityTypes"
import { useEffect, useState } from "react"
import { useInView } from 'react-intersection-observer'
import AssignmentsListComponent from "../AssignmentsListComponent"
import AssignmentCreationDialog from "../Dialogs/AssignmentFormDialog"
import useSWR from "swr"
import { GetTodoAssignments } from "@/lib/RequestIntermediaries/AssignmentInter"
import { CircularProgress } from "@mui/material"
import toast from "react-hot-toast"

const ASSIGNMENT_OFFSET = 10

export default function AssignmentsTodoContainer() {
  const { data: assignments, error, mutate, isLoading } = useSWR<Assignment[]>('todoAssignments', () => GetTodoAssignments());
  const [offset, setOffset] = useState(ASSIGNMENT_OFFSET)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const { ref, inView } = useInView({ threshold: 0.1 })


  useEffect(()=>{
    if(error){
      toast.error(error)
    }
  }, [error])

  const loadMoreAssignments = async () => {
    try {
      const isLogged = await checkIsloggedIn()
      if (isLogged) {
        setIsLoadingMore(true)
        const apiAssignments = await GetUserTodoAssignmentsServer(offset, ASSIGNMENT_OFFSET)

        if (apiAssignments.length === 0) {
          setHasMore(false)
          return
        }

        // Actualiza directamente la caché de SWR
        mutate(prev => [...(prev || []), ...apiAssignments], false)
        setOffset(prev => prev + ASSIGNMENT_OFFSET)
      } else {
        setHasMore(false)
      }
    } catch (error) {
      if(error instanceof Error) toast.error(error.message)
    } finally {
      setIsLoadingMore(false)
    }
  }

  useEffect(() => {
    if (inView && !isLoadingMore) {
      loadMoreAssignments()
    }
  }, [inView, isLoadingMore])


    if (isLoading) {
      return (
        <div className="w-full min-h-[90%] max-h-[90%] absolute flex items-center justify-center">
          <CircularProgress />
        </div>
      );
    }

  return (
    <div className="w-full h-full relative flex flex-col items-center">
      {assignments && (
        <AssignmentsListComponent
          doneCard={false}
          title="You don't have any pending assignments 🥳"
          assignments={assignments}
          hasMore={hasMore}
          isLoadingMore={isLoadingMore}
          ref={ref}
          mutate={mutate}
        />
      )}

      <div className="absolute bottom-9">
        <AssignmentCreationDialog mutate={mutate} isEditing={false} title="New Assignment"/>
      </div>
    </div>
  )
}