import { Button, Center, Container, Heading } from "@chakra-ui/react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const NotFound: FC = () => {
  const navigate = useNavigate();
  return (
    <Container bg="white" padding={10}>
      <Center flexDirection="column" textAlign="center">
        <Heading as="h1" size="3xl">
          404 - Oops! This page does not exist
        </Heading>
        <Button paddingX={5} onClick={() => navigate("/")} marginTop={10} bg="green.300">
          GO BACK TO DASHBOARD
        </Button>
      </Center>
    </Container>
  );
};
