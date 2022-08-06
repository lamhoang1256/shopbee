import { configCloudinaryAPI } from "apis/cloudinaryAPI";
import { useState } from "react";
import { toast } from "react-toastify";

const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || "";

export const useUploadImage = () => {
  const [inputImageValue, setImageValue] = useState("");
  const [urlCloudinary, setUrlCloudinary] = useState("");

  const handleFileInputChange = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    try {
      const { url } = await configCloudinaryAPI.uploadImage(formData);
      setImageValue(e.target.value);
      setUrlCloudinary(url);
    } catch (error: any) {
      toast.error("error: ", error?.message);
    }
  };
  return { inputImageValue, urlCloudinary, setUrlCloudinary, handleFileInputChange };
};
