import { configAPI } from "apis/configAPI";
import { Button } from "components/button";
import { FormGroup, FormLabel, FormMessError } from "components/form";
import { ImageUpload } from "components/image";
import { InputV2 } from "components/input";
import { Select } from "components/select";
import { ProductAddNewSchemaYup } from "constants/yup";
import { useFormik } from "formik";
import { useUploadImage } from "hooks/useUploadImage";
import { ICategory } from "interfaces";
import { HeaderTemplate } from "layouts";
import { useEffect, useState } from "react";

const ProductAddNew = () => {
  const { inputValue, previewImage, handleFileInputChange } = useUploadImage();
  const [categories, setCategories] = useState<ICategory[]>([]);

  const fetchHomeCategories = async () => {
    try {
      const { data } = await configAPI.getAllCategory();
      setCategories(data);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleAddNewProduct = (values: any) => {
    console.log("values: ", values);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
      description: "",
      category: "",
      price: "",
      priceSale: "",
      quantity: "",
    },
    validationSchema: ProductAddNewSchemaYup,
    onSubmit: (values) => {
      handleAddNewProduct(values);
    },
  });

  useEffect(() => {
    fetchHomeCategories();
  }, []);
  useEffect(() => {
    formik?.setFieldValue("image", inputValue);
  }, [inputValue]);

  return (
    <HeaderTemplate
      label='Thêm 1 sản phẩm mới'
      desc='Vui lòng nhập đầy đủ thông tin cho sản phẩm của bạn'
    >
      <form className='lg:w-2/3' onSubmit={formik.handleSubmit} autoComplete='off'>
        <FormGroup>
          <FormLabel htmlFor='name'>Tên sản phẩm</FormLabel>
          <InputV2
            name='name'
            type='text'
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <FormMessError>{formik.touched.name && formik.errors?.name}</FormMessError>
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor='category'>Chọn danh mục</FormLabel>
          <Select name='category' onChange={formik.handleChange}>
            <option value=''>Chọn danh mục</option>
            {categories?.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </Select>
          <FormMessError>{formik.touched.category && formik.errors?.category}</FormMessError>
        </FormGroup>
        <div className='grid md:grid-cols-3 gap-x-2'>
          <FormGroup>
            <FormLabel htmlFor='quantity'>Số lượng hiện có</FormLabel>
            <InputV2
              name='quantity'
              type='text'
              value={formik.values.quantity}
              onChange={formik.handleChange}
            />
            <FormMessError>{formik.touched.quantity && formik.errors?.quantity}</FormMessError>
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor='price'>Giá gốc</FormLabel>
            <InputV2
              name='price'
              type='text'
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            <FormMessError>{formik.touched.price && formik.errors?.price}</FormMessError>
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor='priceSale'>Giá đã giảm</FormLabel>
            <InputV2
              name='priceSale'
              type='text'
              value={formik.values.priceSale}
              onChange={formik.handleChange}
            />
            <FormMessError>{formik.touched.priceSale && formik.errors?.priceSale}</FormMessError>
          </FormGroup>
        </div>
        <FormGroup>
          <FormLabel htmlFor='image'>Chọn ảnh sản phẩm</FormLabel>
          <ImageUpload
            value={inputValue}
            onChange={handleFileInputChange}
            previewImage={previewImage}
          />
          <FormMessError>{formik.touched.image && formik.errors?.image}</FormMessError>
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor='description'>Mô tả sản phẩm</FormLabel>
          <InputV2
            name='description'
            type='text'
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          <FormMessError>{formik.touched.description && formik.errors?.description}</FormMessError>
        </FormGroup>
        <Button type='submit' primary className='w-full h-10'>
          Lưu
        </Button>
      </form>
    </HeaderTemplate>
  );
};

export default ProductAddNew;
