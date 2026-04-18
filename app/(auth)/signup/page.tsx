import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <>
      <div className="max-h-dvh py-8 flex justify-center items-center px-auto">
        <div className="sm:w-90 max-sm:mx-3  rounded-t-2xl bg-[#f5f5f5] h-100 space-y-12">
          <div className="bg-[#97e292] max-sm:px-3 rounded-t-2xl flex h-20 items-center justify-center text-white font-bold">
            <div className="bg-white px-3 py-2 rounded-2xl">
              <h1 className="text-black sm:text-xl">
                Create an account with Orda
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 bg-[#97e292] font-semibold py-4">
            <Link href={"/signup"}>
            <div className="bg-white px-3 py-2 rounded-2xl flex gap-2 mx-5  items-center justify-center">
              <h1>Sign Up With Google</h1>
              <span>
                <FcGoogle />
              </span>
            </div>
            </Link>

           <Link href={"/signup"}>
            <div className="bg-white px-3 py-2 rounded-2xl flex gap-2 mx-5  items-center justify-center">
              <h1>Sign Up With X</h1>
              <span>
                <FaXTwitter />
              </span>
            </div>
           </Link>

            <Link href={"/signup"}>
            <div className="bg-white px-3 py-2 rounded-2xl flex gap-2 mx-5  items-center justify-center">
              <h1>Sign Up With Github</h1>
              <span>
                <FaGithub />
              </span>
            </div>
            </Link>
          </div>

            <Link href={"/login"} className="text-xs flex items-center justify-center font-semibold bg-[#97e292] mx-5 my-2 py-3"><h1>Already have an account? <span className="underline">Log in</span></h1></Link>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
