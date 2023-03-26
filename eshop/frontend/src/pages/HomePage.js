import { Link } from 'react-router-dom';
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_REQUEST': return {...state, loading: true };
    case 'GET_SUCCESS': return {...state,products: action.payload,loading: false};
    case 'GET_FAIL': return {...state, loading: false, error: action.payload };
    default: return state;
  }
}

function HomePage() {

  const [{ loading, error, products}, dispatch] = useReducer(logger(reducer),{ loading: true, error: "", products: []});

  useEffect(() => {
    const getProducts = async() => {
      dispatch({ type: 'GET_REQUEST' });

      try {
        const res = await axios.get('http://localhost:5000/api/v1/products');
        dispatch({ type: 'GET_SUCCESS', payload: res.data });
      } catch (err) {
        dispatch({type: 'GET_FAIL', payload: err.message});
      }
    } 

    getProducts();
  },[])

  return (
    <div>
      <h1>Products</h1>
      <div className="products">
        {
          loading ? (<p>Loading...</p>) 
          : 
          error ? (<p>{error}</p>)
          :
          (products.map((product) => (
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
          )))}
      </div>
    </div>
  );
}

export default HomePage;
