import { createContext, useEffect, useState } from "react";
import { saveData } from "../../services/client";

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    cart.length && saveData(cart);
  });

  const handleAddItem = (item) => {
    if (item.amount !== 0) {
      const sameIdFree = cart.filter((el) => el.id !== item.id);
      const newCart = [...sameIdFree, item];
      const orderedCart = newCart.sort((a, b) => a.id - b.id);
      setCart(orderedCart);
    } else {
      handleRemoveItem(item.id);
    }
  };

  const handleRemoveItem = (clickedId) => {
    const filteredCart = cart.filter((cartItem) => cartItem.id !== clickedId);
    setCart(filteredCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const searchCartById = (id) => {
    return cart.filter((cartItem) => cartItem.id === id);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        handleAddItem,
        handleRemoveItem,
        clearCart,
        searchCartById,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
