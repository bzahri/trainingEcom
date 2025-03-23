import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../AuthContext";
import { Text, Button, Avatar, Group } from "@mantine/core";

const UserInfo = () => {
  const { user, logout } = useAuth();
  console.log(user ? user : 'vide');

  return (
    <>
      <Group justify="space-between" align="center" w="100%">
  {/* Avatar et message de bienvenue */}
  <Group align="center">
    {user?.profilePicture ? (
      <Avatar src={user.profilePicture} alt="Photo de profil" size="md" radius="xl" />
    ) : (
      <Avatar size="md" radius="xl">
        {user?.name?.charAt(0).toUpperCase()}
      </Avatar>
    )}
    <Text size="lg">{user ? `Bienvenue, ${user.name}!` : "Non connecté"}</Text>
  </Group>

  {/* Bouton de déconnexion */}
  {user && (
    <Button color="red" leftSection={<FaSignOutAlt />} onClick={logout} />
  )}
  </Group>   
  </>
  );
};

export default UserInfo;
