import type { NextPage } from "next";

import Head from "next/head";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import avatar from "../public/img/avatar.png";
import { Store } from "../Data/Store/Store";
import { useRouter } from "next/router";
import useTheme from "../Hook/useTheme";
import { MenuItem } from "../Data/MenuData";
import Link from "next/link";

const Home: NextPage = () => {
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useContext(Store);

  const { answer, currantQuestionId, userInfo, theme } = state;
  const router = useRouter();
  const themeHandler = useTheme();

  useEffect(() => {
    if (!userInfo?.hasOwnProperty("email") && currantQuestionId >= 5) {
      router.push("/login");
    }
  }, [currantQuestionId]);
  const resetQuiz = () => {
    dispatch({ type: "RESET_QUIZ" });
  };
  const logOut = () => {
    dispatch({ type: "USER_LOGOUT" });
  };
  const totalCorrectAns = answer?.filter(
    (list: { correct: boolean }) => list.correct
  ).length;
  const totalWrongAns = answer?.filter(
    (list: { correct: boolean }) => !list.correct
  ).length;
  const totalAnswer = answer.length;

  const calPresent = (total: number, val = 144, per = 100) =>
    Math.floor((total / val) * per);

  return (
    <div className="relative  w-screen flex dark:bg-slate-900 overflow-hidden">
      <div
        className={` fixed lg:sticky lg:block top-0 left-0 w-60 lg:w-72 z-20 bg-white dark:bg-slate-900  transition-all duration-300 ${
          open ? " block" : " hidden"
        }`}>
        {/* side Ber section */}

        <div className=" h-screen w-full shadow-2xl flex flex-col border-r border-sky-500/50 ">
          <div className="lg:hidden">
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
                  className={`absolute flex items-center top-0 right-0 pl-8 text-lg font-semibold text-gray-500 dark:text-sky-800  h-full  hover:text-sky-400 dark:hover:text-sky-500 hover:border-r-8 w-5/6 transition-all duration-500 border-sky-300 dark:border-sky-600 hover:bg-gradient-to-r from-white dark:from-slate-900 to-sky-100 dark:to-sky-900/60 capitalize ${
                    router.asPath == item.link &&
                    " text-sky-400 dark:text-sky-500 border-r-8 bg-gradient-to-r from-white to-sky-100 "
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
      <div className="w-full h-screen max-h-screen ">
        <header className=" flex justify-between items-center  sticky top-0 w-full z-10  bg-white/25 backdrop-blur border-sky-200 dark:bg-slate-900/25 py-4  border-b  dark:border-sky-900 ">
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
                  src={userInfo?.img ? userInfo?.img : avatar}
                  layout="fixed"
                  width={40}
                  height={40}></Image>
              </div>
              <h1 className=" hidden lg:block ml-3 cursor-pointer text-slate-600   hover:text-slate-400 text-center font-medium text-lg  dark:text-slate-100  dark:hover:text-slate-400 capitalize  transition-all duration-300">
                {userInfo?.name ? userInfo?.name : "avatar"}
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
        <main className=" w-full h-full min-h-full overflow-scroll ">
          <div>
            <Head>
              <title>RaselKazi-Home</title>
              <meta name="description" content="Generated by create next app" />
              <link rel="icon" href="/logo.png" />
            </Head>
          </div>

          <div className=" relative">
            <div className=" absolute hidden  dark:block -top-12   -right-52 h-32 w-5/6 bg-sky-600/20 rotate-45  blur-3xl "></div>

            <div className=" absolute hidden dark:block  bottom-8  -left-90 h-32 w-3/6  rotate-45  blur-3xl bg-sky-500/20 "></div>
            <div className=" absolute hidden dark:block  top-0 left-52 h-56 w-56 rounded-full  rotate-45  blur-3xl bg-gradient-to-r from-orange-500/20 via-purple-500/20 to-sky-500/30 "></div>
            <div className="">
              {/* ProfileCard  */}
              <div className=" mx-12 my-8 grid grid-cols-12 gap-5 lg:gap-8">
                <div className=" col-span-3 lg:col-span-2 row-span-1 lg:row-span-2">
                  <Image
                    className="rounded-2xl hover:opacity-90 cursor-pointer"
                    alt="avatar"
                    src={userInfo?.img ? userInfo?.img : avatar}
                    layout="responsive"
                    width={380}
                    height={380}></Image>
                </div>
                <div className="col-span-9 ">
                  <h1 className="font-sans  font-semibold text-2xl sm:text-4xl md:text-6xl text-gray-700 tracking-wide dark:text-gray-200">
                    {userInfo?.name ? userInfo?.name : "avatar"}
                  </h1>
                  <p className=" font-medium text-sm sm:text-lg md:text-xl  mt-0 sm:mt-4 text-gray-400 tracking-wider dark:text-gray-300">
                    {`Bonus booster ${
                      totalAnswer ? Math.floor((totalAnswer / 144) * 20) : "0"
                    } Lv`}
                  </p>
                </div>
                <div className="col-span-12 lg:col-span-9">
                  <div className="mb-6 relative">
                    {/* ProgressBar */}
                    <div className="w-full bg-gray-300 dark:bg-slate-800 rounded-full  h-2.5">
                      <div
                        style={{
                          width: `${
                            totalAnswer
                              ? calPresent(totalAnswer) <= 100
                                ? calPresent(totalAnswer)
                                : 100
                              : 2
                          }%`,
                        }}
                        className=" relative bg-gradient-to-r from-pink-400/80 to-orange-500/70 h-2.5 rounded-full  shadow-2xl shadow-orange-400 ">
                        <div className=" absolute top-1 left-1  w-full bg-gradient-to-r from-pink-500/80 to-orange-500/70 h-2.5 rounded-full  shadow-2xl shadow-orange-400 blur "></div>
                      </div>
                    </div>
                    {/* ProgressBar */}

                    <div className=" hidden sm:block absolute -top-9 right-1 font-medium text-gray-400 text-sm md:text-base ">
                      {`${totalAnswer}0/1440 xp`}
                    </div>
                  </div>

                  <div className=" flex justify-between">
                    {/* IconCard */}
                    <div className=" flex  gap-2 items-center">
                      <div className=" hidden sm:block p-1 md:p-4 rounded-2xl shadow-lg text-gray-600 dark:text-gray-100 bg-slate-50 dark:bg-slate-800">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8"
                          viewBox="0 0 20 20"
                          fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className=" ml-1 md:ml-3 lg:ml-5 ">
                        <h1 className=" font-bold text-xl lg:text-3xl  text-gray-700 dark:text-gray-100 text-center ">
                          27
                        </h1>
                        <p className="font-medium sm:text-sm text-xs md:text-base text-gray-400 dark:text-gray-500">
                          Game Wins
                        </p>
                      </div>
                    </div>
                    <div className=" flex gap-2 items-center">
                      <div className=" hidden sm:block p-1 md:p-4 rounded-2xl shadow-lg text-gray-600 dark:text-gray-100 bg-slate-50 dark:bg-slate-800 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8"
                          viewBox="0 0 20 20"
                          fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className=" ml-1 md:ml-3 lg:ml-5 ">
                        <h1 className=" font-bold text-xl lg:text-3xl  text-gray-700 dark:text-gray-100 text-center ">
                          {totalWrongAns}
                        </h1>
                        <p className="font-medium  text-xs sm:text-sm md:text-base text-gray-400 dark:text-gray-500">
                          Wrong Answer
                        </p>
                      </div>
                    </div>
                    <div className=" flex gap-2 items-center">
                      <div className=" hidden sm:block p-1 md:p-4 rounded-2xl shadow-lg text-gray-600 dark:text-gray-100 bg-slate-50 dark:bg-slate-800 ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8"
                          viewBox="0 0 20 20"
                          fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className=" ml-1 md:ml-3 lg:ml-5 ">
                        <h1 className=" font-bold text-xl lg:text-3xl  text-gray-700 dark:text-gray-100 text-center ">
                          {totalCorrectAns}
                        </h1>
                        <p className="font-medium  text-xs sm:text-sm md:text-base text-gray-400 dark:text-gray-500">
                          Correct Answers
                        </p>
                      </div>
                    </div>{" "}
                    {/* IconCard */}
                  </div>
                </div>
              </div>
              {/* ProfileCard  */}
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 mx-8">
              {/* AchievementCard */}
              <div className=" rounded-2xl shadow-xl px-8 pt-10  dark:bg-slate-800/60">
                <div className=" flex items-center gap-2 md:gap-6 ">
                  <div className=" flex w-2/3 gap-2 md:gap-6 items-center">
                    <h1 className="font-semibold  text-xs sm:text-base md:text-lg lg:text-xl text-black dark:text-slate-300">
                      AchievementCard
                    </h1>
                    <p className=" py-1 px-2 font-medium  text-gray-900  dark:text-gray-300 rounded-lg bg-gray-300 dark:bg-slate-700 ">
                      {calPresent(totalAnswer, 120, 3)}
                    </p>
                  </div>

                  <p className=" hidden lg:block font-medium  text-gray-400 dark:text-gray-600">{`${calPresent(
                    totalAnswer
                  )}/150`}</p>
                  {/* ProgressBar */}
                  <div className="w-full bg-gray-300 dark:bg-slate-800 rounded-full  h-2.5">
                    <div
                      style={{
                        width: `${
                          totalAnswer
                            ? calPresent(totalAnswer) <= 100
                              ? calPresent(totalAnswer)
                              : 100
                            : 2
                        }%`,
                      }}
                      className=" relative bg-gradient-to-r from-pink-400/80 to-orange-500/70 h-2.5 rounded-full  shadow-2xl shadow-orange-400 ">
                      <div className=" absolute top-1 left-1  w-full bg-gradient-to-r from-pink-500/80 to-orange-500/70 h-2.5 rounded-full  shadow-2xl shadow-orange-400 blur "></div>
                    </div>
                  </div>
                  {/* ProgressBar */}
                </div>
                <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2  lg:grid-cols-3 justify-items-center items-center mt-20 mb-12 gap-6 md:gap-16 lg:gap-10 ">
                  {/* AchievementBases */}
                  <div
                    style={{
                      opacity: `${
                        calPresent(totalCorrectAns, 10, 100) >= 100 ? 100 : 40
                      }%`,
                    }}>
                    <div className=" relative">
                      <div className=" absolute -bottom-10 left-2 h-10 w-28 rounded-full w  blur-xl bg-gray-300 dark:bg-slate-700"></div>
                      <div className=" relative  h-[4.5rem] w-[7rem] bg-gray-50 dark:bg-slate-900 rounded-xl ">
                        <div className=" absolute w-full h-full top-0 left-0 bg-gray-50 dark:bg-slate-900 rounded-xl rotate-[60deg] "></div>
                        <div className=" absolute w-full h-full top-0 left-0 bg-gray-50 dark:bg-slate-900 rounded-xl rotate-[120deg] "></div>
                      </div>

                      <div className=" absolute top-1 left-2 ">
                        <div className=" relative   h-[4rem] w-[6rem] bg-gradient-to-b from-gray-100 to-gray-300 dark:from-slate-900  dark:to-gray-800  rounded-xl ">
                          <div className=" absolute w-full h-full top-0 left-0 bg-gradient-to-r from-gray-100 to-gray-300 dark:from-slate-900  dark:to-gray-800 rounded-xl rotate-[60deg]  overflow-hidden"></div>
                          <div className=" absolute flex justify-center items-center w-full h-full top-0 left-0 bg-gradient-to-r from-gray-100 to-gray-300 dark:from-slate-900  dark:to-gray-800 rounded-xl rotate-[120deg] ">
                            <div
                              className={`absolute h-12 w-4 bg-gray-50 -bottom-4 left-8  border-x-[6px]   rotate-[20deg] border-purple-600 `}></div>

                            <div
                              className={`absolute h-12 w-4 bg-gray-50 bottom-3 right-16 border-x-[6px]  rotate-[105deg] border-purple-600 "
                              `}></div>
                            <div
                              className={`  p-1 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full border-[6px] border-gray-400 shadow-xl   text-gray-200  -rotate-[120deg] shadow-purple-400/80 `}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-7"
                                viewBox="0 0 20 20"
                                fill="currentColor">
                                <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <h1 className="mt-10 font-semibold text-xl text-center text-gray-600  dark:text-gray-400">
                      Comeback
                    </h1>
                  </div>

                  <div
                    style={{
                      opacity: `${
                        calPresent(totalCorrectAns, 50, 100) >= 100 ? 100 : 40
                      }%`,
                    }}>
                    <div className=" relative">
                      <div className=" absolute -bottom-10 left-2 h-10 w-28 rounded-full w  blur-xl bg-gray-300 dark:bg-slate-700"></div>
                      <div className=" relative  h-[4.5rem] w-[7rem] bg-gray-50 dark:bg-slate-900 rounded-xl ">
                        <div className=" absolute w-full h-full top-0 left-0 bg-gray-50 dark:bg-slate-900 rounded-xl rotate-[60deg] "></div>
                        <div className=" absolute w-full h-full top-0 left-0 bg-gray-50 dark:bg-slate-900 rounded-xl rotate-[120deg] "></div>
                      </div>

                      <div className=" absolute top-1 left-2 ">
                        <div className=" relative   h-[4rem] w-[6rem] bg-gradient-to-b from-gray-100 to-gray-300 dark:from-slate-900  dark:to-gray-800  rounded-xl ">
                          <div className=" absolute w-full h-full top-0 left-0 bg-gradient-to-r from-gray-100 to-gray-300 dark:from-slate-900  dark:to-gray-800 rounded-xl rotate-[60deg]  overflow-hidden"></div>
                          <div className=" absolute flex justify-center items-center w-full h-full top-0 left-0 bg-gradient-to-r from-gray-100 to-gray-300 dark:from-slate-900  dark:to-gray-800 rounded-xl rotate-[120deg] ">
                            <div
                              className={`absolute h-12 w-4 bg-gray-50 -bottom-4 left-8  border-x-[6px]   rotate-[20deg] border-sky-400 `}></div>

                            <div
                              className={`absolute h-12 w-4 bg-gray-50 bottom-3 right-16 border-x-[6px]  rotate-[105deg] border-sky-400 `}></div>
                            <div
                              className={`  p-1 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full border-[6px] border-gray-400 shadow-xl   text-gray-200  -rotate-[120deg]  shadow-sky-400/40 `}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-7"
                                viewBox="0 0 20 20"
                                fill="currentColor">
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h1 className="mt-10 font-semibold text-xl text-center text-gray-600  dark:text-gray-400">
                      Lucky
                    </h1>
                  </div>
                  <div className=" col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1">
                    <div
                      style={{
                        opacity: `${
                          calPresent(totalCorrectAns, 110, 100) >= 100
                            ? 100
                            : 40
                        }%`,
                      }}>
                      <div className=" relative">
                        <div className=" absolute -bottom-10 left-2 h-10 w-28 rounded-full w  blur-xl bg-gray-300 dark:bg-slate-700"></div>
                        <div className=" relative  h-[4.5rem] w-[7rem] bg-gray-50 dark:bg-slate-900 rounded-xl ">
                          <div className=" absolute w-full h-full top-0 left-0 bg-gray-50 dark:bg-slate-900 rounded-xl rotate-[60deg] "></div>
                          <div className=" absolute w-full h-full top-0 left-0 bg-gray-50 dark:bg-slate-900 rounded-xl rotate-[120deg] "></div>
                        </div>

                        <div className=" absolute top-1 left-2 ">
                          <div className=" relative   h-[4rem] w-[6rem] bg-gradient-to-b from-gray-100 to-gray-300 dark:from-slate-900  dark:to-gray-800  rounded-xl ">
                            <div className=" absolute w-full h-full top-0 left-0 bg-gradient-to-r from-gray-100 to-gray-300 dark:from-slate-900  dark:to-gray-800 rounded-xl rotate-[60deg]  overflow-hidden"></div>
                            <div className=" absolute flex justify-center items-center w-full h-full top-0 left-0 bg-gradient-to-r from-gray-100 to-gray-300 dark:from-slate-900  dark:to-gray-800 rounded-xl rotate-[120deg] ">
                              <div
                                className={`absolute h-12 w-4 bg-gray-50 -bottom-4 left-8  border-x-[6px]   rotate-[20deg]  border-yellow-300 `}></div>

                              <div
                                className={`absolute h-12 w-4 bg-gray-50 bottom-3 right-16 border-x-[6px]  rotate-[105deg] border-yellow-300 `}></div>
                              <div
                                className={`  p-1 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full border-[6px] border-gray-400 shadow-xl   text-gray-200  -rotate-[120deg]  shadow-yellow-400/40 `}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-7 w-7"
                                  viewBox="0 0 20 20"
                                  fill="currentColor">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <h1 className="mt-10 font-semibold text-xl text-center text-gray-600  dark:text-gray-400">
                        Leader
                      </h1>
                    </div>
                  </div>
                  {/* AchievementBases */}
                </div>
                <div className=" border-t border-gray-200 flex justify-center items-center h-12 dark:border-sky-900  ">
                  <p className=" capitalize text-gray-500 cursor-pointer ">
                    view all
                  </p>
                </div>
              </div>
              {/* AchievementCard */}

              {/* InventoryCard */}

              <div className=" rounded-2xl shadow-xl px-8 pt-10 dark:bg-slate-800/60 ">
                <div className=" flex items-center lg:gap-6 gap-2">
                  <div className=" flex w-2/3 gap-2 md:gap-6 items-center">
                    <h1 className="font-semibold  text-black dark:text-slate-300 text-xs sm:text-base md:text-lg lg:text-xl ">
                      InventoryCard
                    </h1>
                    <p className=" text-xs sm:text-base md:text-lg lg:text-xl  py-1 px-2 font-medium  text-gray-900 dark:text-gray-300 rounded-lg bg-gray-300 dark:bg-slate-700 ">
                      4
                    </p>
                  </div>

                  <p className=" hidden lg:block font-medium  text-gray-400 dark:text-gray-600">{`${calPresent(
                    totalAnswer,
                    120
                  )}/150`}</p>
                  {/* ProgressBar */}
                  <div className="w-full bg-gray-300 dark:bg-slate-800 rounded-full  h-2.5">
                    <div
                      style={{
                        width: `${
                          totalAnswer
                            ? calPresent(totalAnswer) <= 100
                              ? calPresent(totalAnswer)
                              : 100
                            : 2
                        }%`,
                      }}
                      className=" relative bg-gradient-to-r from-pink-400/80 to-orange-500/70 h-2.5 rounded-full  shadow-2xl shadow-orange-400 ">
                      <div className=" absolute top-1 left-1  w-full bg-gradient-to-r from-pink-500/80 to-orange-500/70 h-2.5 rounded-full  shadow-2xl shadow-orange-400 blur "></div>
                    </div>
                  </div>
                  {/* ProgressBar */}
                </div>

                <div className=" grid grid-cols-2  lg:grid-cols-3 justify-items-center items-center mt-16 mb-8 gap-6 lg:gap-10 ">
                  {/* InventoryBases */}
                  <div className="">
                    <div
                      className={`p-2 flex justify-center items-center  h-28 w-28  rounded-3xl shadow-xl  bg-gradient-to-tl from-gray-50 to-gray-100  dark:from-slate-800  dark:to-slate-900/5 rotate-45 overflow-hidden shadow-green-200 dark:shadow-green-500/10 `}>
                      <div
                        className={`flex  justify-center items-center rounded-3xl  h-full w-full   bg-gradient-to-tl  from-green-400/30 to-green-50  dark:from-green-500/20  dark:to-slate-800/30`}>
                        <div
                          className={` p-1 bg-gradient-to-b   rounded-full border-4  shadow-2xl   text-gray-200 -rotate-45 " border-green-500/60 shadow-green-500 to-green-400  from-green-300 `}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <h1 className="mt-8 font-semibold text-lg text-center text-gray-600 dark:text-gray-400 capitalize">
                      Extra time
                    </h1>
                  </div>
                  <div className="">
                    <div
                      className={`p-2 flex justify-center items-center  h-28 w-28  rounded-3xl shadow-xl  bg-gradient-to-tl from-gray-50 to-gray-100  dark:from-slate-800  dark:to-slate-900/5 rotate-45 overflow-hidden shadow-yellow-200 dark:shadow-yellow-500/10 `}>
                      <div
                        className={`flex justify-center items-center rounded-3xl h-full w-full bg-gradient-to-tl from-yellow-400/30 to-yellow-50 dark:from-yellow-500/20  dark:to-slate-800/30 `}>
                        <div
                          className={` p-1 bg-gradient-to-b rounded-full border-4 shadow-2xl text-gray-200 -rotate-45  border-yellow-500/60 shadow-yellow-500 to-yellow-400  from-yellow-300 `}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <h1 className="mt-8 font-semibold text-lg text-center text-gray-600 dark:text-gray-400 capitalize">
                      {`${Math.floor((totalAnswer / 144) * 50)}/50`}
                    </h1>
                  </div>

                  <div className=" col-span-2 lg:col-span-1">
                    <div className="">
                      <div
                        className={`p-2 flex justify-center items-center  h-28 w-28  rounded-3xl shadow-xl  bg-gradient-to-tl from-gray-50 to-gray-100  dark:from-slate-800  dark:to-slate-900/5 rotate-45 overflow-hidden shadow-pink-200 dark:shadow-pink-500/10 `}>
                        <div
                          className={`flex  justify-center items-center rounded-3xl  h-full w-full   bg-gradient-to-tl from-pink-400/30 to-pink-50 dark:from-pink-500/20  dark:to-slate-800/30 `}>
                          <div
                            className={` p-1 bg-gradient-to-b   rounded-full border-4  shadow-2xl   text-gray-200 -rotate-45 border-pink-500/60 shadow-pink-500 to-pink-400  from-pink-300 `}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-8 w-8 pb-1"
                              viewBox="0 0 20 20"
                              fill="currentColor">
                              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <h1 className="mt-8 font-semibold text-lg text-center text-gray-600 dark:text-gray-400 capitalize">
                        powerful answer
                      </h1>
                    </div>
                  </div>
                  {/* InventoryBases */}
                </div>

                <div className=" border-t border-gray-300 dark:border-sky-900 flex justify-center items-center h-12  ">
                  <p className=" capitalize text-gray-500 cursor-pointer ">
                    view all
                  </p>
                </div>
              </div>
              {/* InventoryCard */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
