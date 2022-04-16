import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatProvider";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import UserModal from "../miscellaneous/UserModal";
import UpdatedGroupChatModal from '../miscellaneous/UpdatedGroupChatModal';
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, setSlectedChat, slectedChat } = useContext(ChatContext);
  const getSender = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
  }
  const getSenderFullObject = (loggedUser, users) => {
      console.log(users[0]._id === loggedUser._id ? users[1] : users[0]);
    return users[0]._id === loggedUser._id ? users[1] : users[0];
  }
  return (
    <>
      {slectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily={"Work Sans"}
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              d={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSlectedChat(null)}
            />
            {!slectedChat?.isGroupChat ? (
              <>
              {getSender(user, slectedChat.users)}
              <UserModal user={getSenderFullObject(user, slectedChat.users)}/>
              </>
            ) : (
              <>{slectedChat?.chatName?.toUpperCase()}
            
                <UpdatedGroupChatModal
                  fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
                />
            
              </>
            )}
          </Text>
          <Box 
          d="flex"
          flexDir={"column"}
          justifyContent="flex-end"
          p={3}
          bg="#E8E8E8"
          w="100%"
          h={"100%"}
          borderRadius="lg"
          overflowY={"hidden"}
          >
               
          </Box>
        </>
      ) : (
        <>
          <Box
            d="flex"
            alignItems={"center"}
            justifyContent={"center"}
            h="100%"
          >
            <Text fontSize={"3xl"} pb={3} fontFamily={"Work sans"}>
              Click on a user to start chat{" "}
            </Text>
          </Box>
        </>
      )}
    </>
  );
};

export default SingleChat;
