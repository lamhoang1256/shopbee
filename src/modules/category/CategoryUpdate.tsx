import { categoryAPI } from "apis";
import { Button } from "components/button";
import { FormGroup, Label, MessageError } from "components/form";
import { Input } from "components/input";
import { CategorySchema } from "constants/yup";
import { useFormik } from "formik";
import { Template } from "layouts";
import { UserChangeAvatar } from "modules/user";
import { useEffect } from "react";
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
    validationSchema: CategorySchema,
    onSubmit: async (values: any) => {
      try {
        const { message } = await categoryAPI.updateCategory(id, values);
        toast.success(message);
      } catch (error: any) {
        toast.error(error?.message);
      }
    },
  });

  const handleUploadThumb = async (e: any) => {
    try {
      const image = await uploadImage(e);
      formik.setFieldValue("image", image);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await categoryAPI.getSingleCategory(id);
        formik.resetForm({ values: data });
      } catch (error: any) {
        toast.error(error?.message);
      }
    };
    fetchData();
  }, [id]);

  return (
    <Template title='Sửa danh mục' desc='Vui lòng nhập đầy đủ thông tin cho sản phẩm của bạn'>
      <form
        className='flex flex-col-reverse gap-8 mt-6 lg:flex-row'
        onSubmit={formik.handleSubmit}
        autoComplete='off'
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
            Lưu
          </Button>
        </div>
        <UserChangeAvatar avatar={formik.values.image} handleChangeAvatar={handleUploadThumb} />
      </form>
    </Template>
  );
};

export default CategoryUpdate;
