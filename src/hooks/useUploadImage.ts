import { useState } from "react";

export const useUploadImage = () => {
  const [inputValue, setInputValue] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const handlePreviewImage = (file: any) => {
    const reader: any = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    handlePreviewImage(file);
    setInputValue(e.target.value);
  };
  return { inputValue, previewImage, handleFileInputChange };
};
