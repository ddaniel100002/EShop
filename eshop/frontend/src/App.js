import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import ProductPage from './pages/ProductPage.js';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="header">
          <Link to="/">Eshop</Link>
        </header>
        <main>
          <Routes>
            <Route path="/product/:token" element={<ProductPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
