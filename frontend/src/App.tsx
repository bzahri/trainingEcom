import '@mantine/core/styles.css';
import { AppShell, Burger , Button , NavLink, ScrollArea, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import { ColorSchemeToggle } from './components/ColorSchemeToggle/ColorSchemeToggle';
import Header from './components/Header';
import Navbar from './components/Navbar';
import RouterSwitcher from './components/RouterSwitcher';
import {  useNavigate } from 'react-router-dom';


export default function App() {
  const [opened, {toggle}] = useDisclosure();
  const navigate = useNavigate();
  return (
      <MantineProvider theme={theme}>
        <div className="App" style={{marginTop: '20px'}}>
        <AppShell
          header={{height: 60}}
          navbar={{width: 300, breakpoint: 'sm', collapsed: {mobile: !opened}}}
          padding="md"
        >
          <Header toggle={toggle} opened={opened}/>
          <AppShell.Navbar p="md" style={{ gap: '10px' }}>
                <NavLink
                  label="Home Component"
                  onClick={() => navigate('/home-component')}
                  style={{ margin: '5px' }}
                />
                <NavLink
                  label="Form Component"
                  onClick={() => navigate('/form-component')}
                  style={{ margin: '5px' }}
                />
                <NavLink
                  label="Projet Component"
                  onClick={() => navigate('/project/nouveau-projet-react')}
                  style={{ margin: '5px' }}
                />
                <NavLink
                  label="Faq Component"
                  onClick={() => navigate('/Faq-component')}
                  style={{ margin: '5px' }}
                />
                
              </AppShell.Navbar>
          {/* <Navbar /> */}
          <AppShell.Main>
            <RouterSwitcher />
          </AppShell.Main>
          <AppShell.Footer zIndex={opened ? 'auto' : 201}>
            Built by you the THICCest of all CODERS 🫃🫃🫃🫃🫃🫃🫃🫃🫃🫃
          </AppShell.Footer>
        </AppShell>
      </div>
      </MantineProvider>
  );
  
}
