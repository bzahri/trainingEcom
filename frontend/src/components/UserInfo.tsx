import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../AuthContext";
import { Text, Button, Grid, Avatar, Group } from "@mantine/core";

const UserInfo = () => {
  const { user, logout } = useAuth();
  console.log(user ? user : 'vide');

  return (
    <div>
      <Group align="center">
        {/* Affichage de l'avatar */}
        {user?.profilePicture ? (
          <Avatar src={user.profilePicture} alt="Photo de profil" size={40} radius="50%" />
        ) : (
          <Avatar size={40} radius="50%">
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>
        )}

        {/* Affichage du message de bienvenue */}
        <Text size="lg">
          {user ? `Bienvenue, ${user.name}!` : "Non connecté"}
        </Text>
      </Group>

      {/* Bouton de déconnexion */}
      {user && (
        <Button color="red" leftSection={<FaSignOutAlt />} onClick={logout}>
          Se déconnecter
        </Button>
      )}
    </div>
  );
};

export default UserInfo;
