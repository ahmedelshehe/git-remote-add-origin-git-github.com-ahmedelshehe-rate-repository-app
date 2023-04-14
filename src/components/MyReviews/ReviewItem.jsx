import { Alert, Pressable, StyleSheet, View } from "react-native";
import format from "date-fns/format";
import { useNavigate } from "react-router-native";
import Text from "../helpers/Text";
import Row from "./../helpers/Row";
import theme from "../styles/theme";
import Column from "../helpers/Column";
import { DELETE_REVIEW } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { ME } from "../../graphql/queries";
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
  urlButton: {
    width: 180,
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 2,
    overflow: "hidden",
    marginTop: 10,
    textAlign: "center",
  },
  deleteButton: {
    width: 180,
    backgroundColor: "#ff0000",
    padding: 15,
    borderRadius: 2,
    overflow: "hidden",
    marginTop: 10,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
  },
});

const ReviewItem = ({ review }) => {
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    onError: (error) => {
      throw new Error(error.message);
    },
    refetchQueries: [{ query: ME }],
  });
  const createTwoButtonAlert = () =>
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "DELETE", onPress: handleDeleteReview },
      ]
    );
  const handleDeleteReview = async () => {
    try {
      await deleteReview({ variables: { deleteReviewId: review.id } });
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
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
      <View style={styles.buttonsContainer}>
        <Pressable onPress={() => navigate(`/${review.repositoryId}`)}>
          <Text
            fontWeight="bold"
            fontSize="subheading"
            color="white"
            style={styles.urlButton}
          >
            view repository
          </Text>
        </Pressable>
        <Pressable onPress={createTwoButtonAlert}>
          <Text
            fontWeight="bold"
            fontSize="subheading"
            color="white"
            style={styles.deleteButton}
          >
            Delete review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
export default ReviewItem;
