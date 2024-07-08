import { useState } from "react";
import Header from "../../components/Header";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Button, Fab } from "@mui/material";
import { NavLink } from "react-router-dom";
import json from '../../../public/dataset.json'
import { Topic } from "../../components/types/types";
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import './topics.css'

export default function Topics() {
  const [create, setCreate] = useState(false)


  function createTopic() {
    setCreate(!create)
  }
  return (
    <div>
      {
        create ?
          <div className="createTopicContainer">
            <div className="createTopic">
              <h1>Create Topic</h1>
              <input type="text" placeholder="Name" />
              <button onClick={createTopic}>Create</button>
            </div>
          </div>
          : null
      }
      <Header picture="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" />

      <div className="mainTopicsContainer">
        <div className="backButtonContainer">
          <div className="buttonBack">
            <NavLink to='/dashboard' >
              <Fab size='small' color="primary" className="buttonBackFab"><ArrowBackRoundedIcon></ArrowBackRoundedIcon></Fab>
            </NavLink>
          </div>
        </div>
        <div className="topicMenuContainer">
          <div className="topicMenu menuButtonTopic">
            <button className="createButton" onClick={createTopic}>+</button>
          </div>
          <NavLink to="/dashboard/subjects" className='menuButtonTopic'><button className="subjectButton">Go to Subjects</button></NavLink>
        </div>
        <div className="topicsContainer">
          {
            json.topics.map((topic: Topic) => {
              return (
                <div className="topicCard" key={topic.id}>
                  <div className="titleTopicContainer">
                    <h3 style={{ color: `${topic.color}` }}>{topic.title}</h3>
                  </div>
                  <div className="topicButtonContainer">
                    <Button size='small'><ModeEditRoundedIcon></ModeEditRoundedIcon></Button>
                    <Button size='small'> <DeleteIcon /> </Button>
                  </div>

                </div>
              )
            }
            )
          }

        </div>
      </div>
    </div>
  )
}