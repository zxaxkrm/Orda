import React from "react";
import Form from "next/form";
import { Search } from "lucide-react";
import Image from "next/image";

const SearchForm = () => {
  return (
    <Form
      action={"/"}
      scroll={false}
      className=" min-h-8 px-8 flex items-center justify-center bg-white border border-black rounded-full"
    >
      <input
        name="query"
        defaultValue=""
        placeholder="search items"
        className="placeholder:text-sm w-full  pl-8 outline-none border-none flex items-center font-bold placeholder:font-semibold placeholder:text-black-100 "
      />

      <div className="flex gap-2">
        <button type="submit" className="">
          <Search size={20}/>
         
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
