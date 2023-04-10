import { TextInput as NativeTextInput, StyleSheet } from "react-native";
import theme from "./styles/theme";

const styles = StyleSheet.create({
  margin: 15,
  padding: 15,
  fontSize: 20,
  borderColor: theme.colors.textSecondary,
  borderWidth: 1,
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles, style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
