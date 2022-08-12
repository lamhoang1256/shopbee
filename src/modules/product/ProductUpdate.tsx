import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { ICategory, IProductPayload } from "@types";
import { ProductSchemaYup } from "constants/yup";
import { categoryAPI, productAPI } from "apis";
import { HeaderTemplate } from "layouts";
import { Button } from "components/button";
import { FormGroup, Label, MessageError } from "components/form";
import { ImageUpload } from "components/image";
import { Input } from "components/input";
import { Select } from "components/select";
import { initialValuesProduct } from "constants/initialValue";
import PageNotFound from "pages/PageNotFound";
import { uploadImage } from "utils/uploadImage";
import "react-quill/dist/quill.snow.css";

const ProductUpdate = () => {
  const { id = "" } = useParams();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const formik = useFormik({
    initialValues: initialValuesProduct,
    validationSchema: ProductSchemaYup,
    onSubmit: async (values) => {
      const payload: IProductPayload = values;
      if (payload.priceSale === 0) payload.priceSale = payload.price;
      try {
        const { success, message } = await productAPI.updateProduct(id || "", payload);
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
        console.log("Failed to fetch categories: ", error);
      }
    };
    fetchCategories();
  }, [id]);

  useEffect(() => {
    const fetchProductNeedUpdate = async () => {
      try {
        const { data } = await productAPI.getSingleProduct(id);
        formik.resetForm({
          values: data,
        });
        formik?.setFieldValue("category", data?.category._id);
      } catch (error) {
        console.log("Failed to fetch data: ", error);
      }
    };
    fetchProductNeedUpdate();
  }, [id]);

  if (!id) return <PageNotFound />;
  return (
    <HeaderTemplate
      label='Sửa thông tin sản phẩm'
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

export default ProductUpdate;
