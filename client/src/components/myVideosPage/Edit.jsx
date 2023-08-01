import React, { useContext, useEffect, useState } from "react";
import { updateVideo, deleteVideo } from "../../services/nodeApi";
import { options } from "../../constants";
import { useAuth } from "../../contextApi/appContext";
import { toast } from "react-toastify";
import { VideoContext } from "../../contextApi/VideoContextApi";

const Edit = ({ selectedVideo, handleSelectedVideo }) => {

  const { handleUpdatedList, fetchedUserVideos } = useContext(VideoContext)
  
  const [openDropdown, setOpenDropdown] = useState({});
  const [auth] = useAuth();
  const userId = auth.user._id;
  const video = selectedVideo || fetchedUserVideos[0];

  const successMessage = (message) => toast.success(message);
  const errorMessage = (message) => toast.error(message);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    visibility: "",
  });

  const [dropdownValues, setDropdownValues] = useState({
    Category: "",
    Visibility: "",
  });

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
  const handleDropdownSelection = (option, item) => {
    setDropdownValues((prevValues) => ({
      ...prevValues,
      [option]: item,
    }));
    setFormData((prevFormData) => ({
      ...prevFormData,
      [option.toLowerCase()]: item,
    }));
    toggleDropdown(option);
  };

  const getVideo = async (video) => {
    if (!video || !userId) {
      return <p className="text-center font-extrabold text-4xl">Please Upload videos to edit</p>
    }
    try {
      setFormData({
        title: video.title,
        description: video.description,
        category: video.category,
        visibility: video.visibility,
      });
      setDropdownValues({
        Category: video.category,
        Visibility: video.visibility,
      });
    } catch (err) {
      errorMessage(err.message);
    }
  };

  useEffect(() => {
    getVideo(video);
  }, [video, userId, selectedVideo, fetchedUserVideos.length]);

  const submitForm = async (e) => {
    e.preventDefault();
    const videoData = new FormData();
    videoData.append("title", formData.title);
    videoData.append("category", formData.category);
    videoData.append("description", formData.description);
    videoData.append("visibility", formData.visibility);
    try {
      const result = await updateVideo(userId, video._id, formData);
      successMessage(result);
      handleUpdatedList();
    } catch (error) {
      errorMessage(error.message);
    }
  };
  const handleDeleteButton = async () => {
    try {
      console.log('handle delte')
      const result = await deleteVideo(userId, video._id);
      handleUpdatedList();
      handleSelectedVideo(fetchedUserVideos[1]);
      successMessage(result);
    } catch (err) {
      errorMessage(err.message);
    }
  };
  

  return (
    <div className=" max-sm:w-full w-1/2 bg-[#0F121FF5]">
      {!video || !userId ? (
        <p className="text-center text-indigo-400 font-extrabold text-4xl">Please Upload Videos</p>
      ) : (
        <div>
          <div className=" min-w-full aspect-w-16 h-44">
            <video src={video.video} className="w-full h-full object-cover" />
          </div>
          <form
            action="#"
            method="POST"
            onSubmit={submitForm}
            encType="application/json"
          >
            <div className="md:flex justify-between p-2">
              <div
                style={{
                  maxWidth: "50%",
                  overflowWrap: "break-word",
                  wordWrap: "break-word",
                  wordBreak: "break-word",
                }}
              >
                <input
                  name="title"
                  type="text"
                  className=" text-xl font-bold bg-[#0F121FF5] text-white max-w-fit focus:outline-none"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-baseline">
                <div className="sm:ml-2 text-gray-200 text-xs mt-1">
                  {video.date}
                </div>
                <div className="ml-2 text-gray-200 text-xs px-1 py">
                  {video.duration} Mins
                </div>
                <div className="ml-2 text-gray-200 text-xs mt-1 mr-3 ">
                  {video.views} Views
                </div>
              </div>
            </div>
            <hr className=" mx-2 border-gray-700" />
            <div className=" py-1 px-2">
              <p className="text-white underline">Description:</p>
              <textarea
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className=" text-sm focus:outline-none bg-[#0F121FF5] min-w-full text-white h-10 placeholder:text-sm placeholder:text-gray-500"
                placeholder="Description"
              />
            </div>
            <hr className=" mx-2 border-gray-700" />
            <div className="md:flex justify-around py-1">
              {options.map((option) => (
                <div key={option.title}>
                  <p className="text-xs text-gray-500 pl-6">{option.title}</p>
                  <button
                    id="dropdownDefaultButton"
                    data-dropdown-toggle="dropdown"
                    className="text-white focus:outline-none font-medium rounded-lg text-sm px-4 pb-2.5 pt-1 text-center inline-flex items-center"
                    type="button"
                    onClick={() => toggleDropdown(option.title)}
                  >
                    {dropdownValues[option.title] || option.title}
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
                      className="z-50 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
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
                                handleDropdownSelection(option.title, item);
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
            <hr className=" mx-2 border-gray-700" />
            <div className=" mt-10 mb-3 h-fit md:flex justify-between">
              <button
                type="button"
                className=" mx-4 mt-6 hover:bg-red-800 text-white font-bold py-2 px-12 bg-red-500 rounded-[28px]"
                onClick={handleDeleteButton}
              >
                Delete
              </button>
              <button
                type="submit"
                className=" mt-6 mx-4 text-white font-bold py-2 px-12 bg-[#C4B4F8] hover:bg-violet-500 rounded-[28px]"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Edit;
