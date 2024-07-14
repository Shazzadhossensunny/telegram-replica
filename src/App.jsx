import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbPhone } from "react-icons/tb";
import { CiSearch, CiBookmark, CiUser, CiSettings } from "react-icons/ci";
import {
  MdMicNone,
  MdOutlinePlayCircleOutline,
  MdOutlineModeEdit,
} from "react-icons/md";
import { RiAttachment2 } from "react-icons/ri";
import { FaRegSmile } from "react-icons/fa";
import { IoMdSend, IoIosCheckboxOutline } from "react-icons/io";
import { FaBars, FaArrowLeft } from "react-icons/fa";
import { IoMoonOutline, IoVideocamOutline } from "react-icons/io5";
import { BiVolumeMute } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";

function App() {
  const [chatInfo, setChatInfo] = useState({ data: [] });
  const [selectedItem, setSelectedItem] = useState(null);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );
  const [isMobileView, setIsMobileView] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  useEffect(() => {
    fetch("https://devapi.beyondchats.com/api/get_chat_messages?chat_id=3888")
      .then((res) => res.json())
      .then((data) => setChatInfo(data));
  }, []);

  const handleToggle = (e) => {
    const newTheme = e.target.checked ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleSidebarToggle = (isOpen) => {
    setIsRightSidebarOpen(isOpen);
  };

  const handleMobileViewToggle = () => {
    setIsMobileView(!isMobileView);
  };

  const handleClick = (id) => {
    const findItem = chatInfo.data.find((item) => item.id === id);
    setSelectedItem(findItem);
    setIsMobileView(false); // Hide left sidebar on mobile view
  };

  const formatDate = (dateTime) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateTime).toLocaleDateString(undefined, options);
  };

  return (
    <div className={`flex ${theme === "dark" ? "dark" : ""}`}>
      {/* Left side */}
      <div
        className={`w-full md:w-1/3 bg-white dark:bg-gray-800 h-screen px-6 py-2 overflow-y-auto ${
          isMobileView ? "" : "hidden md:block"
        }`}
      >
        <div className="flex gap-3 items-center ">
          {/* Drawer */}
          <div>
            <div className="drawer z-50">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer">
                  <FaBars className="text-2xl cursor-pointer" />
                </label>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                  {/* Sidebar content here */}
                  <li>
                    <a className="font-semibold">
                      <CiBookmark className="text-lg" /> Saved Message
                    </a>
                  </li>
                  <li>
                    <a className="font-semibold">
                      <CiUser className="text-lg" /> Contacts
                    </a>
                  </li>
                  <li>
                    <a className="font-semibold">
                      <MdOutlinePlayCircleOutline className="text-lg" /> My
                      Stories
                    </a>
                  </li>
                  <li>
                    <a className="font-semibold">
                      <CiSettings className="text-lg" /> Settings
                    </a>
                  </li>
                  <li>
                    <a className="font-semibold">
                      <IoMoonOutline className="text-lg" /> Night Mode
                      <input
                        type="checkbox"
                        onChange={handleToggle}
                        checked={theme === "light" ? false : true}
                        className="toggle theme-controller"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-full rounded-full bg-gray-100"
            />
          </div>
        </div>
        {/* Person box*/}
        {chatInfo && chatInfo.data.length > 0 ? (
          chatInfo.data.map((item) => (
            <div
              key={item.id}
              className="mt-6 flex gap-2 p-3 rounded-lg cursor-pointer transition-all hover:bg-gray-200"
              onClick={() => handleClick(item.id)}
            >
              <div>
                <div className="avatar">
                  <div className="w-14 rounded-full">
                    <img
                      src={
                        item.image ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                      }
                      alt="avatar"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between w-full ">
                <div>
                  <h3>{item.sender.name}</h3>
                  <p className="text-sm">{item.message}</p>
                </div>
                <div>
                  <p className="text-sm">Fri</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No messages available.</p>
        )}
      </div>
      {/* Right side */}
      <div
        className={`flex-1 relative chat-box bg-[#4A8E3A8C] dark:bg-gray-900 h-screen ${
          isMobileView ? "hidden md:block" : "block"
        }`}
      >
        <div className="flex flex-col justify-between h-screen">
          <div className="h-14 w-full bg-white relative top-0 z-10 border border-l-2 shadow-md px-4 flex justify-between items-center py-3">
            {/* Back arrow for mobile view */}
            {!isMobileView && (
              <FaArrowLeft
                className="cursor-pointer block lg:hidden"
                onClick={() => handleMobileViewToggle()}
              />
            )}
            {/* Image left*/}
            <div className="flex gap-3 items-center">
              <div className="avatar">
                <div className="w-10 h-10 rounded-full">
                  <img
                    className="w-full h-full object-cover"
                    src={
                      selectedItem?.image ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    }
                    alt="avatar"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium">
                  {selectedItem?.sender?.name}
                </h3>
                <p className="text-sm text-[#707579]">
                  Last seen {formatDate(selectedItem?.updated_at)}
                </p>
              </div>
            </div>
            {/* Right side icons */}
            <div className="flex space-x-5 cursor-pointer">
              <CiSearch className="w-8 h-8 rounded-full p-1 transition-all hover:bg-gray-200 hidden lg:block" />
              <TbPhone className="w-8 h-8 rounded-full p-1 transition-al hover:bg-gray-200 hidden lg:block" />

              <div className="dropdown dropdown-bottom dropdown-end">
                <div tabIndex={0} role="button">
                  <BsThreeDotsVertical className="w-8 h-8 rounded-full p-1 transition-al hover:bg-gray-200" />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow mt-5"
                >
                  <li>
                    <a className="font-semibold">
                      <MdOutlineModeEdit className="text-lg" /> Edit
                    </a>
                  </li>
                  <li>
                    <a className="font-semibold">
                      <IoVideocamOutline className="text-lg" /> Video Call
                    </a>
                  </li>
                  <li>
                    <a className="font-semibold">
                      <BiVolumeMute className="text-lg" /> Mute
                    </a>
                  </li>
                  <li>
                    <a className="font-semibold">
                      <IoIosCheckboxOutline className="text-lg" /> Select
                      message
                    </a>
                  </li>
                  <div className="divider m-0"></div>
                  <li>
                    <a className="font-semibold text-red-600">
                      <FaRegTrashAlt className="text-lg" /> Delete
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Message-box */}
          <div className="relative capacity flex flex-col items-end justify-end h-full">
            <div className="w-full">
              <div className="bg-white p-7 rounded-bl-none rounded-3xl w-full lg:w-1/3 mb-2">
                <p>{selectedItem?.message}</p>
              </div>
              <div className=" w-full flex justify-end mb-1">
                <div className="w-full lg:w-1/3 flex justify-end">
                  <span className="bg-white p-7 rounded-3xl rounded-br-none">
                    Hello
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom */}
          <div className="capacity">
            <div className="bg-white relative h-14 mb-5 rounded-lg flex justify-between items-center px-5">
              <div className="flex gap-2 w-full">
                <FaRegSmile className="text-2xl" />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Message"
                  className="w-full z-10 focus-visible:outline-none"
                />
              </div>
              <div className="flex">
                <RiAttachment2 className="text-2xl" />
                <MdMicNone className="text-2xl" />
                <IoMdSend className="text-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
