import { Box, Heading } from '@chakra-ui/react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './containers';
import { UserForm } from './containers/UserForm';

const App = () => {
  return (
    <Box bg="blackAlpha.100" h='100vh' >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/:id" element={<UserForm />} />
          <Route path="/404" element={<Heading as="h1" size="3xl" />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
