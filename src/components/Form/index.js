import {
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
} from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { CartContext } from "../../context/CartContext";

const Form = ({ name, price, unit, img, id }) => {
  const [amount, setAmount] = useState(0);
  const [item, setItem] = useState(null);
  const multiplier = unit === "Kg" ? 0.1 : 1;

  const { handleAddItem } = useContext(CartContext);

  const savedCart = JSON.parse(localStorage.getItem("cart"));
  const filteredSavedCart = savedCart.filter((el) => el.id === id)[0];

  useEffect(() => {
    if (item) {
      handleAddItem(item);
    }
  }, [item]);

  const createItem = () => {
    const finalPrice = Number((price * amount).toFixed(2));
    const newItem = {
      id,
      name,
      price,
      unit,
      amount,
      finalPrice,
      img,
      multiplier,
    };
    setItem((item) => newItem);
  };

  return (
    <StyledFormControl>
      <FormLabel htmlFor="amount">Quantidade</FormLabel>
      <StyledAmountInput>
        <NumberInput
          defaultValue={filteredSavedCart ? filteredSavedCart.amount : 0}
          step={multiplier}
          min={0}
        >
          <NumberInputField
            id="amount"
            onChange={(ev) => setAmount(ev.target.value)}
            textAlign={"center"}
          />
          <NumberInputStepper>
            <NumberIncrementStepper
              onClick={() =>
                setAmount(Number((amount + multiplier).toFixed(1)))
              }
            />
            <NumberDecrementStepper
              onClick={() =>
                amount > 0.01 &&
                setAmount(Number((amount - multiplier).toFixed(1)))
              }
            />
          </NumberInputStepper>
        </NumberInput>
        <StyledUnit>{unit}</StyledUnit>
      </StyledAmountInput>
      <StyledUnit>
        {filteredSavedCart
          ? `R$ ${filteredSavedCart.finalPrice.toFixed(2)}`
          : `R$ ${(price * amount).toFixed(2)}`}
      </StyledUnit>
      <Button onClick={() => createItem()}>Add no Carrinho</Button>
    </StyledFormControl>
  );
};

const StyledAmountInput = styled.div`
  display: flex;
  margin: auto;
  align-items: center;
`;

const StyledUnit = styled.span`
  font-size: 1.2rem;
  padding-left: 5px;
`;

const StyledFormControl = styled(FormControl)`
  display: flex;
  flex-direction: column;
`;

export default Form;
