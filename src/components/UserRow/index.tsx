import { Button, Center, Grid } from "@chakra-ui/react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/types";

type UserRowType = {
  user: User;
};

export const UserRow: FC<UserRowType> = ({ user }) => {
  const navigate = useNavigate();
  const handleDelete = () => {
    console.log("Delete");
  };
  return (
    <Grid
      paddingY={5}
      border="2px"
      borderColor="transparent"
      templateColumns="repeat(7, 1fr)"
      as="li"
      width="100%"
      borderRadius="xl"
      boxShadow="md"
    >
      <Center>{user.id}</Center>
      <Center>{user.name}</Center>
      <Center>{user.username}</Center>
      <Center>{user.email}</Center>
      <Center>{user.address.city}</Center>
      <Center>
        <Button bg="orange.300" onClick={() => navigate(`/user/${user.id}`)}>
          edit
        </Button>
      </Center>
      <Center>
        <Button bg="red.300" onClick={handleDelete}>
          delete
        </Button>
      </Center>
    </Grid>
  );
};
