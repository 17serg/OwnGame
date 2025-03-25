import type { AxiosInstance, AxiosResponse } from "axios";
import { IProduct, IProductCreateData } from "../model";
import { axiosInstance } from "@/shared/lib/axiosInstance";

class ProductService {
  constructor(private readonly client: AxiosInstance) {}

  async getProducts(): Promise<IProduct[]> {
    const { data } = await this.client<IProduct[]>("/products");
    return data;
  }

  async addProduct(product: IProductCreateData): Promise<IProduct> {
    const { data } = await this.client.post<IProduct>("/products", product);
    return data;
  }

  async deleteProduct(id: IProduct["id"]): Promise<AxiosResponse> {
    return this.client.delete<AxiosResponse>(`/products/${id}`);
  }
}
export default new ProductService(axiosInstance);