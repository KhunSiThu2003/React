import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useCookie from "react-use-cookie";
import useUserStore from "../../../stores/useUserStore";
import { HiEye } from "react-icons/hi2";
import { changePassword } from '../../../services/profile';

const ProfilePasswordChangeModal = ({ isOpenChangePasswordModal, setIsOpenChangePasswordModal }) => {
  const [token] = useCookie("my_token");
  const { removeUser } = useUserStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    old_password: false,
    new_password: false,
    new_password_confirmation: false
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const newPassword = watch("new_password");

  const handleUpdatePassword = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await changePassword(data);

      const json = await res.json();

      if (res.ok) {
        toast.success("Password updated successfully! Please login again.");
        reset();
        setIsOpenChangePasswordModal(false);
      } else {
        toast.error(json.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Update password error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    reset();
    setIsOpenChangePasswordModal(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target.id === "change-password-modal-backdrop") {
      handleCloseModal();
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <>
      {/* Full Screen Blur Background Modal */}
      <div
        id="change-password-modal-backdrop"
        className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
          isOpenChangePasswordModal 
            ? "opacity-100 visible backdrop-blur-md bg-black/30" 
            : "opacity-0 invisible"
        }`}
        onClick={handleBackdropClick}
      >
        <div 
          className={`transform transition-all duration-300 ${
            isOpenChangePasswordModal ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <div className="relative bg-white rounded-2xl shadow-2xl dark:bg-gray-800 mx-4 w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600 sticky top-0 bg-white dark:bg-gray-800 rounded-t-2xl">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Change Your Password
              </h3>
              <button 
                type="button" 
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6">
              <form onSubmit={handleSubmit(handleUpdatePassword)} className="space-y-6">
                {/* Current Password */}
                <div>
                  <label 
                    htmlFor="old_password"
                    className={`block mb-3 text-sm font-medium ${
                      errors.old_password ? "text-red-500" : "text-gray-900 dark:text-gray-300"
                    }`}
                  >
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      id="old_password"
                      type={showPasswords.old_password ? "text" : "password"}
                      {...register("old_password", {
                        required: "Current password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters"
                        }
                      })}
                      className={`w-full px-4 py-3 pr-12 text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-white border rounded-xl focus:ring-2 focus:outline-none transition-all duration-200 ${
                        errors.old_password 
                          ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-800" 
                          : "border-gray-300 dark:border-gray-600 focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-500"
                      }`}
                      placeholder="Enter your current password"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('old_password')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      {showPasswords.old_password ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <HiEye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.old_password && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      {errors.old_password.message}
                    </p>
                  )}
                </div>

                {/* New Password */}
                <div>
                  <label 
                    htmlFor="new_password"
                    className={`block mb-3 text-sm font-medium ${
                      errors.new_password ? "text-red-500" : "text-gray-900 dark:text-gray-300"
                    }`}
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="new_password"
                      type={showPasswords.new_password ? "text" : "password"}
                      {...register("new_password", {
                        required: "New password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters"
                        },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                          message: "Must include uppercase, lowercase, number & special character"
                        }
                      })}
                      className={`w-full px-4 py-3 pr-12 text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-white border rounded-xl focus:ring-2 focus:outline-none transition-all duration-200 ${
                        errors.new_password 
                          ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-800" 
                          : "border-gray-300 dark:border-gray-600 focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-500"
                      }`}
                      placeholder="Enter your new password"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('new_password')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      {showPasswords.new_password ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <HiEye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.new_password && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      {errors.new_password.message}
                    </p>
                  )}
                </div>

                {/* Confirm New Password */}
                <div>
                  <label 
                    htmlFor="new_password_confirmation"
                    className={`block mb-3 text-sm font-medium ${
                      errors.new_password_confirmation ? "text-red-500" : "text-gray-900 dark:text-gray-300"
                    }`}
                  >
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      id="new_password_confirmation"
                      type={showPasswords.new_password_confirmation ? "text" : "password"}
                      {...register("new_password_confirmation", {
                        required: "Please confirm your password",
                        validate: value => 
                          value === newPassword || "Passwords do not match"
                      })}
                      className={`w-full px-4 py-3 pr-12 text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-white border rounded-xl focus:ring-2 focus:outline-none transition-all duration-200 ${
                        errors.new_password_confirmation 
                          ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-800" 
                          : "border-gray-300 dark:border-gray-600 focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-500"
                      }`}
                      placeholder="Confirm your new password"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('new_password_confirmation')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      {showPasswords.new_password_confirmation ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <HiEye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.new_password_confirmation && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      {errors.new_password_confirmation.message}
                    </p>
                  )}
                </div>


                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Updating...
                      </>
                    ) : (
                      "Change Password"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePasswordChangeModal