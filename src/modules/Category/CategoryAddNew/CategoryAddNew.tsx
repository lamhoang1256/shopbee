import { IPayloadCategory } from "@types";
import { categoryAPI } from "apis";
import Button from "components/Button";
import FormError from "components/FormError";
import FormGroup from "components/FormGroup";
import Input from "components/Input";
import Label from "components/Label";
import { defaultPreviewImage } from "constants/global";
import { useFormik } from "formik";
import Template from "layouts/Template";
import UserUploadAvatar from "modules/User/UserUploadAvatar";
import { ChangeEvent } from "react";
import { Helmet } from "react-helmet-async";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { categoryRules, uploadImage } from "utils";

const CategoryAddNew = () => {
  const addCategoryMutation = useMutation({
    mutationFn: (payload: IPayloadCategory) => categoryAPI.addNewCategory(payload)
  });
  const formik = useFormik({
    initialValues: { name: "", slug: "", image: "" },
    validationSchema: categoryRules,
    onSubmit: async (values, { setErrors }) => {
      addCategoryMutation.mutate(values, {
        onSuccess: ({ message }) => {
          toast.success(message);
        },
        onError(error: any) {
          toast.error(error?.message);
          setErrors(error.error);
        }
      });
    }
  });
  const { values, touched, errors, setFieldValue, handleChange } = formik;
  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const newImgUrl = await uploadImage(e);
    setFieldValue("image", newImgUrl);
  };
  return (
    <Template title="Thêm danh mục mới" desc="Vui lòng nhập thông tin cho danh mục của bạn">
      <Helmet>
        <title>Thêm danh mục mới</title>
      </Helmet>
      <div className="flex flex-col-reverse gap-8 mt-6 lg:flex-row">
        <form autoComplete="off" onSubmit={formik.handleSubmit} className="w-full max-w-[600px]">
          <FormGroup>
            <Label htmlFor="name">Tên danh mục:</Label>
            <Input name="name" value={values.name} onChange={handleChange} />
            <FormError>{touched.name && errors?.name}</FormError>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="slug">Tên danh mục slug:</Label>
            <Input name="slug" value={values.slug} onChange={handleChange} />
            <FormError>{touched.slug && errors?.slug}</FormError>
          </FormGroup>
          <Button type="submit" primary className="w-full h-10">
            Thêm danh mục
          </Button>
        </form>
        <UserUploadAvatar
          avatar={values.image || defaultPreviewImage}
          onChangeAvatar={handleUploadImage}
        />
      </div>
    </Template>
  );
};

export default CategoryAddNew;
