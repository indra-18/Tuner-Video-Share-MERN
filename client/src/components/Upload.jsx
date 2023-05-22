import React, { useCallback, useState } from "react";
import { useDropzone } from 'react-dropzone'
import { toast } from "react-toastify";

import { options } from "../constants/index";
import { postVideo } from "../services/nodeApi";
import { useAuth } from "../contextApi/appContext";
import close from "../assets/close.svg";

const Upload = () => {
  const [openDropdown, setOpenDropdown] = useState({});
  const [auth,useAuth] = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    video: null,
    description: "",
    category: "",
    visibility: "",
    duration: 10,
    views: 200,
  });

  const successMessage = (message) => toast.success(message)
  const errorMessage = (message) => toast.error(message)
  
  const [preview, setPreview] = useState(null);
  const [show, setShow] = useState(true);

  const handleInputChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleDropdown = (title) => {
    setOpenDropdown((prevState) => ({
      ...prevState,
      [title]: !prevState[title],
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      video: null,
      description: "",
      category: "",
      visibility: "",
      duration: 10,
      views: 200,
    });
    setPreview(null);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const userId = "";
    const videoData = new FormData();
    videoData.append("title", formData.name);
    videoData.append("video", formData.video);
    videoData.append("category", formData.category);
    videoData.append("description", formData.description);
    videoData.append("duration", formData.duration);
    videoData.append("views", formData.views);
    videoData.append("visibility", formData.visibility);
    
    try {
      const response = await postVideo(userId, videoData);
      successMessage("Video Saved Successfully")
      resetForm()
    } catch (error) {
      errorMessage(error.message)
    }
  };

  const reader = new FileReader();
  const onDrop = useCallback(acceptedFiles => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      video: acceptedFiles[0] || null,
    }));
    if (acceptedFiles) {
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(acceptedFiles[0]);
    } else {
      setPreview(null);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <>
      {show && (
        <form action="#" method="POST" onSubmit={submitForm} encType="multipart/form-data">
          <div className="flex justify-center">
            <div className="bg-[#000000] flex-1 rounded-[10px] max-w-2xl px-6 py-2 box-border">
              <div className="flex justify-between">
                <h2 className="mb-2 text-md font-semibold text-white">
                  Upload New Video
                </h2>
                <div>
                  <img
                    src={close}
                    alt="close icon"
                    className="hover:bg-red-600"
                    onClick={() => setShow((prev) => !prev)}
                  />
                </div>
              </div>
              <div
                {...getRootProps()}
                className="min-h-[150px] flex flex-col justify-center items-center w-full mx-auto text-center bg-[#4B4B5F] border-2 border-[#707070] cursor-pointer rounded-[10px]"
              >
                {preview ? (
                  <div className="relative w-full aspect-w-16 aspect-h-9">
                    <video
                      src={preview}
                      alt="VideoPreview"
                      className=" w-full h-full object-contain rounded"
                    />
                  </div>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <h2 className="text-md font-semibold tracking-wide text-[#FFFFFF] t-4">
                      Drag and drop to upload
                    </h2>
                    <p className="mt-2 tracking-wide text-gray-300">
                      or browse to choose a file
                    </p>
                  </>
                )}
                <input
                  {...getInputProps()}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  name="video"
                  onChange={(e) => {
                    const selectedFile = e.target.files && e.target.files[0];
                    if (!selectedFile && formData.video) {
                      return;
                    }
                    setFormData((prevFormData) => ({
                      ...prevFormData,
                      video: selectedFile || null,
                    }));

                    if (file) {
                      reader.onload = () => {
                        setPreview(reader.result);
                      };
                      reader.readAsDataURL(file);
                    } else {
                      setPreview(null);
                    }
                  }}
                />
              </div>
              <div className="flex justify-start text-center my-2">
                <h2 className="text-lg font-bold text-white">Name</h2>
                <input
                  name="name"
                  type="text"
                  className="bg-black text-white ml-3 w-4/5 focus:outline-none"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <hr className="bg-500" />
              <textarea
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="focus:outline-none bg-black min-w-full text-white h-16 placeholder:text-sm placeholder:text-gray-500"
                placeholder="Description"
              />
              <hr className="text-[#707070]" />
              <div className="flex justify-around py-3">
                {options.map((option) => (
                  <div key={option.title}>
                    <button
                      id="dropdownDefaultButton"
                      data-dropdown-toggle="dropdown"
                      className="text-white focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center"
                      type="button"
                      onClick={() => toggleDropdown(option.title)}
                    >
                      {option.title}
                      <svg
                        className="w-4 h-4 ml-2"
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>
                    {openDropdown[option.title] && option.list && (
                      <div
                        id="dropdown"
                        className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                      >
                        <ul
                          className="py-2 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdownDefaultButton"
                        >
                          {option.list.map((item) => (
                            <li key={item}>
                              <p
                                className="block px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => {
                                  setFormData((prevFormData) =>
                                    option.title === "Category"
                                      ? { ...prevFormData, category: item }
                                      : { ...prevFormData, visibility: item }
                                  );
                                  toggleDropdown(option.title)
                                }}
                              >
                                {item}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <hr className="text-gray-600 bg-transparent" />
              <div className="flex justify-center mt-3">
                <button
                  type="submit"
                  className="text-white font-bold py-3 px-20 bg-[#C4B4F8] rounded-[28px]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default Upload;
