import { View, StyleSheet } from "react-native";
import Text from "./Text";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#24292e",
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});
const AppBar = () => {
  return (
    <View style={styles.container}>
      <Text color="white" fontSize="heading" fontWeight="bold">
        Repositories
      </Text>
    </View>
  );
};
export default AppBar;
