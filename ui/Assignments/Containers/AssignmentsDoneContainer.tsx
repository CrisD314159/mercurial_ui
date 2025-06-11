'use client'
import { checkIsloggedIn } from "@/lib/Auth/authChecks";
import { GetDoneAssignments } from "@/lib/RequestIntermediaries/AssignmentInter";
import { GetUserDoneAssignmentsServer } from "@/lib/ServerActions/AssignmentActions";
import { Assignment } from "@/lib/types/entityTypes";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useSWR from "swr";
import MercurialSnackbar from "../../Snackbars/MercurialSnackbar";
import AssignmentsListComponent from "../AssignmentsListComponent";

const ASSIGNMENT_OFFSET = 10

export default function AssignmentsDoneContainer() {
  const { data: assignments, error, mutate, isLoading } = useSWR<Assignment[]>('doneAssignments', () => GetDoneAssignments());
  const [offset, setOffset] = useState(ASSIGNMENT_OFFSET)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [alert, setAlert] = useState(false)
  const { ref, inView } = useInView({ threshold: 0.1 })


  useEffect(()=>{
    if(error){
      setAlert(true)
    }
  }, [error])

    const loadMoreAssignments = async () => {
      try {
        const isLogged = await checkIsloggedIn()
        if (isLogged) {
          setIsLoadingMore(true)
          const apiAssignments = await GetUserDoneAssignmentsServer(offset, ASSIGNMENT_OFFSET)
  
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
      } catch (e) {
        setAlert(true)
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
        <MercurialSnackbar message="An error occurred while fetching the data" state={alert} type="error" closeMethod={setAlert} />
        {assignments && (
          <AssignmentsListComponent
            doneCard={true}
            title="You have not completed any assignments yet 🙁"
            assignments={assignments}
            hasMore={hasMore}
            isLoadingMore={isLoadingMore}
            ref={ref}
            mutate={mutate}
          />
        )}
      </div>
    )
}