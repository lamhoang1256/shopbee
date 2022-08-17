import { ICategory, IProduct } from "@types";
import { categoryAPI, productAPI } from "apis";
import { Button } from "components/button";
import { FormGroup, Label, MessageError } from "components/form";
import { ImageUpload } from "components/image";
import { Input } from "components/input";
import { Select } from "components/select";
import { ProductSchemaYup } from "constants/yup";
import { useFormik } from "formik";
import { HeaderTemplate } from "layouts";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { getRandomInt } from "utils/helper";
import { uploadImage } from "utils/uploadImage";

const ProductAddNew = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
      description: "",
      category: "",
      oldPrice: 0,
      price: 0,
      rating: 0,
      stock: 0,
      sold: 0,
      view: getRandomInt(0, 10000),
    },
    validationSchema: ProductSchemaYup,
    onSubmit: async (values) => {
      const payload: Partial<IProduct> = values;
      if (payload.price === 0) payload.price = payload.oldPrice;
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
      <form
        className='flex flex-col-reverse gap-8 mt-4 lg:flex-row'
        onSubmit={formik.handleSubmit}
        autoComplete='off'
      >
        <div className='max-w-[600px]'>
          <FormGroup>
            <Label htmlFor='name'>Tên sản phẩm</Label>
            <Input name='name' value={formik.values.name} onChange={formik.handleChange} />
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
              <Label htmlFor='stock'>Số lượng hiện có</Label>
              <Input
                name='stock'
                type='number'
                value={formik.values.stock}
                onChange={formik.handleChange}
              />
              <MessageError>{formik.touched.stock && formik.errors?.stock}</MessageError>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='oldPrice'>Giá gốc</Label>
              <Input
                name='oldPrice'
                type='number'
                value={formik.values.oldPrice}
                onChange={formik.handleChange}
              />
              <MessageError>{formik.touched.oldPrice && formik.errors?.oldPrice}</MessageError>
            </FormGroup>
            <FormGroup>
              <Label htmlFor='price'>Giá đã giảm</Label>
              <Input
                name='price'
                type='number'
                value={formik.values.price}
                onChange={formik.handleChange}
              />
              <MessageError>{formik.touched.price && formik.errors?.price}</MessageError>
            </FormGroup>
          </div>
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
        </div>
        <FormGroup>
          <Label htmlFor='image'>Chọn ảnh sản phẩm</Label>
          <ImageUpload onChange={handleSelectImage} previewImage={formik.values.image} />
          <MessageError>{formik.touched.image && formik.errors?.image}</MessageError>
        </FormGroup>
      </form>
    </HeaderTemplate>
  );
};

export default ProductAddNew;
