import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    console.log("Carrinho: ");
    console.log(cart);
  }, [cart]);

  const handleAddItem = (item) => {
    if (item.amount !== 0) {
      const sameIdFree = cart.filter((el) => el.id !== item.id);
      const newCart = [...sameIdFree, item];
      setCart(newCart);
    } else {
      handleRemoveItem(item.id);
    }
  };

  const handleRemoveItem = (clickedId) => {
    const filteredCart = cart.filter((cartItem) => cartItem.id !== clickedId);
    console.log(filteredCart);
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
