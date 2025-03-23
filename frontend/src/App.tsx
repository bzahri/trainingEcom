// import '@mantine/core/styles.css';
// import { AppShell, Burger , Button , NavLink, ScrollArea, Skeleton } from '@mantine/core';
// import { useDisclosure } from '@mantine/hooks';
// import { MantineProvider } from '@mantine/core';
// import { theme } from './theme';
// import { ColorSchemeToggle } from './components/ColorSchemeToggle/ColorSchemeToggle';
// import Header from './components/Header';
// import Navbar from './components/Navbar';
// import RouterSwitcher from './components/RouterSwitcher';
// import {  useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';


// export default function App() {
//   const [opened, {toggle}] = useDisclosure();
//   const navigate = useNavigate();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   useEffect(() => {
//     const token = localStorage.getItem('token'); // Exemple de vérification d'un token
//     if (token) {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   console.log(isAuthenticated);
//   return (
//       <MantineProvider theme={theme}>
//         <div className="App" style={{marginTop: '20px'}}>
//         <AppShell
//           header={{height: 60}}
//           navbar={{width: 300, breakpoint: 'sm', collapsed: {mobile: !opened}}}
//           padding="md"
//         >
//           <Header toggle={toggle} opened={opened}/>
//           <AppShell.Navbar p="md" style={{ gap: '10px' }}>
//                 <NavLink
//                   label="Home Component"
//                   onClick={() => navigate('/home-component')}
//                   style={{ margin: '5px' }}
//                 /> 
//                 <NavLink
//                   label="Form Component"
//                   onClick={() => navigate('/form-component')}
//                   style={{ margin: '5px' }}
//                 />
               
//                 <NavLink
//                   label="Projet Manager Component"
//                   onClick={() => navigate('/project-manager')}
//                   style={{ margin: '5px' }}
//                 />
//                 <NavLink
//                   label="Faq Component"
//                   onClick={() => navigate('/Faq-component')}
//                   style={{ margin: '5px' }}
//                 />
//                 {
//                   isAuthenticated ? <NavLink
//                     label="Profile Component"
//                     onClick={() => navigate('/profile-component')}
//                     style={{ margin: '5px' }}
//                   /> : <></>
//                 }
//                 {
//                   isAuthenticated == false ?
//                 <> 
//                   <NavLink
//                     label="Login Component"
//                     onClick={() => navigate('/login-component')}
//                     style={{ margin: '5px' }}
//                   />
//                   <NavLink
//                     label="SignUp Component"
//                     onClick={() => navigate('/signup-component')}
//                     style={{ margin: '5px' }}
//                   />
//                 </> : <></>
//                 }
                
//               </AppShell.Navbar>
//           {/* <Navbar /> */}
//           <AppShell.Main>
//             <RouterSwitcher />
//           </AppShell.Main>
//           <AppShell.Footer zIndex={opened ? 'auto' : 201}>
//             Built by Bachir Live🫃🫃🫃🫃🫃🫃🫃🫃🫃🫃
//           </AppShell.Footer>
//         </AppShell>
//       </div>
//       </MantineProvider>
//   );
  
// }
import '@mantine/core/styles.css';
import { AppShell, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';
import RouterSwitcher from './components/RouterSwitcher';
import Header from './components/common/Header';
import Navbar from './components/common/Navbar';

export default function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <MantineProvider theme={theme}>
      <div className="App" style={{ marginTop: '20px',marginBottom:'20px' }}>
        <AppShell
          header={{ height: '100' }}
          navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
          padding="md"
        >
          <Header toggle={toggle} opened={opened} />
          <Navbar  />
          
          <AppShell.Main>
            <RouterSwitcher />
          </AppShell.Main>
          {/* <AppShell.Aside p="md"><UserInfo /></AppShell.Aside> */}
          <AppShell.Footer p="md">Footer</AppShell.Footer>
        </AppShell>
      </div>
    </MantineProvider>
  );
}
