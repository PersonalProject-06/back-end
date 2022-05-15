import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const navigateTo = useNavigate();
  const [user, setUser] = useState(null);
  const [slectedChat, setSlectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const userInfo = localStorage?.getItem("userInfo");
    if (!userInfo) {
      navigateTo("/");
    } else {
      setUser(JSON.parse(userInfo));
      navigateTo("/chat");
    }
  }, [navigateTo]);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        setSlectedChat,
        slectedChat,
        chats,
        setChats,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
