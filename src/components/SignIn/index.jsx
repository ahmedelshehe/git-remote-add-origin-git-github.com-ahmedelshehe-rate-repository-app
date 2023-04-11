import { Formik } from "formik";
import * as yup from "yup";
import FormikTextInput from "./FormikTextInput";
import { Pressable, StyleSheet, View } from "react-native";
import theme from "../styles/theme";
import Text from "../helpers/Text";
import useSignIn from "../../hooks/useSignIn";
import AuthManager from "../../utils/authStorage";
import { useState } from "react";
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
const validationSchema = yup.object().shape({
  username: yup.string().required("Username required"),
  password: yup.string().required("Password required"),
});
const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <Pressable onPress={onSubmit} style={styles.submitButton}>
        <Text fontSize="heading" color="white">
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};
const SignIn = () => {
  const [error,setError] =useState('');
  const [signIn, result] = useSignIn({setError});
  const initialValues = {
    username: "",
    password: "",
  };
  const onSubmit = async (values) => {
    await signIn({
      username: values.username,
      password: values.password,
    });
    const {data} =result
    const authManager =new AuthManager();
    authManager.setAccessToken(data.authenticate.accessToken);
  };
  return (
    <View style={styles.container}>
    {error !== "" ? <Text>{error.message}</Text> : null }
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignIn;
