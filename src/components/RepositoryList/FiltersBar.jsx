import RNPickerSelect from "react-native-picker-select";
import { Searchbar } from "react-native-paper";

const FiltersBar = ({ setFilter, setSearchTerm, searchTerm }) => {
  const onChangeSearch = (query) => {
    setSearchTerm(query);
  };

  const placeholder = {
    label: "Select a filter...",
    value: null,
    color: "#9EA0A4",
  };
  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchTerm}
        style={{ margin: 10, backgroundColor: "#FFFFFF" }}
      />
      <RNPickerSelect
        onValueChange={(value) => setFilter(value)}
        items={[
          {
            label: "Latest repositories",
            value: { orderBy: "CREATED_AT", orderDirection: "DESC" },
          },
          {
            label: "Highest rated repositories",
            value: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" },
          },
          {
            label: "Lowest rated repositories",
            value: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" },
          },
        ]}
        placeholder={placeholder}
      />
    </>
  );
};
export default FiltersBar;
