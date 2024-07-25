import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"

interface SelectProps{
  title: string,
  option: string,
  handleSelect: (event: SelectChangeEvent) => void,
  options: selectMenuProps[],
  disabled: boolean


}
interface selectMenuProps {
  id:string,
  name:string
}
export default function SelectMenu(props:SelectProps) {
  const {title, option, handleSelect, options} = props


  return(
    <FormControl sx={{ marginRight:'30px', marginBottom:'20px', m: 1, width: '100%'}} >
    <InputLabel id="demo-simple-select-label">{title}</InputLabel>
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={option}
      label="Age"
      onChange={handleSelect}
      disabled={props.disabled}
      
    >
      {
        options.map((option: selectMenuProps, index)=>{
          return <MenuItem value={option.id} key={index}>{option.name}</MenuItem>
        })
      }
    </Select>
  </FormControl>
  )

  
}