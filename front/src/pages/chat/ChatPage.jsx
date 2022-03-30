import React, { useEffect, useState, useContext } from "react";

import { ChatContext } from "../../context/ChatProvider.jsx";
import { Box } from "@chakra-ui/react";
import { SideDrawer, MyChats, ChatBox } from "../../components/index.js";
const ChatPage = () => {
  const { user } = useContext(ChatContext);
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        d="flex"
        justifyContent={"space-between"}
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default ChatPage;
