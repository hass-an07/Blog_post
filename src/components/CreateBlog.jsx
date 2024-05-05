import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Editor from "react-simple-wysiwyg";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../features/create_post";

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    short_desc: "",
    description: "",
    author: "",
    image: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();


  //

  const getData = (e) => {
    if (e.target.type === "file") {
      const images = e.target.files[0];
      const newFormData = new FormData();
      newFormData.append("image", images);

      setFormData((prevFormData) => ({
        ...prevFormData,
        image: newFormData.get("image"), // Update only the image field
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [e.target.name]: e.target.value, // Merge the existing form data with the new data
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dispatch action to create blog post
    // console.log(formData);
    dispatch(createBlog(formData));

    // Reset form data
    setFormData({
      title: "",
      short_desc: "",
      description: "",
      author: "",
    });

    // Navigate to home page if needed
    navigate("/");
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between pt-6">
        <h4 className="font-bold">Create Blogs</h4>
        <Link to="/" className="btn bg-black text-white px-2 py-1 rounded">
          Back
        </Link>
      </div>
      <div className="card shadow-xl">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
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
              required
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
              placeholder="Short Description"
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
              placeholder="Description"
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
            <input id="image" type="file" name="image" onChange={getData} />
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
              id="author"
              type="text"
              placeholder="Author"
              name="author"
              required
              onChange={getData}
            />
          </div>
          <button className="bg-black text-white rounded px-2 py-1">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
