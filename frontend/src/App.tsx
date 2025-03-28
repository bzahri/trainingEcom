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
