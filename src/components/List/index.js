import { getData } from "../../services/client";
import FruitCard from "../FruitCard";
import styled from "styled-components";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import Cart from "../Cart";

const List = () => {
  const data = getData();
  const { cart } = useContext(CartContext);

  return (
    <>
      <StyledList>
        {data.map(({ name, id, price, unit, img }) => {
          return (
            <FruitCard
              key={id}
              id={id}
              name={name}
              price={price}
              unit={unit}
              img={img}
            />
          );
        })}
      </StyledList>
      <Cart>Abrir Carrinho</Cart>
    </>
  );
};

const StyledList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default List;
