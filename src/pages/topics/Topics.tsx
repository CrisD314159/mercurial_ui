import Header from "../../components/Header";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Button, Fab } from "@mui/material";
import { NavLink } from "react-router-dom";
import json from '../../../public/dataset.json'
import { Topic } from "../../components/types/types";
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import './topics.css'
import TopicCreation from "../../components/creation/TopicCreation";

export default function Topics() {
  return (
    <div>

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
            <TopicCreation />
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