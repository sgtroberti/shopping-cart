import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
  Box,
} from "@chakra-ui/react";

import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const Receipt = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { clearCart, cart } = useContext(CartContext);

  return (
    <>
      <Button colorScheme="blue" width="250px" onClick={onOpen}>
        Finalizar Compra
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            {cart?.length > 0
              ? `Confira sua compra - Após a confirmação irá limpar o carrinho`
              : `Não há itens no carrinho`}
          </ModalHeader>
          <ModalBody>
            {cart?.map((item) => {
              return (
                <Box
                  key={item.id}
                  borderWidth="1px"
                  borderRadius="lg"
                  color="black"
                  _hover={{ bg: "teal.500", color: "white" }}
                  margin="10px"
                  padding="15px"
                >
                  <p>
                    <strong>Item: {item.name}</strong>
                  </p>
                  <p>Quantidade: {`${item.amount} ${item.unit}`}</p>
                  <p>Valor: {`R$ ${item.finalPrice.toFixed(2)}`}</p>
                </Box>
              );
            })}
          </ModalBody>
          <ModalBody>
            <Box
              color="black"
              margin="10px"
              padding="12px"
              fontSize="30px"
              fontWeight="700"
              textAlign="center"
            >
              {cart
                ? Number(
                    cart
                      .reduce((sum, actual) => sum + actual.finalPrice, 0)
                      .toFixed(2)
                  ).toLocaleString("pt-BR", {
                    currency: "BRL",
                    style: "currency",
                    minimumFractionDigits: 2,
                  })
                : `R$ 0,00`}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              colorScheme="blue"
              mr={3}
              onClick={onClose}
            >
              {cart && cart.reduce((sum, actual) => sum + actual?.finalPrice, 0)
                ? "Continuar comprando"
                : "Voltar"}
            </Button>
            {cart && (
              <Button
                colorScheme="blue"
                mr={3}
                onClick={clearCart}
                disabled={
                  cart &&
                  cart.reduce((sum, actual) => sum + actual?.finalPrice, 0)
                    ? false
                    : true
                }
              >
                Confirmar
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Receipt;
