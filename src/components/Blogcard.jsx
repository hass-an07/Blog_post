import React, { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { ReadBlog } from "../features/create_post";
import dummyImage from "../assets/600x400.png";
import Loadingspinner from "./loadingspinner";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { deleteBlog } from "../features/Edit_delete";

const Blogcard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { blog, loading, error, searchData } = useSelector(
    (state) => state.blogs
  );

  // show image
  const showImage = (image) => {
    return image ? `http://127.0.0.1:8000/uploads/temp/${image}` : dummyImage;
  };

  // console.log(blog)
  useEffect(() => {
    dispatch(ReadBlog());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteBlog(id))
      .then(() => window.location ="/") // Navigate only after successful delete
      .catch((error) => console.error("Error deleting blog:", error));
  };
  if (loading) {
    return <Loadingspinner />;
  }

  if (error) {
    return <div>Error occurred while fetching data</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-2 mx-auto">
      {blog
        .filter((ele) => {
          if (searchData.length === 0) {
            return ele;
          } else {
            return ele.title.toLowerCase().includes(searchData.toLowerCase());
          }
        })

        .map((item) => (
          <div
            key={item.id}
            className="card sm:max-w-[350px] max-w-full my-3 shadow-xl rounded-lg"
          >
            <img
              src={showImage(item.image)}
              alt=""
              className="h-[250px] w-full"
            />
            <div className="m-3">
              <h4 className="text-2xl font-semibold">{item.title}</h4>
              <p>{item.short_desc}</p>
            </div>
            <div className="flex justify-between items-center p-2">
              <Link
                to={`/detail/${item.id}`}
                className="btn bg-black px-2 py-2 rounded text-white"
              >
                Details
              </Link>
              <div className="icons flex gap-2 text-xl">
                <MdDelete
                  className="cursor-pointer"
                  onClick={() => handleDelete(item.id)}
                />
                <Link to={`/edit/${item.id}`}>
                  <FaPencil />
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Blogcard;
