import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { useQuery } from "@apollo/client";

import { GET_REPOSITORIES } from "../../graphql/queries";
import Text from "../helpers/Text";
import FiltersBar from "./FiltersBar";
import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { setFilter, setSearchTerm, searchTerm } = this.props;
    return (
      <FiltersBar
        setFilter={setFilter}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      />
    );
  };
  renderItem = ({ item }) => {
    return <RepositoryItem item={item} />;
  };
  render = () => {
    const { repositories } = this.props;
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        renderItem={this.renderItem}
        ListEmptyComponent={<Text>No Repositories</Text>}
      />
    );
  };
}
const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [filter, setFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searched, setSearched] = useState("");
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    variables: filter
      ? { ...filter, searchKeyword: searchTerm }
      : {
          orderBy: "CREATED_AT",
          orderDirection: "DESC",
          searchKeyword: searched,
        },
  });
  const handleSearch = (value) => {
    setSearchTerm(value);
    debounced(value);
  };
  const debounced = useDebouncedCallback((value) => {
    setSearched(value);
  }, 1000);
  if (loading) return <Text>Loading</Text>;
  if (error) return <Text>Error</Text>;
  const { repositories } = data;
  return (
    <RepositoryListContainer
      repositories={repositories}
      setFilter={setFilter}
      setSearchTerm={handleSearch}
      searchTerm={searchTerm}
    />
  );
};

export default RepositoryList;
