'use client'
import {CircularProgress, List } from "@mui/material";
import './topics.css'
import { Topic } from "@/app/lib/types/entityTypes";
import TopicCreation from "@/app/ui/Topic/TopicCreation";
import useSWR from 'swr'
import { GetTopics } from "@/app/lib/RequestIntermediaries/TopicInter";
import { useMercurialStore } from "@/app/store/useMercurialStore";
import DeleteTopicAlert from "@/app/ui/Topic/DeleteTopicAlert";
import EditTopic from "@/app/ui/Topic/EditTopic";
import MercurialSnackbar from "@/app/ui/Snackbars/MercurialSnackbar";
import { GenericError } from "@/app/lib/types/definitions";




export default function TopicsPage() {
  const {isAuthenticated} = useMercurialStore()
  const {data,  error, isLoading, mutate} = useSWR<Topic[], GenericError>([isAuthenticated], ([isAuthenticated])=> GetTopics(isAuthenticated))

  if (isLoading){
    return (
      <div className="flex flex-col justify-center w-full items-center h-[90%] relative">
        <CircularProgress/>
      </div>
    )
  }

  return (
  
      <div className="flex flex-col justify-center w-full items-center h-[90%] relative">
        {
          error && <MercurialSnackbar message={error.message} state={true} type="error"/>
        }

          <List style={{height:'100%', flex:1, width:'100%', overflowY:'auto', paddingBottom:'40px'}}>
          {
            data && data.length > 0 ?
              data.map((topic: Topic) => {
                return (
                  <div className="rounded-xl shadow-md my-5 mx-5 px-4 py-8 text-sm font-medium flex justify-between items-center" key={topic.id}
                  style={{background: `linear-gradient(150deg, transparent 60%, ${topic.color})`}}>

                      <h3 className={`text-xl`}>{topic.title}</h3>

                      <div className="flex gap-4">
                        <EditTopic color={topic.color} id={topic.id} mutate={mutate} title={topic.title}/>

                        <DeleteTopicAlert body="Are you sure you want to delete this topic" title="Delete topic" id={topic.id} isAuthenticated={isAuthenticated}
                        mutate={mutate} 
                        />
                      </div>

                  </div>
                )
              }
              ) :
              <div style={{ width: '100%' }}>
                <p style={{ textAlign: 'center' }}>There are no topics</p>
              </div>
          }
          </List>
        <div className="absolute bottom-8">
            <TopicCreation mutate={mutate}/>
        </div>
      </div>
  )
}