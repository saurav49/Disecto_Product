import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './Product.module.css';

import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  Button,
} from '@chakra-ui/react';
import { MdLocalShipping } from 'react-icons/md';
import { ProductReview } from '../index';

const ProductDetailPage = () => {
  const navigate = useNavigate();

  let { selectedProduct } = useSelector(state => state.product);
  if (!selectedProduct.hasOwnProperty('title')) {
    selectedProduct = JSON.parse(localStorage.getItem('selected__product'));
  }

  return (
    <div className={styles.product__detail__wrapper}>
      <Container maxW={'7xl'}>
        <div className={styles.back__btn__wrapper}>
          <Button
            colorScheme="teal"
            variant="outline"
            onClick={() => navigate('/products')}
          >
            Back
          </Button>
        </div>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
        >
          <Flex>
            <Image
              rounded={'md'}
              alt={'product image'}
              src={selectedProduct.image}
              fit={'cover'}
              align={'center'}
              w={'100%'}
              h={{ base: '100%', sm: '400px', lg: '500px' }}
            />
          </Flex>
          <Stack spacing={{ base: 6, md: 10 }}>
            <Box as={'header'}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
              >
                {selectedProduct.title}
              </Heading>
              <Text
                color={useColorModeValue('gray.900', 'gray.400')}
                fontWeight={300}
                fontSize={'2xl'}
              >
                ₹{selectedProduct.price} INR
              </Text>
            </Box>

            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={'column'}
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.200', 'gray.600')}
                />
              }
            >
              <VStack spacing={{ base: 4, sm: 6 }}>
                <Text fontSize={'lg'}>{selectedProduct.description}</Text>
                <Text
                  color={useColorModeValue('gray.500', 'gray.400')}
                  fontSize={'xl'}
                  fontWeight={'300'}
                >
                  {selectedProduct.category}
                </Text>
              </VStack>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={'center'}
            >
              <MdLocalShipping />
              <Text>2-3 business days delivery</Text>
            </Stack>
          </Stack>
        </SimpleGrid>
        {selectedProduct.hasOwnProperty('reviews') && (
          <ProductReview
            id={selectedProduct.id}
            reviews={selectedProduct.reviews}
          />
        )}
      </Container>
    </div>
  );
};

export { ProductDetailPage };
