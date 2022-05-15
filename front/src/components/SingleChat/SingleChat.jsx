import React, { useContext, useState, useEffect } from "react";
import { ChatContext } from "../../context/ChatProvider";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import UserModal from "../miscellaneous/UserModal";
import axios from "axios";
import UpdatedGroupChatModal from "../miscellaneous/UpdatedGroupChatModal";
import ScrollableChat from "../miscellaneous/ScrollableChat";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:5000";
let socket, selectedChatCompare;
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected,setSocketConnected] = useState(false)
  const toast = useToast();
  const { user, setSlectedChat, slectedChat } = useContext(ChatContext);
  const getSender = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
  };
  const getSenderFullObject = (loggedUser, users) => {
    return users[0]._id === loggedUser._id ? users[1] : users[0];
  };
  const fetchMessages = async () => {
    if (!slectedChat) return;
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/message/${slectedChat._id}`,
        config
      );

      setMessages(data);
      setLoading(false);
      socket.emit("join chat",slectedChat._id)
    } catch (error) {
      setLoading(false);
      toast({
        title: "Something went wrong try again!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (e) => {
    if (e.key === "Enter") {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: slectedChat._id,
          },
          config
        );
        console.log(data);

        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Something went wrong try again!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };
  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit("setup",user)
    socket.on("connection",(data)=>{
      console.log(data);
      setSocketConnected(true)
    })

  }, []);
  useEffect(() => {
    fetchMessages();
  }, [slectedChat]);
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
                <UserModal
                  user={getSenderFullObject(user, slectedChat.users)}
                />
              </>
            ) : (
              <>
                {slectedChat?.chatName?.toUpperCase()}

                <UpdatedGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
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
            {loading ? (
              <Spinner
                size={"xl"}
                w={20}
                h={20}
                alignSelf="center"
                margin={"auto"}
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              <Input
                variant={"filled"}
                bg="#E0E0E0"
                placeholder="Type a message"
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
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
