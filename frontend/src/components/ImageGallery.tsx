import { useState, useEffect } from "react";
import { Card, Image, Text, Grid, Loader, Center } from "@mantine/core";

interface ImageData {
  _id: string;
  filename: string;
  url: string;
  userId: {
    username: string;
    email: string;
  };
}

const ImageGallery = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/images/"); // Mets l'URL correcte
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Erreur lors du chargement des images :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (loading) {
    return (
      <Center>
        <Loader size="lg" />
      </Center>
    );
  }

  return (
    <Grid gutter="md">
      {images.map((img) => (
        <Grid.Col key={img._id} span={4}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
              <Image src={img.url} height={200} alt={img.filename} />
            </Card.Section>
            <Text mt="sm" fw={500}>
              {img.userId.username}
            </Text>
            <Text size="sm" c="dimmed">
              {img.userId.email}
            </Text>
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default ImageGallery;
