import React, { useEffect, useRef, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/logo5.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import CTAButton from "../core/HomePage/CTAButton";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { IoIosArrowDown } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";
import axios from "axios";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const Navbar = () => {
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const ref = useRef(null);

  useOnClickOutside(ref, () => setIsMenuOpen(false));

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          "https://codemon-backend-0nfe.onrender.com/api/v1/course/showAllCategories"
        );
        setSubLinks(res.data.data);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
    })();
  }, []);

  function matchRouth(route) {
    return matchPath({ path: route }, location.pathname);
  }

  return (
    <div
      ref={ref}
      className="flex h-20 relative items-center justify-center border-b border-b-richblack-300 z-50 bg-richblack-900"
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between my-auto">
        {/* Logo */}
        <Link to={"/"}>
          <img src={logo} alt="Logo" width={90} height={50} />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index} className="relative">
                {link.title === "Catalog" ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsCatalogOpen((prev) => !prev)}
                      className="flex items-center gap-1 cursor-pointer text-white"
                    >
                      <span>{link.title}</span>
                      <IoIosArrowDown
                        className={`transition-transform duration-200 ${
                          isCatalogOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Dropdown */}
                    {isCatalogOpen && (
                      <div className="absolute left-0 top-full mt-2 w-[260px] flex-col rounded-2xl bg-white shadow-xl ring-1 ring-black/10 animate-fadeIn z-[9999]">
                        {subLinks &&
                          subLinks.map((subLink, index) => (
                            <Link
                              key={index}
                              to={`/catalog/${subLink.name}`}
                              className="px-4 py-3 text-sm text-richblack-700 hover:bg-richblue-400 hover:text-richblack-5 rounded-lg transition-colors duration-200 block"
                              onClick={() => setIsCatalogOpen(false)}
                            >
                              {subLink.name}
                            </Link>
                          ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to={link.path}>
                    <p
                      className={`${
                        matchRouth(link.path) ? "text-yellow-200" : "text-white"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Section */}
        <div className="hidden md:flex gap-x-4 items-center">
          {user && user.accountType !== "Instructor" && (
            <Link to={"/dashboard/cart"} className="relative">
              <AiOutlineShoppingCart className="text-white text-xl" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null && (
            <div className="flex gap-4">
              <CTAButton active={true} linkTo={"/login"}>
                Login
              </CTAButton>
              <CTAButton active={false} linkTo={"/signup"}>
                Signup
              </CTAButton>
            </div>
          )}

          {token !== null && <ProfileDropDown />}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen((prev) => !prev)}>
            {isMenuOpen ? (
              <FiX className="text-white text-2xl" />
            ) : (
              <FiMenu className="text-white text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-richblack-800 p-6 flex flex-col gap-4 md:hidden z-[9999]">
          {NavbarLinks.map((link, index) => (
            <div key={index} className="w-full">
              {link.title === "Catalog" ? (
                <div className="flex flex-col">
                  <button
                    onClick={() => setIsCatalogOpen((prev) => !prev)}
                    className="flex items-center justify-between text-white w-full"
                  >
                    {link.title}
                    <IoIosArrowDown
                      className={`transition-transform duration-200 ${
                        isCatalogOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isCatalogOpen && (
                    <div className="mt-2 flex flex-col gap-2 pl-4">
                      {subLinks.map((subLink, i) => (
                        <Link
                          key={i}
                          to={`/catalog/${subLink.name}`}
                          className="text-richblack-200 hover:text-yellow-200"
                          onClick={() => {
                            setIsCatalogOpen(false);
                            setIsMenuOpen(false);
                          }}
                        >
                          {subLink.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={link.path}
                  className={`${
                    matchRouth(link.path) ? "text-yellow-200" : "text-white"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.title}
                </Link>
              )}
            </div>
          ))}

          <div className="flex flex-row gap-3 mt-4 justify-between items-center">
            {user && user.accountType !== "Instructor" && (
              <Link to={"/dashboard/cart"} className="relative text-white">
                <AiOutlineShoppingCart className="text-xl inline" />
                {totalItems > 0 && (
                  <span className="ml-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

            {token === null && (
              <>
                <CTAButton active={true} linkTo={"/login"}>
                  Login
                </CTAButton>
                <CTAButton active={false} linkTo={"/signup"}>
                  Signup
                </CTAButton>
              </>
            )}
            {token !== null && <ProfileDropDown />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
