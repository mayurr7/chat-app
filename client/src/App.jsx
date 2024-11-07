import React,{lazy} from "react";
// lazy for code spliting
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
//import Home from "./pages/Home";  insted of this we import dynmicaly like a following

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"))
let user = true;

function App() {
  return (
    <BrowserRouter>
     
      <Routes>
        <Route  element={
        <ProtectRoute user={user} />}>
          <Route path="/" element={<Home/>} />
             <Route path="/chat" element={<Chat/>} />
             <Route path="/group" element={<Groups/>} />
        </Route>       
        <Route path="/login" 
        element={
         <ProtectRoute user={!user} redirect="/">
             <Login/>
         </ProtectRoute>
        }
        />

        {/* if error in page then this route */}
        <Route path="*" element ={ <PageNotFound/>} />
         
      </Routes>
    </BrowserRouter>
  );
}

export default App;
