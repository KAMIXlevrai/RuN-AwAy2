import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [sender, setSender] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('/api/messages');
      setMessages(response.data);
    } catch (error) {
      console.error('Failed to fetch messages', error);
    }
  };

  const sendMessage = async () => {
    try {
      const response = await axios.post('/api/messages', { sender, content });
      setMessages([...messages, response.data]);
      setSender('');
      setContent('');
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  return (
    <div>
      <h1>Messenger</h1>
      <div>
        {messages.map(message => (
          <div key={message._id}>
            <strong>{message.sender}:</strong> {message.content}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Your name"
          value={sender}
          onChange={e => setSender(e.target.value)}
        />
        <input
          type="text"
          placeholder="Your message"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default App;
