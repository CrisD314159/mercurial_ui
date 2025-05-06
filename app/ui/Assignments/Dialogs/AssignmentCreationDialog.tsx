import {Dialog, Fab, IconButton, Slide, Toolbar, Typography } from "@mui/material";
import { forwardRef, useState } from "react";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import AddIcon from '@mui/icons-material/Add';

import { TransitionProps } from "@mui/material/transitions";
import AssignmentCreationForm from "../AssignmentCreationForm";

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
}

export default function AssignmentCreationDialog({mutate}: AssignmentCreationDialogProps) {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <>
     <Fab onClick={handleClickOpen} size="medium">
        <AddIcon/>
      </Fab>
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
              New Assignment
            </Typography>
          </Toolbar>
        <div className="w-full h-full">
          <AssignmentCreationForm handleClose={handleClose} mutate={mutate}/>
        </div>
      </Dialog>



    </>
  )


}