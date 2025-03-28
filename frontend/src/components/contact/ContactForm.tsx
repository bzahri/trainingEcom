// export default ContactForm;
import { Container, Title, TextInput, Textarea, Button, Select, Text, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';

const ContactForm: React.FC = () => {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
    validate: {
      name: (value: string) => (value.length < 2 ? 'Nom trop court' : null),
      email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Email invalide'),
      subject: (value: string) => (value.length < 2 ? 'Sujet trop court' : null),
      message: (value: string) => (value.length < 10 ? 'Message trop court' : null),
    },
  });

  return (
    <>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        {/* Nom */}
        <TextInput
          label="Nom"
          placeholder="Votre nom"
          {...form.getInputProps('name')}
          required
        />

        {/* Email */}
        <TextInput
          label="Email"
          placeholder="Votre email"
          {...form.getInputProps('email')}
          required
          mt="md"
        />

        {/* Sujet */}
        <Select
          label="Sujet"
          placeholder="Choisissez un sujet"
          data={['Demande de devis', 'Support technique', 'Autre']}
          {...form.getInputProps('subject')}
          required
          mt="md"
        />

        {/* Message */}
        <Textarea
          label="Message"
          placeholder="Votre message"
          {...form.getInputProps('message')}
          required
          mt="md"
        />

        <Group mt="md">
          <Button type="submit" fullWidth>
            Envoyer
          </Button>
        </Group>
      </form>
    </>
  );
};

export default ContactForm;
