const PageNotFound = () => {
  return (
    <div className='bg-white shadow1 max-w-[767px] mt-8 mx-auto text-center p-7'>
      <img src='/images/error404.png' alt='404' className='mx-auto' />
      <h1 className='my-4 text-3xl font-semibold text-[#566278]'>404</h1>
      <p className='text-[#999]'>It looks like something is missing!</p>
    </div>
  );
};

export default PageNotFound;
