import { StyleSheet } from "react-native";
import theme from "../styles/theme";

export const styles = StyleSheet.create({
  container: { backgroundColor: theme.colors.white },
  submitButton: {
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    margin: 15,
    padding: 15,
    borderRadius: 5,
  },
});
