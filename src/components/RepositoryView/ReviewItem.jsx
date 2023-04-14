import { StyleSheet, View } from "react-native";
import format from "date-fns/format";

import Text from "../helpers/Text";
import Row from "./../helpers/Row";
import theme from "../styles/theme";
import Column from "../helpers/Column";
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
  },
  ratingBadge: {
    width: 50,
    height: 50,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 25,
    padding: 5,
    paddingTop: 12,
    textAlign: "center",
    marginRight: 20,
  },
  header: {
    flexDirection: "row",
    padding: 20,
  },
});
const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <Row style={styles.header}>
        <Text
          fontSize="subheading"
          style={styles.ratingBadge}
          fontWeight="bold"
          color="primary"
        >
          {review.rating}
        </Text>
        <Column>
          <Text fontWeight="bold" fontSize="subheading">
            {review.user.username}
          </Text>
          <Text fontSize="subheading" color="textSecondary">
            {format(new Date(review.createdAt), "dd-MM-yyyy")}
          </Text>
          <Text fontSize="subheading" style={{ marginRight: 80 }}>
            {review.text}
          </Text>
        </Column>
      </Row>
    </View>
  );
};
export default ReviewItem;
