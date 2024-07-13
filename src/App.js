import "./App.css";
import NavBar from './components/NavBar';
import Home from "./views/Home/Home";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Box pt="70px">
        <Home />
      </Box>
    </div>
  );
}

export default App;
