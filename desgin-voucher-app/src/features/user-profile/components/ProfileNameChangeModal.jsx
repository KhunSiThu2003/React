import React, { useEffect } from "react";
import useCookie from "react-use-cookie";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useUserStore from "../../../stores/useUserStore";
import { changeName } from "../../../services/profile";

const ProfileNameChangeModal = ({ isOpenChangeNameModal, setIsOpenChangeNameModal }) => {
  const [userCookie, setUserCookie] = useCookie("user");
  const parsed = userCookie ? JSON.parse(userCookie) : {};
  const { name: initialName } = parsed;

  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
  const { user, setUser } = useUserStore();

  useEffect(() => {
    if (isOpenChangeNameModal && user?.name) {
      setValue("name", user.name);
    }
  }, [isOpenChangeNameModal, user, setValue]);

  const handleUpdateName = async (data) => {
    const res = await changeName(data);
    const json = await res.json();

    if (res.status === 200) {
      toast.success(json.message);
      setUserCookie(JSON.stringify(json.user));
      setUser(json.user);
      reset();
      setIsOpenChangeNameModal(false);
    } else {
      toast.error(json.message);
    }
  };

  const handleCloseModal = () => {
    setIsOpenChangeNameModal(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target.id === "change-name-modal-backdrop") {
      handleCloseModal();
    }
  };

  return (
    <>
      {/* Full Screen Blur Background Modal */}
      <div
        id="change-name-modal-backdrop"
        className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
          isOpenChangeNameModal 
            ? "opacity-100 visible backdrop-blur-md bg-black/30" 
            : "opacity-0 invisible"
        }`}
        onClick={handleBackdropClick}
      >
        <div 
          className={`transform transition-all duration-300 ${
            isOpenChangeNameModal ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <div className="relative bg-white rounded-2xl shadow-2xl dark:bg-gray-800 mx-4 w-full max-w-md">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Change Your Name
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
              <form onSubmit={handleSubmit(handleUpdateName)} className="space-y-6">
                <div>
                  <label 
                    htmlFor="name"
                    className={`block mb-3 text-sm font-medium ${
                      errors.name ? "text-red-500" : "text-gray-900 dark:text-gray-300"
                    }`}
                  >
                    Enter Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register("name", { 
                      required: true, 
                      minLength: 3, 
                      maxLength: 30 
                    })}
                    className={`w-full px-4 py-3 text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-white border rounded-xl focus:ring-2 focus:outline-none transition-all duration-200 ${
                      errors.name 
                        ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-800" 
                        : "border-gray-300 dark:border-gray-600 focus:ring-blue-200 dark:focus:ring-blue-800 focus:border-blue-500"
                    }`}
                    placeholder="eg. Kyaw Kyaw"
                  />
                  {errors.name?.type === "required" && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Name is required
                    </p>
                  )}
                  {errors.name?.type === "minLength" && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Name must be at least 3 characters
                    </p>
                  )}
                  {errors.name?.type === "maxLength" && (
                    <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Name must be less than 30 characters
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Change Name
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileNameChangeModal;