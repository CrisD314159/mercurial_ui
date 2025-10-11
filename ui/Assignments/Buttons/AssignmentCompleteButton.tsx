'use client'
import { MarkAsDoneAssignment } from '@/lib/RequestIntermediaries/AssignmentInter';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import Button from '@mui/material/Button';
import { useState } from 'react';
import toast from 'react-hot-toast';
interface AssignmentCompleteButton{
  id: string
  mutate : ()=> void
}

export default function AssignmentCompleteButton({id, mutate}:AssignmentCompleteButton) {
  const [pending, setPending] = useState(false)


  const markAsDoneAction = async ()=>{
    try {
      setPending(true)
      await MarkAsDoneAssignment(id)
      toast.success("Assignment marked as done")
      mutate()

    }catch (error) {
      if (error instanceof Error){
        toast.error(error.message)
      }

    }finally{
      setPending(false)
    }
  }


  return (
    <>

    <Button
          color="success"
          loading={pending}
          sx={{
            position: 'relative',
            height: '100%',
            width: 48,
            borderColor: 'green',
            borderRadius: '0 0.375rem 0.375rem 0',
            overflow: 'hidden'
          }}
          onClick={markAsDoneAction}
          startIcon={<CheckRoundedIcon />}
          variant="contained"
        >

    </Button>
    </>
  )
  
}