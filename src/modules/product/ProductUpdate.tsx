import { configAPI } from "apis/configAPI";
import { Button } from "components/button";
import { FormGroup, FormLabel, FormMessError } from "components/form";
import { ImageUpload } from "components/image";
import { InputV2 } from "components/input";
import { Select } from "components/select";
import { useFormik } from "formik";
import { useUploadImage } from "hooks/useUploadImage";
import { ICategory } from "interfaces";
import { HeaderTemplate } from "layouts";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ProductUpdate = () => {
  const { inputImageValue, urlCloudinary, handleFileInputChange } = useUploadImage();
  console.log("inputImageValue: ", inputImageValue);
  const [categories, setCategories] = useState<ICategory[]>([]);

  const fetchCategories = async () => {
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
    // validationSchema: ProductUpdateSchemaYup,
    onSubmit: (values) => {
      handleAddNewProduct(values);
    },
  });

  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    formik?.setFieldValue("image", urlCloudinary);
  }, [urlCloudinary]);

  return (
    <HeaderTemplate
      label='Sửa thông tin sản phẩm'
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
              type='number'
              value={formik.values.quantity}
              onChange={formik.handleChange}
            />
            <FormMessError>{formik.touched.quantity && formik.errors?.quantity}</FormMessError>
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor='price'>Giá gốc</FormLabel>
            <InputV2
              name='price'
              type='number'
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            <FormMessError>{formik.touched.price && formik.errors?.price}</FormMessError>
          </FormGroup>
          <FormGroup>
            <FormLabel htmlFor='priceSale'>Giá đã giảm</FormLabel>
            <InputV2
              name='priceSale'
              type='number'
              value={formik.values.priceSale}
              onChange={formik.handleChange}
            />
            <FormMessError>{formik.touched.priceSale && formik.errors?.priceSale}</FormMessError>
          </FormGroup>
        </div>
        <FormGroup>
          <FormLabel htmlFor='image'>Chọn ảnh sản phẩm</FormLabel>
          <ImageUpload
            value={inputImageValue}
            onChange={handleFileInputChange}
            previewImage={urlCloudinary}
          />
          <FormMessError>{formik.touched.image && formik.errors?.image}</FormMessError>
        </FormGroup>
        <FormGroup>
          <FormLabel htmlFor='description'>Mô tả sản phẩm</FormLabel>
          <ReactQuill
            className='mt-1'
            theme='snow'
            onChange={(e) => formik?.setFieldValue("description", e)}
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

export default ProductUpdate;
