import Form from "next/form";
import { Search } from "lucide-react";
import SearchFormReset from "./searchFormReset";

const SearchForm = ({query = ""}:{query?: string}) => {



  return (
    <Form
      action={"/products"}
      scroll={false}
      id="searchformp"
      className=" max-sm:h-6 h-8 max-lg:w-40 px-3 py-2 lg:px-8 flex items-center justify-center bg-white border border-black rounded-full"
    >
      <input
        name="query"
        defaultValue={query}
        placeholder="search items"
        className="placeholder:text-sm w-full lg:pl-8 outline-none border-none flex items-center  placeholder:text-black-100 "
      />

      <div className="flex gap-2">

      {query && <SearchFormReset/>}

        <button type="submit" className="">
          <Search size={20} className="text-[97e292]"/>
         
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
