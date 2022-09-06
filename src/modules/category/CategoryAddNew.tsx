import { categoryAPI } from "apis";
import { Button } from "components/button";
import { FormGroup, Label, MessageError } from "components/form";
import { Input } from "components/input";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Template } from "layouts";
import { UserChangeAvatar } from "modules/user";
import { toast } from "react-toastify";
import { uploadImage } from "utils/uploadImage";
import { ChangeEvent } from "react";
import { Helmet } from "react-helmet-async";

const CategoryAddNew = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      slug: "",
      image: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập tên danh mục!"),
      slug: Yup.string().required("Vui lòng chọn tên danh mục slug!"),
      image: Yup.string().required("Vui lòng chọn hình ảnh!"),
    }),
    onSubmit: async (values) => {
      try {
        const { message } = await categoryAPI.addNewCategory(values);
        toast.success(message);
      } catch (error) {
        toast.error(error?.message);
      }
    },
  });

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const newImgUrl = await uploadImage(e);
      formik.setFieldValue("image", newImgUrl);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <Template title='Thêm danh mục mới' desc='Vui lòng nhập đầy đủ thông tin cho sản phẩm của bạn'>
      <Helmet>
        <title>Thêm danh mục mới</title>
      </Helmet>
      <form
        autoComplete='off'
        onSubmit={formik.handleSubmit}
        className='flex flex-col-reverse gap-8 mt-6 lg:flex-row'
      >
        <div className='w-full max-w-[600px]'>
          <FormGroup>
            <Label htmlFor='name'>Tên danh mục:</Label>
            <Input name='name' value={formik.values.name} onChange={formik.handleChange} />
            <MessageError>{formik.touched.name && formik.errors?.name}</MessageError>
          </FormGroup>
          <FormGroup>
            <Label htmlFor='slug'>Tên danh mục slug:</Label>
            <Input name='slug' value={formik.values.slug} onChange={formik.handleChange} />
            <MessageError>{formik.touched.slug && formik.errors?.slug}</MessageError>
          </FormGroup>
          <Button type='submit' primary className='w-full h-10'>
            Thêm danh mục
          </Button>
        </div>
        <UserChangeAvatar avatar={formik.values.image} handleChangeAvatar={handleUploadImage} />
      </form>
    </Template>
  );
};

export default CategoryAddNew;
