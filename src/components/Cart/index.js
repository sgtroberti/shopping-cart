import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon, CloseIcon } from "@chakra-ui/icons";
import * as S from "./styles";

import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "../../context/CartContext";

import Receipt from "../Receipt";

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
      <Button
        ref={btnRef}
        colorScheme="blue"
        maxW="300px"
        minW="200px"
        alignSelf="center"
        onClick={onOpen}
        marginRight="1rem"
      >
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
                    <S.StyledMiniBox
                      padding="4px"
                      borderWidth="1px"
                      borderRadius="lg"
                      key={item.id}
                    >
                      <div>
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
                      </div>
                      <div>
                        <IconButton
                          icon={<ArrowUpIcon />}
                          onClick={() => {
                            const newItem = {
                              ...item,
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
                        <S.StyledAmount
                          border={"none"}
                          disabled
                          value={cart[cart.indexOf(item)].amount}
                          readOnly
                        />
                        <IconButton
                          icon={<ArrowDownIcon />}
                          onClick={() => {
                            const newItem = {
                              ...item,
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
                      </div>
                    </S.StyledMiniBox>
                  );
                })
              : ""}
          </DrawerBody>

          <S.StyledFooter paddingBottom="20px" height="100px">
            <div>
              <Input
                fontSize="45px"
                border={"none"}
                value={
                  cart
                    ? Number(
                        cart
                          .reduce((sum, actual) => sum + actual.finalPrice, 0)
                          .toFixed(2)
                      ).toLocaleString("pt-BR", {
                        currency: "BRL",
                        style: "currency",
                        minimumFractionDigits: 2,
                      })
                    : `R$ 0,00`
                }
                readOnly
              />
            </div>
            <div>
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

              <Receipt />
            </div>
          </S.StyledFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Cart;
