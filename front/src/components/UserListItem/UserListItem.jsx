import { Box, Text, Avatar } from "@chakra-ui/react";

const UserListItem = ({ handleChat, user }) => {
  const { name, pic, email } = user;

  return (
    <Box
      onClick={handleChat}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{ background: "#38B2AC", color: "#fff" }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius={"lg"}
    >
      <Avatar mr={2} size="sm" cursor={"pointer"} name={name} src={pic} />
      <Box>
        <Text>{name}</Text>
        <Text fontSize={"xs"}>
          <b>Email:</b>
          {email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
