import { Button, Container, Flex, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik } from "formik";
import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Layout } from "../../components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createUser, updateUser } from "../../redux/services/userServices";
import { setUsers } from "../../redux/slices/usersSlice";
import { LoadingType, User, UserFormValues } from "../../types/types";
import { LoggerService } from "../../utils/LoggerService";

export const UserForm: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector((state) => state.userSlice);

  const isNewUser = id === "create";
  const editableUser = users.find((user) => user.id.toString() === id);
  const isLoading = loading === LoadingType.pending;

  // Redirect if id doesnt match any user
  useEffect(() => {
    if (!editableUser && !isNewUser && !isLoading) {
      navigate("/404", { replace: true });
    }
  }, [id, isLoading]);

  const initialValues: UserFormValues = {
    name: editableUser?.name || "",
    email: editableUser?.email || "",
  };

  const handleSubmit = async (values: UserFormValues) => {
    if (isNewUser) {
      try {
        const response = await createUser(values);
        const lastUser = users[users.length - 1] || { id: 0 };
        if (response.data.id <= lastUser.id) {
          response.data.id = lastUser.id + 1;
        }
        dispatch(setUsers([...users, response.data]));
        navigate("/");
      } catch (e) {
        LoggerService.error(e as string);
      }
    }
    if (!isNewUser && id) {
      try {
        const response = await updateUser(id, values);
        const filteredUsers = users.filter((user) => user.id.toString() !== id);
        dispatch(setUsers([...filteredUsers, response.data]));
        navigate("/");
      } catch (e) {
        LoggerService.error(e as string);
        // in case you want to edit a local user, we gonna use this catch block
        const userToEdit = users.find((user) => user.id.toString() === id);
        const editedUser = { ...userToEdit, ...values };
        const filteredUsers = users.filter((user) => user.id.toString() !== id);
        dispatch(setUsers([...filteredUsers, editedUser as User]));
        navigate("/");
      }
    }
  };

  const validateSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Insert a valid email").required("Email is required"),
  });

  return (
    <Layout title={isNewUser ? "Create User" : `User ${id}`}>
      <Container maxWidth={700} bg="white" borderRadius="md" paddingX={5} paddingY={10}>
        {!isLoading ? (
          <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validateSchema}>
            {({ errors, touched, isSubmitting, dirty }) => (
              <Form>
                <Field name="name">
                  {({ field }: FieldProps) => (
                    <FormControl>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Input
                        isInvalid={!!(touched.name && errors.name)}
                        placeholder="Name"
                        onChange={field.onChange}
                        value={field.value}
                        name={field.name}
                        onBlur={field.onBlur}
                        errorBorderColor="crimson"
                        focusBorderColor="orange.300"
                        isRequired
                        id="name"
                        type="text"
                      />
                      {touched.name && errors.name && <p style={{ color: "crimson" }}>{errors.name}</p>}
                    </FormControl>
                  )}
                </Field>
                <Field name="email">
                  {({ field }: FieldProps) => (
                    <FormControl id="email" marginTop={5}>
                      <FormLabel>Email</FormLabel>
                      <Input
                        isInvalid={!!(touched.email && errors.email)}
                        placeholder="Email"
                        onChange={field.onChange}
                        value={field.value}
                        name={field.name}
                        onBlur={field.onBlur}
                        errorBorderColor="crimson"
                        focusBorderColor="orange.300"
                        isRequired
                        type="email"
                      />
                      {touched.email && errors.email && <p style={{ color: "crimson" }}>{errors.email}</p>}
                    </FormControl>
                  )}
                </Field>
                <Flex justifyContent="center" alignItems="center" marginTop={10}>
                  <Button bg="red.300" onClick={() => navigate("/")} w={100}>
                    Cancel
                  </Button>
                  <Button bg="green.300" marginStart={5} type="submit" disabled={isSubmitting || !dirty} w={100}>
                    {isNewUser ? "Create" : "Edit"}
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        ) : (
          <Heading as="h2">Loading...</Heading>
        )}
      </Container>
    </Layout>
  );
};
