import { Alert, Button } from "@mui/material";
import { Topic } from "../../../app/lib/types/types";
import DeleteIcon from '@mui/icons-material/Delete';
import './topics.css'
import TopicCreation from "../../../app/ui/creation/TopicCreation";

import EditTopic from "../../../app/ui/editForms/EditTopic";

import useTopics from "../../hooks/useTopics";


export default function Topics() {
  const  {
    topics,
    setTopics,
    alert,
    setAlert,
    alertCont,
    setId,
    deleteTopicMutation
  } = useTopics()
  const token = localStorage.getItem('accessToken')

  const handleDelete = (topicId: string) => {
    setId(topicId)
    if(token )deleteTopicMutation.mutate({topicId, token})
  }

  const handleCreation = (Topic: Topic) => {
    if (topics && topics.length > 0) {
      setTopics([...topics, Topic])
    } else {
      setTopics([Topic])
    }
  }



  return (
   
      

      <div className="mainTopicsContainer">
      {
        alert && <Alert severity="error" onClose={() => setAlert(false)}>{alertCont}</Alert>
      }
        <div className="topicMenuContainer">
          <div className="topicMenu menuButtonTopic">
            <TopicCreation handleCreation={handleCreation} />
          </div>
        </div>
        <div className="topicsContainer">
          <div className="topicsContainerSlider">
          
          {
            topics && topics.length > 0 ?
              topics.map((topic: Topic) => {
                return (
                  <div className="topicCard" key={topic.id}>
                    <div className="titleTopicContainer">
                      <h3 style={{ color: `${topic.color}` }}>{topic.tittle}</h3>
                    </div>
                    <div className="topicButtonContainer">
                      <EditTopic topicColor={topic.color} topicName={topic.tittle} topicId={topic.id}/>
                      <Button size='small' disabled={deleteTopicMutation.isPending} onClick={()=>{handleDelete(topic.id)}}> <DeleteIcon sx={{color:'#fff'}}/> </Button>
                    </div>

                  </div>
                )
              }
              ) :
              <div style={{ width: '100%' }}>
                <p style={{ textAlign: 'center' }}>There are no topics</p>
              </div>
          }
          </div>
        </div>
      </div>
  )
}