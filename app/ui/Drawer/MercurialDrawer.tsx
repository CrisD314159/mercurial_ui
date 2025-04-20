'use client'

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ContrastIcon from '@mui/icons-material/Contrast';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useThemeContext } from '@/app/lib/theme/ThemeContextProvidex';

export default function MercurialDrawer() {
  const [open, setOpen] = useState(false);
  const {toggleColorMode} = useThemeContext()

  const toggleDrawer = (value:boolean) => {
    setOpen(value);
  };

  return (
    <div>
      <IconButton onClick={()=> toggleDrawer(true)}><MenuRoundedIcon/></IconButton>
      <Drawer open={open} onClose={()=>toggleDrawer(false)}>
      <Box sx={{ width: 200, height:'100%', background:'transparent' }} role="presentation" onClick={()=> toggleDrawer(false)}>
      <List>
        <ListItem sx={{padding:'0 10px', marginBottom:'10px'}} >
              <ListItemButton sx={{borderRadius:'15px'}}>
                <ListItemIcon>
                  <AccountCircleRoundedIcon/>
                </ListItemIcon>
                <ListItemText primary={"Account Overview"} />
              </ListItemButton>
            </ListItem>
        <ListItem sx={{padding:'0 10px', marginBottom:'10px'}}  >
              <ListItemButton sx={{borderRadius:'15px'}}  onClick={toggleColorMode}>
                <ListItemIcon>
                  <ContrastIcon/>
                </ListItemIcon>
                <ListItemText primary={"Toggle Theme"} />
              </ListItemButton>
            </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem sx={{padding:'0 10px', marginBottom:'10px'}} >
              <ListItemButton sx={{background:'#db040c', borderRadius:'15px'}}>
                <ListItemIcon>
                  <LogoutRoundedIcon/>
                </ListItemIcon>
                <ListItemText primary={"Logout"} />
              </ListItemButton>
          </ListItem>
      </List>
    </Box>
      </Drawer>
    </div>
  );
}
