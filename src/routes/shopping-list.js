import styled from "styled-components";
import Header from "../components/Header";
import List from "../components/List";
import { CartProvider } from "../context/CartContext";

const ShoppingList = () => {
  return (
    <>
      <Header />
      <Container>
        <CartProvider>
          <List />
        </CartProvider>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 0 40px;
`;

export default ShoppingList;
