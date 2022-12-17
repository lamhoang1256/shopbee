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
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { categoryRules, uploadImage } from "utils";

const CategoryUpdate = () => {
  const { id = "" } = useParams();
  const updateCategoryMutation = useMutation({
    mutationFn: (payload: IPayloadCategory) => categoryAPI.updateCategory(id, payload)
  });
  const formik = useFormik({
    initialValues: { name: "", slug: "", image: "" },
    validationSchema: categoryRules,
    onSubmit: async (values, { setErrors }) => {
      updateCategoryMutation.mutate(values, {
        onSuccess: ({ message }) => {
          toast.success(message);
        },
        onError(error: any) {
          setErrors(error.error);
        }
      });
    }
  });
  const { values, touched, errors, setFieldValue, handleSubmit, handleChange } = formik;
  const handleUploadThumb = async (e: ChangeEvent<HTMLInputElement>) => {
    const newImgUrl = await uploadImage(e);
    setFieldValue("image", newImgUrl);
  };
  useQuery({
    queryKey: ["category", id],
    queryFn: () => categoryAPI.getSingleCategory(id),
    staleTime: 5 * 60 * 1000,
    onSuccess({ data }) {
      formik.resetForm({ values: data });
    }
  });
  return (
    <Template title="Sửa danh mục" desc="Vui lòng nhập thông tin cho danh mục của bạn">
      <Helmet>
        <title>Sửa danh mục</title>
      </Helmet>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="flex flex-col-reverse gap-8 mt-6 lg:flex-row"
      >
        <div className="w-full max-w-[600px]">
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
            Cập nhật danh mục
          </Button>
        </div>
        <UserUploadAvatar
          avatar={values.image || defaultPreviewImage}
          onChangeAvatar={handleUploadThumb}
        />
      </form>
    </Template>
  );
};

export default CategoryUpdate;
