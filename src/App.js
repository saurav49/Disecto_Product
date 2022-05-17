import { useEffect } from 'react';
import './App.css';
import { ProductList } from './features/product/index';
import { Routes, Route } from 'react-router-dom';
import { ProductDetailPage, Autocomplete } from './features/product/index';
import { useDispatch } from 'react-redux';
import { getAllProducts } from './features/product/productSlice';
import { Navbar } from './component/index';
import { Button, Flex, Center } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const HomeButton = () => {
    return (
      <Flex w="100vw" h="100vh" justify="center" align="center">
        <Center>
          <Button
            colorScheme="blue"
            onClick={() => navigate('/products')}
            size="lg"
          >
            See All Products
          </Button>
        </Center>
      </Flex>
    );
  };

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeButton />} />
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
