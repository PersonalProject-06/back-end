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

const SignUp = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    pic: "",
  });
  const handleChange = (val, name) =>
    setFormData((prevState) => {
      return { ...prevState, [name]: val };
    });
  console.log(formData);
  const inputData = [
    {
      name: "name",
      placeholder: "Name",
      handleChange: handleChange,
      type: "text",
    },
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
    {
      name: "confirmPassword",
      placeholder: "Confirm Password",
      handleChange: handleChange,
      type: "password",
    },
  ];
  const submitHandler = () => {};
  return (
    <VStack spacing={"5px"} color={"black"}>
      {inputData.map(({ name, placeholder, handleChange, type }, idx) => (
        <FormControl id="first-name" isRequired key={idx}>
          <FormLabel>{placeholder}</FormLabel>
          {name == "confirmPassword" || name == "password" ? (
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
      <FormControl id="pic">
        <FormLabel>{"Picture"}</FormLabel>
        <Input
          type={"file"}
          p={1.5}
          accept="image/*"
          name="pic"
          onChange={(e) => handleChange(e.target.files[0], e.target.name)}
        />
      </FormControl>
      <Button
        colorScheme={"blue"}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
