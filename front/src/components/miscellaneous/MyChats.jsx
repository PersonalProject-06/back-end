import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Button, Stack, useToast } from "@chakra-ui/react";
import { ChatContext } from "../../context/ChatProvider";
import { Box, Text, useColorMode } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import Loading from "./Loading";
import GroupChatModal from "./GroupChatModal";
const MyChats = ({fetchAgain}) => {
  const { colorMode } = useColorMode();
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
        `/api/chat/`,
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
  }, [fetchAgain]);
  const getSender = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
  };
  return (
    <Box
      d={{ base: slectedChat ? "none" : "flex", md: "flex" }}
      flexDir={"column"}
      alignItems="center"
      p={3}
      bg={colorMode === "light" ? "white" : "gray.800"}
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
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>

     
        <Button
          d="flex"
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          rightIcon={<AddIcon />}
        >
          New Group Chat
        </Button>
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir={"column"}
        p={3}
        bg={colorMode === "light" ? "white" : "gray.800"}
        w="100%"
        h="100%"
        borderRadius={"lg"}
        overflow="hidden"
      >
        {chats.length ? (
          <Stack overflowX={"auto"}>
            {chats.map((chat) => (
              <Box
                onClick={() => setSlectedChat(chat)}
                cursor="pointer"
                bg={slectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={slectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius={"lg"}
                key={chat._id}
              >
                <Text>
                  {!chat?.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat?.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <Loading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
