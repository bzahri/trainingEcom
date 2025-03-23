import { useState, useEffect } from "react";
import { Card, Image, Text, Grid, Loader, Center } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

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
    <Carousel  withIndicators
    
    slideSize="33.33%"
    slideGap="md"
    loop
    align="start"
    slidesToScroll={3}>
      {images.map((img) => (
        <Carousel.Slide key={img._id}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
              <Image src={img.url} height={200} alt={img.filename} />
            </Card.Section>
            <Text >
              {img.userId.username}
            </Text>
            <Text >
              {img.userId.email}
            </Text>
          </Card>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default ImageGallery;
