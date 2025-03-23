import { Container, Title, Text, Image, Badge, Group, Stack, Card, Timeline, Space, Grid, GridCol } from "@mantine/core";
import { FaBriefcase, FaChartLine, FaCode, FaLaptopHouse, FaPenFancy } from "react-icons/fa";

const AboutMe = () => {
    return (
        <>
            <Grid style={{ display: 'flex' }}>
                <GridCol span={4} style={{ display: 'flex', flexDirection: 'column' }}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ flex: 1 }}>
                        <Stack align="center">
                            <Image src="./src/assets/moi.jpg" alt="ZAHRI Bachir" radius="50%" h={300}   w={300}/>
                            <Title order={2}>ZAHRI Bachir</Title>
                            
                        </Stack>
                    </Card>
                </GridCol>
                <GridCol span={4} style={{ display: 'flex', flexDirection: 'column' }}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ flex: 1 }}>
                        <FaLaptopHouse size={40} color="#0078d4" />
                        <Text size="lg" mt="md" fw={700}>Mon Setup</Text>
                        <Stack align="stretch" justify="space-between" style={{ height: '100%' }}>
                            <Text size="lg" style={{ flex: 1 }}>
                                Mon setup est conçu pour offrir des performances de pointe, alliant puissance et fluidité. Il repose sur une NVIDIA GeForce RTX 4070 Ti pour des graphismes exceptionnels, un AMD Ryzen 9 5950X 16-Core Processor et 32 Go de RAM, offrant une puissance de calcul impressionnante pour le multitâche et les applications lourdes. Avec Windows 11 Entreprise, j'ai un environnement stable et sécurisé pour travailler efficacement. J'utilise une Canon D250 pour capturer des images et vidéos de haute qualité, et mes deux moniteurs ASUS TUF Gaming de 27 pouces offrent une expérience immersive, idéale pour le gaming, le développement et la création de contenu visuel.
                            </Text>
                        </Stack>

                    </Card>
                </GridCol>
                <GridCol span={4} style={{ display: 'flex', flexDirection: 'column' }}>
                    <Title order={3} mt="xl">Compétences Dev Web</Title>
                    <Group mt="sm">
                        {['UI/UX Design', 'Design Graphique', 'Branding & Identité Visuelle', 'Stratégie Marketing Digital', 'SEO (Référencement Naturel)', 'Social Media Marketing (SMM)', 'Community Management'].map((skill, index) => (
                            <Badge key={index} variant="light">{skill}</Badge>
                        ))}
                    </Group>
                    <Title order={3} mt="xl">Compétences Design et Marketing</Title>
                    <Group mt="sm">
                        {['Business Development', 'Développement Web', 'Marketing Digital', 'IA & Machine Learning', 'React.js', 'Node.js', 'MongoDB', 'Python'].map((skill, index) => (
                            <Badge key={index} variant="light">{skill}</Badge>
                        ))}
                    </Group>
                </GridCol>
            </Grid>
            {/* Section "Mes compétences" */}
            <Title order={2} mt="xl" >Mes Compétences</Title>
            <Grid m="sm" justify="center" >
                <Grid.Col span={4}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <FaCode size={40} color="#0078d4" />
                        <Text size="lg" mt="md" fw={700}>Développement Web</Text>
                        <Group mt="sm">
                            {[
                                "Développement Web Frontend",
                                "Développement Web Backend",
                                "Développement Full-Stack",
                                "HTML, CSS & JavaScript",
                                "React.js & Next.js",
                                "Vue.js & Nuxt.js",
                                "TypeScript",
                                "UI avec Tailwind CSS, Material UI, Mantine",
                                "Développement Backend avec Node.js & Express.js",
                                "Bases de données SQL (MySQL, PostgreSQL)",
                                "Bases de données NoSQL (MongoDB, Firebase)",
                                "APIs REST & GraphQL",
                                "Auth & Sécurité (JWT, OAuth, bcrypt)",
                                "Programmation Orientée Objet (POO)",
                                "Algorithmes & Structures de Données",
                            ]
                                .map((skill, index) => (
                                    <Badge key={index} variant="light">{skill}</Badge>
                                ))}
                        </Group>
                    </Card>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <FaPenFancy size={40} color="#0078d4" />
                        <Text size="lg" mt="md" fw={700}>Marketing Digital</Text>
                        <Group mt="sm">
                            {[
                                "Stratégie Marketing Digital",
                                "SEO (Référencement Naturel)",
                                "SEA (Google Ads, Bing Ads)",
                                "Content Marketing (Marketing de Contenu)",
                                "Inbound Marketing",
                                "Social Media Marketing (SMM)",
                                "Community Management",
                                "Publicité Digitale (Meta Ads, TikTok Ads, LinkedIn Ads…)",
                                "Marketing d’Influence",
                                "Web Analytics (Google Analytics, Matomo, etc.)",
                                "Stratégie de Conversion & CRO (Conversion Rate Optimization)",
                                "Neuromarketing",
                                "E-commerce & Dropshipping",
                                "Marketing Mobile"
                            ].map((skill, index) => (
                                <Badge key={index} variant="light">{skill}</Badge>
                            ))}
                        </Group>
                    </Card>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <FaChartLine size={40} color="#0078d4" />
                        <Text size="lg" mt="md" fw={700}>Design</Text>
                        <Group mt="sm">
                            {[
                                "UI/UX Design",
                                "Design Graphique",
                                "Branding & Identité Visuelle",
                                "Design de logo",
                                "Typographie",
                                "Théorie des couleurs",
                                "Création de maquettes (Wireframing & Prototypage)",
                                "Motion Design",
                                "Illustration digitale",
                                "Design pour les réseaux sociaux",
                                "Web Design",
                                "Design Mobile",
                                "Accessibilité & Ergonomie",
                                "Design Système"
                            ].map((skill, index) => (
                                <Badge key={index} variant="light">{skill}</Badge>
                            ))}
                        </Group>
                    </Card>
                </Grid.Col>
            </Grid>

            {/* Section "Mes Projets" */}
            <Title order={2} mt="xl" >Mes Projets</Title>
            <Grid mt="md" justify="center">
                <Grid.Col span={4}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Image src="https://via.placeholder.com/300" alt="Projet 1" />
                        <Text size="lg" mt="md">Projet 1</Text>
                        <Text mt="sm">
                            Une description de mon projet, réalisé avec React et Node.js.
                        </Text>
                    </Card>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Image src="https://via.placeholder.com/300" alt="Projet 2" />
                        <Text size="lg" mt="md">Projet 2</Text>
                        <Text color="dimmed" mt="sm">
                            Un projet front-end réalisé avec TypeScript et React.
                        </Text>
                    </Card>
                </Grid.Col>
                <Grid.Col span={4}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Image src="https://via.placeholder.com/300" alt="Projet 2" />
                        <Text size="lg" mt="md">Projet 2</Text>
                        <Text color="dimmed" mt="sm">
                            Un projet front-end réalisé avec TypeScript et React.
                        </Text>
                    </Card>
                </Grid.Col>
            </Grid>

            <Container size="xs" >

                <Space h="xl" />

                <Title order={3} mt="xl">Parcours</Title>
                <Timeline active={3} bulletSize={24} lineWidth={2} mt="sm">
                    <Timeline.Item title="Master MIAGE : École Marocaine Des Sciences de l'Ingénieur">
                        <Text size="sm" ></Text>
                    </Timeline.Item>
                    <Timeline.Item title="Business Developer : SmartLevel">
                        <Text size="sm" >Expérience dans le développement commercial et la gestion de projets digitaux chez SmartLevel.</Text>
                    </Timeline.Item>
                    <Timeline.Item title="Business Developer : Brand Launch : Horion">
                        <Text size="sm" >Lancement d'une entreprise Horion Morocco.</Text>
                    </Timeline.Item>
                    <Timeline.Item title="Exploration de l'IA & Machine Learning">
                        <Text size="sm" >Actuellement en phase d'apprentissage et de réalisation de projets en IA.</Text>
                    </Timeline.Item>
                </Timeline>
                <Space h="xl" /><Space h="xl" /><Space h="xl" />
            </Container>
        </>

    );
};

export default AboutMe;