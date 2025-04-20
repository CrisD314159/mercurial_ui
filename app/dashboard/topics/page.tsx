'use client'
import {CircularProgress, List } from "@mui/material";
import './topics.css'
import { Topic } from "@/app/lib/types/entityTypes";
import TopicCreation from "@/app/ui/Topic/TopicCreation";
import useSWR from 'swr'
import { DeleteTopic, GetTopics } from "@/app/lib/RequestIntermediaries/TopicInter";
import { useMercurialStore } from "@/app/store/useMercurialStore";
import EditTopic from "@/app/ui/Topic/EditTopic";
import MercurialSnackbar from "@/app/ui/Snackbars/MercurialSnackbar";
import { GenericError } from "@/app/lib/types/definitions";
import DeleteAlert from "@/app/ui/Alerts/DeleteAlert";


export default function TopicsPage() {
  const {isAuthenticated} = useMercurialStore()
  const {data,  error, isLoading, mutate} = useSWR<Topic[], GenericError>('topics', ()=> GetTopics(isAuthenticated))

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
                  <div className="rounded-xl  dark:border border-zinc-200 dark:border-zinc-700 shadow-md my-5 mx-5 px-4 py-8 text-sm font-medium flex justify-between items-center
                  transition-transform duration-200 ease-in-out hover:scale-[1.01] hover:shadow-xl" key={topic.id}
                  style={{background: `linear-gradient(150deg, transparent 60%, ${topic.color})`}}>

                      <h3 className={`text-xl`}>{topic.title}</h3>

                      <div className="flex gap-4">
                        <EditTopic color={topic.color} id={topic.id} mutate={mutate} title={topic.title}/>

                        <DeleteAlert body="Are you sure you want to delete this topic" title="Delete topic" id={topic.id} isAuthenticated={isAuthenticated}
                        mutate={mutate}  deleteMethod={DeleteTopic}
                        />
                      </div>

                  </div>
                )
              }
              ) :
              <div className="w-full mt-6">
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