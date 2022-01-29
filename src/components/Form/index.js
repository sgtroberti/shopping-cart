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
  const [item, setItem] = useState();
  const multiplier = unit === "Kg" ? 0.1 : 1;

  const { handleAddItem, cart, searchCartById, handleRemoveItem } =
    useContext(CartContext);

  useEffect(() => {
    if (item) {
      handleAddItem(item);
    }
  }, [item]);

  const createItem = () => {
    const finalPrice = Number((price * amount).toFixed(2));
    const newItem = { id, name, price, unit, amount, finalPrice, img };
    setItem((item) => newItem);
  };

  return (
    <StyledFormControl>
      <FormLabel htmlFor="amount">Quantidade</FormLabel>
      <StyledAmountInput>
        <NumberInput step={multiplier} min={-0.1}>
          <NumberInputField
            id="amount"
            onChange={(ev) => setAmount(ev.target.value)}
            value={0}
          />
          <NumberInputStepper>
            <NumberIncrementStepper
              onClick={() =>
                setAmount(Number((amount + multiplier).toFixed(1)))
              }
            />
            <NumberDecrementStepper
              onClick={() =>
                amount > 0 &&
                setAmount(Number((amount - multiplier).toFixed(1)))
              }
            />
          </NumberInputStepper>
        </NumberInput>
        <StyledUnit>{unit}</StyledUnit>
      </StyledAmountInput>
      <StyledUnit>{`R$ ${(price * amount).toFixed(2)}`}</StyledUnit>
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
