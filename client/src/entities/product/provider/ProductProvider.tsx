import { useEffect, useReducer } from "react";
import productReducer from "../context/PostReducer";
import ProductApi from "../api/ProductApi";
import { IProduct, IProductCreateData } from "../model";
import { ProductContext, ProductContextHandler } from "../context/ProductContext";

function ProductProvider({
    children,
  }: {
    children: React.ReactElement;
  }): React.JSX.Element {
    const [initPosts, dispatch] = useReducer(productReducer, []);
    useEffect(() => {
      ProductApi.getProducts()
        .then((data) => dispatch({ type: "SET_PRODUCTS", payload: data }))
        .catch(console.log);
    }, []);
  
    const addHandler = async (dataForm: IProductCreateData): Promise<void> => {
      const newPost = await ProductApi.addProduct(dataForm);
      dispatch({ type: "ADD_PRODUCT", payload: newPost });
    };
  
    const deleteHandler = async (id: IProduct["id"]): Promise<void> => {
      try {
        await ProductApi.deleteProduct(id);
        dispatch({ type: "DELETE_PRODUCT", payload: id });
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <ProductContext.Provider value={initPosts}>
        <ProductContextHandler.Provider value={{ addHandler, deleteHandler }}>
          {children}
        </ProductContextHandler.Provider>
      </ProductContext.Provider>
    );
  }
  export default ProductProvider;
  
  