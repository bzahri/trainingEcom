import { Container, Title, TextInput, Textarea, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';

const ContactForm: React.FC = () => {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validate: {
      name: (value: string) => (value.length < 2 ? 'Nom trop court' : null),
      email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Email invalide'),
      message: (value: string) => (value.length < 10 ? 'Message trop court' : null),
    },
  });

  return (
    <Container size="sm" py="xl">
      <Title order={2} >Contactez-moi</Title>
      <Container size="sm" mt="md">
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput label="Nom" placeholder="Votre nom" {...form.getInputProps('name')} required />
          <TextInput label="Email" placeholder="Votre email" {...form.getInputProps('email')} required mt="md" />
          <Textarea label="Message" placeholder="Votre message" {...form.getInputProps('message')} required mt="md" />
          <Button type="submit" mt="md" fullWidth>Envoyer</Button>
        </form>
      </Container>
    </Container>
  );
};

export default ContactForm;
