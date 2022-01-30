import { Box, Image } from "@chakra-ui/react";
import styled from "styled-components";
import Form from "../Form";

const FruitCard = ({ name, price, unit, img, id, amount }) => {
  return (
    <StyledBox maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <StyledImage htmlWidth="200px" src={img} alt={name} />

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
          {`R$ ${price.toFixed(2)}`}
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
    </StyledBox>
  );
};

const StyledBox = styled(Box)`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 0 1rem 1rem 0;
`;

const StyledImage = styled(Image)`
  height: 150px;
  width: 150px;
`;

export default FruitCard;
