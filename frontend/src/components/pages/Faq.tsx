import { Container, Title, Text, Accordion } from '@mantine/core';
import React from 'react';

const FAQ: React.FC = () => {
  return (
    <Container size="md" py="xl">
      <Title order={1} >Foire Aux Questions (FAQ)</Title>
      
      <Accordion mt="xl">
        <Accordion.Item value="question1">
          <Accordion.Control>Comment puis-je contacter le support ?</Accordion.Control>
          <Accordion.Panel>
            Vous pouvez nous contacter via le formulaire de contact disponible sur la page Contact ou par email à support@example.com.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="question2">
          <Accordion.Control>Quels sont les délais de réponse ?</Accordion.Control>
          <Accordion.Panel>
            Nous nous efforçons de répondre à toutes les demandes dans un délai de 24 à 48 heures.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="question3">
          <Accordion.Control>Proposez-vous des services sur mesure ?</Accordion.Control>
          <Accordion.Panel>
            Oui, nous pouvons adapter nos services en fonction de vos besoins spécifiques. Contactez-nous pour plus d’informations.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="question3">
          <Accordion.Control>Proposez-vous des services sur mesure ?</Accordion.Control>
          <Accordion.Panel>
            Oui, nous pouvons adapter nos services en fonction de vos besoins spécifiques. Contactez-nous pour plus d’informations.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="question3">
          <Accordion.Control>Proposez-vous des services sur mesure ?</Accordion.Control>
          <Accordion.Panel>
            Oui, nous pouvons adapter nos services en fonction de vos besoins spécifiques. Contactez-nous pour plus d’informations.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="question3">
          <Accordion.Control>Proposez-vous des services sur mesure ?</Accordion.Control>
          <Accordion.Panel>
            Oui, nous pouvons adapter nos services en fonction de vos besoins spécifiques. Contactez-nous pour plus d’informations.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="question3">
          <Accordion.Control>Proposez-vous des services sur mesure ?</Accordion.Control>
          <Accordion.Panel>
            Oui, nous pouvons adapter nos services en fonction de vos besoins spécifiques. Contactez-nous pour plus d’informations.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default FAQ;
