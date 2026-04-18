"use client"
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { signIn } from "next-auth/react";

const LoginPage = () => {

  return (
    <>
      <div className="max-h-dvh py-8 flex justify-center items-center px-auto">
        <div className="sm:w-90 max-sm:mx-3  rounded-t-2xl bg-[#f5f5f5] h-100 space-y-12">
          <div className="bg-[#97e292] max-sm:px-3 rounded-t-2xl flex h-20 items-center justify-center text-white font-bold">
            <div className="bg-white px-3 py-2 rounded-2xl">
              <h1 className="text-black sm:text-xl">
                Log In to Orda
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 bg-[#97e292] font-semibold py-4">
            <button onClick={()=>signIn("google", {redirectTo:"/"})}>
            <div className="bg-white px-3 py-2 rounded-2xl flex gap-2 mx-5 cursor-pointer  items-center justify-center">
              <h1>Log In With Google</h1>
              <span>
                <FcGoogle />
              </span>
            </div>
            </button>

           <button>
            <div className="bg-white px-3 py-2 rounded-2xl flex gap-2 mx-5 cursor-pointer items-center justify-center">
              <h1>Log In With X</h1>
              <span>
                <FaXTwitter />
              </span>
            </div>
           </button>

            <button>
            <div className="bg-white px-3 py-2 rounded-2xl flex gap-2 mx-5 cursor-pointer  items-center justify-center">
              <h1>Log In With Github</h1>
              <span>
                <FaGithub />
              </span>
            </div>
            </button>
          </div>

            <Link href={"/login"} className="text-xs flex items-center justify-center font-semibold bg-[#97e292] mx-5 my-2 py-3"><h1>Already have an account? <span className="underline">Log in</span></h1></Link>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
