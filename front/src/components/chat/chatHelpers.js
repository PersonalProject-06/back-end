import axios from "axios";

export  const fetchData = async () => {
    const {data} = await axios.get("/chat/");
    return data 
  };