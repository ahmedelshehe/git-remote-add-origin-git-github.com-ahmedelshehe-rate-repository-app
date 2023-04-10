import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import Text from "./Text";
import Constants from "expo-constants";
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#24292e",
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  pressable: {
    margin: 5,
  },
});
const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        <Pressable style={styles.pressable}>
          <Link to="/">
            <Text color="white" fontSize="heading" fontWeight="bold">
              Repositories
            </Text>
          </Link>
        </Pressable>
        <Pressable style={styles.pressable}>
          <Link to="/signin">
            <Text color="white" fontSize="subheading" fontWeight="bold">
              Sign in
            </Text>
          </Link>
        </Pressable>
      </ScrollView>
    </View>
  );
};
export default AppBar;
