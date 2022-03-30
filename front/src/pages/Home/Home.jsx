import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { SignUp, Login } from "../../components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Home = () => {
  const navigateTo = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if(userInfo){
      navigateTo("/chat");
    }
  }, []);
  return (
    <Container maxW={"xl"} centerContent style={{color:"grey"}}>
      <Box
        d="flex"
        justifyContent={"center"}
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius={"lg"}
        borderWidth="1px"
      >
        <Text fontSize={"4xl"} fontFamily={"work sans"}>
          Messanger
        </Text>
      </Box>
      <Box
        bg={"white"}
        w={"100%"}
        p={4}
        borderRadius={"lg"}
        borderWidth={"1px"}
        color={"black"}
      >
        <Tabs variant="soft-rounded">
          <TabList mb={"1em"}>
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
