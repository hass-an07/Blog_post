import React from "react";
import Blogcard from "./components/Blogcard";
import { Route, Routes } from "react-router-dom";
import Blogs from "./components/Blogs";
import CreateBlog from "./components/CreateBlog";
import Blogdetail from "./components/Blogdetail";
import Edit from "./components/Edit";

const App = () => {
  return (
    <>
      <div className="bg-black">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold text-white  py-3 shadow-xl">
            React & Laravel Blog App
          </h1>
          </div>
        </div>

      <Routes>
        <Route path="/" element={<Blogs/>}/>
        <Route path="/create" element={<CreateBlog/>}/>
        <Route path="/detail/:id" element={<Blogdetail/>}/>
        <Route path="/edit/:id" element={<Edit/>}/>
      </Routes>
      
    </>
  );
};

export default App;
