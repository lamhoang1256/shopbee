import { categoryAPI } from "apis";
import Button from "components/Button";
import Label from "components/Label";
import FormError from "components/FormError";
import FormGroup from "components/FormGroup";
import Input from "components/Input";
import * as Yup from "yup";
import { useFormik } from "formik";
import Template from "layouts/Template";
import { UserChangeAvatar } from "modules/_user";
import { toast } from "react-toastify";
import { uploadImage } from "utils/uploadImage";
import { ChangeEvent } from "react";
import { Helmet } from "react-helmet-async";
import { defaultPreviewImage } from "constants/global";

const CategoryAddNew = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      slug: "",
      image: ""
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập tên danh mục!"),
      slug: Yup.string().required("Vui lòng chọn tên danh mục slug!"),
      image: Yup.string().required("Vui lòng chọn hình ảnh!")
    }),
    onSubmit: async (values) => {
      try {
        const { message } = await categoryAPI.addNewCategory(values);
        toast.success(message);
      } catch (error) {
        toast.error(error?.message);
      }
    }
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
    <Template title="Thêm danh mục mới" desc="Vui lòng nhập đầy đủ thông tin cho danh mục của bạn">
      <Helmet>
        <title>Thêm danh mục mới</title>
      </Helmet>
      <form
        autoComplete="off"
        onSubmit={formik.handleSubmit}
        className="flex flex-col-reverse gap-8 mt-6 lg:flex-row"
      >
        <div className="w-full max-w-[600px]">
          <FormGroup>
            <Label htmlFor="name">Tên danh mục:</Label>
            <Input name="name" value={formik.values.name} onChange={formik.handleChange} />
            <FormError>{formik.touched.name && formik.errors?.name}</FormError>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="slug">Tên danh mục slug:</Label>
            <Input name="slug" value={formik.values.slug} onChange={formik.handleChange} />
            <FormError>{formik.touched.slug && formik.errors?.slug}</FormError>
          </FormGroup>
          <Button type="submit" primary className="w-full h-10">
            Thêm danh mục
          </Button>
        </div>
        <UserChangeAvatar
          avatar={formik.values.image || defaultPreviewImage}
          handleChangeAvatar={handleUploadImage}
        />
      </form>
    </Template>
  );
};

export default CategoryAddNew;
