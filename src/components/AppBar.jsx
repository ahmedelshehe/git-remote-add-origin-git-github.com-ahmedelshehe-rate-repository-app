import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import Text from "./helpers/Text";
import Constants from "expo-constants";
import { Link } from "react-router-native";
import { useApolloClient, useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
import { useAuthStorage } from "../hooks/useAuthStorage";
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
  const authStorage =useAuthStorage()
  const apolloClient=useApolloClient()
  const {data,error,loading} = useQuery(ME)
  if (loading) return <Text>Loading</Text>;
  if (error) return <Text>Error</Text>;
  const {me} =data
  const handleSignOut = () =>{
    authStorage.removeAccessToken()
    apolloClient.resetStore()
  }
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
        {
          me ? 
          <Pressable style={styles.pressable} onPress={handleSignOut}>
            <Text color="white" fontSize="subheading" fontWeight="bold">
              Sign out
            </Text>
          </Pressable> :
          <Pressable style={styles.pressable}>
          <Link to="/signin">
            <Text color="white" fontSize="subheading" fontWeight="bold">
              Sign in
            </Text>
          </Link>
        </Pressable>
        }
      </ScrollView>
    </View>
  );
};
export default AppBar;
