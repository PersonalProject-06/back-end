import { Box, Button, Tooltip, Text } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import searchSvg from "../../../images/search.svg";
const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(null);

  return (
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
        <Button variant={"ghost"}>
          <img src={searchSvg} style={{ width: "20px" }} />
          <Text d={{ base: "none", md: "flex" }} px="4">Search User</Text>
        </Button>
      </Tooltip>
    </Box>
  );
};

export default SideDrawer;
