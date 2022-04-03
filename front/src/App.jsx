import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, ChatPage } from "./components";
import "../src/css/app.css";

function App() {
  
  return (
    <div className="App" >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
