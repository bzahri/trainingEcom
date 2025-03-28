import React, { useState } from 'react';
import { 
  TextInput, 
  PasswordInput, 
  Button, 
  Container, 
  Group,
  Radio,
  Stack,
  Title,
  Alert,
  FileInput,
  Notification
} from '@mantine/core';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'student',
    profilePicture: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (field: keyof typeof formData) => (value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async () => {
    setError(null);
  
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
  
    setLoading(true);
  
    try {
      const payload: any = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        userType: formData.userType
      };
  
      // Ajouter l'image uniquement si elle existe
      if (formData.profilePicture) {
        const imageData = new FormData();
        imageData.append("file", formData.profilePicture);
        const uploadResponse = await fetch("http://localhost:5000/api/upload", {
          method: "POST",
          body: imageData
        });
  
        const uploadData = await uploadResponse.json();
        if (!uploadResponse.ok) throw new Error(uploadData.message || "Échec de l'upload de l'image");
  
        payload.profilePicture = uploadData.fileUrl; // Stocker l'URL retournée
      }
  
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Erreur lors de l'inscription");
  
      alert("Compte créé avec succès !");
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: 'student',
        profilePicture :''
      });
  
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Container size="sm" py={40}>
      <Title order={2} mb="lg" ta="center">
        Créer un compte
      </Title>
      
      {error && (
        <Alert 
          icon={<IconAlertCircle size="1rem" />} 
          title="Erreur" 
          color="red"
          mb="lg"
        >
          {error}
        </Alert>
      )}

      {success && (
        <Notification 
          icon={<IconCheck size="1rem" />} 
          color="green"
          title="Succès"
          onClose={() => setSuccess(false)}
          mb="lg"
        >
          Compte créé avec succès ! Vous pouvez maintenant vous connecter.
        </Notification>
      )}

      <Stack >
        <TextInput
          label="Nom d'utilisateur"
          placeholder="Votre pseudo"
          value={formData.username}
          onChange={(e) => handleChange('username')(e.currentTarget.value)}
          required
        />

        <TextInput
          label="Email"
          placeholder="ton@email.com"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email')(e.currentTarget.value)}
          required
        />

        <PasswordInput
          label="Mot de passe"
          placeholder="Au moins 6 caractères"
          value={formData.password}
          onChange={(e) => handleChange('password')(e.currentTarget.value)}
          required
        />

        <PasswordInput
          label="Confirmer le mot de passe"
          placeholder="Retapez votre mot de passe"
          value={formData.confirmPassword}
          onChange={(e) => handleChange('confirmPassword')(e.currentTarget.value)}
          required
        />

        

        <Radio.Group
          label="Vous êtes :"
          value={formData.userType}
          onChange={handleChange('userType')}
          required
        >
          <Group mt="xs">
            <Radio value="student" label="Étudiant" />
            <Radio value="teacher" label="Professeur" />
          </Group>
        </Radio.Group>

        <Button 
          onClick={handleSubmit} 
          loading={loading}
          fullWidth 
          mt="xl"
          size="md"
          disabled={loading || !formData.username.trim() || !validateEmail(formData.email) || formData.password.length < 6 || formData.password !== formData.confirmPassword}
        >
          S'inscrire
        </Button>
      </Stack>
    </Container>
  );
};

export default SignUp;
