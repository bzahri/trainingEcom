import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Avatar,
  Text,
  Group,
  Badge,
  Tabs,
  Loader,
  ScrollArea,
  Button,
} from "@mantine/core";
import { IconUser, IconUserCheck, IconUserX } from "@tabler/icons-react";

interface User {
  _id: string;
  username: string;
  email: string;
  userType: "student" | "teacher";
  profilePicture?: string;
}

const UsersList: React.FC = () => {
  const [students, setStudents] = useState<User[]>([]);
  const [teachers, setTeachers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const data: User[] = await response.json();

        setStudents(data.filter((user) => user.userType === "student"));
        setTeachers(data.filter((user) => user.userType === "teacher"));
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Container size="md" py="xl">
        <Loader size="lg" />
      </Container>
    );
  }

  const renderTable = (users: User[]) => (
    <ScrollArea>
      <Table highlightOnHover withColumnBorders>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Nom d'utilisateur</th>
            <th>Email</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <Avatar
                  src={user.profilePicture || `https://api.dicebear.com/7.x/identicon/svg?seed=${user.username}`}
                  radius="xl"
                />
              </td>
              <td>
                <Text fw={500}>{user.username}</Text>
              </td>
              <td>{user.email}</td>
              <td>
                <Badge color={user.userType === "student" ? "blue" : "green"}>
                  {user.userType === "student" ? "Étudiant" : "Professeur"}
                </Badge>
              </td>
              <td>
                <Group >
                  <Button size="xs" leftSection={<IconUserCheck size={14} />}>
                    Voir profil
                  </Button>
                  <Button
                    size="xs"
                    color="red"
                    leftSection={<IconUserX size={14} />}
                  >
                    Supprimer
                  </Button>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ScrollArea>
  );

  return (
    <Container size="lg" py="xl">
      <Tabs defaultValue="students">
        <Tabs.List grow>
          <Tabs.Tab value="students" leftSection={<IconUser size={16} />}>
            Étudiants
          </Tabs.Tab>
          <Tabs.Tab value="teachers" leftSection={<IconUser size={16} />}>
            Professeurs
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="students" pt="md">
          {renderTable(students)}
        </Tabs.Panel>
        <Tabs.Panel value="teachers" pt="md">
          {renderTable(teachers)}
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default UsersList;
