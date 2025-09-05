import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/logo4.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import CTAButton from "../core/HomePage/CTAButton";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";

const Navbar = () => {
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);

  useEffect(() => {
    (async () => {
      //setLoading(true);
      try {
        //const res = await apiConnector("GET", categories.CATEGORIES_API);
        const res = await axios.get(
          "http://localhost:4000/api/v1/course/showAllCategories"
        );
        setSubLinks(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      //setLoading(false);
    })();
  }, []);
  function matchRouth(route) {
    return matchPath({ path: route }, location.pathname);
  }
  return (
    <div className="flex h-20 relative items-center justify-center border-b-[1px] border-b-richblack-300">
      <div className="flex w-11/12 sticky max-w-maxContent items-center justify-between">
        <Link to={"/"}>
          <img src={logo} alt="" width={160} height={50} />
        </Link>
        {/* Adding nav links */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => {
              return (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div className="relative flex items-center gap-2 group">
                      <p>{link.title}</p>
                      <IoIosArrowDown />
                      <div className="invisible absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[10%] flex flex-col rounded-md bg-richblack-5 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px] group-hover:z-50">
                        {subLinks &&
                          subLinks.map((subLink, index) => (
                            <div className="">
                              <Link
                                to={`/catalog/${subLink.name}`}
                                className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                key={index}
                              >
                                <p>{subLink.name}</p>
                              </Link>
                            </div>
                          ))}
                      </div>
                    </div>
                  ) : (
                    <Link to={link.path}>
                      <p
                        className={`${
                          matchRouth(link.path)
                            ? "text-yellow-200"
                            : "text-white"
                        }`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Login/Signup/Dashboard */}

        <div className="flex gap-x-4 items-center">
          {user && user.accountType !== "Instructor" && (
            <Link to={"/dashboard/cart"} className="relative">
              <AiOutlineShoppingCart />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}

          {token === null && (
            <div className="flex gap-4">
              <Link to={"/login"} className="text-white">
                <CTAButton
                  active={true}
                  linkTo={"/login"}
                  className="bg-richblack-200"
                >
                  Login
                </CTAButton>
              </Link>
              <Link to={"/signup"} className="text-white">
                <CTAButton active={false} linkTo={"/signup"}>
                  Signup
                </CTAButton>
              </Link>
            </div>
          )}

          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
