import { categoryAPI } from "apis";
import { Button } from "components/button";
import { FormGroup, Label, MessageError } from "components/form";
import { Input } from "components/input";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Template } from "layouts";
import { UserChangeAvatar } from "modules/user";
import { ChangeEvent, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { uploadImage } from "utils/uploadImage";

const CategoryUpdate = () => {
  const { id = "" } = useParams();
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
        const { message } = await categoryAPI.updateCategory(id, values);
        toast.success(message);
      } catch (err: any) {
        toast.error(err?.message);
      }
    },
  });

  const handleUploadThumb = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const newImgUrl = await uploadImage(e);
      formik.setFieldValue("image", newImgUrl);
    } catch (err: any) {
      toast.error(err?.message);
    }
  };

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const { data } = await categoryAPI.getSingleCategory(id);
        formik.resetForm({ values: data });
      } catch (err: any) {
        toast.error(err?.message);
      }
    };
    fetchCategoryData();
  }, [id]);

  return (
    <Template title='Sửa danh mục' desc='Vui lòng nhập đầy đủ thông tin cho danh mục của bạn'>
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
            Cập nhật danh mục
          </Button>
        </div>
        <UserChangeAvatar avatar={formik.values.image} handleChangeAvatar={handleUploadThumb} />
      </form>
    </Template>
  );
};

export default CategoryUpdate;
