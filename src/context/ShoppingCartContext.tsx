import { ReactNode, createContext, useContext, useState } from "react";
import { Item } from "react-bootstrap/lib/Breadcrumb";
import { ShoppingCart } from "../components/ShoppingCart";
type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;

  quantity: number;
};
type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantitu: (id: number) => number;
  increaseCartQuantitu: (id: number) => void;
  decreaseCartQuantitu: (id: number) => void;
  removefromcart: (id: number) => void;
  cartQuantity: number;
  cartitems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, SetIsOpen] = useState(false);
  const [cartitems, setCartItems] = useState<CartItem[]>([]);
  const cartQuantity = cartitems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => SetIsOpen(true);
  const closeCart = () => SetIsOpen(false);
  function getItemQuantitu(id: number) {  
    return cartitems.find((item) => item.id === id)?.quantity || 0;
  }
  function increaseCartQuantitu(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decreaseCartQuantitu(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removefromcart(id: number) {
    setCartItems((currItem) => {
      return currItem.filter((item) => item.id !== id);
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantitu,
        increaseCartQuantitu,
        decreaseCartQuantitu,
        removefromcart,
        openCart,
        closeCart,
        cartitems,
        cartQuantity,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen}/>
    </ShoppingCartContext.Provider>
  );
}
