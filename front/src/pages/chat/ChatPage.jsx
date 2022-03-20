import React, { useEffect ,useState } from "react";
import { fetchData } from "./chatHelpers";
const ChatPage = () => {
    const [chatData,setChatData] =useState([]) 
  useEffect(() => {
    fetchData().then(data=>{
        setChatData(data)
    })
    }, []);
    
  console.log(chatData)
  return <div>ChatPage</div>;
};

export default ChatPage;
