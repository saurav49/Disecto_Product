import axios from 'axios';
import {
  PRODUCT__API,
  SET__RATING__API,
  GET__RATING__OF__PRODUCT__API,
} from '../urls';

const fetchAllProducts = async () => {
  try {
    const response = await axios.get(PRODUCT__API);
    return response;
  } catch (error) {
    console.log(error.message);
  }
};

const addReview = async ratingInfo => {
  try {
    const response = await axios.post(SET__RATING__API, {
      ratingInfo,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { fetchAllProducts, addReview };
