import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import DoneIcon from '@mui/icons-material/Done';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import InterestsIcon from '@mui/icons-material/Interests';
import ListIcon from '@mui/icons-material/List';


interface LabelBottomNavigationProps {
  value: string,
  handleChange: (event: React.SyntheticEvent, newValue: string) => void
}

export default function BottomNav(props: LabelBottomNavigationProps) {

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    props.handleChange(event, newValue)
  };

  return (
    <BottomNavigation sx={{ width: '100%', background:'#141414'}} value={props.value} onChange={handleChange} >
      <BottomNavigationAction
        label="To-Do"
        value="todo"
        icon={< ListIcon/>}
      />
      <BottomNavigationAction
        label="Done"
        value="done"
        icon={<DoneIcon />}
      />
      <BottomNavigationAction
        label="Subjects"
        value="subjects"
        icon={<LibraryBooksIcon />}
      />
      <BottomNavigationAction label="Topics" value="topics" icon={<InterestsIcon />} />
    </BottomNavigation>
  );
}
