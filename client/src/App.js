import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import NewNavbar from "./components/views/NavBar/NewNavbar";
import PostPage from "./components/views/PostPage/PostPage";
import VideoDetail from "./components/views/VideoDetail/VideoDetail";
import SubscribedPage from "./components/views/SubscribedPage/SubscribedPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <NewNavbar />
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path="/post" element={<PostPage />} />
          <Route exact path="/video/:videoId" element={<VideoDetail />} />
          <Route exact path="/subscribed" element={<SubscribedPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
