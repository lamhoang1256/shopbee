import { configCloudinaryAPI } from "apis";
import { ChangeEvent } from "react";
import { toast } from "react-toastify";

const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || "";

export const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
  let urlUploaded: string = "";
  if (!e.target.files) return "";
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  try {
    const { url } = await configCloudinaryAPI.uploadImage(formData);
    if (url) urlUploaded = url;
  } catch (error) {
    toast.error(error?.message);
  }
  return urlUploaded;
};
