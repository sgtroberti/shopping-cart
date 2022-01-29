import { ChakraProvider } from "@chakra-ui/provider";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShoppingList from "./routes/shopping-list";
// import ShoppingCart from "./routes/shopping-cart";

const App = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShoppingList />} />
          {/* <Route path="/cart" element={<ShoppingCart />} /> */}
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
