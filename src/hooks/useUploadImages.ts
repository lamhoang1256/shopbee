import { FormikValues } from "formik";
import { ChangeEvent } from "react";
import { uploadImage } from "utils";

export default function useUploadImages(values: FormikValues, setFieldValue: any) {
  const addNewImage = async (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const newImgUrl = await uploadImage(e);
    const cloneImages = values.images;
    cloneImages[index] = newImgUrl;
    setFieldValue("images", cloneImages);
  };
  const removeImage = (index: number) => {
    const cloneImages = values.images;
    cloneImages[index] = "";
    setFieldValue("images", cloneImages);
  };
  return {
    addNewImage,
    removeImage
  };
}
