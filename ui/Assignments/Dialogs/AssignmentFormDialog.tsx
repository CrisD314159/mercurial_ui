import {Dialog, Fab, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Slide, Toolbar, Typography } from "@mui/material";
import { forwardRef, useState } from "react";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import AddIcon from '@mui/icons-material/Add';
import { TransitionProps } from "@mui/material/transitions";
import AssignmentCreationForm from "../Forms/AssignmentCreationForm";
import AssignmentEditingForm from "../Forms/AssignmentEditingForm";
import { Assignment } from "@/lib/types/entityTypes";
import EditIcon from '@mui/icons-material/Edit';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="right" ref={ref} {...props} />;
});


interface AssignmentCreationDialogProps{
  mutate: ()=> void
  isEditing: boolean
  assignment?: Assignment
  title:string
  
}

export default function AssignmentFormDialog({mutate, isEditing, assignment, title}: AssignmentCreationDialogProps) {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <>
    {
      isEditing ?
      <ListItem disablePadding >
        <ListItemButton onClick={handleClickOpen}>
            <ListItemIcon>
                <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Edit Assignment" />
        </ListItemButton>
        </ListItem>
        :
     <Fab onClick={handleClickOpen} size="small" sx={{boxShadow:'0px 10px 50px 20px #8e17e3'}}>
        <AddIcon/>
      </Fab>

    }
      <Dialog
        fullScreen
        sx={{width:'90%'}}
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <ArrowBackIosRoundedIcon />
            </IconButton>
            <Typography>
              {title}
            </Typography>
          </Toolbar>
        <div className="w-full h-full">
          {
            isEditing ?
            <AssignmentEditingForm assignment={assignment} handleClose={handleClose} mutate={mutate}/>
            :
            <AssignmentCreationForm handleClose={handleClose} mutate={mutate}/>
          }
        </div>
      </Dialog>
    </>
  )


}