import { getRenderData } from "../../services/client";
import FruitCard from "../FruitCard";
import styled from "styled-components";
import Cart from "../Cart";

const List = () => {
  const data = getRenderData();

  return (
    <>
      <StyledList>
        {data.map(({ name, id, price, unit, img, amount }) => {
          return (
            <FruitCard
              key={id}
              id={id}
              name={name}
              price={price}
              unit={unit}
              img={img}
              amount={amount}
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
