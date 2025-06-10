import { Subject, Topic } from "@/lib/types/entityTypes"
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"

interface SelectProps{
  title: string
  option: number
  handleSelect: (event: SelectChangeEvent) => void
  options: Subject[] | Topic[] | undefined
  disabled: boolean
}

export default function SelectMenu({title, option, handleSelect, options, disabled}:SelectProps) {
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
      disabled = {disabled}
      
    >
      <MenuItem value={0} disabled>No item selected</MenuItem>
      {
        options?.map((option: Subject | Topic, index)=>{
          return <MenuItem value={option.id.toString()} key={index}>{option.title}</MenuItem>
        })
      }
    </Select>
  </FormControl>
  )

  
}