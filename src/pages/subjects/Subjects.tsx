
import Header from "../../components/Header";
import { useState } from 'react'
import './subjects.css'
import { NavLink } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Fab } from "@mui/material";
import { Subject } from "../../components/types/types";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import json from '../../../public/dataset.json'

export default function Subjects() {
  const [create, setCreate] = useState(false)


  function createSubject() {
    setCreate(!create)
  }
  return (
    <div>
      {
        create ?
          <div className="createSubjectContainer">
            <div className="createSubject">
              <h1>Create Subject</h1>
              <input type="text" placeholder="Name" />
              <button onClick={createSubject}>Create</button>
            </div>
          </div>
          : null
      }
      <Header picture="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" />

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
            <button className="createButton" onClick={createSubject}>+</button>
          </div>
          <NavLink to="/dashboard/topics" className='topicButton menuButton'>
            <button className='topicButton'>Go to Topics</button>
          </NavLink>
        </div>
        <div className="subjectsContainer">
          {
            json.subjects.map((subject: Subject) => {
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