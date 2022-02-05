import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import { User } from "../../types/types";

type UserRowType = {
  user: User;
}

export const UserRow: FC<UserRowType> = ({ user }) => {
  return (
    <Flex>
      {user.name}
    </Flex>
  )
}