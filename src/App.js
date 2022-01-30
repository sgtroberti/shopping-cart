import { ChakraProvider } from "@chakra-ui/provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShoppingList from "./routes/shopping-list";

const App = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShoppingList />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
