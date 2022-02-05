import { Input } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../../components";

export const UserForm: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Redirect if id doesnt match any user
  useEffect(() => {
    if (id === "other") {
      navigate("/404");
    }
  }, [id]);

  const initialValues = {
    name: "",
    email: "",
  };

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Layout title={`User ${id}`}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => (
          <Form>
            <Field name="name">
              <Input placeholder="Name" />
            </Field>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};
