import { useState } from "react";
import { TextInput, Button, Card } from "@mantine/core";

const API_URL = "http://localhost:5000/api/project";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<{ user: string; bot: string }[]>([]);

  const sendMessage = async () => {
    const response = await fetch("http://localhost:5000/api/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await response.json();
    setChat([...chat, { user: message, bot: data.response }]);
    setMessage("");
  };

  return (
    <Card shadow="sm" p="lg">
      {chat.map((c, i) => (
        <div key={i}>
          <p><strong>Vous :</strong> {c.user}</p>
          <p><strong>Bot :</strong> {c.bot}</p>
        </div>
      ))}
      <TextInput value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button onClick={sendMessage}>Envoyer</Button>
    </Card>
  );
};

export default Chatbot;
