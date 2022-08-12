import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import { useFormik } from "formik";
import { categoryAPI, productAPI } from "apis";
import { ICategory, IProductPayload } from "@types";
import { ProductSchemaYup } from "constants/yup";
import { HeaderTemplate } from "layouts";
import { initialValuesProduct } from "constants/initialValue";
import { uploadImage } from "utils/uploadImage";
import { Button } from "components/button";
import { FormGroup, Label, MessageError } from "components/form";
import { ImageUpload } from "components/image";
import { Input } from "components/input";
import { Select } from "components/select";
import "react-quill/dist/quill.snow.css";

const ProductAddNew = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const formik = useFormik({
    initialValues: initialValuesProduct,
    validationSchema: ProductSchemaYup,
    onSubmit: async (values) => {
      const payload: IProductPayload = values;
      if (payload.priceSale === 0) payload.priceSale = payload.price;
      try {
        const { success, message } = await productAPI.addNewProduct(payload);
        if (success) toast.success(message);
      } catch (error: any) {
        toast.error(error?.message);
      }
    },
  });

  const handleSelectImage = async (e: any) => {
    const urlImage = await uploadImage(e);
    formik?.setFieldValue("image", urlImage);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await categoryAPI.getAllCategory();
        setCategories(data);
      } catch (error) {
        console.log("error: ", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <HeaderTemplate
      label='Thêm 1 sản phẩm mới'
      desc='Vui lòng nhập đầy đủ thông tin cho sản phẩm của bạn'
    >
      <form className='lg:w-2/3' onSubmit={formik.handleSubmit} autoComplete='off'>
        <FormGroup>
          <Label htmlFor='name'>Tên sản phẩm</Label>
          <Input
            name='name'
            type='text'
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <MessageError>{formik.touched.name && formik.errors?.name}</MessageError>
        </FormGroup>
        <FormGroup>
          <Label htmlFor='category'>Chọn danh mục</Label>
          <Select name='category' onChange={formik.handleChange} value={formik.values.category}>
            <option value=''>Chọn danh mục</option>
            {categories?.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </Select>
          <MessageError>{formik.touched.category && formik.errors?.category}</MessageError>
        </FormGroup>
        <div className='grid md:grid-cols-3 gap-x-2'>
          <FormGroup>
            <Label htmlFor='quantity'>Số lượng hiện có</Label>
            <Input
              name='quantity'
              type='number'
              value={formik.values.quantity}
              onChange={formik.handleChange}
            />
            <MessageError>{formik.touched.quantity && formik.errors?.quantity}</MessageError>
          </FormGroup>
          <FormGroup>
            <Label htmlFor='price'>Giá gốc</Label>
            <Input
              name='price'
              type='number'
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            <MessageError>{formik.touched.price && formik.errors?.price}</MessageError>
          </FormGroup>
          <FormGroup>
            <Label htmlFor='priceSale'>Giá đã giảm</Label>
            <Input
              name='priceSale'
              type='number'
              value={formik.values.priceSale}
              onChange={formik.handleChange}
            />
            <MessageError>{formik.touched.priceSale && formik.errors?.priceSale}</MessageError>
          </FormGroup>
        </div>
        <FormGroup>
          <Label htmlFor='image'>Chọn ảnh sản phẩm</Label>
          <ImageUpload onChange={handleSelectImage} previewImage={formik.values.image} />
          <MessageError>{formik.touched.image && formik.errors?.image}</MessageError>
        </FormGroup>
        <FormGroup>
          <Label htmlFor='description'>Mô tả sản phẩm</Label>
          <ReactQuill
            className='mt-1'
            theme='snow'
            value={formik.values.description}
            onChange={(e) => formik?.setFieldValue("description", e)}
          />
          <MessageError>{formik.touched.description && formik.errors?.description}</MessageError>
        </FormGroup>
        <Button type='submit' primary className='w-full h-10'>
          Lưu
        </Button>
      </form>
    </HeaderTemplate>
  );
};

export default ProductAddNew;
