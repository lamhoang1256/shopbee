import { configCloudinaryAPI } from "apis/cloudinaryAPI";
import { toast } from "react-toastify";

const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || "";

export const uploadImage = async (e: any) => {
  let urlUploaded: string = "";
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  try {
    const { url } = await configCloudinaryAPI.uploadImage(formData);
    if (url) urlUploaded = url;
  } catch (error: any) {
    toast.error("error: ", error?.message);
  }
  return urlUploaded;
};
