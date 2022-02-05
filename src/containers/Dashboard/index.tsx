import { Button, Container, Flex, Grid, Heading, VStack, Box, Center, Spacer } from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { asyncFetchUsers } from "../../redux/slices/usersSlice";

export const Dashboard: FC = () => {

  const { users } = useAppSelector((state) => state.userSlice )
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncFetchUsers())
  }, [])
  return (
    <Grid templateColumns="1fr" templateRows="100px 1fr" h="100%">
      <Center>
      <Heading as="h1" size="2xl">DASHBOARD</Heading>
      </Center>
      <Container maxWidth="95%" bg="white" borderRadius="md" paddingX={5}>
        <Box height="100px">
          <Flex height="100%">
            <Center>
              <Heading as="h2" size="xl" >USERS LIST</Heading>
            </Center>
            <Spacer />
            <Center>
              <Button>CREATE</Button>
            </Center>
          </Flex>
        </Box>
        <VStack padding={2} as="ul">
          {users.map((user) => (
            <Link to={user.id.toString()}>{user.name}</Link>
          ))}
        </VStack>
      </Container>
    </Grid>
  )
}