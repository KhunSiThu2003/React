import {
  HiLockOpen,
  HiPencilSquare,
  HiUser,
  HiEnvelope,
  HiPhoto,
} from "react-icons/hi2";
import useUserStore from "../../../stores/useUserStore";
import ProfileNameChangeModal from "./ProfileNameChangeModal";
import ProfilePasswordChangeModal from "./ProfilePasswordChangeModal";
import ProfileImageChangeModal from "./ProfileImageChangeModal";
import React, { useState } from "react";

const UserProfileCard = () => {
  const [isOpenChangeNameModal, setIsOpenChangeNameModal] = useState(false);
  const [isOpenChangePasswordModal, setIsOpenChangePasswordModal] = useState(false);
  const [isOpenChangeImageModal, setIsOpenChangeImageModal] = useState(false);
  
  const {
    user: { name, email, profile_image },
  } = useUserStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Profile Settings
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Profile Image Section */}
          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <img
                    className="size-32 rounded-2xl object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                    src={
                      profile_image
                        ? profile_image
                        : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                    }
                    alt="Profile photo"
                  />
                  <button
                    onClick={() => setIsOpenChangeImageModal(true)}
                    className="absolute bottom-0 right-0 translate-x-1/2 -translate-y-1/2 size-10 flex justify-center items-center rounded-full bg-blue-600 text-white hover:bg-blue-700 shadow-lg transition-all duration-200 hover:scale-110"
                  >
                    <HiPhoto className="size-4" />
                  </button>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {name}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  {email}
                </p>
                
              </div>
            </div>
          </div>

          {/* Profile Information Section */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              {/* Personal Information Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <HiUser className="size-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Personal Information
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Update your personal details
                    </p>
                  </div>
                </div>
              </div>

              {/* Name Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-300">
                    Your Name
                  </span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                  <HiUser className="size-5 text-gray-400" />
                  <span className="flex-1 text-gray-900 dark:text-white font-medium">
                    {name}
                  </span>
                  <button 
                    onClick={() => setIsOpenChangeNameModal(true)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/50 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-all duration-200"
                  >
                    <HiPencilSquare className="size-4" />
                    Edit
                  </button>
                </div>
              </div>

              {/* Email Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:text-green-300">
                    Verified
                  </span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                  <HiEnvelope className="size-5 text-gray-400" />
                  <span className="flex-1 text-gray-900 dark:text-white">
                    {email}
                  </span>
                  <button 
                    disabled
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 dark:bg-gray-600 rounded-lg cursor-not-allowed"
                  >
                    <HiPencilSquare className="size-4" />
                    Contact Admin
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  For email changes, please contact system administrator
                </p>
              </div>

              {/* Security Section */}
              <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                    <HiLockOpen className="size-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Security
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Manage your password and security settings
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpenChangePasswordModal(true)}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <HiLockOpen className="size-5" />
                  Change Password
                </button>

                <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <div className="size-5 bg-yellow-400 rounded-full flex items-center justify-center mt-0.5">
                        <HiLockOpen className="size-3 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                        Security Tip
                      </h4>
                      <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">
                        Use a strong, unique password and update it regularly to keep your account secure.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ProfileNameChangeModal 
        isOpenChangeNameModal={isOpenChangeNameModal} 
        setIsOpenChangeNameModal={setIsOpenChangeNameModal} 
      />
      
      <ProfilePasswordChangeModal 
        isOpenChangePasswordModal={isOpenChangePasswordModal} 
        setIsOpenChangePasswordModal={setIsOpenChangePasswordModal} 
      />
      
      <ProfileImageChangeModal 
        isOpenChangeImageModal={isOpenChangeImageModal} 
        setIsOpenChangeImageModal={setIsOpenChangeImageModal} 
      />
    </div>
  );
};

export default UserProfileCard;