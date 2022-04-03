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
} from "@chakra-ui/react";
import { ChatContext } from "../../context/ChatProvider";
const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState("");
  const [slectedUsers, setSlectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSeachResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user, chats, setChats } = useContext(ChatContext);
  const handleSeach = async (e) => {};
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
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue"  onClick={onClose}>
              create groupe chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
