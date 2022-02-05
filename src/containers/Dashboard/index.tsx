import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { Button, Container, Flex, Heading, VStack, Box, Center, Spacer, Wrap } from "@chakra-ui/react";
import { FC, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, UserRow } from "../../components";
import { useAppSelector } from "../../redux/hooks";
import { LoadingType } from "../../types/types";

export const Dashboard: FC = () => {
  const { users, loading } = useAppSelector((state) => state.userSlice);
  const [sortOrder, setSortOrder] = useState(0);
  const [sortedUsers, setSortedUsers] = useState(users);
  const navigate = useNavigate();

  const isLoading = loading === LoadingType.pending;

  const sortUsers = useCallback(() => {
    const copyOfUsers = [...users];
    copyOfUsers.sort((a, b) => {
      if (a.name < b.name) return -1 * sortOrder;
      if (a.name > b.name) return 1 * sortOrder;
      return 0;
    });
    setSortedUsers(copyOfUsers);
  }, [users, sortOrder]);

  useEffect(() => {
    if (!isLoading) sortUsers();
  }, [isLoading, sortOrder]);

  const handleSort = () => {
    if (sortOrder === 0) setSortOrder(1);
    if (sortOrder === 1) setSortOrder(-1);
    if (sortOrder === -1) setSortOrder(0);
  };

  const getSortIcon = () => {
    switch (sortOrder) {
      case 1:
        return <ArrowDownIcon />;
      case -1:
        return <ArrowUpIcon />;
      default:
        return undefined;
    }
  };

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
              <Wrap spacing={2}>
                <Button bg="green.300" onClick={handleSort} leftIcon={getSortIcon()}>
                  SORT
                </Button>
                <Button bg="blue.300" onClick={() => navigate("/user/create")}>
                  CREATE
                </Button>
              </Wrap>
            </Center>
          </Flex>
        </Box>
        {!isLoading ? (
          <VStack paddingY={5} as="ul">
            {sortedUsers.length ? (
              sortedUsers.map((user) => <UserRow key={user.id.toString()} user={user} />)
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
