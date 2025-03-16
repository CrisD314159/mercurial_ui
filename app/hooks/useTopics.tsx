import { useEffect, useState } from "react"
import { DeleteTopicFields, GeneralResponse, Topic, TopicList } from "../lib/types/types"
import { useGuardianStore } from "../store/guardianStore"
import { useMutation } from "@tanstack/react-query"
import { deleteTopic, getTopics } from "../lib/utils"

// Este hook se encarga de manejar los topics del usuario
const useTopics = ()=>{
  const token = localStorage.getItem('accessToken')
  const [topics, setTopics] = useState<Topic[]>([])
  const [alert, setAlert] = useState(false)
  const [alertCont] = useState('There was an error with the server')
  const [id, setId] = useState('')
  const checkAuth = useGuardianStore(state=>state.checkAuthStatus)


  const errorFunc =(error:Error)=>{
    if(error.message === 'Unauthorized'){
      checkAuth()
    }else{
      setAlert(true)
    }
  }

  const topicsMutation = useMutation<TopicList, Error, string>({
    mutationFn: getTopics,
    onSuccess: (data: TopicList) => {
      setTopics(data.topic)
    },
    onError: errorFunc
  })

  const deleteTopicMutation = useMutation<GeneralResponse, Error, DeleteTopicFields>({
    mutationFn:deleteTopic,
    onSuccess:()=>{
      setTopics(topics.filter((topic: Topic) => topic.id !== id))
    },
    onError:errorFunc
  })


  useEffect(() => {
   
    if(token){ topicsMutation.mutate(token)
    }else{
    checkAuth()
}
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    topics,
    setTopics,
    alert,
    setAlert,
    alertCont,
    setId,
    deleteTopicMutation,
    topicsMutation
  }

}
export default useTopics