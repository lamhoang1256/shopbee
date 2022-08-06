interface ImageUploadProps {
  onChange: any;
  value: string | number;
  previewImage: string;
}

const ImageUpload = ({ value, onChange, previewImage }: ImageUploadProps) => {
  return (
    <div className='relative aspect-square overflow-hidden border border-dotted rounded-md border-[#00000024] object-cover max-w-[200px]'>
      {previewImage && (
        <img src={previewImage} alt='preview' className='absolute inset-0 bg-white' />
      )}
      <input
        name='image'
        type='file'
        value={value}
        onChange={onChange}
        className='absolute z-10 w-full h-full opacity-0'
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

export default ImageUpload;
