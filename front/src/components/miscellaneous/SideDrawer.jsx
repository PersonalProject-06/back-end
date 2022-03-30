import {
  Box,
  Button,
  Tooltip,
  Text,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  Spinner
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { useState, useContext, useEffect } from "react";
import searchSvg from "../../../images/search.svg";
import { useToast } from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatContext } from "../../context/ChatProvider";
import axios from "axios";
import UserModal from "./UserModal";
import Loading from "./Loading";
import UserListItem from "../UserListItem/UserListItem";
const SideDrawer = () => {
  const toast = useToast();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(null);
  const {
    user: { name, pic, email, token },
    setSlectedChat,
    chats,
    setChats,
  } = useContext(ChatContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const logoutHanlder = () => {
    localStorage.removeItem("userInfo");
    window.location.reload();
  };

  const handleSearch = async () => {
    if (search === "") {
      toast({
        title: "Please Fill  the search fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const { data } = await axios.get(
        `${import.meta.env.VITE_APP_URL}/api/user/?search=${search}`,
        config
      );
      setLoading(false);
      setSearchResult(data);
      return;
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong try again!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });

      setLoading(false);
      return;
    }
  };
  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_URL}/api/chat/`,
        { userId },
        config
      );
      if (!chats.find((chat) => chat._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSlectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Something went wrong try again!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant={"ghost"} onClick={onOpen}>
            <img src={searchSvg} style={{ width: "20px" }} />
            <Text d={{ base: "none", md: "flex" }} px="4">
              Search Users
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize={"2xl"} fontFamily="Work sans">
          Freely-Talk
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize={"2xl"} m="1" />
            </MenuButton>
          </Menu>
          <Menu>
            {" "}
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar size={"sm"} cursor="pointer" name={name} src={pic} />
            </MenuButton>
            <MenuList>
              <UserModal name={name} pic={pic} email={email}>
                <MenuItem>My Profile</MenuItem>
              </UserModal>

              <MenuDivider />
              <MenuItem onClick={logoutHanlder}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={"1px"}>Search Users</DrawerHeader>
          <DrawerBody>
            <Box d="flex" pb="2">
              <Input
                placeholder="Search by name or email"
                mr="2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch} isLoading={loading}>
                <img src={searchSvg} style={{ width: "20px" }} />
              </Button>
            </Box>
            {loading ? (
              <Loading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleChat={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" d='flex'/>}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
