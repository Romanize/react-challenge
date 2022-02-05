import { Box, Heading } from "@chakra-ui/react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "./containers";
import { UserForm } from "./containers/UserForm";

const App = () => {
  return (
    <Box bg="blackAlpha.100" h="100vh">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="user/:id" element={<UserForm />} />
          <Route
            path="/404"
            element={
              <Heading as="h1" size="3xl">
                404
              </Heading>
            }
          />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default App;
