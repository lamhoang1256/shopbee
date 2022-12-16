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
import PageNotFound from "pages/PageNotFound";
import { ChangeEvent } from "react";
import { Helmet } from "react-helmet-async";
import { useMutation, useQuery } from "react-query";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addNewProductRules, initialValuesProduct } from "utils";

const ProductUpdate = () => {
  const { id = "" } = useParams();
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryAPI.getAllCategory(),
    staleTime: 5 * 60 * 1000
  });
  const updateProductMutation = useMutation({
    mutationFn: (body: typeof initialValuesProduct) => productAPI.updateProduct(id, body)
  });
  const formik = useFormik({
    initialValues: initialValuesProduct,
    validationSchema: addNewProductRules,
    onSubmit: async (values, { setErrors }) => {
      const images = values.images.filter((image) => image);
      const body = { ...values, image: images[0], images };
      updateProductMutation.mutate(body, {
        onSuccess: ({ message }) => {
          toast.success(message);
        },
        onError(error: any) {
          setErrors(error.error);
        }
      });
    }
  });
  useQuery({
    queryKey: ["product", id],
    queryFn: () => productAPI.getSingleProduct(id),
    staleTime: 5 * 60 * 1000,
    onSuccess: ({ data: productData }) => {
      formik.resetForm({ values: productData });
    }
  });
  const { values, touched, errors, setFieldValue } = formik;
  const { addNewImage: updateImage, removeImage } = useUploadImages(values, setFieldValue);
  if (!id) return <PageNotFound />;
  return (
    <Template
      title="Sửa thông tin sản phẩm"
      desc="Vui lòng nhập đầy đủ thông tin cho sản phẩm của bạn"
    >
      <Helmet>
        <title>Cập nhật sản phẩm</title>
      </Helmet>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
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
                  name="oldPrice"
                  type="number"
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
            <Label>Chọn ảnh sản phẩm</Label>
            <div className="flex flex-wrap gap-3">
              {[0, 1, 2, 3, 4].map((index) => (
                <div className="relative" key={index}>
                  <ImageUpload
                    className="!w-24"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => updateImage(e, index)}
                    previewImage={values.images[index]}
                  />
                  {values.images[index] && (
                    <ActionDelete className="!w-5 !h-5" onClick={() => removeImage(index)} />
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
            className="mt-1"
            theme="snow"
            value={values.description}
            onChange={(e) => setFieldValue("description", e)}
          />
          <FormError>{touched.description && errors?.description}</FormError>
        </FormGroup>
        <Button type="submit" primary className="w-full h-10">
          Cập nhật sản phẩm
        </Button>
      </form>
    </Template>
  );
};

export default ProductUpdate;
