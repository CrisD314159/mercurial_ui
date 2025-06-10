import './header.css'
import { IconButton } from '@mui/material';
import Image from 'next/image';
import MercurialDrawer from '../Drawer/MercurialDrawer';
import Link from 'next/link';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Header() {

  return (
    <header className='flex items-center justify-between'>
      <MercurialDrawer/>
      <div className='imageContainerHeader'>
          <Image src="/mercurialLogo.png" alt="MercurialLogo" width={35} height={35}/>
      </div>
      <nav className='nav'>
    
            <IconButton LinkComponent={Link} href='https://github.com/CrisD314159/mercurial_ui' size='large'>
              <GitHubIcon/>
            </IconButton>
      </nav>
    </header>
  )
}