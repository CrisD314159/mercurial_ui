import { GenericError } from "@/lib/types/definitions"
import { Subject, Topic } from "@/lib/types/entityTypes"
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useEffect } from "react"
import toast from "react-hot-toast"
import useSWR from "swr"

interface SelectProps{
  title: string
  option: number
  handleSelect: (event: SelectChangeEvent) => void
  FetchMethod:() => Promise<Topic[] | Subject[]>
  fetchKey:string
}

export default function SelectMenu({title, option, handleSelect, FetchMethod, fetchKey}:SelectProps) {
  const {data, error, isLoading } = useSWR<Topic[] | Subject[], GenericError>(fetchKey, ()=> FetchMethod())

  useEffect(()=>{
    if(error){
      toast.success(error.message)
    }
  },[error])

  return(
    <FormControl sx={{ marginRight:'30px', marginBottom:'20px', width:'50%'}} >
    <InputLabel id="demo-simple-select-label">{title}</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={option.toString()}
      label="Age"
      onChange={handleSelect}
      required
      disabled = {isLoading}
      
    >
      <MenuItem value={0} disabled>No item selected</MenuItem>
      {
        data?.map((option: Subject | Topic, index)=>{
          return <MenuItem value={option.id.toString()} key={index}>{option.title}</MenuItem>
        })
      }
    </Select>
  </FormControl>
  )

  
}