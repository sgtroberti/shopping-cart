import { Box } from "@chakra-ui/react";
import * as S from "./styles";
import Form from "../Form";

const FruitCard = ({ name, price, unit, img, id, amount }) => {
  return (
    <S.StyledBox
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <S.StyledImage htmlWidth="200px" src={img} alt={name} />

      <Box p="6">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {name}
        </Box>

        <Box>
          {Number(price.toFixed(2)).toLocaleString("pt-BR", {
            currency: "BRL",
            style: "currency",
            minimumFractionDigits: 2,
          })}
          <Box as="span" color="gray.600" fontSize="sm">
            {` ${unit}`}
          </Box>
        </Box>

        <Box display="flex" mt="2" alignItems="center">
          <Form
            unit={unit}
            price={price}
            name={name}
            img={img}
            id={id}
            amount={amount}
          />
        </Box>
      </Box>
    </S.StyledBox>
  );
};

export default FruitCard;
