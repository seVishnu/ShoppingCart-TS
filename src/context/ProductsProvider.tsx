import { ReactElement, createContext, useState, useEffect } from "react";

export type ProductType = {
  sku: string;
  name: string;
  price: number;
};
const initialState: ProductType[] = [];
// const initialState: ProductType[] = [
//   {
//     sku: "0001",
//     name: "widget",
//     price: 9.99,
//   },
//   {
//     sku: "0002",
//     name: "premiumWidget",
//     price: 9.99,
//   },
//   {
//     sku: "0003",
//     name: "deluxeWidget",
//     price: 9.99,
//   },
// ];

export type UseProductContextType = { products: ProductType[] };

const initContextState: UseProductContextType = { products: [] };

const ProductsContext = createContext<UseProductContextType>(initContextState);

type ChildrenType = {
  children?: ReactElement | ReactElement[];
};

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
  const [products, setProducts] = useState<ProductType[]>(initialState);
  useEffect(() => {
    const fetchProducts = async (): Promise<ProductType[]> => {
      const data = await fetch("http://localhost:3500/products")
        .then((response) => {
          return response.json();
        })
        .catch((err) => {
          if (err instanceof Error) console.log(err.message);
        });
      return data;
    };
    fetchProducts().then((products) => setProducts(products));
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
