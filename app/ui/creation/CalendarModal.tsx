import { Alert, Button, Dialog, DialogActions, DialogContent, Fab } from "@mui/material";
import { useState } from "react";
import ScheduleIcon from '@mui/icons-material/Schedule';
import {  Task } from "../../lib/types/types";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { AddToCalendarButton } from "add-to-calendar-button-react";

interface SubjectCreationProps {
    task: Task

}
export default function CalendarModal(props:SubjectCreationProps) {
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState(false) // Estado que indica si hay una alerta en la página
    const [date, setDate] = useState<string> ('')


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
   
  

    return (
        <div>
            <Fab size="small" onClick={handleClickOpen}
            ><ScheduleIcon /></Fab>
            
            <Dialog open={open} onClose={handleClose} sx={{ backdropFilter: 'blur(2px)' }}
            >
                <div>
                    <DialogContent sx={{
                    backgroundColor: '#0F0F0F',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', border: '1px solid #666'
                }}>
                    {
                    alert && <Alert severity="error" onClose={()=> setAlert(false)}>There was an error, try again later</Alert>
                    // Si alert es true, entonces se muestra una alerta de error
                    }

                      <div style={{marginBottom:'10px'}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={['DatePicker']}>
                                <DatePicker label="Pick a date" onChange={(e)=>{
                                  if(e){
                                    const year = e.year()
                                    const month = String(e.month() + 1).padStart(2, '0'); // Los meses son 0-indexados
                                    const day = String(e.date()).padStart(2, '0');
                                    const formattedDate = `${year}-${month}-${day}`;
                                    setDate(formattedDate)
                                  }
                                }}/>
                              </DemoContainer>
                        </LocalizationProvider>
                      </div>
                        <AddToCalendarButton
                          disabled={ date === '' ? true : false}
                          fakeIOS
                          description={props.task.description}
                          buttonStyle='round'
                          identifier='calendarButton'  
                          name={props.task.tittle}
                          options={['Apple','Google']}
                          location="Mercurial"
                          startDate={date}
                          endDate={date}
                          timeZone="America/Los_Angeles"
                        ></AddToCalendarButton>
                        <DialogActions sx={{ backgroundColor: '#0F0F0F', display: "flex", justifyContent: 'center', paddingTop: '30px' }}>
                            <Button onClick={handleClose} variant="outlined" color="error">Cancel</Button>
                        </DialogActions>
                    </DialogContent>


                </div>
                
            </Dialog>
        </div>
    )
}