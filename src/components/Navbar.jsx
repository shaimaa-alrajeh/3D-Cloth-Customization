import { useState } from 'react';
import { FaChevronDown, FaBars, FaTimes } from 'react-icons/fa'; // Importing icons
import state from '../store'; // Assuming this is where your state resides
import { useSnapshot } from 'valtio';

const Navbar = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu
  const snap = useSnapshot(state); // To observe state changes

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleNavClick = () => {
    state.intro = false; // Set intro to false
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="absolute top-0 left-0 w-full p-2 flex items-center justify-between bg-transparent z-30 mt-10">
        {/* Logo */}
        <div className="flex items-center absolute mb-10 "> 
            <img
              src="./threejs.png"
              alt="Logo"
              className="w-48 h-32 object-contain filter invert" 
            />
        </div>


        {/* Desktop Navbar */}
        <div className="hidden lg:flex justify-center items-center space-x-10 text-white w-full">
          <a href="#" className="text-lg cursor-pointer" >Home</a>
          <div className="relative">
            <a
              className="text-lg cursor-pointer flex items-center"
              onClick={() => {
                handleCategoryClick('Girls');
              }}
            >
              Girls
              <FaChevronDown className="ml-2" />
            </a>
            {selectedCategory === 'Girls' && (
              <div className="absolute left-0 mt-2 w-40 bg-transparent text-white rounded-md shadow-md">
                <a
                  className="block px-4 py-2 hover:bg-gray-300 cursor-pointer"
                  onClick={handleNavClick}
                >
                  Dresses
                </a>
                <a
                  className="block px-4 py-2 hover:bg-gray-300 cursor-pointer"
                  onClick={handleNavClick}
                >
                  Wedding Dresses
                </a>
              </div>
            )}
          </div>

          <div className="relative">
            <a
              className="text-lg cursor-pointer flex items-center"
              onClick={() => {
                handleCategoryClick('Boys');
              }}
            >
              Boys
              <FaChevronDown className="ml-2" />
            </a>
            {selectedCategory === 'Boys' && (
              <div className="absolute left-0 mt-2 w-40 bg-transparent text-white rounded-md shadow-md">
                <a
                  className="block px-4 py-2 hover:bg-gray-300 cursor-pointer"
                  onClick={handleNavClick}
                >
                  Shirt
                </a>
                <a
                  className="block px-4 py-2 hover:bg-gray-300 cursor-pointer"
                  onClick={handleNavClick}
                >
                  Sweater
                </a>
              </div>
            )}
          </div>

          <div className="relative">
            <a
              className="text-lg cursor-pointer flex items-center"
              onClick={() => {
                handleCategoryClick('Childrens');
              }}
            >
              Childrens
              <FaChevronDown className="ml-2" />
            </a>
            {selectedCategory === 'Childrens' && (
              <div className="absolute left-0 mt-2 w-40 bg-transparent text-white rounded-md shadow-md">
                <a
                  className="block px-4 py-2 hover:bg-gray-300 cursor-pointer"
                  onClick={handleNavClick}
                >
                  Girls
                </a>
                <a
                  className="block px-4 py-2 hover:bg-gray-300 cursor-pointer"
                  onClick={handleNavClick}
                >
                  Boys
                </a>
              </div>
            )}
          </div>

          <a className="text-lg cursor-pointer" onClick={handleNavClick}>
            Couples
          </a>
        </div>

        {/* Hamburger Menu for Small Screens */}
        <div className="lg:hidden flex items-center ml-auto text-white">
          <button onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden flex flex-col items-center text-white p-4 space-y-4">
          <a className="text-lg cursor-pointer" onClick={handleNavClick}>
            Home
          </a>
          <a className="text-lg cursor-pointer" onClick={handleNavClick}>
            Girls
          </a>
          <a className="text-lg cursor-pointer" onClick={handleNavClick}>
            Boys
          </a>
          <a className="text-lg cursor-pointer" onClick={handleNavClick}>
            Childrens
          </a>
          <a className="text-lg cursor-pointer" onClick={handleNavClick}>
            Couples
          </a>
        </div>
      )}
    </div>
  );
};

export default Navbar;
