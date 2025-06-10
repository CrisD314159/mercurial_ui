'use client'

import { checkIsloggedIn } from "@/lib/Auth/authChecks"
import { GetUserTodoAssignmentsServer } from "@/lib/ServerActions/AssignmentActions"
import { Assignment } from "@/lib/types/entityTypes"
import { useEffect, useState } from "react"
import { useInView } from 'react-intersection-observer'
import AssignmentsListComponent from "../AssignmentsListComponent"
import MercurialSnackbar from "../../Snackbars/MercurialSnackbar"
import AssignmentCreationDialog from "../Dialogs/AssignmentFormDialog"
import useSWR from "swr"
import { GetTodoAssignments } from "@/lib/RequestIntermediaries/AssignmentInter"
import { CircularProgress } from "@mui/material"

const ASSIGNMENT_OFFSET = 10

export default function AssignmentsTodoContainer() {
  const { data: assignments, error, mutate, isLoading } = useSWR<Assignment[]>('todoAssignments', () => GetTodoAssignments());
  const [offset, setOffset] = useState(ASSIGNMENT_OFFSET)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [alert, setAlert] = useState(error ? true : false)
  const { ref, inView } = useInView({ threshold: 0.1 })

  const loadMoreAssignments = async () => {
    try {
      const isLogged = await checkIsloggedIn()
      if (isLogged) {
        const apiAssignments = await GetUserTodoAssignmentsServer(offset, ASSIGNMENT_OFFSET)

        if (apiAssignments.length === 0) {
          setHasMore(false)
          return
        }

        // Actualiza directamente la caché de SWR
        mutate(prev => [...(prev || []), ...apiAssignments], false)
        console.log("cambio en las tareas");
        setOffset(prev => prev + ASSIGNMENT_OFFSET)
      } else {
        setHasMore(false)
      }
    } catch (e) {
      console.error(e)
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
      {error && <MercurialSnackbar message="An error occurred while fetching the data" state={alert} type="error" closeMethod={setAlert} />}
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