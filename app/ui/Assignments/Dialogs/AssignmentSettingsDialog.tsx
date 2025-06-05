'use client'
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';


import AccessAlarmsRoundedIcon from '@mui/icons-material/AccessAlarmsRounded';
import { Assignment } from '@/app/lib/types/entityTypes';
import AssignmentFormDialog from './AssignmentFormDialog';
import DeleteAlert from '../../Alerts/DeleteAlert';
import { useMercurialStore } from '@/app/store/useMercurialStore';
import { DeleteAssignment } from '@/app/lib/RequestIntermediaries/AssignmentInter';


interface AssignmentSettingsDialogProps {
    assignment: Assignment;
    mutate: () => void
}

export default function AssignmentSettingsDialog({assignment, mutate}:AssignmentSettingsDialogProps) {
  const [open, setOpen] = useState(false);
  const {isAuthenticated} = useMercurialStore()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <SettingsRoundedIcon/>
      </IconButton>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Assignment Settings</DialogTitle>
        <List sx={{ pt: 0 }}>
          <AssignmentFormDialog isEditing={true} mutate={mutate} title='Edit Assignment' assignment={assignment}/>
          <DeleteAlert isAuthenticated={isAuthenticated} mutate={mutate} body='Are you sure you wat to delete this assignment?'
           title='Delete Assignment' assignmentAlert={true} deleteMethod={DeleteAssignment} id={assignment.id ?? ""} />
          <ListItem disablePadding>
            <ListItemButton
              autoFocus
              onClick={() => handleClose()}
            >
              <ListItemAvatar>
                <Avatar>
                  <AccessAlarmsRoundedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Set Reminder" />
            </ListItemButton>
          </ListItem>
        </List>
    </Dialog>
    </div>
  );
}
