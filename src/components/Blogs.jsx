import React, { useEffect, useState } from 'react'
import Blogcard from './Blogcard'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { searchItem } from '../features/create_post';
const Blogs = () => {
    
  
  const [keyword,setKeyword] = useState('');
  const dispatch = useDispatch();
  const getValue =(e) =>{
      const value = e.target.value;
      setKeyword(value)
  }

  useEffect(() =>{
      dispatch(searchItem(keyword));
    },[keyword]);
  return (
    <>
     {/* content section */}
     <div className="container mx-auto ">
        <div className="flex justify-between pt-6">
          <h4 className='font-bold'>Blogs</h4>
          <div className="content flex gap-6">
            
          <div
              className="relative flex"
              data-twe-input-wrapper-init
              data-twe-input-group-ref
            >
              <input
                type="search"
                className="peer block min-h-[auto]  rounded border-0 px-3 shadow-lg py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                placeholder="Search"
                aria-label="Search"
                id="search-focus"
                // value={keyword}
                onChange={getValue}
                aria-describedby="basic-addon4"
              />
              <label
                htmlFor="search-focus"
                className="pointer-events-none absolute left-3  top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
              >
                Search
              </label>
              <button
                className="relative z-[2] -ms-0.5 flex items-center rounded-e bg-black px-5  text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                type="button"
                id="button-addon4"
                data-twe-ripple-init
                data-twe-ripple-color="light"
              >
                <span className="[&>svg]:h-5 [&>svg]:w-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </span>
              </button>
            </div>
          <Link to="/create" className="btn bg-black text-white px-2 py-1 rounded">
            Create
          </Link>
          </div>
        </div>
        {/* blog section */}
          <Blogcard />
      </div> 
    </>
  )
}

export default Blogs
