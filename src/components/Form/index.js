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

const Form = ({ name, price, unit, img, id, amount }) => {
  const [newAmount, setNewAmount] = useState(amount);
  const [item, setItem] = useState(null);

  const multiplier = unit === "Kg" ? 0.1 : 1;
  const { handleAddItem } = useContext(CartContext);

  useEffect(() => {
    if (item) {
      handleAddItem(item);
      setItem(null);
    }
  }, [item]);

  const createItem = () => {
    const finalPrice = Number((price * newAmount).toFixed(2));
    const newItem = {
      id,
      name,
      price,
      unit,
      amount: newAmount,
      finalPrice,
      img,
      multiplier,
    };
    setItem(newItem);
  };

  return (
    <StyledFormControl>
      <FormLabel htmlFor="amount">Quantidade</FormLabel>
      <StyledAmountInput>
        <NumberInput defaultValue={amount} step={multiplier} min={0}>
          <NumberInputField
            id="amount"
            onChange={(ev) => setNewAmount(ev.target.value)}
            textAlign={"center"}
          />
          <NumberInputStepper>
            <NumberIncrementStepper
              onClick={() =>
                setNewAmount(Number((newAmount + multiplier).toFixed(1)))
              }
            />
            <NumberDecrementStepper
              onClick={() =>
                amount > 0.01 &&
                setNewAmount(Number((newAmount - multiplier).toFixed(1)))
              }
            />
          </NumberInputStepper>
        </NumberInput>
        <StyledUnit>{unit}</StyledUnit>
      </StyledAmountInput>
      <StyledUnit>{`R$ ${(price * newAmount).toFixed(2)}`}</StyledUnit>
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
