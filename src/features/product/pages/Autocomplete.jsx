import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchedProduct } from '../productSlice';
import { Input, VStack, Text } from '@chakra-ui/react';
import styles from './Product.module.css';

const Autocomplete = () => {
  const { productList } = useSelector(state => state.product);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    setSearchResults(productList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productList.length]);

  useEffect(() => {
    if (searchTerm.length === 0) {
      dispatch(setSearchedProduct({}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const updateSearch = e => {
    const { value } = e.target;
    setSearchTerm(value);
    setFilteredResults(
      searchResults.filter(res => res.title.match(new RegExp(value, 'gi')))
    );
  };

  const handleSearchQueryClick = searcherProduct => {
    dispatch(setSearchedProduct(searcherProduct));
  };

  const SearchResults = () => {
    const Message = ({ text }) => {
      return (
        <div>
          <h2>{text}</h2>
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
      <VStack spacing={2} align="stretch" maxW="xs">
        {filteredResults.map((res, idx) => {
          return (
            <Text
              bg="gray.100"
              key={idx}
              onClick={() => handleSearchQueryClick(res)}
              p={1}
              border="1px"
              borderRadius="md"
              borderColor="gray.100"
            >
              {res.title}
            </Text>
          );
        })}
      </VStack>
    );
  };

  return (
    <div className={styles.autocomplete__wrapper}>
      <div className={styles.inpt__wrapper}>
        <Input
          size="md"
          type="text"
          placeholder="Search for Products"
          onKeyUp={updateSearch}
        />
      </div>
      <SearchResults />
    </div>
  );
};

export { Autocomplete };
