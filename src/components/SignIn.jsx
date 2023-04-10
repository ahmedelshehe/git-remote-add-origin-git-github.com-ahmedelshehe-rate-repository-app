import { Formik } from "formik";
import FormikTextInput from "./FormikTextInput";
import { Pressable, StyleSheet, View } from "react-native";
import theme from "./styles/theme";
import Text from "./Text";
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
  const initialValues = {
    username: "",
  };
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <View style={styles.container}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignIn;
