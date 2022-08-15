/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { Cookies } from "next/dist/server/web/spec-extension/cookies";
import { initializeApp } from "firebase/app";
import Image from "next/image";
import router, { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Store } from "../Data/Store/Store";
import avatar from "../public/bg.jpeg";
import icon from "../public/icon.png";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  //firebaseConfig
  const firebaseConfig = {
    apiKey: "AIzaSyAcoZkLEDfKzPaO1IAz9tP-vcHVNSaM9CU",
    authDomain: "online-quiz-21f05.firebaseapp.com",
    projectId: "online-quiz-21f05",
    storageBucket: "online-quiz-21f05.appspot.com",
    messagingSenderId: "824098514683",
    appId: "1:824098514683:web:b256ac5c33c3f75cb2f25e",
  };

  // Initialize Firebase
  const App = initializeApp(firebaseConfig);
  //firebaseConfig

  //firebaseGoogleAuth

  const firebaseAuth = getAuth(App);
  const provider = new GoogleAuthProvider();

  const signInGoogle = async () => {
    const { user } = await signInWithPopup(firebaseAuth, provider);
    const { refreshToken, providerData, uid } = user;
    const userData = {
      id: uid,
      name: providerData[0].displayName,
      email: providerData[0].email,
      img: providerData[0].photoURL,
      token: refreshToken,
    };
    dispatch({ type: "USER_LOGIN", payload: userData });
    console.log(user);
    router.push("/quiz");
  };

  useEffect(() => {
    if (userInfo.hasOwnProperty("email")) {
      router.push("/quiz");
    }
  }, []);

  const handelRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Input Field is Empty");
    } else {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setLoading(true);
        try {
          const { data } = await axios.post("/api/users/register", {
            name,
            email,
            password,
          });
          toast.success("User register successfully");
          dispatch({ type: "USER_LOGIN", payload: data });
          setLoading(false);
          router.push("/quiz");
        } catch (err) {
          setLoading(false);
          toast.error("User register Failed");
        }
      } else {
        toast.error("Email is not validated");
      }
    }
  };

  const handelLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Input Field is Empty");
    } else {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setLoading(true);
        try {
          const { data } = await axios.post("/api/users/login", {
            email,
            password,
          });
          toast.success("User login successfully");
          dispatch({ type: "USER_LOGIN", payload: data });
          setLoading(false);
          router.push("/quiz");
        } catch (err) {
          setLoading(false);
          toast.error("Invalid email or password");
        }
      } else {
        toast.error("Email is not validated");
      }
    }
  };
  return (
    <div className=" w-screen h-screen max-h-screen overflow-hidden">
      <div className=" absolute top-0 left-0 w-full h-full">
        <Image
          className=" h-screen "
          alt="avatar"
          src={avatar}
          layout="fill"
          width={600}
          height={300}></Image>
      </div>

      <div className="flex justify-center items-center h-full">
        <div className="w-5/6 md:w-4/6 lg:w-2/6 px-6 py-8 border border-sky-500/50 bg-slate-900/30 backdrop-blur  rounded-xl">
          <form className=" ">
            <h1 className=" py-4 text-base sm:text-lg md:text-4xl  text-center font-semibold text-white capitalize">
              create an account
            </h1>

            <div className=" flex flex-col items-center">
              <div
                className="flex items-center justify-center   text-xs md:text-xl font-bold bg-slate-900/30 border border-sky-500 px-4 py-2 rounded-full cursor-pointer text-slate-50  transition-all duration-300 hover:bg-slate-100  hover:text-sky-500 "
                onClick={signInGoogle}>
                <Image
                  className=""
                  alt="avatar"
                  src={icon}
                  layout="fixed"
                  width={30}
                  height={30}></Image>
                <h1 className=" ml-4   capitalize">Login with google</h1>
              </div>
              <h5 className="text-gray-400 my-5">Or Sign Up Using Details</h5>
            </div>
            {open && (
              <div className="relative my-1">
                <span className="absolute top-3 left-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 mx-2 w-6 text-sky-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </span>
                <input
                  type="text"
                  className="bg-gray-700/30 w-full h-14 mb-2 text-lg  px-4 border-2 py-2 pl-10 text-gray-100 focus:outline-none placeholder-gray-300 border-gray-500/40 transition duration-300 focus:border-sky-400 focus:bg-sky-400/30"
                  placeholder="Enter Your Name.."
                  required
                  onChange={(e) => setName(e.target.value)}></input>
              </div>
            )}
            <div className="relative my-1">
              <span className="absolute top-3 left-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 mx-2 w-6 text-sky-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                  />
                </svg>
              </span>

              <input
                type="email"
                className="bg-gray-700/30 w-full h-14 mb-2 text-lg  px-4 border-2 py-2 pl-10 text-gray-100 focus:outline-none placeholder-gray-300 border-gray-500/40 transition duration-300 focus:border-sky-400 focus:bg-sky-400/30"
                placeholder="Enter Your Email.."
                required
                onChange={(e) => setEmail(e.target.value)}></input>
            </div>

            <div className="relative my-1">
              <span className="absolute top-3 left-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 mx-2 w-6 text-sky-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>

              <span
                className="absolute top-3 right-4 text-sky-600 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                      clipRule="evenodd"
                    />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </span>

              <input
                type={showPassword ? "text" : "password"}
                className="bg-gray-700/30 w-full h-14 mb-2 text-lg  px-4 border-2 py-2 pl-10 text-gray-100 focus:outline-none placeholder-gray-300 border-gray-500/40 transition duration-300 focus:border-sky-400 focus:bg-sky-400/30"
                placeholder="Enter password.."
                required
                onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            {open ? (
              <button
                disabled={loading}
                className="py-2 text-lg sm:text-xl md:text-3xl text-center font-semibold text-white bg-sky-400 w-full h-14 capitalize disabled:opacity-50"
                onClick={handelRegister}>
                <div className=" flex justify-center items-center">
                  <h1> create account</h1>
                  <div
                    className={`animate-spin ml-5 h-6 w-6 rounded-full border-gray-400 border-r-gray-200 border-4 transition-all duration-300  ${
                      !loading && "hidden"
                    }`}></div>
                </div>
              </button>
            ) : (
              <button
                disabled={loading}
                className="py-2 text-lg sm:text-xl md:text-3xl  text-center font-semibold text-white bg-sky-400 w-full h-14 capitalize disabled:opacity-50"
                onClick={handelLogin}>
                <div className=" flex justify-center items-center">
                  <h1>Login</h1>
                  <div
                    className={`animate-spin ml-5 h-6 w-6 rounded-full border-gray-400 border-r-gray-200 border-4 transition-all duration-300  ${
                      !loading && "hidden"
                    }`}></div>
                </div>
              </button>
            )}
          </form>
          <div className="text-center mt-6">
            <a
              className="text-sky-400 flex items-center justify-center hover:text-sky-700 cursor-pointer transition duration-300"
              onClick={() => setOpen(!open)}>
              {open ? (
                <span> Already have an account</span>
              ) : (
                <span>Create a new account</span>
              )}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <ToastContainer limit={2} />
    </div>
  );
}
