
import Header from "../../components/Header";
import './subjects.css'
import { NavLink, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, Button, Fab } from "@mui/material";
import { DeleteSubjectFields, GeneralResponse, Subject, SubjectList } from "../../components/types/types";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import SubjectCreation from "../../components/creation/SubjectCreation";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteSubject, getSubjects, logout } from "../../utils/utils";
import EditSubject from "../../components/editForms/EditSubject";
import { useSelector } from "react-redux";
import { RootState } from "../../store";


export default function Subjects() {
  const token = useSelector((state: RootState) => state.auth.token) // Token del usuario
  const navigate = useNavigate()
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [alert, setAlert] = useState(false) // Estado que indica si hay una alerta en la página
  const [alertCont, setAlertCont] = useState('There was an error with the content loading') // Estado que indica si hay una alerta en la página
  const [id, setId] = useState('') // Estado que indica si hay una alerta en la página

  const subjectsMutation = useMutation<SubjectList, Error, string>({
    mutationFn: getSubjects,
    onSuccess: (data: SubjectList) => {
      setSubjects(data.subjects)
    },
    onError: (error:Error) => {
      if(error.message === 'Unauthorized'){
        logout()
        localStorage.clear()
        navigate('/')
      }else{
        setAlert(true)
      }

    }
  })

  const subjectDeleteMutation= useMutation<GeneralResponse, Error, DeleteSubjectFields>({
    mutationFn: deleteSubject,
    onSuccess: ()=>{
      setSubjects(subjects.filter((subject: Subject) => subject.id !== id))
    },
    onError:(error:Error)=>{
      if(error.message === 'Unauthorized'){
        logout()
        localStorage.clear()
        navigate('/')
      }else{
    
        setAlertCont('There was an error deleting the subject, the may have pending tasks')
        setAlert(true)  
    }
  }
  })

  const handleCreation = (Subject: Subject)=>{
    if(subjects && subjects.length > 0){
      setSubjects([...subjects, Subject])
    }else{
      setSubjects([Subject])
    }
    
  }
  const handleDelete = (id: string)=>{
    setId(id)
    if(token) subjectDeleteMutation.mutate({subjectId:id, token})

  }
  const handleEdit = (subject: Subject)=>{
    console.log(subject);
    setSubjects(subjects.map((sub: Subject)=> sub.id === subject.id ? subject : sub))
    
  }

  useEffect(()=>{
    if(localStorage.getItem('userImage') === null){
      navigate('/')
    }else{
      if(token )subjectsMutation.mutate(token)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>

      <Header  />
      {
         alert && <Alert severity="error" onClose={()=> setAlert(false)}  >{alertCont}</Alert>
       }

      <div className="mainSubjectsContainer">
        <div className="backButtonContainer">
          <div className="buttonBack">
            <NavLink to='/dashboard' >
              <Fab size='small' color="primary" className="buttonBackFab"><ArrowBackRoundedIcon></ArrowBackRoundedIcon></Fab>
            </NavLink>
          </div>
        </div>
        <div className="subjectMenuContainer">
          <div className="subjectMenu menuButton">
            <SubjectCreation handleCreation={handleCreation}/>
          </div>
          <NavLink to="/dashboard/topics" className='topicButton menuButton'>
            <button className='topicButton'>Go to Topics</button>
          </NavLink>
        </div>
        <div className="subjectsContainer">
          {
            subjects && subjects.length > 0 ? 

            subjects.map((subject: Subject) => {
              return (
                <div className='subjectCard' key={subject.id}>
                  <div className='titleContainer'>
                    <h3 className='subjectCardTittle'>{subject.name}</h3>
                  </div>
                  <div className='subjectButtonContainer'>
                    <EditSubject subjectId={subject.id} subjectName={subject.name} handleEdit={handleEdit}/>
                    <Button size='small' onClick={()=>handleDelete(subject.id)}> <DeleteIcon /> </Button>
                  </div>
                </div>
              )
            }):
            <div style={{width:'100%'}}>
              <p style={{textAlign:'center'}}>There are not subjects</p>

            </div>
          }
        </div>


      </div>

    </div >
  )
}