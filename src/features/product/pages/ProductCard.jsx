import { setSelectedProduct } from '../productSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Image, Stack, Heading, Badge } from '@chakra-ui/react';
import styles from './Product.module.css';

const ProductCard = ({
  id,
  price,
  description,
  image,
  reviews,
  title,
  category,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProductClick = id => {
    dispatch(
      setSelectedProduct({
        id,
        title,
        description,
        image,
        reviews,
        price,
        category,
      })
    );
    setTimeout(() => {
      navigate(`/products/${id}`);
    }, 1000);
  };

  return (
    <div
      className={styles.product__card}
      onClick={() => handleProductClick(id)}
    >
      <Stack p={{ base: '0 2rem' }}>
        <Box borderTopRadius="md" borderWidth={1} maxWidth="320px">
          <Image objectFit="cover" src={image} alt={title} />
          <Box my={2} p={2}>
            <Box mt={3} mb={2}>
              <Badge borderRadius="full" px="2" colorScheme="teal">
                {category}
              </Badge>
            </Box>

            <Heading color="teal.300" size="md" textTransform="capitalize">
              {title}
            </Heading>
            <Box>${price}</Box>
          </Box>
        </Box>
      </Stack>
    </div>
  );
};

export { ProductCard };
