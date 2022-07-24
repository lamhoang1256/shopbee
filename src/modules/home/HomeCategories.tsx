import { configAPI } from "apis/configAPI";
import { SectionHeader } from "components/common";
import { useEffect, useState } from "react";

const HomeCategories = () => {
  const [categories, setCategories] = useState([]);
  const fetchHomeBanner = async () => {
    try {
      const { data } = await configAPI.getAllCategory();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchHomeBanner();
  }, []);
  return (
    <div className='layout-container'>
      <SectionHeader>Danh mục</SectionHeader>
      <div className='flex gap-x-3'>
        {categories.map((category: any) => (
          <div className='pb-3 text-center bg-white' key={category._id}>
            <img src={category.thumb} className='w-[200px] h-[200px]' alt='' />
            <span>{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
