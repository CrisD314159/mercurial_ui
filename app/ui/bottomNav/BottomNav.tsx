'use client'
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import DoneIcon from '@mui/icons-material/Done';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import InterestsIcon from '@mui/icons-material/Interests';
import ListIcon from '@mui/icons-material/List';
import { useState } from 'react';
import Link from 'next/link';



export default function BottomNav() {
  const [value, setValue] = useState(0)


  return (
    <BottomNavigation 
    sx={{ width: '100%', paddingBottom:'55px'}} 
    showLabels ={false}
    value={value}
    onChange={(event, newValue) => {
      setValue(newValue);
    }}
    >
      <BottomNavigationAction
        LinkComponent={Link}
        href='/dashboard/todo'
        label="To-Do"
        icon={< ListIcon/>}
      />
      <BottomNavigationAction
        label="Done"
        LinkComponent={Link}
        href='/dashboard/done'
        icon={<DoneIcon />}
      />
      <BottomNavigationAction
        label="Subjects"
        LinkComponent={Link}
        href='/dashboard/subjects'
        icon={<LibraryBooksIcon />}
      />
      <BottomNavigationAction 
      label="Topics" value="topics" 
      icon={<InterestsIcon />}
      LinkComponent={Link}
      href='/dashboard/topics'
      />
    </BottomNavigation>
  );
}
