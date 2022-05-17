import { useEffect } from 'react';
import './App.css';
import { ProductList } from './features/product/index';
import { Routes, Route } from 'react-router-dom';
import { ProductDetailPage, Autocomplete } from './features/product/index';
import { useDispatch } from 'react-redux';
import { getAllProducts } from './features/product/productSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/products"
          element={
            <>
              <Autocomplete />
              <ProductList />
            </>
          }
        />
        <Route path="/products/:id" element={<ProductDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
