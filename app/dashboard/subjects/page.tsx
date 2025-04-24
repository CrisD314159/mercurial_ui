'use client'
import './subjects.css'
import { CircularProgress, List } from "@mui/material";
import { useMercurialStore } from '@/app/store/useMercurialStore';
import useSWR from 'swr';
import { DeleteSubject, GetSubjects } from '@/app/lib/RequestIntermediaries/SubjectInter';
import { Subject } from '@/app/lib/types/entityTypes';
import { GenericError } from '@/app/lib/types/definitions';
import MercurialSnackbar from '@/app/ui/Snackbars/MercurialSnackbar';
import EditSubject from '@/app/ui/Subject/EditSubject';
import SubjectCreation from '@/app/ui/Subject/SubjectCreation';
import DeleteAlert from '@/app/ui/Alerts/DeleteAlert';
import { useEffect } from 'react';




export default function SubjectsPage() {
  const {isAuthenticated} = useMercurialStore()
  const {data, error, isLoading, mutate} = useSWR<Subject[], GenericError>('subjects', () => GetSubjects())
  const {setSubject} = useMercurialStore()


  useEffect(()=>{
    if(data){
      setSubject(data)
    }
  }, [data, setSubject])

  if(isLoading){
    return(
      <div className='flex flex-col justify-center w-full items-center h-[90%] relative'>
        <CircularProgress/>
      </div>
    )
  }

  return (
  
      <div className="flex flex-col justify-center w-full items-center h-[90%] relative">
        {
          error && <MercurialSnackbar message={error.message} state={true} type='error'/>
        }
        <List style={{height:'100%', flex:1, width:'100%', overflowY:'auto', paddingBottom:'40px'}}>
          {
            data && data.length > 0 ? 

            data.map((subject: Subject) => {
              return (
                <div className="rounded-2xl dark:border border-zinc-200 dark:border-zinc-700 shadow-lg my-5 mx-5 px-6 py-6 flex justify-between items-center transition-transform duration-200 ease-in-out hover:scale-[1.01] hover:shadow-xl" key={subject.id}>
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl">{subject.title}</h3>
                  </div>

                  <div className="flex gap-4">
                    <EditSubject id={subject.id} mutate={mutate} title={subject.title}/>
                    <DeleteAlert body="Are you sure you want to delete this subject" title="Delete Subject" id={subject.id} isAuthenticated={isAuthenticated}
                    mutate={mutate}  deleteMethod={DeleteSubject}/>
                  </div>
                </div>
              )
            }):
            <div className='w-full mt-5'>
              <p style={{textAlign:'center'}}>There are not subjects</p>
            </div>
          }
        </List>
          <div className="absolute bottom-9">
              <SubjectCreation mutate={mutate}/>
          </div>
        </div>

  )
}