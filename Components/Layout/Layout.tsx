import Link from "next/link";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { MenuItem } from "../../Data/MenuData";
import { Store } from "../../Data/Store/Store";
import avatar from "../../public/img/avatar.png";

function Layout({ children }: React.PropsWithChildren<{}>): JSX.Element {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { state, dispatch } = useContext(Store);
  const { theme } = state;
  useEffect(() => {
    if (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const themeHandler = () => {
    const colorTheme = theme === "light" ? "dark" : "light";
    dispatch({
      type: "UPDATE_THEME",
      payload: colorTheme,
    });
  };
  const resetQuiz = () => {
    dispatch({ type: "RESET_QUIZ" });
  };
  const logOut = () => {
    dispatch({ type: "USER_LOGOUT" });
  };

  console.log(active);

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
              className=" relative ml-3 pl-3 py-2 my-2 cursor-pointer group  transition-all duration-500 ">
              <Link href={`${item.link}`} passHref>
                <div
                  onClick={() => {
                    setActive(() => item.title);
                  }}
                  className={`absolute flex items-center top-0 right-0 pl-8 text-lg font-semibold text-gray-500 dark:text-sky-800  h-full  hover:text-sky-400 dark:hover:text-sky-500 hover:border-r-8 w-5/6 transition-all duration-500 border-sky-300 dark:border-sky-600 hover:bg-gradient-to-r from-white dark:from-slate-900 to-sky-100 dark:to-sky-900/60 capitalize ${
                    active === item.title
                      ? " text-sky-400 dark:text-sky-500 border-r-8 bg-gradient-to-r from-white to-sky-100 "
                      : ""
                  }  `}>
                  {item.title}
                </div>
              </Link>

              <div className="">
                <div
                  className={`flex justify-center items-center  h-8 w-8 rounded-lg shadow-lg rotate-45 overflow-hidden border-2 bg-gradient-to-tl  from-sky-600/30 to-gray-50 dark:from-slate-800 dark:to-slate-700 dark:border-slate-600 dark:shadow-sky-900 border-sky-300 `}>
                  <div
                    className={` w-7 h-7 flex justify-center items-center   text-sky-500/60 dark:text-sky-400 -rotate-45 text-2xl font-bold `}>
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
        <header className=" flex justify-between items-center h-20 w-full border-b border-sky-400/30 z-50 ">
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

          {/* Navbar section  */}
          <div className=" grid grid-cols-3 justify-items-center px-8  w-2/3">
            {/* QuizButton */}
            <Link href="/quiz" passHref>
              <div
                className={`relative px-4 py-2 text-xl text-center font-semibold text-gray-500 dark:text-gray-50 h-10 w-20 rounded-md  transition-all duration-500 shadow-lg  border-sky-300  dark:border-sky-700 border-x-4 bg-gray-50 dark:bg-slate-800 group cursor-pointer hover:w-32 hover:scale-110 `}>
                <div className=" overflow-hidden dark:text-gray-50">
                  QuizStart
                </div>
                <div className=" absolute bottom-0 bg-gradient-to-b from-gray-300/50 to-gray-200/20 dark:from-gray-500/30  dark:to-gray-700/20 left-0 w-full h-1/2 "></div>
              </div>
            </Link>
            {/* QuizButton */}
            <div
              onClick={themeHandler}
              className=" p-2 rounded-xl bg-gradient-to-t from-gray-300/80 to-gray-50 shadow-lg  text-gray-500  dark:from-gray-600  dark:to-gray-800/80 dark:text-sky-500 dark:shadow-sky-800 cursor-pointer z-30 ">
              {theme === "dark" ? (
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
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
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
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </div>
            <div className="flex relative  items-center group">
              <div className=" w-10 h-10 -ml-3">
                <Image
                  className=" rounded-full hover:opacity-90 cursor-pointer"
                  alt="avatar"
                  src={avatar}
                  layout="fixed"
                  width={40}
                  height={40}></Image>
              </div>
              <h1 className=" hidden lg:block ml-3 cursor-pointer text-slate-600   hover:text-slate-400 text-center font-medium text-lg  dark:text-slate-100  dark:hover:text-slate-400 capitalize  transition-all duration-300">
                Rasel kazi
              </h1>

              <div className=" hidden group-hover:block absolute z-20 top-6 -left-2  w-28 bg-slate-50 rounded-md text-center font-medium text-lg text-slate-600 dark:bg-slate-900 dark:text-slate-200 capitalize border border-slate-300   dark:border-slate-600 group-hover:transition-all duration-300 ">
                <h1
                  className="  py-1 cursor-pointer border-b border-slate-300  dark:border-slate-600  hover:bg-slate-300 dark:hover:bg-slate-700"
                  onClick={resetQuiz}>
                  reset Quiz
                </h1>
                <h1
                  className=" py-1 cursor-pointer   hover:bg-slate-300 dark:hover:bg-slate-700 "
                  onClick={logOut}>
                  log out
                </h1>
              </div>
            </div>
          </div>
          {/* Navbar section  */}
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}

export default Layout;
