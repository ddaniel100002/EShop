import './App.css';
import {
  BrowserRouter, Routes, Route, HomePage, ProductPage, Container, useContext, Store, CartPage,
  SigninPage, Header, Footer
} from './Imports';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { state } = useContext(Store);
  const { cart } = state;

  return (
    <BrowserRouter>
      <div className="d-flex flex-column side-allPage">
        <ToastContainer position='bottom-center' limit={1}/>
          <Header cart={cart} />
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
          <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
