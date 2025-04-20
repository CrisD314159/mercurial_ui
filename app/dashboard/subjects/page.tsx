'use client'
import './subjects.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert, Button } from "@mui/material";
import SubjectCreation from "../../ui/Creation/SubjectCreation";
import EditSubject from "../../ui/EditForms/EditSubject";
import { useMercurialStore } from '@/app/store/useMercurialStore';




export default function SubjectsPage() {
  const {isAuthenticated} = useMercurialStore()
  return (
  
      <div className="mainSubjectsContainer">
      {
         <Alert severity="error" >hola</Alert>
       }
        <div className="subjectMenuContainer">
          <div className="subjectMenu menuButton">
            <SubjectCreation handleCreation={()=>{}}/>
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
                    <EditSubject subjectId={subject.id} subjectName={subject.name} handleEdit={()=>{}}/>
                    <Button size='small' > <DeleteIcon sx={{color:'#fff'}}/> </Button>
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