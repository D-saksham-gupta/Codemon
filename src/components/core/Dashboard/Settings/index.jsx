import Sidebar from "../Sidebar";
import ChangeProfilePicture from "./ChangeProfilePicture";
import DeleteAccount from "./DeleteAccount";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";

export default function Settings() {
  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto p-5">
        <h1 className="mb-14 text-3xl text-richblack-5 text-center font-inter font-bold bg-pink-800 p-3 ">
          Settings
        </h1>
        {/* Change Profile Picture */}
        <ChangeProfilePicture />
        {/* Profile */}
        <EditProfile />
        {/* Password */}
        <UpdatePassword />
        {/* Delete Account */}
        <DeleteAccount />
      </div>
    </div>
  );
}
