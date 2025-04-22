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
import { useThemeContext } from '@/app/lib/theme/ThemeContextProvidex';
import { useMercurialStore } from '@/app/store/useMercurialStore';
import LoginIcon from '@mui/icons-material/Login';
import Link from 'next/link';
import LogOutAlert from '../Alerts/LogOutAlert';

export default function MercurialDrawer() {
  const [open, setOpen] = useState(false);
  const {toggleColorMode} = useThemeContext()
  const {isAuthenticated} = useMercurialStore()

  const toggleDrawer = (value:boolean) => {
    setOpen(value);
  };

  return (
    <div>
      <IconButton onClick={()=> toggleDrawer(true)}><MenuRoundedIcon/></IconButton>
      <Drawer open={open} onClose={()=>toggleDrawer(false)}>
      <Box sx={{ width: 200, height:'100%', background:'transparent' }} role="presentation" onClick={()=> toggleDrawer(false)}>
      <List>
        {
          isAuthenticated &&
        <ListItem sx={{padding:'0 10px', marginBottom:'10px'}} >
              <ListItemButton sx={{borderRadius:'15px'}} LinkComponent={Link} href='/dashboard/userOverview'>
                <ListItemIcon>
                  <AccountCircleRoundedIcon/>
                </ListItemIcon>
                <ListItemText primary={"Account Overview"} />
              </ListItemButton>
        </ListItem>
        }
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
        {
          isAuthenticated ?
        <ListItem sx={{padding:'0 10px', marginBottom:'10px'}} >
          <LogOutAlert/>
        </ListItem>
          :
        <ListItem sx={{padding:'0 10px', marginBottom:'10px'}} >
              <ListItemButton sx={{background:'#715ffa', borderRadius:'15px'}} LinkComponent={Link} href='/'>
                <ListItemIcon>
                  <LoginIcon/>
                </ListItemIcon>
                <ListItemText primary={"Login"} />
              </ListItemButton>
          </ListItem>

        }
      </List>
    </Box>
      </Drawer>
    </div>
  );
}
