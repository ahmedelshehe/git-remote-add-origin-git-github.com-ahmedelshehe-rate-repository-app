import { View, Image, StyleSheet, Pressable } from "react-native";
import theme from "../styles/theme";
import Row from "../helpers/Row";
import Column from "../helpers/Row";
import Text from "../helpers/Text";
import StatColumn from "./StatColumn";
import { useNavigate } from "react-router-native";
const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: theme.colors.white,
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    overflow: "hidden",
    marginRight: 12,
  },
  mainColumn: {
    marginHorizontal: 10,
    alignItems: "flex-start",
  },
  languageBadge: {
    backgroundColor: theme.colors.primary,
    padding: 5,
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 10,
  },
  numbersRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 15,
  },
});
const RepositoryItem = ({ item }) => {
  const navigate = useNavigate();
  return (
    <Pressable onPress={() => navigate(`/${item.id}`)}>
      <View style={styles.container} testID="repositoryItem">
        <Row>
          <Image
            style={styles.avatarImage}
            source={{ uri: item.ownerAvatarUrl }}
          />
          <Column style={styles.mainColumn}>
            <Text fontSize="subheading" fontWeight="bold">
              {item.fullName}
            </Text>
            <Text
              color="textSecondary"
              fontSize="subheading"
              style={{ marginTop: 5, marginRight: 50 }}
            >
              {item.description}
            </Text>
            <Text fontWeight="bold" color="white" style={styles.languageBadge}>
              {item.language}
            </Text>
          </Column>
        </Row>

        <Row style={styles.numbersRow}>
          <StatColumn text="Stars" number={item.stargazersCount} />
          <StatColumn text="Forks" number={item.forksCount} />
          <StatColumn text="Reviews" number={item.reviewCount} />
          <StatColumn text="Rating" number={item.ratingAverage} />
        </Row>
      </View>
    </Pressable>
  );
};
export default RepositoryItem;
