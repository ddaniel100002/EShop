import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import ProductPage from './pages/ProductPage.js';
// import NavBar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
// import { LinkContainer } from 'react-router-bootstrap';
// import { Link } from 'react-router-dom';
// import { Badge } from 'react-bootstrap';
import { useContext } from 'react';
import { Store } from './Store';
import CartPage from './pages/CartPage';
import SigninPage from './pages/SigninPage';
import Header from './components/Header';
import Footer from './components/Footer';

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
