import { TextInput as NativeTextInput, StyleSheet } from "react-native";
import theme from "./styles/theme";

const styles = StyleSheet.create({
  input: {
    marginTop: 15,
    marginHorizontal: 15,
    padding: 15,
    fontSize: 20,
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    borderRadius: 10,
  },
  errorInput: {
    borderColor: "#d73a4a",
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.input, error && styles.errorInput, style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
