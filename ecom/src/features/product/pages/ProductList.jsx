import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, toggleProductLoader } from '../productSlice';
import { ProductCard } from '../index';
import { Grid, Container, Flex } from '@chakra-ui/react';

const ProductList = () => {
  const { productList, searchedProduct } = useSelector(state => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleProductLoader('TRUE'));
    dispatch(getAllProducts());
  }, []);

  return (
    <Flex
      direction="column"
      justifyContent="center"
      maxW={{ xl: '1200px' }}
      m="0 auto"
      minH="100vh"
    >
      <Grid
        w="full"
        gridGap="5"
        gridTemplateColumns="repeat( auto-fit, minmax(300px, 1fr) )"
      >
        {searchedProduct && searchedProduct.hasOwnProperty('title') ? (
          <ProductCard
            key={searchedProduct._id}
            id={searchedProduct._id}
            price={searchedProduct.price}
            description={searchedProduct.description}
            image={searchedProduct.image}
            reviews={searchedProduct.reviews}
            title={searchedProduct.title}
            category={searchedProduct.category}
          />
        ) : Array.isArray(productList) && productList.length > 0 ? (
          productList.map(
            ({ title, _id, price, description, image, reviews, category }) => {
              return (
                <ProductCard
                  key={_id}
                  id={_id}
                  price={price}
                  description={description}
                  image={image}
                  reviews={reviews}
                  title={title}
                  category={category}
                />
              );
            }
          )
        ) : (
          <div>
            <p>No product present</p>
          </div>
        )}
      </Grid>
    </Flex>
  );
};

export { ProductList };
