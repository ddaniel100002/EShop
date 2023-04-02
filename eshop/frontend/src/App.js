import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import ProductPage from './pages/ProductPage.js';
import NavBar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import { useContext } from 'react';
import { Store } from './Store';
import CartPage from './pages/CartPage';

function App() {
  const {state} = useContext(Store);
  const {cart} = state;

  return (
    <BrowserRouter>
      <div className="d-flex flex-column side-allPage">
        <header className="header">
          <NavBar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <NavBar.Brand>Eshop</NavBar.Brand>
              </LinkContainer>
              <nav className='ms-auto w-50 justify-content-end'>
                <Link to='/cart' className='nav-link'>
                <i className='fas fa-shopping-cart text-white'></i>
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg='danger'>
                      {cart.cartItems.reduce((a,c) => a + c.quantity,0)}
                    </Badge>
                  )}
                </Link>
              </nav>
            </Container>
          </NavBar>
        </header>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path="/product/:token" element={<ProductPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All Rights Reserved © 2023</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
