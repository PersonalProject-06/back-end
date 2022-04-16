import React, { useContext, useState } from "react";
import {
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Button,
  useToast,
  Box,
  FormControl,
  Input,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import UserBadgeItem from "../UserListItem/UserBadgeItem";
import { ChatContext } from "../../context/ChatProvider";
import { ViewIcon } from "@chakra-ui/icons";
import UserListItem from "../UserListItem/UserListItem";
const UpdatedGroupChatModal = ({ fetchAgain, setFetchAgain }) => {
  const [GroupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const { user, setSlectedChat, slectedChat } = useContext(ChatContext);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleRemove = async (userObject) => {
    if (
      slectedChat.groupAdmin._id !== user._id &&
      userObject._id !== user._id
    ) {
      return toast({
        title: "Only admin can remove this user",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
    }

    try {
      setLoading(true);
     

   
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.post(
        "/api/chat/deletegroup",
        {
          chatId: slectedChat._id,
          userId: userObject._id,
        },
        config
      );
      userObject._id === user._id ? setSlectedChat() : setSlectedChat(data);
      setLoading(false);
      setFetchAgain(!fetchAgain);
      console.log(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
      return toast({
        title: "Error",
        status: "somthing went wrong",
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  const handleAddUser = async (userObject) => {
    if (slectedChat.users.find((user) => user.id === userObject.id)) {
      toast({
        title: "User already in group chat",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (slectedChat.groupAdmin._id !== user.id) {
      toast({
        title: "You are not group admin",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.post(
        "/api/chat/addgroup",
        {
          chatId: slectedChat._id,
          userId: userObject._id,
        },
        config
      );
      setLoading(false);
      setSlectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  const handleSeach = async (query) => {
    setSearch(query);
    if (!query) return;
    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };
      const { data } = await axios.get(`/api/user?search=${query}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Failed to load the chat",
        description: "Failed to load the search result",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return setLoading(false);
    }
  };
  const handleRename = async () => {
    if (!GroupChatName) return;
    try {
      setRenameLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const { data } = await axios.put(
        "/api/chat/renamegroup",
        {
          chatName: GroupChatName,
          chatId: slectedChat._id,
        },
        config
      );

      setRenameLoading(false);
      setSlectedChat(data);
      setFetchAgain(!fetchAgain);

      return setGroupChatName("");
    } catch (error) {
      setRenameLoading(false);
      console.log(error);
      return toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  return (
    <>
      <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"35px"}
            fontFamily={"Work sans"}
            d="flex"
            justifyContent={"center"}
          >
            {slectedChat?.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w={"100%"} d="flex" flexWrap={"wrap"} pb={3}>
              {slectedChat?.users?.map((user, index) => (
                <UserBadgeItem
                  key={index ** index}
                  user={user}
                  handleFunction={() => handleRemove(user)}
                />
              ))}
            </Box>
            <FormControl d="flex">
              <Input
                placeholder="Chat name"
                mb={3}
                value={GroupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant={"solid"}
                colorScheme="teal"
                ml="1"
                isLoading={renameLoading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="add user to group"
                mb={1}
                onChange={(e) => handleSeach(e.target.value)}
              />
            </FormControl>
            {loading ? (
              <Spinner size={"lg"} />
            ) : (
              searchResult?.map((user, index) => (
                <UserListItem
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => handleRemove(user)}>
              Leave the Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdatedGroupChatModal;
