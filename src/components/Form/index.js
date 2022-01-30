import {
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import * as S from "./styles";
import { CartContext } from "../../context/CartContext";

const Form = ({ name, price, unit, img, id, amount }) => {
  const [newAmount, setNewAmount] = useState(amount);
  const [item, setItem] = useState(null);

  const multiplier = unit === "Kg" ? 0.1 : 1;
  const { handleAddItem } = useContext(CartContext);

  const toast = useToast();

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
    toast({
      title: "Item adicionado ao carrinho",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <S.StyledFormControl>
      <FormLabel htmlFor="amount">Quantidade</FormLabel>
      <S.StyledAmountInput>
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
                newAmount > 0.01 &&
                setNewAmount(Number((newAmount - multiplier).toFixed(1)))
              }
            />
          </NumberInputStepper>
        </NumberInput>
        <S.StyledUnit>{unit}</S.StyledUnit>
      </S.StyledAmountInput>
      <S.StyledUnit>{`R$ ${(price * newAmount).toFixed(2)}`}</S.StyledUnit>
      <Button onClick={() => createItem()}>Add no Carrinho</Button>
    </S.StyledFormControl>
  );
};

export default Form;
