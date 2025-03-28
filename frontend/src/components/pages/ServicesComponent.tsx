import React from "react";
import { 
  Container, SimpleGrid, Card, Text, Title, Group, Badge, 
  ThemeIcon, Button, Accordion, TextInput, Textarea 
} from "@mantine/core";
import { motion } from "framer-motion";
import { FaCode, FaSign, FaMobileAlt, FaCloud, FaUsers, FaQuestionCircle, FaEnvelope } from "react-icons/fa";
import ContactForm from "../contact/ContactForm";

const servicesData = [
  { title: "Web Development", description: "Applications web modernes et performantes.", icon: FaCode, badge: "New", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
  { title: "UI/UX Design", description: "Design intuitif et expérience utilisateur optimale.", icon: FaSign, badge: "Popular", gradient: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)" },
  { title: "Mobile App Development", description: "Apps mobiles réactives pour Android & iOS.", icon: FaMobileAlt, badge: "Hot", gradient: "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)" },
  { title: "Digital Marketing", description: "Stratégies SEO & publicité digitale.", icon: FaCloud, badge: "Hot", gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)" }
];

const testimonials = [
  { name: "Jean Dupont", feedback: "Service exceptionnel ! Mon site web est magnifique." },
  { name: "Marie Curie", feedback: "Très satisfaite du design et de l’expérience utilisateur." }
];

const faqData = [
  { question: "Quels sont vos tarifs ?", answer: "Nos tarifs varient selon le service et le projet. Contactez-nous pour un devis." },
  { question: "En combien de temps livrez-vous un projet ?", answer: "Cela dépend du projet, mais nous visons toujours une livraison rapide et efficace." }
];

const ServicesComponent = () => {
  return (
    <Container size="lg" my="xl">
      <Title order={2} ta="center" mb="xl">Nos Services</Title>

      {/* Section Services */}
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
        {servicesData.map((service, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card 
              shadow="lg" padding="lg" radius="lg" withBorder 
              style={{ transition: "transform 0.2s ease-in-out", transform: "scale(1)" }} 
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")} 
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <Group mb="md">
                <ThemeIcon size={60} radius="xl" style={{ background: service.gradient }}>
                  <service.icon size={30} color="#fff" />
                </ThemeIcon>
              </Group>
              <Title order={3} ta="center" mb="sm">{service.title}</Title>
              <Text ta="center" mb="md">{service.description}</Text>
              <Group >
                <Badge color="blue" variant="light">{service.badge}</Badge>
              </Group>
            </Card>
          </motion.div>
        ))}
      </SimpleGrid>

      {/* Section Témoignages */}
      <Title order={3} ta="center" mt="xl">Témoignages</Title>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl" mt="md">
        {testimonials.map((testimonial, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5, delay: index * 0.3 }}
          >
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Text fw={500}>"{testimonial.feedback}"</Text>
              <Text ta="right" fw={600} mt="sm">- {testimonial.name}</Text>
            </Card>
          </motion.div>
        ))}
      </SimpleGrid>

      {/* Section FAQ */}
      <Title order={3} ta="center" mt="xl">FAQ</Title>
      <Accordion mt="md" variant="separated">
        {faqData.map((faq, index) => (
          <Accordion.Item key={index} value={`faq-${index}`}>
            <Accordion.Control>{faq.question}</Accordion.Control>
            <Accordion.Panel><Text>{faq.answer}</Text></Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>

      {/* Formulaire de Contact */}
      <ContactForm />
    </Container>
  );
};

export default ServicesComponent;
