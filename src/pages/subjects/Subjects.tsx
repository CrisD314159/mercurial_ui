
import Header from "../../components/Header";
import './subjects.css'
import { NavLink } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Fab } from "@mui/material";
import { Subject, SubjectList } from "../../components/types/types";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import SubjectCreation from "../../components/creation/SubjectCreation";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { getSubjects } from "../../utils/utils";

export default function Subjects() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const subjectsMutation = useMutation<SubjectList, Error>({
    mutationFn: getSubjects,
    onSuccess: (data: SubjectList) => {
      setSubjects(data.subjects)
    },
    onError: () => {
      console.log('error');

    }
  })

  useEffect(()=>{
    subjectsMutation.mutate()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>

      <Header  />

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
            <SubjectCreation />
          </div>
          <NavLink to="/dashboard/topics" className='topicButton menuButton'>
            <button className='topicButton'>Go to Topics</button>
          </NavLink>
        </div>
        <div className="subjectsContainer">
          {
            subjects.map((subject: Subject) => {
              return (
                <div className='subjectCard' key={subject.id}>
                  <div className='titleContainer'>
                    <h3 className='subjectCardTittle'>{subject.name}</h3>
                  </div>
                  <div className='subjectButtonContainer'>
                    <Button size='small'><ModeEditRoundedIcon></ModeEditRoundedIcon></Button>
                    <Button size='small'> <DeleteIcon /> </Button>
                  </div>
                </div>
              )
            })
          }
        </div>


      </div>

    </div >
  )
}