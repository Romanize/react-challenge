import { Button, Container, Flex, Heading, VStack, Box, Center, Spacer } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { Layout, UserRow } from "../../components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { asyncFetchUsers } from "../../redux/slices/usersSlice";

export const Dashboard: FC = () => {
  const { users } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();

  // we can prevent here re renders validating either Loaading or data in reducer
  useEffect(() => {
    dispatch(asyncFetchUsers());
  }, []);

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
              <Button>CREATE</Button>
            </Center>
          </Flex>
        </Box>
        <VStack padding={2} as="ul">
          {users.map((user) => (
            <UserRow key={user.id.toString()} user={user} />
          ))}
        </VStack>
      </Container>
    </Layout>
  );
};
