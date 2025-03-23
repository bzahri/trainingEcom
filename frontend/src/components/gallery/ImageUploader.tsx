import React, { useState } from 'react';
import { FileInput, Image, Button, Notification } from '@mantine/core';
import axios from 'axios';

const ImageUploader = () => {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpload = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFile(file);
      setError(null);
    } else {
      setImage(null);
      setFile(null);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const token = localStorage.getItem('token'); // Récupération du token d'authentification
      if (!token) {
        setError('Utilisateur non authentifié');
        setLoading(false);
        return;
      }
      
      const response = await axios.post('http://localhost:5000/api/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Image uploaded successfully:', response.data);
      setImage(null);
      setFile(null);
    } catch (error: any) {
      console.log(error);
      setError(error.response?.data?.message || 'Erreur lors du téléchargement de l’image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <FileInput label="Upload an image" placeholder="Select an image" accept="image/*" onChange={handleUpload} />
      {image && (
        <div style={{ marginTop: 16 }}>
          <Image src={image} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      )}
      {error && <Notification color="red" title="Erreur">{error}</Notification>}
      <Button onClick={handleSubmit} style={{ marginTop: 16 }} disabled={!file || loading}>
        {loading ? 'Uploading...' : 'Upload Image'}
      </Button>
    </div>
  );
};

export default ImageUploader;
