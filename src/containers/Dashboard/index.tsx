import { Button, Container, Flex, Heading, VStack, Box, Center, Spacer } from "@chakra-ui/react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, UserRow } from "../../components";
import { useAppSelector } from "../../redux/hooks";
import { LoadingType } from "../../types/types";

export const Dashboard: FC = () => {
  const { users, loading } = useAppSelector((state) => state.userSlice);
  const navigate = useNavigate();

  const isLoading = loading === LoadingType.pending;

  return (
    <Layout title="Dashboard">
      <Container maxWidth="95%" bg="white" borderRadius="md" paddingX={5}>
        <Box height="100px">
          <Flex height="100%">
            <Center>
              <Heading as="h2" size="xl">
                USERS LIST
              </Heading>
            </Center>
            <Spacer />
            <Center>
              <Button bg="blue.300" onClick={() => navigate("/user/create")}>
                CREATE
              </Button>
            </Center>
          </Flex>
        </Box>
        {!isLoading ? (
          <VStack paddingY={5} as="ul">
            {users.length ? (
              users.map((user) => <UserRow key={user.id.toString()} user={user} />)
            ) : (
              <Heading>There are no users on the list</Heading>
            )}
          </VStack>
        ) : (
          <Heading as="h2">Loading...</Heading>
        )}
      </Container>
    </Layout>
  );
};
