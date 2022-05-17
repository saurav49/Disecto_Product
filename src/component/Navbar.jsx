import { Box, Flex, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box bg="gray.800" px={4} py={6}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box color="#fff">
            <Heading as="h1" size="2xl" onClick={() => navigate('/')}>
              Logo
            </Heading>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export { Navbar };
