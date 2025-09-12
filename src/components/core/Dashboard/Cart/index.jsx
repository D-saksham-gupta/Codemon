import { useSelector } from "react-redux";

import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";
import Sidebar from "../Sidebar";
import { AiFillFrown } from "react-icons/ai";

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart);

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto m-5">
        <h1 className="mb-14 text-3xl text-richblack-900 text-center font-inter font-bold bg-yellow-50 p-3">
          Cart
        </h1>
        <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">
          {totalItems} Courses in Cart
        </p>
        {total > 0 ? (
          <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
            <RenderCartCourses />
            <RenderTotalAmount />
          </div>
        ) : (
          <p className="mt-14 text-center text-3xl text-richblack-100 flex gap-2 lg:ml-96">
            Your cart is empty{" "}
            <span>
              <AiFillFrown />
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
