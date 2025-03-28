// import { useState, useEffect } from "react";
// import { Card, Image, Text, Grid, Loader, Center } from "@mantine/core";
// import { Carousel } from "@mantine/carousel";

// interface ImageData {
//   _id: string;
//   filename: string;
//   url: string;
//   userId: {
//     username: string;
//     email: string;
//   };
// }

// const ImageGallery = () => {
//   const [images, setImages] = useState<ImageData[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/images/"); // Mets l'URL correcte
//         const data = await response.json();
//         setImages(data);
//       } catch (error) {
//         console.error("Erreur lors du chargement des images :", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchImages();
//   }, []);

//   if (loading) {
//     return (
//       <Center>
//         <Loader size="lg" />
//       </Center>
//     );
//   }

//   return (
//     <Carousel  withIndicators
    
//     slideSize="33.33%"
//     slideGap="md"
//     loop
//     align="start"
//     slidesToScroll={3}>
//       {images.map((img) => (
//         <Carousel.Slide key={img._id}>
//           <Card shadow="sm" padding="lg" radius="md" withBorder>
//             <Card.Section>
//               <Image src={img.url} height={200} alt={img.filename} />
//             </Card.Section>
//             <Text >
//               {img.userId.username}
//             </Text>
//             <Text >
//               {img.userId.email}
//             </Text>
//           </Card>
//         </Carousel.Slide>
//       ))}
//     </Carousel>
//   );
// };

// export default ImageGallery;
import { useState, useEffect } from "react";
import { Card, Image, Text, Grid, Loader, Center, Badge, Group, Avatar } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { FaUserCircle } from "react-icons/fa";

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
      <Center style={{ height: "100vh" }}>
        <Loader size="lg" />
      </Center>
    );
  }

  return (
    <Grid gutter="xl">
      <Grid.Col span={12}>
        <Carousel
          withIndicators
          slideSize="33.33%"
          slideGap="md"
          loop
          align="start"
          slidesToScroll={3}
          styles={{
            indicator: {
              backgroundColor: "#1e1e1e",
            },
          }}
        >
          {images.map((img) => (
            <Carousel.Slide key={img._id}>
              <Card
                shadow="md"
                padding="lg"
                radius="lg"
                withBorder
                style={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <Card.Section>
                  <Image src={img.url} height={200} alt={img.filename} style={{ objectFit: "cover" }} />
                </Card.Section>

                <Group p="apart" mt="md">
                  <Group>
                    <Avatar size="sm" color="blue" radius="xl">
                      <FaUserCircle size={24} />
                    </Avatar>
                    <div>
                      <Text w={500} size="sm" style={{ lineHeight: 1.2 }}>
                        {img.userId.username}
                      </Text>
                      <Text size="xs" color="dimmed">
                        {img.userId.email}
                      </Text>
                    </div>
                  </Group>

                  <Badge color="teal" variant="filled" size="lg" radius="sm">
                    Image
                  </Badge>
                </Group>
              </Card>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Grid.Col>
    </Grid>
  );
};

export default ImageGallery;
