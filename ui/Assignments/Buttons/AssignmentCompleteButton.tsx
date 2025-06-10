'use client'
import { MarkAsDoneAssignment } from '@/lib/RequestIntermediaries/AssignmentInter';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { useState } from 'react';
import MercurialSnackbar from '../../Snackbars/MercurialSnackbar';
interface AssignmentCompleteButton{
  id: string
  mutate : ()=> void
}

export default function AssignmentCompleteButton({id, mutate}:AssignmentCompleteButton) {
  const [error, setError] = useState<string |null>(null)
  const [pending, setPending] = useState(false)
  const [alert, setAlert] = useState(false)

  const markAsDoneAction = async ()=>{
    try {
      setPending(true)
      await MarkAsDoneAssignment(id)
      mutate()

    }catch (error) {
      if (error instanceof Error){
      setError(error.message)
      setAlert(true)
      }

    }finally{
      setPending(false)
    }
  }


  return (
    <>
    {
      error && <MercurialSnackbar message={error} state={alert} type='error' closeMethod={setAlert}/>
    }
    <button 
      disabled={pending}
      onClick={markAsDoneAction}
     className="relative h-full w-12 group bg-transparent border-green-500 rounded-r-md overflow-hidden">
      <div className="absolute inset-0 bg-green-700 group-hover:bg-green-600 transition-colors duration-200"></div>
      <CheckRoundedIcon className="relative text-white group-hover:scale-110 transition-transform duration-200" />
    </button>
    </>
  )
  
}