import { useState } from "react";
import { useSelector } from "react-redux";

const ProductDetailPage = () => {
  const [reviewText, setReviewText] = useState("");
  let { selectedProduct } = useSelector((state) => state.product);
  if (!selectedProduct.hasOwnProperty("title")) {
    selectedProduct = JSON.parse(localStorage.getItem("selected__product"));
  }

  return (
    <div>
      {selectedProduct && selectedProduct.hasOwnProperty("image") && (
        <img src={selectedProduct.image} alt="selected-product" />
      )}
      {selectedProduct && selectedProduct.hasOwnProperty("title") && (
        <p>{selectedProduct?.title}</p>
      )}
      {selectedProduct && selectedProduct.hasOwnProperty("price") && (
        <p>{selectedProduct?.price}</p>
      )}
      {selectedProduct && selectedProduct.hasOwnProperty("category") && (
        <p>{selectedProduct?.category}</p>
      )}
      {selectedProduct && selectedProduct.hasOwnProperty("description") && (
        <p>{selectedProduct?.description}</p>
      )}
      <div>
        {selectedProduct &&
          selectedProduct.hasOwnProperty("reviews") &&
          selectedProduct.reviews.map(({ reviewText, rating }) => {
            return (
              <div>
                <p>{reviewText}</p>
                <p>{rating}</p>
              </div>
            );
          })}
        <input
          type="text"
          name="review-text"
          id="review-text"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
      </div>
    </div>
  );
};

export { ProductDetailPage };
