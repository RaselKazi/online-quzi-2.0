/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import CodeMirror from "@uiw/react-codemirror";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { githubLight, githubDark } from "@uiw/codemirror-theme-github";
import { javascript } from "@codemirror/lang-javascript";
import Markdown from "markdown-to-jsx";
import { Store } from "../Data/Store/Store";
import avatar from "../public/img/avatar.png";
import { useCountdownTimer } from "use-countdown-timer";
import Head from "next/head";
import { quizData } from "../Data/quizData";
import { useRouter } from "next/router";
import useTheme from "../Hook/useTheme";
import { MenuItem } from "../Data/MenuData";
import Link from "next/link";

const defaultExplain = {
  ansId: 0,
  correct: false,
  text: "Answer no Found",
  explain:
    "please select an option. if you get it wrong don't worry I will explain the correct answer",
};

type QuizExplain = {
  ansId: number | any;
  correct: boolean;
  text: string | any;
  explain: string;
};
export default function quiz() {
  // const [openModule, setOpenModule] = useState(false);

  //quiz
  const [pvs, setPvs] = useState(true);
  const [correctOption, setCorrectOption] = useState(5);
  const [explain, setExplain] = useState<QuizExplain>(
    defaultExplain as QuizExplain
  );
  const [openModule, setOpenModule] = useState(false);
  const [nextActive, setNextActive] = useState(true);
  const [open, setOpen] = useState(false);
  //quiz

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { state, dispatch } = useContext(Store);

  const { answer, currantQuestionId, theme, userInfo } = state;
  const themeHandler = useTheme();
  const router = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { countdown, start, reset, pause, isRunning } = useCountdownTimer({
    timer: 1000 * 30,
  });
  const totalCorrectAns = answer?.filter(
    (list: { correct: boolean }) => list.correct
  ).length;
  const totalWrongAns = answer?.filter(
    (list: { correct: boolean }) => !list.correct
  ).length;

  //layout
  const resetQuiz = () => {
    dispatch({ type: "RESET_QUIZ" });
  };
  const logOut = () => {
    dispatch({ type: "USER_LOGOUT" });
  };
  //layout

  //answer bored

  const startRow = Math.floor(answer?.length / 15) * 15;
  const end = answer?.length;

  let rows = [];
  if (startRow / 15 == 0) {
    rows = [];
  }
  for (let i = end; i <= startRow + 14; i++) {
    rows.push(
      <div
        key={i}
        className="flex items-center justify-center h-10 w-10 rounded-full   cursor-pointer bg-white dark:bg-slate-800   transition-all duration-300 font-medium dark:text-gray-600 border-2 border-gray-300 dark:border-gray-700  text-gray-500 hover:text-gray-900 hover:bg-gray-200  dark:hover:text-gray-900  dark:hover:bg-gray-700">
        {i + 1}
      </div>
    );
  }
  //answer bored

  //QuizBody

  const answerList = quizData[currantQuestionId - 1]?.options.map((ite, i) => {
    return { ansId: i + 1, correct: ite.correct, text: ite.text };
  });

  const correctAns = answerList?.find((ite, i) => ite.correct);

  if (countdown < 1) {
    dispatch({
      type: "ADD_ANSWER_ITEM",
      payload: {
        id: currantQuestionId,
        ansId: 5,
        correct: false,
      },
    });
  }
  //handel option
  const optionHandler = (
    index: number,
    correct: boolean,
    explainText: string
  ) => {
    const answerData = {
      id: currantQuestionId,
      ansId: index,
      correct,
    };

    const explainData = {
      ansId: correctAns?.ansId,
      correct,
      text: correctAns?.text,
      explain: explainText,
    };

    setExplain(explainData);
    setCorrectOption(index);
    setNextActive(false);
    reset();
    if (pvs) {
      if (!correct && currantQuestionId % 3 === 0) {
        setOpenModule(true);
      }
      setPvs(false);
    }

    if (pvs) {
      dispatch({
        type: "ADD_ANSWER_ITEM",
        payload: answerData,
      });
    }
  };

  const handleNextButton = () => {
    if (currantQuestionId >= answer.length) {
      setNextActive(true);
    }
    dispatch({
      type: "UPDATE_QUESTION_ID",
      payload: currantQuestionId + 1,
    });

    setCorrectOption(5);
    reset();
    start();
    setExplain(defaultExplain);
    setPvs(true);
  };
  const handlePevButton = () => {
    dispatch({
      type: "UPDATE_QUESTION_ID",
      payload: currantQuestionId - 1,
    });
    setNextActive(false);
    setCorrectOption(5);
    setExplain(defaultExplain);
  };

  //QuizBody

  useEffect(() => {
    if (!userInfo?.hasOwnProperty("email") && currantQuestionId >= 5) {
      router.push("/login");
    }
  }, [currantQuestionId]);

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
        <main className=" w-full h-full min-h-full overflow-scroll pb-16 ">
          <div>
            <Head>
              <title>RaselKazi-Quiz</title>
              <meta name="description" content="Generated by create next app" />
              <link rel="icon" href="/logo.png" />
            </Head>
          </div>
          <div className=" grid grid-cols-8 w-full">
            <div className="col-span-8 lg:col-span-6">
              {/* QuizBody */}

              <div className=" px-4 py-4  lg:px-12 lg:py-4  flex justify-center">
                {/* module */}
                {openModule && (
                  <div
                    className={`absolute   top-0 left-0 h-screen w-screen bg-gray-900/80 backdrop-blur-sm  flex justify-center items-center z-10 transition-all duration-500  overflow-hidden ${
                      openModule
                        ? " block opacity-100 scale-100 transition-all duration-500 "
                        : " hidden opacity-0 scale-0"
                    }`}>
                    <div className="w-5/6 lg:w-3/6 h-4/6 overflow-hidden bg-gray-50 dark:bg-slate-800 relative rounded-2xl ">
                      <div className=" h-12 w-full bg-gradient-to-b from-gray-100 to-gray-300  dark:from-slate-800 dark:to-slate-600"></div>
                      {/* CloseButton */}
                      <div
                        className="w-7 h-7  absolute top-0 right-0 m-3 cursor-pointer bg-gradient-to-b from-red-300 to-red-500 dark:from-slate-800/50 dark:to-red-700 text-2xl font-bold rounded-md text-center p-0.5 text-gray-300 dark:text-red-600  hover:scale-110  shadow-lg shadow-red-500 dark:shadow-red-900 transition-all duration-300"
                        onClick={() => setOpenModule(false)}>
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

                      <div className="text-justify text-xl h-5/6 overflow-y-auto py-4 px-10">
                        <div className="">
                          <div className=" flex justify-center py-8 cursor-pointer group  transition-all duration-500">
                            <div
                              className={` relative text-xs sm:text-sm md:text-xl px-14 text-center font-semibold text-gray-900 dark:text-gray-100  dark:bg-gray-700 flex items-center justify-center h-16 w-5/6 md:w-4/6 lg:w-4/6 rounded-lg  transition-all duration-500 shadow-xl bg-gray-50 `}>
                              {explain?.text}
                              <div className=" absolute bottom-0 bg-gradient-to-b from-gray-300/50 to-gray-200/20 dark:from-gray-400/40  dark:to-gray-700/10 left-0 w-full h-1/2 "></div>
                              <div className=" absolute top-2   -left-5">
                                <div
                                  className={`p-1 flex justify-center items-center  h-12 w-12 rounded-xl shadow-2xl rotate-45 overflow-hidden border-4 bg-gradient-to-tl  " from-sky-600/30 to-gray-50 border-sky-300 `}>
                                  <div
                                    className={` w-8 h-8 flex justify-center items-center bg-gradient-to-b  rounded-full  text-gray-200 -rotate-45  text-2xl font-bold  from-sky-100 to-sky-500  text-center`}>
                                    {explain?.ansId}
                                  </div>
                                </div>
                              </div>
                              <div className=" absolute top-2  -right-5">
                                <div
                                  className={`p-1 flex justify-center items-center  h-12 w-12 rounded-xl shadow-2xl rotate-45 overflow-hidden border-4 bg-gradient-to-tl  " from-sky-600/30 to-gray-50 border-sky-300 `}>
                                  <div
                                    className={` w-8 h-8 flex justify-center items-center bg-gradient-to-b  rounded-full  text-gray-200 -rotate-45 text-2xl font-bold  from-sky-100 to-sky-500  text-center`}>
                                    {explain?.ansId}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className=" font-serif   text-sm md:text-lg font-semibold rounded-md text-gray-700 dark:text-gray-300 tracking-tight ">
                          <Markdown>{explain?.explain}</Markdown>
                        </div>
                      </div>
                      <div className=" h-12 w-full bg-gradient-to-b from-gray-300 to-gray-50 dark:from-slate-800 dark:to-slate-600"></div>
                    </div>
                  </div>
                )}

                <div className="z-0 w-full  bg-white dark:bg-slate-800/60 rounded-3xl drop-shadow-2xl">
                  <div className=" w-full h-20">
                    <div className="p-3 px-6 grid grid-cols-2">
                      <div className="">
                        <h1 className=" text-base sm:text-2xl font-bold text-gray-400 dark:text-gray-300">
                          Hello world!
                        </h1>
                      </div>
                      <div className=" flex items-center justify-end gap-2">
                        <div
                          onClick={() => setOpenModule(true)}
                          className=" cursor-pointer py-1.5 px-2 mx-3  rounded-md bg-gradient-to-t from-gray-300/80 to-gray-50 shadow-lg text-xl font-bold text-sky-600 dark:from-gray-700  dark:to-gray-800  dark:text-sky-400 dark:shadow-sky-600/20 ">
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
                              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div className=" lg:hidden flex items-center justify-end gap-2">
                          <div className="py-2  px-3 rounded-md bg-gradient-to-t from-gray-300/80 to-gray-50 shadow-lg text-xl font-bold text-gray-500  tracking-widest dark:from-gray-800  dark:to-gray-600  dark:text-gray-200">
                            <div
                              style={{
                                transform: `rotate(${
                                  (30 - countdown / 1000) * 12
                                }deg)`,
                              }}
                              className=" relative h-7 w-7 rounded-full border-2  dark:border-gray-200 border-gray-700">
                              <div className=" absolute top-1 left-1/2 h-[10px] w-0.5 border-b-2 bg-purple-500   dark:border-gray-100 border-gray-900  "></div>
                            </div>
                          </div>

                          <p className="py-2 px-3 rounded-md bg-gradient-to-t from-gray-300/80 to-gray-50 shadow-lg text-xl font-bold text-gray-500 dark:from-gray-800  dark:to-gray-600  dark:text-gray-200 tracking-widest">
                            {`${
                              countdown / 1000 <= 9
                                ? "0" + countdown / 1000
                                : countdown / 1000
                            }`}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-300 dark:bg-slate-700 h-1.5">
                      <div
                        style={{
                          width: `${Math.round(
                            (currantQuestionId / quizData.length) * 100
                          )}%`,
                        }}
                        className=" relative bg-gradient-to-r from-pink-400 to-orange-600 h-1.5 rounded-full">
                        <div className=" absolute top-0 left-0  w-full bg-gradient-to-r from-pink-400 to-orange-600 h-2.5 rounded-full  blur "></div>
                      </div>
                    </div>
                  </div>

                  {/* body */}
                  <div className=" w-full ">
                    {quizData
                      .slice(currantQuestionId - 1, currantQuestionId)
                      .map((qu) => {
                        return (
                          <div
                            key={qu.id}
                            className="w-full  flex-col justify-between ">
                            <div className=" rounded-lg overflow-hidden relative ">
                              <div className=" absolute top-3 right-2 h-4 w-4 rounded-full bg-gradient-to-b from-red-100 to-red-600  shadow-md shadow-red-500"></div>
                              <div className=" absolute top-3 right-8 h-4 w-4 rounded-full bg-gradient-to-b from-yellow-100 to-yellow-600  shadow-md shadow-yellow-500 "></div>
                              <div className=" absolute top-3 right-14 h-4 w-4 rounded-full bg-gradient-to-b from-green-100 to-green-600  shadow-md shadow-green-500"></div>
                              <h1 className="py-3 px-6 pr-16  text-base sm:text-xl font-bold  bg-gradient-to-b from-gray-50 to-gray-300  text-gray-600  dark:from-slate-900  dark:to-slate-700   dark:text-gray-300">
                                {qu.title}
                              </h1>
                              <div className="">
                                <CodeMirror
                                  value={qu.code}
                                  height="320px"
                                  theme={
                                    theme === "dark" ? dracula : githubLight
                                  }
                                  extensions={[javascript({ jsx: true })]}
                                  className=" text-xm sm:text-sm   md:text-xl overflow-y-auto "
                                />
                              </div>
                            </div>

                            <div className=" ml-4  sm:ml-10 mt-6 m-4 grid grid-cols-1 md:grid-cols-2">
                              {qu.options.map((option, id) => {
                                return (
                                  <div
                                    key={id}
                                    onClick={() =>
                                      optionHandler(
                                        id,
                                        option.correct,
                                        qu.explanation
                                      )
                                    }>
                                    {/* QuizOption */}
                                    <div className=" relative mb-3 cursor-pointer group  transition-all duration-500">
                                      <div
                                        className={` pl-7 lg:text-base text-xs sm:text-sm  text-center font-semibold text-gray-700 dark:text-gray-200 absolute flex items-center justify-center top-0 left-6 h-full  rounded-lg border-r-8  w-5/6 transition-all duration-500 shadow-xl ${
                                          correctOption === id
                                            ? option.correct
                                              ? "border-green-300 bg-green-100 dark:border-green-700  dark:bg-green-800"
                                              : "border-red-300 bg-red-100 dark:border-red-700  dark:bg-red-800"
                                            : "border-sky-300 bg-gray-50  dark:border-sky-700  dark:bg-slate-800"
                                        }`}>
                                        {option.text}
                                        <div className=" absolute bottom-0 bg-gradient-to-b from-gray-300/50 to-gray-200/20   dark:from-gray-500/30  dark:to-gray-700/20 left-0 w-full h-1/2 "></div>
                                      </div>

                                      <div className=" py-1">
                                        <div
                                          className={`p-1 flex justify-center items-center  h-12 w-12 rounded-xl shadow-2xl rotate-45 overflow-hidden border-4 bg-gradient-to-tl  ${
                                            correctOption === id
                                              ? option.correct
                                                ? "border-green-300 from-green-600/30 to-green-50 dark:from-green-700  dark:to-slate-900 dark:border-slate-700 "
                                                : "border-red-300 from-red-600/30 to-red-50 dark:from-red-700  dark:to-slate-900 dark:border-slate-700 "
                                              : " from-sky-600/30 to-gray-50 border-sky-300 dark:from-slate-700  dark:to-sky-900 dark:border-slate-700 "
                                          }`}>
                                          <div
                                            className={` w-8 h-8 flex justify-center items-center bg-gradient-to-b  rounded-full  text-gray-200 -rotate-45 text-2xl font-bold ${
                                              correctOption === id
                                                ? option.correct
                                                  ? "from-green-100 to-green-500 dark:from-green-900  dark:to-green-300 dark:text-green-900"
                                                  : " from-red-100 to-red-500 dark:from-red-900  dark:to-red-300 dark:text-red-900"
                                                : " from-sky-100 to-sky-500  dark:from-sky-900  dark:to-sky-300 dark:text-sky-900"
                                            }`}>
                                            {id + 1}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {/* QuizOption */}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  <div className=" w-full h-20 px-6 py-2 border-t border-sky-300 dark:border-sky-500/40  flex justify-between items-center">
                    <div className="  text-xl font-semibold text-gray-700 dark:text-gray-300">
                      <p className=" hidden sm:flex">
                        {`${currantQuestionId} of ${quizData.length} `}
                        <span className=" ml-4 hidden lg:block">Question</span>
                      </p>
                    </div>
                    <div className=" flex px-2">
                      <button
                        className="   py-2 px-5 rounded-lg bg-gradient-to-t from-gray-400 to-gray-50  dark:from-gray-500  dark:to-gray-800 flex mr-4 text-xl  font-semibold text-gray-800 dark:text-gray-100 capitalize shadow-lg shadow-gray-600/70 tracking-widest  hover:-translate-x-2 transition-all duration-300 border-x-4 border-gray-400 cursor-pointer disabled:opacity-30 "
                        onClick={() => handlePevButton()}
                        disabled={currantQuestionId <= 1}>
                        Back
                      </button>
                      <button
                        className="py-2 px-5 rounded-lg bg-gradient-to-t from-sky-300 to-sky-50  dark:from-sky-600  dark:to-gray-800 flex mr-4 text-xl  font-semibold text-gray-700 dark:text-sky-100 capitalize shadow-lg shadow-sky-500/70 dark:shadow-sky-500/40 tracking-widest hover:translate-x-2 transition-all duration-300 border-x-4 border-sky-400 cursor-pointer disabled:opacity-30"
                        onClick={() => handleNextButton()}
                        disabled={
                          currantQuestionId >= quizData.length || nextActive
                        }>
                        next
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* QuizBody */}
            </div>
            <div className=" col-span-2 hidden lg:block">
              <div className=" flex flex-col justify-center items-center ">
                {/* Clock */}
                <div
                  className={`mt-2  relative flex justify-center items-center h-40 w-40 rounded-full shadow-lg ${
                    theme === "dark" ? " dark_theme " : "clock_circle"
                  }`}>
                  <span className=" absolute top-3 left-1/2 h-3 w-0.5 bg-gray-300 dark:bg-gray-500 "></span>
                  <span className="absolute right-4 top-1/2 h-3 w-0.5 bg-gray-300  dark:bg-gray-500 rotate-90"></span>
                  <span className=" absolute bottom-3 left-1/2 h-3 w-0.5 bg-gray-300 dark:bg-gray-500 "></span>
                  <span className="absolute left-4 top-1/2 h-3 w-0.5 bg-gray-300 dark:bg-gray-500 rotate-90"></span>

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2   h-2 w-2 rounded-full bg-purple-900  "></div>
                  <div
                    style={{
                      transform: `rotate(${(30 - countdown / 1000) * 12}deg)`,
                    }}
                    className=" bottom-1/2 left-1/2  absolute h-12 w-0.5 rounded-full bg-purple-900 origin-bottom"
                    id="clock-seconds">
                    <div className=" absolute  -bottom-4 right-0 h-5 w-0.5 bg-purple-900"></div>
                  </div>
                </div>
                {/* Clock */}

                <div className=" flex ">
                  {/* Timer */}
                  <div className=" my-4 mx-2 flex justify-center items-center  w-12 h-12 rounded-lg bg-gradient-to-t from-gray-400/80 to-gray-50  dark:from-gray-900  dark:to-gray-700  shadow-lg">
                    <p className=" text-2xl font-bold text-gray-500  dark:text-gray-300">
                      {`${"0" + Math.floor(countdown / 1000 / 10)}`}
                    </p>
                  </div>

                  <div className=" my-4 mx-2 flex justify-center items-center  w-12 h-12 rounded-lg bg-gradient-to-t from-gray-400/80 to-gray-50  dark:from-gray-900  dark:to-gray-700  shadow-lg">
                    <p className=" text-2xl font-bold text-gray-500  dark:text-gray-300">
                      {`${"0" + ((countdown / 1000) % 10)}`}
                    </p>
                  </div>
                  {/* Timer */}
                </div>
              </div>
              {/* AnswerBroad */}
              <div className="rounded-xl shadow-2xl px-4 py-2 mr-6 dark:bg-slate-800/60">
                <div className=" flex justify-center items-center pb-2 text-xl font-semibold capitalize text-gray-500  dark:text-gray-200 border-b dark:border-sky-500/50 border-sky-100">
                  <p>total answer</p>
                </div>
                <div className="grid grid-cols-4 py-2  gap-2">
                  {answer
                    ?.slice(startRow, end)
                    .map((item: { id: string; correct: boolean }) => (
                      <div
                        key={item.id}
                        className={`flex items-center justify-center h-10 w-10 rounded-full   cursor-pointer bg-white dark:bg-slate-800   transition-all duration-300 font-medium dark:text-gray-50 border-2 ${
                          item.correct
                            ? " hover:text-gray-50 bg-green-50  border-green-400 hover:bg-green-400 "
                            : " bg-red-50 border-red-400 hover:bg-red-400 hover:text-gray-50  "
                        }`}>
                        {item.id}
                      </div>
                    ))}
                  {rows.map((item) => item)}
                </div>
                <div className="border-t border-sky-200 dark:border-sky-500/50 pt-1">
                  <p className=" text-gray-400 text-center">view all</p>
                </div>
              </div>
              {/* AnswerBroad */}
              <div className=" flex flex-col justify-evenly mt-4">
                {/* SubmitBases */}
                <div className=" relative mb-3 cursor-pointer group  transition-all duration-500">
                  <div
                    className={`absolute top-0 left-10 h-full  bg-gray-50 dark:bg-gray-800/60 rounded-lg border-r-8  group-hover:w-5/6 transition-all duration-700  overflow-hidden border-sky-400/70 dark:border-sky-800 ${
                      currantQuestionId % 5 == 0 ? " w-5/6 " : " w-0 "
                    } `}>
                    <div className=" absolute bottom-0 bg-gradient-to-b from-gray-300/60 to-gray-200/30  dark:from-gray-500/30  dark:to-gray-700/20 left-0 w-full h-1/2 "></div>

                    <div className=" text-center transition-all duration-700">
                      <h1 className=" text-4xl text-gray-500  dark:text-slate-200 font-bold tracking-widest">
                        {totalCorrectAns}
                      </h1>
                      <p className=" py-2 capitalize  text-xl text-gray-400  font-bold">
                        correct answers
                      </p>
                    </div>
                  </div>
                  <div className=" py-1">
                    <div className=" p-1 flex justify-center items-center  h-20 w-20 rounded-3xl shadow-2xl  bg-gradient-to-tl from-gray-50 to-gray-100  dark:from-slate-800  dark:to-slate-700 rotate-45 overflow-hidden">
                      <div
                        className={`flex  justify-center items-center rounded-3xl  h-full w-full   bg-gradient-to-tl  to-gray-50  dark:to-slate-900 from-sky-600/30 `}>
                        <div
                          className={`p-1 bg-gradient-to-b  rounded-full border-4  shadow-2xl  text-gray-200  border-sky-400 shadow-sky-500 from-sky-100 to-sky-500 dark:from-slate-900/60 dark:to-slate-800/40 dark:border-slate-700 dark:shadow-sky-900 dark:text-sky-500 `}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className=" h-8 w-8 -rotate-45"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" relative mb-3 cursor-pointer group  transition-all duration-500">
                  <div
                    className={`absolute top-0 left-10 h-full  bg-gray-50 dark:bg-gray-800/60 rounded-lg border-r-8  group-hover:w-5/6 transition-all duration-700  overflow-hidden border-red-400/70 dark:border-red-900 ${
                      currantQuestionId % 5 == 0 ? " w-5/6 " : " w-0 "
                    } `}>
                    <div className=" absolute bottom-0 bg-gradient-to-b from-gray-300/60 to-gray-200/30  dark:from-gray-500/30  dark:to-gray-700/20 left-0 w-full h-1/2 "></div>

                    <div className=" text-center transition-all duration-700">
                      <h1 className=" text-4xl text-gray-500  dark:text-slate-200 font-bold tracking-widest">
                        {totalWrongAns}
                      </h1>
                      <p className=" py-2 capitalize  text-xl text-gray-400  font-bold">
                        wrong answers
                      </p>
                    </div>
                  </div>
                  <div className=" py-1">
                    <div className=" p-1 flex justify-center items-center  h-20 w-20 rounded-3xl shadow-2xl  bg-gradient-to-tl from-gray-50 to-gray-100  dark:from-slate-800  dark:to-slate-700 rotate-45 overflow-hidden">
                      <div
                        className={`flex  justify-center items-center rounded-3xl  h-full w-full   bg-gradient-to-tl  to-gray-50  dark:to-slate-900 from-red-600/30`}>
                        <div
                          className={`p-1 bg-gradient-to-b  rounded-full border-4  shadow-2xl  text-gray-200 border-red-400 shadow-red-500 from-red-100 to-red-500 dark:from-slate-900/50 dark:to-slate-800/40 dark:border-slate-700/60 dark:shadow-sky-900 dark:text-red-600 `}>
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
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SubmitBases */}
              </div>
              {/* 
          <div className=" flex flex-col justify-evenly mt-4">
            <SubmitBases totalAns={totalCorrectAns} />
            <SubmitBases totalAns={totalWrongAns} color="red" />
          </div> */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
