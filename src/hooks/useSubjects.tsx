import { useEffect, useState } from "react"
import { useGuardianStore } from "../store/guardianStore"
import { useMutation } from "@tanstack/react-query"
import { deleteSubject, getSubjects } from "../utils/utils"
import { DeleteSubjectFields, GeneralResponse, Subject, SubjectList } from "../components/types/types"


// Este hook se encarga de manejar las materias del usuario
const useSubjects = () =>{
  const token = localStorage.getItem('accessToken')
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [alert, setAlert] = useState(false) // Estado que indica si hay una alerta en la página
  const [alertCont, setAlertCont] = useState('There was an error with the content loading') // Estado que indica si hay una alerta en la página
  const [id, setId] = useState('') // Estado que indica si hay una alerta en la página
  const checkAuth = useGuardianStore(state=>state.checkAuthStatus)

  const errorFunc =(error:Error)=>{
    if(error.message === 'Unauthorized'){
      checkAuth()
    }else{
      setAlert(true)
    }
  }
  const subjectsMutation = useMutation<SubjectList, Error, string>({
    mutationFn: getSubjects,
    onSuccess: (data: SubjectList) => {
      setSubjects(data.subjects)
    },
    onError: errorFunc
  })

  const subjectDeleteMutation= useMutation<GeneralResponse, Error, DeleteSubjectFields>({
    mutationFn: deleteSubject,
    onSuccess: ()=>{
      setSubjects(subjects.filter((subject: Subject) => subject.id !== id))
    },
    onError:(error:Error)=>{
      if(error.message === 'Unauthorized'){
        checkAuth()
      }else{
        setAlertCont('There was an error deleting the subject, the may have pending tasks')
        setAlert(true)  
    }
  }
  })

 
  useEffect(()=>{
    if(token ){
      subjectsMutation.mutate(token)

    }else{
      checkAuth()
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    subjects,
    setSubjects,
    alert,
    setAlert,
    alertCont,
    setAlertCont,
    id,
    setId,
    subjectsMutation,
    subjectDeleteMutation
  }

}
export default useSubjects;