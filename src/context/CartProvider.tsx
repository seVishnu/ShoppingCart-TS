export type CartItemType = {
  sku: string;
  name: string;
  price: number;
  qty: number;
};

type CartStateType = {
  cart: CartItemType[];
};

const initCartState: CartStateType = { cart: [] };
const REDUCER_ACTION_TYPES = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SUBMIT: "SUBMIT",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPES;

export type ReducerAction = {
  type: string;
  payload?: CartItemType;
};

const reducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPES.ADD: {
      if (!action.payload) {
        throw new Error("action.pay;oad missing in ADD");
      }
      const { sku, name, price } = action.payload;
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );
      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      );
      const qty: number = itemExists ? itemExists.qty + 1 : 1;
      return { ...state, cart: [...filteredCart, { sku, name, price, qty }] };
    }
    case REDUCER_ACTION_TYPES.REMOVE: {
      if (!action.payload) {
        throw new Error("action.pay;oad missing in REMOVE");
      }
      const { sku } = action.payload;
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );
      return { ...state, cart: [...filteredCart] };
    }
    case REDUCER_ACTION_TYPES.QUANTITY: {
      if (!action.payload) {
        throw new Error("action.pay;oad missing in QUANTITY");
      }
      const { sku, qty } = action.payload;
      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      );
      if (!itemExists) throw new Error("Item does not exists!");
      const updatedItem: CartItemType = { ...itemExists, qty };
      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );
      return { ...state, cart: [...filteredCart, updatedItem] };
    }

    case REDUCER_ACTION_TYPES.SUBMIT: {
      if (!action.payload) {
        throw new Error("action.pay;oad missing in SUBMIT");
      }
      return { ...state, cart: [] };
    }
    default:
      throw new Error("Unidentified reducer action");
  }
};
