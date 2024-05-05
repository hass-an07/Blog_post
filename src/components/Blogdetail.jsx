import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ReadBlog, SingleBlog } from "../features/create_post";
import Loadingspinner from "./loadingspinner";
import dummyImage from '../assets/600x400.png'

const Blogdetail = () => {
  const { id } = useParams();
  const {singleBlog, loading, error } = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  //   dispath action for fetch data using id
  useEffect(() => {
    dispatch(SingleBlog(id));
  }, [dispatch, id]);


  const showImage = (image) => {
    return image ? `http://127.0.0.1:8000/uploads/temp/${image}` : dummyImage;
  };
  if (loading) {
    return <Loadingspinner />;
  }

  if (error) {
    return (
      <h1 className="py-5 text-center text-3xl">
        Here is error in fetching data...
      </h1>
    );
  }

  return (
    <>
      {singleBlog && (
        <div className="blog">
          <div className="container mx-auto">
            <div className="container mx-auto"></div>
            <div className="flex justify-between pt-6 my-3">
              <h4 className="font-bold text-3xl">{singleBlog.title}</h4>
              <Link
                to="/"
                className="btn bg-black text-white px-2 py-1 rounded"
              >
                Back
              </Link>
            </div>
            {/* render data  */}
            <div className="content-section">
              <h1>
                <span className="font-bold">BY</span> {singleBlog.author}
              </h1>
              <div className="image flex justify-center">
              <img src={showImage(singleBlog.image)} className="w-[800px] h-[400px] my-2 " alt="" />

              </div>
              <p>{singleBlog.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Blogdetail;
