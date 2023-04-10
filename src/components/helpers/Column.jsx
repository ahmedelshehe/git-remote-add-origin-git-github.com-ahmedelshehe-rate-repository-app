import { StyleSheet, View } from "react-native";
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignContent: "space-between",
  },
});
const Column = ({ children, ...props }) => {
  return (
    <View style={styles.container} {...props}>
      {children}
    </View>
  );
};
export default Column;
