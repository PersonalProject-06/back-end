import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { ChatContext } from "../../context/ChatProvider";
import { Box } from "@chakra-ui/react";
const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState(null);
  const {
    user: { token },
    setSlectedChat,
    chats,
    setChats,
    slectedChat,
  } = useContext(ChatContext);
  const toast = useToast();
  const FetchAllCHats = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_URL}/api/chat`,
        config
      );
      setChats(data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to load the chat",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    FetchAllCHats();
  }, []);
  return (
    <Box
      d={{ base: slectedChat ? "none" : "flex", md: "flex" }}
      flexDir="cloumn"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth={"1px"}
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="work-sans"
        d="flex"
        w="100%"
        justifyContent={"space-between"}
        alignItems="center"
      >mzsa</Box>
    </Box>
  );
};

export default MyChats;
