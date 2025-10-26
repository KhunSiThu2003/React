import React from "react";
import Container from "../components/Container";
import Breadcrumb from "../components/Breadcrumb";
import { HiLockOpen, HiPencilSquare } from "react-icons/hi2";
import { Link } from "react-router-dom";
import useUserStore from "../stores/useUserStore";

const UserProfilePage = () => {
  const {
    user: { name, email, profile_image },
  } = useUserStore();

  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <Container>
        <Breadcrumb currentPageTitle={"User Profile"} />

        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-8 space-y-8 border border-gray-100">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-6 border-b pb-6">
            <div className="relative">
              <img
                className="size-32 rounded-xl border-4 border-gray-200 shadow-sm object-cover"
                src={
                  profile_image
                    ? profile_image
                    : "https://static.vecteezy.com/system/resources/previews/020/911/740/non_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png"
                }
                alt="user"
              />

              <Link
                to={"user-change-image"}
                className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow-md transition"
              >
                <HiPencilSquare size={14} />
              </Link>
            </div>

            <div className="flex-1">
              <p className="text-xs uppercase font-medium text-blue-500 mb-2">
                Your Name
              </p>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {name}
                </h2>
                <Link
                  to="user-change-name"
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 transition"
                >
                  <HiPencilSquare size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-4">
            <dl>
              <dt className="text-sm font-semibold text-gray-700">
                Email Address
              </dt>
              <dd className="text-gray-500">{email}</dd>
            </dl>
          </div>

          {/* Action Button */}
          <div className="pt-4 border-t">
            <Link to="user-change-password" 
              type="button"
              className="w-full sm:w-auto inline-flex gap-2 items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition"
            >
              <HiLockOpen className="text-lg" />
              Change Password
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default UserProfilePage;
