import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSearchedProduct } from "../productSlice";

const Autocomplete = () => {
  const { productList } = useSelector((state) => state.product);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setSearchResults(productList);
  }, [productList.length]);

  useEffect(() => {
    if (searchTerm.length === 0) {
      dispatch(setSearchedProduct({}));
    }
  }, [searchTerm]);

  const updateSearch = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    setFilteredResults(
      searchResults.filter((res) => res.title.match(new RegExp(value, "gi")))
    );
  };

  const handleSearchQueryClick = (searcherProduct) => {
    dispatch(setSearchedProduct(searcherProduct));
  };

  const SearchResults = () => {
    const Message = ({ text }) => {
      return (
        <div>
          <h2>{text}</h2>
          <hr />
        </div>
      );
    };

    if (!searchResults.length) {
      return <Message text="Loading search Result" />;
    }

    if (!searchTerm) {
      return <Message text="Try to search for something" />;
    }

    if (!filteredResults.length) {
      return <Message text="We couldn't find anything for your search term" />;
    }

    return (
      <ul>
        {filteredResults.map((res, idx) => {
          return (
            <li key={idx} onClick={() => handleSearchQueryClick(res)}>
              <p>{res.title}</p>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for Products"
        onKeyUp={updateSearch}
      />
      <SearchResults />
    </div>
  );
};

export { Autocomplete };
