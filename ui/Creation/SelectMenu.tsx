import { GenericError } from "@/lib/types/definitions"
import { Subject, Topic } from "@/lib/types/entityTypes"
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useEffect, useState } from "react"
import useSWR from "swr"
import MercurialSnackbar from "../Snackbars/MercurialSnackbar"

interface SelectProps{
  title: string
  option: number
  handleSelect: (event: SelectChangeEvent) => void
  FetchMethod:() => Promise<Topic[] | Subject[]>
  fetchKey:string
}

export default function SelectMenu({title, option, handleSelect, FetchMethod, fetchKey}:SelectProps) {
  const {data, error, isLoading } = useSWR<Topic[] | Subject[], GenericError>(fetchKey, ()=> FetchMethod())
  const[alert, setAlert] = useState(false)

  useEffect(()=>{
    if(error){
      setAlert(true)
    }
  },[error])

  return(
    <FormControl sx={{ marginRight:'30px', marginBottom:'20px', width:'50%'}} >
      <MercurialSnackbar message={error?.message ?? "An unexpected error occurred"} state={alert} type="error" closeMethod={setAlert}/>
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