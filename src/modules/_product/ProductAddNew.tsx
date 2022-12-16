import { productAPI } from "apis";
import { ActionDelete } from "components/action";
import Button from "components/Button";
import Label from "components/Label";
import FormError from "components/FormError";
import FormGroup from "components/FormGroup";
import ImageUpload from "components/ImageUpload";
import Input from "components/Input";
import { Option, Select } from "components/_select";
import { useFormik } from "formik";
import useFetchCategories from "hooks/useFetchCategories";
import { Template } from "layouts";
import { ChangeEvent } from "react";
import { Helmet } from "react-helmet-async";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { getRandomInt } from "utils/helper";
import { uploadImage } from "utils/uploadImage";
import * as Yup from "yup";

const ProductAddNew = () => {
  const { categories } = useFetchCategories();
  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
      images: [""],
      description: "",
      category: "",
      oldPrice: 0,
      price: 0,
      rating: 0,
      stock: 0,
      sold: 0,
      view: getRandomInt(0, 10000)
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập tên sản phẩm!"),
      image: Yup.string().required("Vui lòng chọn hình ảnh!"),
      description: Yup.string().required("Vui lòng nhập mô tả sản phẩm!"),
      category: Yup.string().required("Vui lòng chọn danh mục!"),
      oldPrice: Yup.number().required("Vui lòng chọn giá sản phẩm!"),
      price: Yup.number()
        .required()
        .max(Yup.ref("oldPrice"), "Giá đã giảm không được lớn hơn giá gốc"),
      stock: Yup.number().required("Vui lòng chọn số lượng!")
    }),
    onSubmit: async (values) => {
      try {
        const images = values.images.filter((image) => image);
        const payload = { ...values, image: images[0], images };
        const { message } = await productAPI.addNewProduct(payload);
        toast.success(message);
      } catch (error) {
        toast.error(error?.message);
      }
    }
  });
  const handleAddNewImage = async (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const newImgUrl = await uploadImage(e);
    const cloneImages = formik.values.images;
    cloneImages[index] = newImgUrl;
    formik.setFieldValue("images", cloneImages);
  };
  const handleRemoveImage = (index: number) => {
    const cloneImages = formik.values.images;
    cloneImages[index] = "";
    formik.setFieldValue("images", cloneImages);
  };

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
              <Input name="name" value={formik.values.name} onChange={formik.handleChange} />
              <FormError>{formik.touched.name && formik.errors?.name}</FormError>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="category">Chọn danh mục</Label>
              <Select name="category" onChange={formik.handleChange} value={formik.values.category}>
                <Option disabled>Chọn danh mục</Option>
                {categories?.map((category) => (
                  <Option value={category._id} key={category._id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
              <FormError>{formik.touched.category && formik.errors?.category}</FormError>
            </FormGroup>
            <div className="grid md:grid-cols-3 gap-x-2">
              <FormGroup>
                <Label htmlFor="stock">Số lượng hiện có</Label>
                <Input
                  name="stock"
                  type="number"
                  value={formik.values.stock}
                  onChange={formik.handleChange}
                />
                <FormError>{formik.touched.stock && formik.errors?.stock}</FormError>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="oldPrice">Giá gốc</Label>
                <Input
                  name="oldPrice"
                  type="number"
                  value={formik.values.oldPrice}
                  onChange={formik.handleChange}
                />
                <FormError>{formik.touched.oldPrice && formik.errors?.oldPrice}</FormError>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="price">Giá đã giảm</Label>
                <Input
                  name="price"
                  type="number"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                />
                <FormError>{formik.touched.price && formik.errors?.price}</FormError>
              </FormGroup>
            </div>
          </div>
          <FormGroup>
            <Label htmlFor="image">Chọn ảnh sản phẩm</Label>
            <div className="flex flex-wrap gap-3">
              {[0, 1, 2, 3, 4].map((index) => (
                <div className="relative" key={index}>
                  <ImageUpload
                    className="!w-24"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleAddNewImage(e, index)}
                    previewImage={formik.values.images[index]}
                  />
                  {formik.values.images[index] && (
                    <ActionDelete className="!w-5 !h-5" onClick={() => handleRemoveImage(index)} />
                  )}
                </div>
              ))}
            </div>
            <FormError>{formik.touched.image && formik.errors?.image}</FormError>
          </FormGroup>
        </div>
        <FormGroup>
          <Label htmlFor="description">Mô tả sản phẩm</Label>
          <ReactQuill
            className="mt-1"
            theme="snow"
            value={formik.values.description}
            onChange={(e) => formik.setFieldValue("description", e)}
          />
          <FormError>{formik.touched.description && formik.errors?.description}</FormError>
        </FormGroup>
        <Button type="submit" primary className="w-full h-10">
          Thêm sản phẩm
        </Button>
      </form>
    </Template>
  );
};

export default ProductAddNew;
