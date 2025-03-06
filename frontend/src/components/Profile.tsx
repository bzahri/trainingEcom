// import React, { useState, useEffect } from "react";
// import { useAuth } from "../AuthContext";
// import { Container, Text, Avatar, Button, Group, Card, Divider, Center } from "@mantine/core";
// import { FaEdit, FaSignOutAlt } from "react-icons/fa"; // Utilisation de react-icons

// const Profile: React.FC = () => {
//   const { user, logout } = useAuth();
//   const [profilePic, setProfilePic] = useState<string | null>(null);

//   useEffect(() => {
//     if (user?.profilePicture) {
//       setProfilePic(user.profilePicture);
//     } else {
//       setProfilePic(null);
//     }
//   }, [user]);

//   if (!user) {
//     return (
//       <Container>
//         <Text size="lg" color="red">Vous devez vous connecter pour voir votre profil.</Text>
//       </Container>
//     );
//   }

//   return (
//     <Container size="xs">
//       <Card shadow="md" padding="lg" radius="md" withBorder>
//         <Center>
//           {profilePic ? (
//             <Avatar src={profilePic} alt="Photo de profil" size={120} radius="50%" />
//           ) : (
//             <Avatar size={120} radius="50%">
//               {user.name?.charAt(0).toUpperCase()}
//             </Avatar>
//           )}
//         </Center>

//         <Text  size="xl"  mt="md">
//           {user.name}
//         </Text>
//         <Text  size="md" color="dimmed">
//           {user.email}
//         </Text>

//         <Divider my="md" />

//         <Group  mt="md">
//           <Button variant="light" onClick={() => alert("Modifier le profil bientôt disponible !")}>
//             <FaEdit />
//           </Button>
//           <Button color="red" onClick={logout}>
//             <FaSignOutAlt />
//           </Button>
//         </Group>
//       </Card>
//     </Container>
//   );
// };

// export default Profile;
import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { Container, Text, Avatar, Button, Group, Card, Divider, Center, Modal, TextInput } from "@mantine/core";
import { FaEdit, FaSignOutAlt } from "react-icons/fa"; // Utilisation de react-icons

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [opened, setOpened] = useState(false); // État pour contrôler l'ouverture de la modale
  const [newName, setNewName] = useState(user?.name || ""); // Valeur pour modifier le nom
  const [newEmail, setNewEmail] = useState(user?.email || ""); // Valeur pour modifier l'email

  useEffect(() => {
    if (user?.profilePicture) {
      setProfilePic(user.profilePicture);
    } else {
      setProfilePic(null);
    }
  }, [user]);

  const handleProfileUpdate = () => {
    // Logique de mise à jour du profil, à adapter selon tes besoins
    console.log("Profil mis à jour : ", { newName, newEmail });
    // Fermer la modale après la mise à jour
    setOpened(false);
  };

  if (!user) {
    return (
      <Container>
        <Text size="lg" color="red">Vous devez vous connecter pour voir votre profil.</Text>
      </Container>
    );
  }

  return (
    <Container size="xs">
      <Card shadow="md" padding="lg" radius="md" withBorder>
        <Center>
          {profilePic ? (
            <Avatar src={profilePic} alt="Photo de profil" size={120} radius="50%" />
          ) : (
            <Avatar size={120} radius="50%">
              {user.name?.charAt(0).toUpperCase()}
            </Avatar>
          )}
        </Center>

        <Text size="xl" mt="md">
          {user.name}
        </Text>
        <Text size="md" color="dimmed">
          {user.email}
        </Text>

        <Divider my="md" />

        <Group mt="md">
          <Button variant="light" onClick={() => setOpened(true)}>
            <FaEdit />
          </Button>
          <Button color="red" onClick={logout}>
            <FaSignOutAlt />
          </Button>
        </Group>
      </Card>

      {/* Modale pour la modification du profil */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Modifier le profil"
      >
        <TextInput
          label="Nom"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          mb="md"
        />
        <TextInput
          label="Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          mb="md"
        />
        <Group  mt="md">
          <Button onClick={handleProfileUpdate}>Enregistrer</Button>
        </Group>
      </Modal>
    </Container>
  );
};

export default Profile;
