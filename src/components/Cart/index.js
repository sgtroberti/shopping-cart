import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
  Image,
  Box,
  IconButton,
} from "@chakra-ui/react";

import { ArrowUpIcon, ArrowDownIcon, CloseIcon } from "@chakra-ui/icons";

import { useContext, useEffect, useRef } from "react";
import { CartContext } from "../../context/CartContext";
import styled from "styled-components";

const Cart = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const { cart } = useContext(CartContext);

  return (
    <>
      <Button ref={btnRef} colorScheme="blue" onClick={onOpen}>
        {children}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="lg"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Carrinho</DrawerHeader>

          <DrawerBody>
            {cart
              ? cart.map((item) => {
                  return (
                    <StyledMiniBox
                      height="60px"
                      borderWidth="1px"
                      borderRadius="lg"
                    >
                      <Image src={item.img} alt={item.name} height={"50px"} />
                      <Input border={"none"} disabled value={item.name} />
                      <Input
                        border={"none"}
                        disabled
                        value={`R$ ${item.finalPrice.toFixed(2)}`}
                      />
                      <IconButton icon={<ArrowUpIcon />} />
                      <StyledAmount
                        border={"none"}
                        disabled
                        value={item.amount}
                      />
                      <IconButton icon={<ArrowDownIcon />} />
                      <IconButton
                        marginLeft="4px"
                        colorScheme="red"
                        icon={<CloseIcon />}
                      />
                    </StyledMiniBox>
                  );
                })
              : ""}
          </DrawerBody>

          <DrawerFooter paddingBottom="20px" height="100px">
            <Input
              fontSize="45px"
              border={"none"}
              value={`R$: ${cart
                ?.reduce((sum, actual) => sum + actual.finalPrice, 0)
                .toFixed(2)}`}
            />
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="blue">Finalizar Pedido</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const StyledMiniBox = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px;
  margin-bottom: 4px;
`;

const StyledAmount = styled(Input)`
  text-align: center;
  max-width: 80px;
`;

const StyledFinalValue = styled(Input)`
  color: #000;
  font-size: 50px;
`;

export default Cart;
