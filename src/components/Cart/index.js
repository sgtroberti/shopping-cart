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

import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../../context/CartContext";
import styled from "styled-components";

const Cart = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [newItem, setNewItem] = useState();

  const { clearCart, handleRemoveItem, handleAddItem, cart } =
    useContext(CartContext);

  useEffect(() => {}, [isOpen]);

  useEffect(() => {
    if (newItem) {
      handleAddItem(newItem);
      setNewItem(null);
    }
  }, [newItem]);

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
              ? cart?.map((item) => {
                  return (
                    <StyledMiniBox
                      height="60px"
                      borderWidth="1px"
                      borderRadius="lg"
                      key={item.id}
                    >
                      <Image
                        src={item.img}
                        alt={item.name}
                        height={"50px"}
                        width={"50px"}
                      />
                      <Input border={"none"} disabled value={item.name} />
                      <Input
                        border={"none"}
                        disabled
                        value={`R$ ${item?.finalPrice?.toFixed(2)}`}
                        readOnly
                      />
                      <IconButton
                        icon={<ArrowUpIcon />}
                        onClick={() => {
                          const newItem = {
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            unit: item.unit,
                            img: item.img,
                            multiplier: item.multiplier,
                            amount: Number(
                              (item.amount + item.multiplier).toFixed(2)
                            ),
                            finalPrice: Number(
                              (
                                (item.amount + item.multiplier) *
                                item.price
                              ).toFixed(2)
                            ),
                          };
                          setNewItem(newItem);
                        }}
                      />
                      <StyledAmount
                        border={"none"}
                        disabled
                        value={cart[cart.indexOf(item)].amount}
                        readOnly
                      />
                      <IconButton
                        icon={<ArrowDownIcon />}
                        onClick={() => {
                          const newItem = {
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            unit: item.unit,
                            img: item.img,
                            multiplier: item.multiplier,
                            amount: Number(
                              (item.amount - item.multiplier).toFixed(2)
                            ),
                            finalPrice: Number(
                              (
                                (item.amount - item.multiplier) *
                                item.price
                              ).toFixed(2)
                            ),
                          };
                          setNewItem(newItem);
                        }}
                      />
                      <IconButton
                        marginLeft="4px"
                        colorScheme="red"
                        icon={<CloseIcon />}
                        onClick={() => {
                          handleRemoveItem(item.id);
                        }}
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
              value={`R$: ${
                cart
                  ?.reduce((sum, actual) => sum + actual.finalPrice, 0)
                  .toFixed(2) || `0.00`
              }`}
              readOnly
            />
            <Button
              variant="outline"
              colorScheme="red"
              mr={3}
              onClick={clearCart}
            >
              Limpar
            </Button>
            <Button
              colorScheme="blue"
              variant="outline"
              mr={3}
              onClick={onClose}
              width={"200px"}
            >
              Comprar mais
            </Button>
            <Button colorScheme="blue" width={"230px"}>
              Finalizar Pedido
            </Button>
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

export default Cart;
