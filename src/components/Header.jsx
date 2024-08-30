import React, { useState } from 'react';
import {Link} from 'react-router-dom'

function Header() {

  //for dropdown menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="px-4 lg:px-6 py-2.5 bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <span className="text-xl pl-2 lg:text-2xl font-bold whitespace-nowrap text-white">V<span className="text-green-500">O</span>D</span>
          </Link>

          <div className="flex items-center lg:order-2">
            <Link to='/search' className="text-white hover:text-green-400 font-medium rounded-lg text-sm mr-6"><i className="fa-solid fa-magnifying-glass"></i></Link>
            <a href="#" className="text-white hover:text-green-400 font-medium rounded-lg text-sm md:mr-6 lg:mr-6"><i className="fa-regular fa-user"></i></a>
            <a href="#" className="text-white hover:text-green-400 font-medium rounded-lg text-sm hidden md:block lg:block"><i className="fa-solid fa-arrow-right-from-bracket"></i></a>

            <button onClick={toggleMenu} type="button" className="inline-flex items-center p-2 ml-2 text-sm text-white rounded-lg lg:hidden hover:text-green-400">
              <svg className={`w-6 h-6 ${isMenuOpen ? 'hidden' : 'block'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
              </svg>
              <svg className={`w-6 h-6 ${isMenuOpen ? 'block' : 'hidden'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>

          <div className={`justify-between items-center w-full lg:flex lg:w-auto lg:order-1 ${isMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu-2">
            <ul className="flex flex-col self-start mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              
              <li>
                <Link to="/categories" className="block py-2 pr-4 pl-3 text-slate-200 hover:text-green-400 lg:hover:border-b lg:hover:border-green-400 ">Categories</Link>
              </li>
              <li>
                <Link to="/genres/:genreId" className="block py-2 pr-4 pl-3 text-slate-200 hover:text-green-400 lg:hover:border-b lg:hover:border-green-400 ">Genres</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
