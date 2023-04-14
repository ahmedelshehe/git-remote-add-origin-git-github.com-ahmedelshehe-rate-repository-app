import { Pressable, StyleSheet, View } from "react-native";
import * as yup from "yup";

import FormikTextInput from "../SignIn/FormikTextInput";
import { Formik } from "formik";
import theme from "../styles/theme";
import { useState } from "react";
import useSignIn from "../../hooks/useSignIn";
import { useNavigate } from "react-router-native";
import Text from "../helpers/Text";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../../graphql/mutations";
const styles = StyleSheet.create({
  container: { backgroundColor: theme.colors.white },
  submitButton: {
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    margin: 15,
    padding: 15,
    borderRadius: 5,
  },
});
const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER, {
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  const validationSchema = yup.object().shape({
    username: yup.string().min(1).max(30).required("Username required"),
    password: yup.string().min(5).max(50).required("Password required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });
  const initialValues = {
    username: "",
    password: "",
    confirmPassword: "",
  };
  const [error, setError] = useState("");
  const [signIn] = useSignIn({ setError });
  const navigate = useNavigate();

  const onSubmit = async ({ username, password }) => {
    try {
      const user = { username, password };
      const { data } = await createUser({ variables: { user } });
      if (data) {
        await signIn(user);
        navigate("/");
      }
    } catch (error) {
      setError(error);
    }
  };
  return (
    <View style={styles.container}>
      {error !== "" ? (
        <Text
          fontSize="subheading"
          color="primary"
          style={{ marginHorizontal: 15, marginTop: 5 }}
        >
          {error.message}
        </Text>
      ) : null}
      <SignUpForm
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      />
    </View>
  );
};
export default SignUp;
export const SignUpForm = ({ onSubmit, validationSchema, initialValues }) => {
  return (
    <View>
      <Formik
        initialValues={
          initialValues
            ? initialValues
            : { username: "", password: "", confirmPassword: "" }
        }
        onSubmit={onSubmit}
        validationSchema={validationSchema ? validationSchema : null}
      >
        {({ handleSubmit }) => (
          <>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput
              name="password"
              placeholder="Password"
              secureTextEntry
            />
            <FormikTextInput
              name="confirmPassword"
              placeholder="Confirm password"
              secureTextEntry
            />
            <Pressable onPress={handleSubmit} style={styles.submitButton}>
              <Text fontSize="heading" color="white">
                Sign up
              </Text>
            </Pressable>
          </>
        )}
      </Formik>
    </View>
  );
};
