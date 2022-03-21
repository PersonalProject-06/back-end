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

const Login = () => {
  const [show, setShow] = useState(false);
  const [LoginData, setLoginData] = useState({
    email: "",
    password: "",
  });
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
  console.log(LoginData);
  const submitHandler = () => {};
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
      >
        Sign Up
      </Button>
      <Button
        colorScheme={"red"}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={() =>
          setLoginData({
            email: "guest@example.com",
            password: "123456",
          })
        }
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
