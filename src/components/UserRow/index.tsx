import { Button, Center, SimpleGrid } from "@chakra-ui/react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { deleteUser } from "../../redux/services/userServices";
import { setUsers } from "../../redux/slices/usersSlice";
import { User } from "../../types/types";
import { LoggerService } from "../../utils/LoggerService";

type UserRowType = {
  user: User;
};

export const UserRow: FC<UserRowType> = ({ user }) => {
  const { users } = useAppSelector((state) => state.userSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: `Do you want to delete the user ${user.name}?`,
      showCancelButton: true,
      confirmButtonText: "Delete",
    });
    if (confirm.isConfirmed) {
      try {
        // We can do this too with asynThunk and prevent using selectors and dispatch here
        await deleteUser(user.id.toString());
        // Se finally comment
        // const filteredUsers = users.filter((element) => element.id !== user.id);
        // dispatch(setUsers([...filteredUsers]));
      } catch (e) {
        LoggerService.error(e as string);
      } finally {
        // Leave this here, because you can not delete a local create user
        const filteredUsers = users.filter((element) => element.id !== user.id);
        dispatch(setUsers([...filteredUsers]));
      }
    } else {
      Swal.close();
    }
  };
  return (
    <SimpleGrid
      paddingY={5}
      border="2px"
      borderColor="transparent"
      columns={{
        sm: 2,
        md: 3,
        lg: 5,
        xl: 7,
      }}
      as="li"
      width="100%"
      borderRadius="xl"
      boxShadow="md"
      spacing={5}
    >
      <Center>{user.id}</Center>
      <Center>{user.name}</Center>
      <Center>{user.username}</Center>
      <Center>{user.email}</Center>
      <Center>{user.address?.city}</Center>
      <Center>
        <Button bg="orange.300" onClick={() => navigate(`user/${user.id}`)}>
          edit
        </Button>
      </Center>
      <Center>
        <Button bg="red.300" onClick={handleDelete}>
          delete
        </Button>
      </Center>
    </SimpleGrid>
  );
};
