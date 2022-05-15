import { useToast } from "@chakra-ui/react";
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
import axios from "axios";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();

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
  const toast = useToast();
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
  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chatApp");
      data.append("cloud_name", "daseuavqf");
      fetch("https://api.cloudinary.com/v1_1/daseuavqf/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setFormData((prevState) => {
            return { ...prevState, pic: data.url.toString() };
          });
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!.",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
  };
  const submitHandler = async () => {
    setLoading(true);
    if (
      formData.email.length == 0 &&
      formData.name.length == 0 &&
      formData.password.length == 0 &&
      formData.confirmPassword.length == 0
    ) {
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
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password do not match",
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
      const { name, email, password, pic } = formData;

      const { data } = await axios.post(
        `/api/user/`,
        { name, email, password, pic },
        config
      );

      toast({
        title: "Registration Successful ",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
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
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme={"blue"}
        width="100%"
        style={{ marginTop: 15 }}
        onClick={() => submitHandler()}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
