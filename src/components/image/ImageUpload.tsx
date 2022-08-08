import classNames from "utils/className";

interface ImageUploadProps {
  onChange: any;
  previewImage: string;
  className?: string;
}

const ImageUpload = ({ onChange, previewImage, className }: ImageUploadProps) => {
  return (
    <div
      className={classNames(
        "relative aspect-square overflow-hidden border border-dotted rounded-md border-[#00000024] object-cover max-w-[200px] p-4",
        className,
      )}
    >
      {previewImage && (
        <img src={previewImage} alt='preview' className='absolute inset-0 bg-white' />
      )}
      <input
        name='image'
        type='file'
        onChange={onChange}
        className='absolute z-10 w-full h-full opacity-0 cursor-pointer'
      />
      <div className='flex flex-col items-center justify-center h-full gap-y-2'>
        <img
          src='https://easy-cinema-booking.vercel.app/images/img-upload.png'
          alt='upload'
          className='w-20 h-20 mx-auto'
        />
        <span className='font-medium'>Chọn ảnh</span>
      </div>
    </div>
  );
};

ImageUpload.defaultProps = {
  className: "",
};

export default ImageUpload;
