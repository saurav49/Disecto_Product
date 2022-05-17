import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, toggleProductLoader } from "../productSlice";
import { ProductCard } from "../index";

const ProductList = () => {
  const { productList, searchedProduct } = useSelector(
    (state) => state.product
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleProductLoader("TRUE"));
    dispatch(getAllProducts());
  }, []);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {searchedProduct && searchedProduct.hasOwnProperty("title") ? (
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
    </div>
  );
};

export { ProductList };
