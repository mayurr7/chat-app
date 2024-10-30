import React,{lazy} from "react";
// lazy for code spliting
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
//import Home from "./pages/Home";  insted of this we import dynmicaly like a following

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
function App() {
  return (
    <BrowserRouter>
     
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/chat/:chatId" element={<Chat/>} />
        <Route path="/group" element={<Groups/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
