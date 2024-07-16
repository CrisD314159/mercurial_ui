import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"

interface SelectProps{
  title: string,
  option: string,
  handleSelect: (event: SelectChangeEvent) => void,
  options: string[]


}
export default function SelectMenu(props:SelectProps) {
  const {title, option, handleSelect, options} = props


  return(
    <FormControl sx={{width:'210px', marginRight:'30px', marginBottom:'20px', m:1}}>
    <InputLabel id="demo-simple-select-label">{title}</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={option}
      label="Age"
      onChange={handleSelect}
    >
      {
        options.map((option: string)=>{
          return <MenuItem value={option}>{option}</MenuItem>
        })
      }
    </Select>
  </FormControl>
  )

  
}