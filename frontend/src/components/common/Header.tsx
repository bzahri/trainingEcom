import { Flex, Burger, Button, useMantineColorScheme, AppShell } from '@mantine/core';
import { FaSun, FaMoon } from 'react-icons/fa';
import UserInfo from '../profile/UserInfo';

interface HeaderProps {
  toggle: () => void;
  opened: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggle, opened }) => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  // Fonction pour basculer entre les modes clair et sombre
  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <AppShell.Header >
      <Flex justify="space-between" align="center" style={{ height: '100%' }}>
        {/* Le burger est toujours affiché */}
        {/* <Burger opened={opened} onClick={toggle} size="sm" /> */}

        {/* Bouton pour basculer entre le mode clair et sombre */}
        <UserInfo />

        <Button 
          variant="link" 
          onClick={toggleColorScheme} 
          size="sm"
          aria-label="Toggle color scheme"
        >
          {colorScheme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
        </Button>
      </Flex>
    </AppShell.Header>
  );
};

export default Header;
