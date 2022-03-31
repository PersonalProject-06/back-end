import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigateTo = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [LoginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const toast = useToast();
  const handleChange = (val, name) =>
    setLoginData((prevState) => {
      return { ...prevState, [name]: val };
    });
  const inputData = [
    {
      name: "email",
      placeholder: "Email",
      handleChange: handleChange,
      type: "text",
    },
    {
      name: "password",
      placeholder: "Password",
      handleChange: handleChange,
      type: "password",
    },
  ];

  const submitHandler = async () => {
    setLoading(true);
    if (LoginData.email.length == 0 && LoginData.password.length == 0) {
      toast({
        title: "Please Fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        "Content-type": "application/json",
      };
      const { email, password } = LoginData;

      const { data } = await axios.post(
        `/api/user/login/`,
        { email, password },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast({
        title: "Login Successful ",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      navigateTo("/chat");
    } catch (error) {
      toast({
        title: "An Error Occured ",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  return (
    <VStack spacing={"5px"} color={"black"}>
      {inputData.map(({ name, placeholder, handleChange, type }, idx) => (
        <FormControl id="first-name" isRequired key={idx + name}>
          <FormLabel>{placeholder}</FormLabel>
          {name == "password" ? (
            <InputGroup>
              <Input
                type={show ? "text" : type}
                placeholder={placeholder}
                name={name}
                onChange={(e) => handleChange(e.target.value, e.target.name)}
              />
              <InputRightElement width={"4.5rem"}>
                <Button
                  h={"1.75rem"}
                  size={"sm"}
                  onClick={() => setShow(!show)}
                >
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          ) : (
            <Input
              placeholder={placeholder}
              name={name}
              onChange={(e) => handleChange(e.target.value, e.target.name)}
              type={type}
            />
          )}
        </FormControl>
      ))}

      <Button
        colorScheme={"blue"}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
