"use client";
import { Assignment } from "@/app/lib/types/entityTypes";
import useFcmToken from "@/hooks/useFcmToken";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useState } from "react";
import AccessAlarmsRoundedIcon from '@mui/icons-material/AccessAlarmsRounded';
import { SchedulePushNotification } from "@/app/lib/ServerActions/NotificationActions";
import MercurialSnackbar from "../Snackbars/MercurialSnackbar";


interface PushNotificationComponentProps{
  assignment: Assignment
}
export default function PushNotificationComponent({assignment}:PushNotificationComponentProps) {
  const { token, notificationPermissionStatus } = useFcmToken();
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"error" | "success">("error");


  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  function toLocalDateTimeInputValue(date: Date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')

    return `${year}-${month}-${day} at ${hours}:${minutes}`
  }
  console.log(assignment.dueDate);


  const handlePushNotification = async () => {

    try {
      const response = await SchedulePushNotification(token, assignment.title, assignment.dueDate)
      if (response.success){
        setAlert(true)
        setMessage(response.message)
        setType("success")
        handleClose()
      }
    } catch (error) {
      if(error instanceof Error){
        setAlert(true)
        setMessage("Failed to schedule assignment")
        setType("error")
        handleClose()
      }
    }
  };

  return (
    <>
      {
        alert && <MercurialSnackbar message={message} type={type} state={alert} closeMethod={setAlert} />
      }
     
      <ListItem disablePadding>
        <ListItemButton autoFocus onClick={handleOpen}>
          <ListItemIcon>
              <AccessAlarmsRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Set reminder" />
        </ListItemButton>
      </ListItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{backdropFilter: 'blur(2px)'}}
      >
        <div style={{border:'1px solid #666', overflow:'hidden', borderRadius:'7px'}}>
        <DialogTitle id="alert-dialog-title">
          {"Create an Assignment Reminder"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {
              notificationPermissionStatus == "granted"?
              (
                `This will schedure a reminder for task: ${assignment.title} at ${assignment.dueDate ? toLocalDateTimeInputValue(new Date(assignment.dueDate)) : "No due date available"}`
              )
              :
              (
                "To schedule a task remider, you have to first allow notifications for Mercurial "
              )
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus color='secondary'>
            Close
          </Button>
          <Button onClick={handlePushNotification} color='success'>
            Set
          </Button>
        </DialogActions>

        </div>
        
      </Dialog>
    </>
  );
}