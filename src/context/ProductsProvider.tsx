import { ReactElement, createContext, useState } from "react";

export type ProductType = {
  sku: string;
  name: string;
  price: number;
};

const initialState: ProductType[] = [
  {
    sku: "0001",
    name: "widget",
    price: 9.99,
  },
  {
    sku: "0002",
    name: "premiumWidget",
    price: 9.99,
  },
  {
    sku: "0003",
    name: "deluxeWidget",
    price: 9.99,
  },
];

export type UseProductContextType = { products: ProductType[] };

const initContextState: UseProductContextType = { products: [] };

const ProductsContext = createContext<UseProductContextType>(initContextState);

type ChildrenType = {
  children?: ReactElement | ReactElement[];
};

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
  const [products] = useState<ProductType[]>(initialState);
  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
