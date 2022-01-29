import List from "../components/List";
import { CartProvider } from "../context/CartContext";

const ShoppingList = () => {
  return (
    <CartProvider>
      <List />
    </CartProvider>
  );
};

export default ShoppingList;
