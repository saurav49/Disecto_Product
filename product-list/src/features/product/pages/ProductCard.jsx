import { setSelectedProduct, toggleProductLoader } from "../productSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Image } from "@chakra-ui/react";

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

  const handleProductClick = (id) => {
    dispatch(toggleProductLoader("TRUE"));
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
    // <div
    //   onClick={() => handleProductClick(id)}
    //   style={{
    //     width: "500px",
    //     margin: "0.5em",
    //     borderRadius: "0.5em",
    //     border: "1px solid #333",
    //     cursor: "pointer",
    //   }}
    // >
    //   <img src={image} alt="product" style={{ width: "50%" }} />
    //   <p>{title}</p>
    //   <p>{description}</p>
    //   <p>${price}</p>
    //   <p>{category}</p>
    //   {reviews.length > 0 &&
    //     reviews.map(({ reviewText, rating }) => {
    //       return (
    //         <div>
    //           <p>{reviewText}</p>
    //           <p>{rating}</p>
    //         </div>
    //       );
    //     })}
    // </div>
    <Box>
      <Image src={image} alt={title} />
      <Box p="6">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {title}
        </Box>
      </Box>
    </Box>
  );
};

export { ProductCard };
