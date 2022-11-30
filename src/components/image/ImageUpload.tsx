import { ChangeEvent } from "react";
import classNames from "utils/className";

interface ImageUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  onChange: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  previewImage: string;
}

const ImageUpload = ({ onChange, previewImage, className }: ImageUploadProps) => {
  return (
    <div
      className={classNames(
        "relative aspect-square overflow-hidden border border-dotted rounded-lg border-[#00000024] object-cover w-[202px] p-4",
        className
      )}
    >
      {previewImage && (
        <img src={previewImage} alt="preview" className="absolute inset-0 bg-white" />
      )}
      <input
        name="image"
        type="file"
        onChange={onChange}
        className="absolute z-10 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="flex flex-col items-center justify-center h-full gap-y-2">
        <img
          alt="upload"
          src="/images/upload-image.png"
          className="w-3/5 mx-auto aspect-square max-w-[80px]"
        />
        <span className="font-medium whitespace-pre">Chọn ảnh</span>
      </div>
    </div>
  );
};

export default ImageUpload;
