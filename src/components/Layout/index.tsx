import { FC } from "react";
import { Grid, Heading, Center } from "@chakra-ui/react";

type LayoutType = {
  title: string;
};

export const Layout: FC<LayoutType> = ({ children, title }) => {
  return (
    <Grid templateColumns="1fr" templateRows="100px 1fr" h="100%">
      <Center>
        <Heading as="h1" size="2xl">
          {title}
        </Heading>
      </Center>
      {children}
    </Grid>
  );
};
