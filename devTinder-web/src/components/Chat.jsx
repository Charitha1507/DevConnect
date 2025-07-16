import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    console.log(chat.data.messages);

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
      };
    });
    setMessages(chatMessages);
  };
  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log(firstName + " :  " + text);
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-base-300 rounded-lg shadow-lg m-5 h-[70vh] flex flex-col border border-base-200">
      <div className="flex items-center justify-between px-6 py-4 border-b border-base-200 bg-base-200 rounded-t-lg">
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg text-primary">Chat</span>
        </div>
        <span className="text-xs text-base-content opacity-70">{user?.firstName}</span>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2" style={{background: 'linear-gradient(135deg, #e0e7ff 0%, #f3f4f6 100%)'}}>
        {messages.map((msg, index) => {
          const isMe = user.firstName === msg.firstName;
          return (
            <div key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}> 
              <div className={`max-w-xs flex flex-col items-${isMe ? 'end' : 'start'}`}>
                <div className="flex items-center gap-2 mb-1 px-2 py-1 rounded-lg" style={{ background: isMe ? '#e0e7ff' : '#f3f4f6' }}>
                  <span className=" text-gray-800 ">{msg.firstName} {msg.lastName}</span>
                  <time className="text-xs text-gray-600 font-medium">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time>
                </div>
                <div className={`w-full ${isMe ? 'flex justify-end' : 'flex justify-start'}`}>
                  <span className={`text-base break-words ${isMe ? 'bg-primary text-white' : 'bg-base-100 text-base-content'} rounded-2xl px-4 py-2 shadow-md inline-block`}>{msg.text}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-4 border-t border-base-200 bg-base-200 rounded-b-lg flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-base-300 text-base-content rounded-lg p-2 bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="btn btn-primary px-6">
          Send
        </button>
      </div>
    </div>
  );
};
export default Chat;