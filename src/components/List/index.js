import { getRenderData, getSavedCart } from "../../services/client";
import FruitCard from "../FruitCard";
import * as S from "./styles";
import Cart from "../Cart";

const List = () => {
  const data = getRenderData();
  const savedCart = getSavedCart();

  const renderData = data.map((mockedElement) => {
    return (
      savedCart?.find((savedElement) => mockedElement.id === savedElement.id) ||
      mockedElement
    );
  });

  return (
    <S.StyledContainer>
      <S.StyledList>
        {renderData.map(({ name, id, price, unit, img, amount }) => {
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
      </S.StyledList>
      <Cart>Abrir Carrinho</Cart>
    </S.StyledContainer>
  );
};

export default List;
