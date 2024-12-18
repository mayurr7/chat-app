import React, { lazy, Suspense } from "react";
// lazy for code spliting
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import Loaders from "./components/layout/Loaders";


//import Home from "./pages/Home";  insted of this we import dynmicaly like a following

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const DashBoard = lazy(() => import("./pages/admin/DashBoard"));

let user = true;

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loaders />}>
        <Routes>
          <Route element={<ProtectRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
          </Route>
          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />

          <Route path="/admin" element={<AdminLogin/>} />
          <Route path="/admin/dashboard" element={<DashBoard/>} />

          {/* if error in page then this route */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
