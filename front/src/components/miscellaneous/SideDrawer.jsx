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
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { useState, useContext } from "react";
import searchSvg from "../../../images/search.svg";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatContext } from "../../context/ChatProvider";
import UserModal from "./UserModal";
const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(null);
  const {
    user: { name, pic, email },
  } = useContext(ChatContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const logoutHanlder = () => {
    localStorage.removeItem("userInfo");
    window.location.reload();
  };
  const handleSearch = () => {};
  return (
    <>
      <Box
        d="flex"
        justifyContent={"space-between"}
        alignItems="center"
        bg={"white"}
        w="100%"
        p="5px 10px"
        borderWidth={"5px"}
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
              <Button onClick={handleSearch}>
                <img src={searchSvg} style={{ width: "20px" }} />
              </Button>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
