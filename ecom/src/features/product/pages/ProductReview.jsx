import { useState } from 'react';
import { Input, Button, VStack, Box, Text } from '@chakra-ui/react';
import styles from './Product.module.css';
import { useDispatch } from 'react-redux';
import { addReviewToProduct } from '../productSlice';

const StarRating = ({ rating, setRating, isDisable }) => {
  const [hover, setHover] = useState(0);
  return (
    <div className={isDisable ? `${styles.btn__disable}` : ``}>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={
              index <= (hover || rating)
                ? `${styles.str__btn} ${styles.rated}`
                : `${styles.str__btn} ${styles.notrated}`
            }
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span>&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

const ProductReview = ({ id, reviews }) => {
  const dispatch = useDispatch();
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  console.log(reviews);

  const handleChange = e => {
    const { value } = e.target;
    setReviewText(value);
  };

  const handleSubmitReview = () => {
    dispatch(addReviewToProduct({ _id: id, reviewText, rating }));
    setReviewText('');
    setRating('');
  };

  return (
    <div className={styles.autocomplete__wrapper}>
      <div className={styles.inpt__wrapper}>
        <Input
          size="md"
          type="text"
          placeholder="Leave a Review"
          value={reviewText}
          onChange={handleChange}
        />
        <StarRating rating={rating} setRating={setRating} isDisable={false} />
      </div>
      <Button colorScheme="teal" variant="outline" onClick={handleSubmitReview}>
        Submit
      </Button>
      <VStack>
        {reviews.length > 0 &&
          reviews.map(({ reviewText, rating }, idx) => {
            return (
              <Box
                key={idx}
                my={3}
                border="1px"
                px={3}
                py={2}
                borderRadius="md"
                borderColor="gray.300"
                width="320px"
                borderLeftWidth="5px"
                borderLeftColor="teal.200"
              >
                <StarRating rating={rating} isDisable={true} />
                <Text>{reviewText}</Text>
              </Box>
            );
          })}
      </VStack>
    </div>
  );
};

export { ProductReview };
