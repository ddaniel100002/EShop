import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import ProductPage from './pages/ProductPage.js';
import Container from 'react-bootstrap/Container';
import { useContext } from 'react';
import { Store } from './Store';
import CartPage from './pages/CartPage';
import SigninPage from './pages/SigninPage';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';

function App() {
  const {state} = useContext(Store);
  const {cart} = state;

  return (
    <BrowserRouter>
      <div className="d-flex flex-column side-allPage">
        <Header cart={cart}/>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path="/product/:token" element={<ProductPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/signin" element={<SigninPage />} />
            </Routes>
          </Container>
        </main>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
