import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatProvider";
import { Box, useColorMode } from "@chakra-ui/react";
import SingleChat from '../SingleChat/SingleChat';

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { colorMode } = useColorMode();
  const { slectedChat } = useContext(ChatContext);

  return (
    <Box
      d={{ base: slectedChat ? "flex" : "none", md: "flex" }}
      flexDir={"column"}
      alignItems="center"
      p={3}
      bg={colorMode === "light" ? "white" : "gray.800"}
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth={"1px"}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
