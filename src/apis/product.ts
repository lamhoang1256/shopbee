import { IProductPayload, IResponse } from "interfaces";

import axiosClient from "./axiosClient";

export const productAPI = {
  productAddNew: (product: IProductPayload): Promise<IResponse> => {
    const path = `api/product`;
    return axiosClient.post(path, product);
  },
  updateProduct: (productId: string, product: IProductPayload): Promise<IResponse> => {
    const path = `api/product/${productId}`;
    return axiosClient.put(path, product);
  },
  getSingleProduct: (productId: string): Promise<IResponse> => {
    const path = `api/product/${productId}`;
    return axiosClient.get(path);
  },
};
