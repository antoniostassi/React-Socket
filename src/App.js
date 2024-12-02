import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
const socket = io.connect("http://localhost:3001");

function App() {
    const [message, setMessage] = useState('');
    const [messageReceived, setMessageReceived] = useState('');
    const sendMessage = () => {
        socket.emit("send_message",  message);
    };

    useEffect(() => {
        socket.on("received_message", (data) => {
            setMessageReceived(data);
        });
    }, [socket]);

    return (
        <div className="App">
            <input
                placeholder="Write a message..."
                onChange={(event) => {
                    setMessage(event.target.value);
                }}
            />
            <button onClick={sendMessage}>Send</button>
            <h1> Message </h1>
            {messageReceived}
        </div>
    );
}

export default App;
