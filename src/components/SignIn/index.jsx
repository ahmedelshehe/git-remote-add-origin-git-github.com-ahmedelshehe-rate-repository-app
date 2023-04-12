import { Formik } from "formik";
import * as yup from "yup";
import FormikTextInput from "./FormikTextInput";
import { Pressable, StyleSheet, View } from "react-native";
import theme from "../styles/theme";
import Text from "../helpers/Text";
import useSignIn from "../../hooks/useSignIn";
import { useState } from "react";
import { useNavigate } from "react-router-native";
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
  const [signIn] = useSignIn({setError});
  const navigate =useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };
  const onSubmit = async (values) => {
    try {
      await signIn({
      username: values.username,
      password: values.password,
    });
    navigate('/')
    } catch (error) {
      setError(error);
    }
    
  };
  return (
    <View style={styles.container}>
      {error !== "" ? <Text fontSize="subheading" color="primary" style={{marginHorizontal:15,marginTop:5 }}>{error.message}</Text> : null }
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
