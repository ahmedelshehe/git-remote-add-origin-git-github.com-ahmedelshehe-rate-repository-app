import { StyleSheet, View } from "react-native";
const styles = StyleSheet.create({
  container: { display: "flex", flexDirection: "row" },
});
const Row = ({ children, ...props }) => {
  return (
    <View style={styles.container} {...props}>
      {children}
    </View>
  );
};
export default Row;
