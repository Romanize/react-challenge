import { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, NotFound, UserForm } from "./containers";
import { asyncFetchUsers } from "./redux/slices/usersSlice";
import { useAppDispatch } from "./redux/hooks";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncFetchUsers());
  }, []);

  return (
    <Box bg="blackAlpha.100" minH="100vh" paddingY={10}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/user/:id" element={<UserForm />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default App;
