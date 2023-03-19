import { Link } from 'react-router-dom';
import data from '../data.js';

function HomePage() {
  return (
    <div>
      <h1>Products</h1>
      <div className="products">
        {data.products.map((product) => (
          <div key={product.token} className="product">
            <Link to={`/product/${product.token}`}>
              <img alt={product.name} src={product.image} />
            </Link>
            <div className="productDesc">
              <p>{product.name}</p>
              <p>
                <strong>{product.price}</strong>$
              </p>
              <p>{product.description}</p>
              <Link to={`/product/${product.token}`}>
                <button>Add To Cart</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
