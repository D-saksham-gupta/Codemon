// import { useState } from "react";
// import { VscSignOut } from "react-icons/vsc";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import { sidebarLinks } from "../../../data/dashboard-links";
// import { logout } from "../../../services/operations/authAPI";
// //import ConfirmationModal from "../../common/ConfirmationModal"
// import SidebarLink from "./SidebarLink";

// export default function Sidebar() {
//   const { user, loading: profileLoading } = useSelector(
//     (state) => state.profile
//   );
//   const { loading: authLoading } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   // to keep track of confirmation modal
//   const [confirmationModal, setConfirmationModal] = useState(null);

//   if (profileLoading || authLoading) {
//     return (
//       <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
//         <div className="spinner"></div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="flex h-100vh min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
//         <div className="flex flex-col">
//           {sidebarLinks.map((link) => {
//             if (link.type && user?.accountType !== link.type) return null;
//             return (
//               <SidebarLink key={link.id} link={link} iconName={link.icon} />
//             );
//           })}
//         </div>
//         <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
//         <div className="flex flex-col">
//           <SidebarLink
//             link={{ name: "Settings", path: "/dashboard/settings" }}
//             iconName="VscSettingsGear"
//           />
//           <button
//             onClick={() =>
//               setConfirmationModal({
//                 text1: "Are you sure?",
//                 text2: "You will be logged out of your account.",
//                 btn1Text: "Logout",
//                 btn2Text: "Cancel",
//                 btn1Handler: () => dispatch(logout(navigate)),
//                 btn2Handler: () => setConfirmationModal(null),
//               })
//             }
//             className="px-8 py-2 text-sm font-medium text-richblack-300"
//           >
//             <div className="flex items-center gap-x-2">
//               <VscSignOut className="text-lg" />
//               <span>Logout</span>
//             </div>
//           </button>
//         </div>
//       </div>
//       {/* {confirmationModal && <ConfirmationModal modalData={confirmationModal} />} */}
//     </>
//   );
// }
import { useState, useEffect } from "react";
import { VscSignOut, VscChromeClose, VscArrowRight } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import SidebarLink from "./SidebarLink";
import ConfirmationModal from "../../common/ConfirmationModal";

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [confirmationModal, setConfirmationModal] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // sidebar toggle for mobile

  // Close sidebar whenever route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="absolute top-4 left-4 z-49 flex items-center justify-center rounded-md bg-richblack-800 p-2 text-white lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <VscChromeClose size={24} /> : <VscArrowRight size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed z-[9999] top-0 left-0 h-full w-[220px] transform border-r border-richblack-700 bg-richblack-800 py-10 transition-transform duration-300 lg:relative lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null;
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            );
          })}
        </div>

        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />

        <div className="flex flex-col">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-8 py-2 text-sm font-medium text-richblack-300 flex gap-2 items-center hover:bg-richblack-600"
          >
            <VscSignOut className="text-lg" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Dark overlay when sidebar is open (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}
