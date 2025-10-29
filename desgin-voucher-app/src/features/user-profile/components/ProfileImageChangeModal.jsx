import React, { useRef, useState } from 'react'
import useCookie from "react-use-cookie";
import { HiCamera, HiPencilSquare } from "react-icons/hi2";
import toast from "react-hot-toast";
import useUserStore from "../../../stores/useUserStore";
import { changeProfileImage } from '../../../services/profile';

const ProfileImageChangeModal = ({ isOpenChangeImageModal, setIsOpenChangeImageModal }) => {
  const [userCookie, setUserCookie] = useCookie("user");
  const parsed = userCookie ? JSON.parse(userCookie) : {};
  const { profile_image: currentImage } = parsed;
  
  const [token] = useCookie("my_token");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(currentImage);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { setUser } = useUserStore();
  const fileInputRef = useRef(null);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        toast.error('Please select a valid image file (JPEG, PNG, GIF, WebP)');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }

      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateImage = async () => {
    if (!selectedImage) {
      toast.error('Please select an image first');
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("profile_image", selectedImage);

      const res = await changeProfileImage(formData)
      const json = await res.json();

      if (res.status === 200) {
        toast.success(json.message);
        setUserCookie(JSON.stringify(json.user));
        setUser(json.user);
        handleCloseModal();
      } else {
        toast.error(json.message);
      }
    } catch (error) {
      console.error("Update image error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTriggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setImagePreview(currentImage);
    setIsOpenChangeImageModal(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target.id === "change-image-modal-backdrop") {
      handleCloseModal();
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
    setImagePreview(currentImage);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      {/* Full Screen Blur Background Modal */}
      <div
        id="change-image-modal-backdrop"
        className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
          isOpenChangeImageModal 
            ? "opacity-100 visible backdrop-blur-md bg-black/30" 
            : "opacity-0 invisible"
        }`}
        onClick={handleBackdropClick}
      >
        <div 
          className={`transform transition-all duration-300 ${
            isOpenChangeImageModal ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <div className="relative bg-white rounded-2xl shadow-2xl dark:bg-gray-800 mx-4 w-full max-w-md">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-600">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Change Profile Image
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

            {/* Content */}
            <div className="p-6">
              {/* Image Preview */}
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  <img
                    className="size-40 rounded-2xl object-cover border-4 border-gray-200 dark:border-gray-600"
                    src={
                      imagePreview ||
                      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                    }
                    alt="Profile preview"
                  />
                  {selectedImage && (
                    <button
                      onClick={removeSelectedImage}
                      className="absolute -top-2 -right-2 size-8 flex justify-center items-center rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* File Input (Hidden) */}
                <input
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                  className="hidden"
                  id="profile_image"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                />

                {/* Upload Button */}
                <button
                  type="button"
                  onClick={handleTriggerFileInput}
                  className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <HiCamera className="w-5 h-5" />
                  {selectedImage ? 'Change Image' : 'Choose Image'}
                </button>

                {/* File Info */}
                {selectedImage && (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Selected: <span className="font-medium">{selectedImage.name}</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      Size: {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}

                {/* Requirements Hint */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 w-full">
                  <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">
                    Image Requirements:
                  </h3>
                  <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
                    <li>• Formats: JPEG, PNG, GIF, WebP</li>
                    <li>• Max size: 5MB</li>
                    <li>• Recommended: Square aspect ratio</li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 mt-4 border-t border-gray-200 dark:border-gray-600">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdateImage}
                  disabled={!selectedImage || isSubmitting}
                  className="flex-1 px-4 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <HiPencilSquare className="w-4 h-4" />
                      Update Image
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileImageChangeModal;