import { useQuery } from "@apollo/client";
import Text from "../helpers/Text";
import { ME } from "../../graphql/queries";
import { FlatList, StyleSheet, View } from "react-native";
import ReviewItem from "./ReviewItem";
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});
const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { data, error, loading } = useQuery(ME);
  if (loading) return <Text>Loading</Text>;
  if (error) return <Text>Error</Text>;
  const { me } = data;
  const reviewNodes = me.reviews
    ? me.reviews.edges.map((edge) => edge.node)
    : [];
  console.log(reviewNodes);
  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListEmptyComponent={<Text>No Reviews</Text>}
    />
  );
};
export default MyReviews;
