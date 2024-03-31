
import './App.css';
import { MantineProvider } from '@mantine/core'; 
import ProductList from './components/ProductList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductDetails from './components/ProductDetails';
import CategoryList from './components/CategoryList';
import ProductListByCategory from './components/ProductListByCategory';


function App() {
  return (
    <MantineProvider>
    <BrowserRouter>
    <Routes>
 
     
      <Route path= '/' element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/categories" element={<CategoryList />} />
      <Route path="/categories/:categoryId" element={<ProductListByCategory/>} />


    </Routes>
    </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
