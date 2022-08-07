import Link from "next/link";
import React, { useState } from "react";
import { MenuItem } from "../../Data/MenuData";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";

function Layout({ children }: React.PropsWithChildren<{}>): JSX.Element {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  return (
    <div className="relative  w-screen flex dark:bg-slate-900 overflow-hidden">
      <div
        className={`absolute top-0 left-0 lg:block  w-60 lg:w-72 lg:static z-10 bg-white dark:bg-slate-900  transition-all duration-300 ${
          open ? " block" : "  hidden"
        }`}>
       

      {/* side Ber section */}

      <div className=" h-screen w-full shadow-2xl flex flex-col border-r border-sky-500/50">
      <div className=" lg:hidden">
        {/* CloseButton */}
        <div
      className="w-7 h-7  absolute top-0 right-0 m-3 cursor-pointer bg-gradient-to-b from-red-300 to-red-500 dark:from-slate-800/50 dark:to-red-700 text-2xl font-bold rounded-md text-center p-0.5 text-gray-300 dark:text-red-600  hover:scale-110  shadow-lg shadow-red-500 dark:shadow-red-900 transition-all duration-300"
      onClick={() => setOpen(false)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 "
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
        {/* CloseButton */}
      </div>

      <div className=" flex items-center pl-4  w-full  h-44 hover:cursor-pointer  transition-all duration-300 text-lg font-semibold capitalize">
        <div className=" flex items-center justify-center h-10 w-10 rounded-md bg-gradient-to-t from-gray-400/80 to-gray-50 dark:from-slate-900/90 dark:to-slate-700 bg shadow-lg text-3xl font-extrabold text-gray-400 dark:text-gray-500 mr-4">
          R
        </div>
        <p className=" font-bold text-2xl text-gray-400 dark:text-gray-600">
          Rasel kazi
        </p>
      </div>
      {MenuItem.map((item) => (
        <div
          key={item.title}
          onClick={() => {
            setActive(item.title);
          }}
          className=" relative ml-3 pl-3 py-2 my-2 cursor-pointer group  transition-all duration-500 ">
          <Link href={`${item.link}`} passHref>
            <div
              className={`absolute flex items-center top-0 right-0 pl-8 text-lg font-semibold text-gray-500 dark:text-sky-800  h-full  hover:text-sky-400 dark:hover:text-sky-500 hover:border-r-8 w-5/6 transition-all duration-500 border-sky-300 dark:border-sky-600 hover:bg-gradient-to-r from-white dark:from-slate-900 to-sky-100 dark:to-sky-900/60  ${
                active === item.title
                  ? " text-sky-400 dark:text-sky-500 border-r-8 bg-gradient-to-r from-white to-sky-100 "
                  : ""
              } capitalize"
          `}>
              {item.title}
            </div>
          </Link>

          <div className="">
            <div
              className={`flex justify-center items-center  h-8 w-8 rounded-lg shadow-lg rotate-45 overflow-hidden border-2 bg-gradient-to-tl  from-sky-600/30 to-gray-50 dark:from-slate-800 dark:to-slate-700 dark:border-slate-600 dark:shadow-sky-900 border-sky-300 "
              `}>
              <div
                className={` w-7 h-7 flex justify-center items-center   text-sky-500/60 dark:text-sky-400 -rotate-45 text-2xl font-bold   "
                `}>
                {item.icon}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
      {/* side Ber section */}


      </div>

      <div className="w-full">
        <header className=" flex justify-between items-center h-20 w-full border-b border-sky-400/30 z-50">
          <div className="w-1/3">
            <div
              onClick={() => {
                setOpen(true);
              }}
              className=" ml-8 text-sky-500 cursor-pointer lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
          </div>

          <Navbar />
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}

export default Layout;
