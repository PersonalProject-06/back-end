import React, { useState, useContext } from "react";

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Button,
  Text,
  useToast,
  FormControl,
  Input,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { ChatContext } from "../../context/ChatProvider";
import UserListItem from "../UserListItem/UserListItem";
import UserBadgeItem from "../UserListItem/UserBadgeItem";
const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState(null);
  const [slectedUsers, setSlectedUsers] = useState([]);
  const [search, setSearch] = useState();
  const [searchResult, setSeachResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const {
    user: { token },
    chats,
    setChats,
  } = useContext(ChatContext);
  const handleSeach = async (query) => {
    setSearch(query);
    if (!query) return;
    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await axios.get(`/api/user?search=${query}`, config);

      setLoading(false);
      setSeachResult(data);
    } catch (error) {
      toast({
        title: "Failed to load the chat",
        description: "Failed to load the search result",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return setLoading(false);
    }
  };
  const handleGroup = (user) => {
    if (slectedUsers.includes(user)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }

    setSlectedUsers((slectedUsers) => [...slectedUsers, user]);
  };
  const handleDelete = (userId) => {
    setSlectedUsers((slectedUsers) =>
      slectedUsers.filter((u) => u._id !== userId)
    );
  };
  const HnadleSubmit = async () => {
    if (!groupChatName || !slectedUsers) {
      toast({
        title: "Please fill the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await axios.post(
        "/api/chat/group",
        {
          name: groupChatName,
          users: JSON.stringify(slectedUsers.map(({ _id }) => _id)),
        },
        config
      );
     
      setChats([data, ...chats]);
      onClose();
      setLoading(false);
      toast({
        title: "Group chat created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    } catch (error) {
      toast({
        title: "Failed to create the group chat",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"35px"}
            fontFamily={"Work sans"}
            d="flex"
            justifyContent={"center"}
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" flexDir={"column"} alignItems={"center"}>
            <FormControl>
              <Input
                placeholder="Group Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users eg: achref, tarek, firas"
                mb={3}
                onChange={(e) => handleSeach(e.target.value)}
              />
            </FormControl>
            <Box width={"100%"} d="flex" flexWrap={"wrap"}>
              {slectedUsers?.map(({ name, _id }) => (
                <UserBadgeItem
                  key={_id}
                  user={name}
                  handleFunction={() => handleDelete(_id)}
                />
              ))}
            </Box>

            {loading ? (
              <div></div>
            ) : (
              searchResult
                ?.slice(0, 4)
                ?.map((user, idx) => (
                  <UserListItem
                    key={idx}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              onClick={HnadleSubmit}
              isLoading={loading}
            >
              create groupe chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
