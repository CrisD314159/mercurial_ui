
import './subjects.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, Button } from "@mui/material";
import { Subject } from "../../components/types/types";
import SubjectCreation from "../../components/creation/SubjectCreation";
import EditSubject from "../../components/editForms/EditSubject";

import useSubjects from '../../hooks/useSubjects';
import { useCallback } from 'react';



export default function Subjects() {
  const  {
    subjects,
    setSubjects,
    alert,
    setAlert,
    alertCont,
    setId,
    subjectDeleteMutation
  } = useSubjects()
  const token = localStorage.getItem('accessToken')
 
  const handleCreation = useCallback((Subject: Subject)=>{
    if(subjects && subjects.length > 0){
      setSubjects([...subjects, Subject])
    }else{
      setSubjects([Subject])
    }
    
  }, [subjects, setSubjects])
  const handleDelete = useCallback((id: string)=>{
    setId(id)
    if(token) subjectDeleteMutation.mutate({subjectId:id, token})

  }, [setId, token, subjectDeleteMutation])
  const handleEdit = useCallback((subject: Subject)=>{
    setSubjects(subjects.map((sub: Subject)=> sub.id === subject.id ? subject : sub))
    
  }, [subjects, setSubjects])
  return (
  
     

      <div className="mainSubjectsContainer">
      {
         alert && <Alert severity="error" onClose={()=> setAlert(false)}  >{alertCont}</Alert>
       }
        <div className="subjectMenuContainer">
          <div className="subjectMenu menuButton">
            <SubjectCreation handleCreation={handleCreation}/>
          </div>
        </div>
        <div className="subjectsContainer">
          <div className='subjectsPageSlider'>
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
                    <Button size='small' disabled={subjectDeleteMutation.isPending} onClick={()=>handleDelete(subject.id)}> <DeleteIcon sx={{color:'#fff'}}/> </Button>
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


      </div>

  )
}