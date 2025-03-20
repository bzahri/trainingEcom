import { useEffect, useState } from "react";
import { Carousel } from "@mantine/carousel";
import { Image, Loader, Center } from "@mantine/core";
import axios from "axios";

interface ImageData {
  _id: string;
  url: string;
  userId: {
    username: string;
    email: string;
  };
}

const ImageCarousel = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/images/");
        console.log(response.data[0].filename);
        setImages(response.data[0]);
        //console.log(images);

      } catch (error) {
        console.error("Erreur lors de la récupération des images", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchImages();
  }, []);

  if (loading) {
    return (
      <Center style={{ height: "300px" }}>
        <Loader />
      </Center>
    );
  }
  
  return (
    <Carousel slideSize="50%" height={300} loop>
      {images.map((image) => (
        <Carousel.Slide key={image._id}>
          <Image src={"http://localhost:5000/"+image.url} alt={image.url/*image.userId.username*/} fit="cover" height={300} />
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;