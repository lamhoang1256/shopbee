import { categoryAPI, productAPI } from "apis";
import ActionDelete from "components/ActionDelete";
import Button from "components/Button";
import FormError from "components/FormError";
import FormGroup from "components/FormGroup";
import ImageUpload from "components/ImageUpload";
import Input from "components/Input";
import Label from "components/Label";
import Option from "components/Option";
import Select from "components/Select";
import { useFormik } from "formik";
import useUploadImages from "hooks/useUploadImages";
import Template from "layouts/Template";
import { ChangeEvent } from "react";
import { Helmet } from "react-helmet-async";
import { useMutation, useQuery } from "react-query";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";
import { addNewProductRules, initialValuesProduct } from "utils";

const ProductAddNew = () => {
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryAPI.getAllCategory(),
    staleTime: 5 * 60 * 1000
  });
  const addProductMutation = useMutation({
    mutationFn: (body: typeof initialValuesProduct) => productAPI.addNewProduct(body)
  });
  const formik = useFormik({
    initialValues: initialValuesProduct,
    validationSchema: addNewProductRules,
    onSubmit: async (values, { setErrors }) => {
      const images = values.images.filter((image) => image);
      const body = { ...values, image: images[0], images };
      addProductMutation.mutate(body, {
        onSuccess: ({ message }) => {
          toast.success(message);
        },
        onError(error: any) {
          setErrors(error.error);
        }
      });
    }
  });
  const { values, touched, errors, setFieldValue } = formik;
  const { addNewImage, removeImage } = useUploadImages(values, setFieldValue);
  return (
    <Template
      title="Thêm 1 sản phẩm mới"
      desc="Vui lòng nhập đầy đủ thông tin cho sản phẩm của bạn"
    >
      <Helmet>
        <title>Thêm sản phẩm mới</title>
      </Helmet>
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col-reverse gap-8 mt-6 lg:flex-row">
          <div className="max-w-[600px]">
            <FormGroup>
              <Label htmlFor="name">Tên sản phẩm</Label>
              <Input name="name" value={values.name} onChange={formik.handleChange} />
              <FormError>{touched.name && errors?.name}</FormError>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="category">Chọn danh mục</Label>
              <Select name="category" value={values.category} onChange={formik.handleChange}>
                <Option disabled>Chọn danh mục</Option>
                {categoriesData?.data.map((category) => (
                  <Option value={category._id} key={category._id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
              <FormError>{touched.category && errors?.category}</FormError>
            </FormGroup>
            <div className="grid md:grid-cols-3 gap-x-2">
              <FormGroup>
                <Label htmlFor="stock">Số lượng hiện có</Label>
                <Input
                  name="stock"
                  type="number"
                  value={values.stock}
                  onChange={formik.handleChange}
                />
                <FormError>{touched.stock && errors?.stock}</FormError>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="oldPrice">Giá gốc</Label>
                <Input
                  type="number"
                  name="oldPrice"
                  value={values.oldPrice}
                  onChange={formik.handleChange}
                />
                <FormError>{touched.oldPrice && errors?.oldPrice}</FormError>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="price">Giá đã giảm</Label>
                <Input
                  name="price"
                  type="number"
                  value={values.price}
                  onChange={formik.handleChange}
                />
                <FormError>{touched.price && errors?.price}</FormError>
              </FormGroup>
            </div>
          </div>
          <FormGroup>
            <Label htmlFor="image">Chọn ảnh sản phẩm</Label>
            <div className="flex flex-wrap gap-3">
              {[0, 1, 2, 3, 4].map((num) => (
                <div className="relative" key={num}>
                  <ImageUpload
                    className="!w-24"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => addNewImage(e, num)}
                    previewImage={values.images[num]}
                  />
                  {values.images[num] && (
                    <ActionDelete className="!w-5 !h-5" onClick={() => removeImage(num)} />
                  )}
                </div>
              ))}
            </div>
            <FormError>{touched.image && errors?.image}</FormError>
          </FormGroup>
        </div>
        <FormGroup>
          <Label htmlFor="description">Mô tả sản phẩm</Label>
          <ReactQuill
            theme="snow"
            className="mt-1"
            value={values.description}
            onChange={(e) => setFieldValue("description", e)}
          />
          <FormError>{touched.description && errors?.description}</FormError>
        </FormGroup>
        <Button type="submit" primary className="w-full h-10">
          Thêm sản phẩm
        </Button>
      </form>
    </Template>
  );
};

export default ProductAddNew;
