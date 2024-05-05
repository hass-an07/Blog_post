import { React, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
// import Editor from "react-simple-wysiwyg";
import Loadingspinner from "./loadingspinner";
import dummyImage from "../assets/600x400.png";

import { UpdateBlog } from "../features/Edit_delete";
import { SingleBlog } from "../features/create_post";
// import { SingleBlog } from "../features/create_post";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editData, setEditData] = useState({});

  const { singleBlog, loading, error } = useSelector((state) => state.blogs);

  // set data 
  useEffect(() => {
    setEditData(singleBlog);
  }, [singleBlog]);

  //   dispath action for fetch data using id
  useEffect(() => {
    dispatch(SingleBlog(id));
  }, [dispatch, id]);

  const getData = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // show image
  const showImage = (image) => {
    return image ? `http://127.0.0.1:8000/uploads/temp/${image}` : dummyImage;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(UpdateBlog(editData));
    navigate('/')
  };

  if (loading) {
    return <Loadingspinner />;
  }

  if (error) {
    return <h1>Error in fetching data</h1>;
  }

  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-between pt-6">
          <h4 className="font-bold">Edit Blogs</h4>
          <Link to="/" className="btn bg-black text-white px-2 py-1 rounded">
            Back
          </Link>
        </div>
        <div className="card shadow-xl">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="Title"
                name="title"
                value={editData.title || ""}
                onChange={getData}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="short_desc"
              >
                Short Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="short_desc"
                cols={10}
                rows={8}
                name="short_desc"
                placeholder="short_desc"
                value={editData.short_desc || ""}
                onChange={getData}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                cols={10}
                rows={8}
                name="description"
                placeholder="description"
                value={editData.description || ""}
                onChange={getData}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="image"
              >
                Image
              </label>
              <input className="" id="image" type="file" />
              <img src={showImage(editData.image)} alt="" className="w-36 h-36" />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="author"
              >
                Author
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="author"
                name="author"
                value={editData.author || ""}
                onChange={getData}
              />
            </div>
            <button className="bg-black text-white rounded px-2 py-1">
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
