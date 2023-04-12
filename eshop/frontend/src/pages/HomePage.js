import { useEffect, useReducer } from 'react';
import axios from 'axios';
import Loading from '../components/shared/Loading';
import MessageBox from '../components/shared/MessageBox';
import Title from '../components/shared/Title';
import Products from '../components/homePage/Products'
//TODO: Aggregate imports into single js file!!

//TODO: export all case strings into const!!
const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'GET_REQUEST':
      return { ...state, loading: true };
    case 'GET_SUCCESS':
      return { ...state, products: payload, loading: false };
    case 'GET_FAIL':
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

function HomePage() {
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    products: [],
  });

  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: 'GET_REQUEST' });

      try {
        const res = await axios.get('http://localhost:5000/api/v1/products');
        dispatch({ type: 'GET_SUCCESS', payload: res.data });
      } catch (err) {
        dispatch({ type: 'GET_FAIL', payload: err.message });
      }
    };

    getProducts();
  }, []);

  return (
    <div>
      <Title title='E-Shop' />
      <h1>Products</h1>
      <div className="products">
        {loading ? <Loading />
          :
          error ?
            (
              <MessageBox variant='danger'>
                {error}
              </MessageBox>
            )
            :
            (
              <Products products={products} />
            )
        }
      </div>
    </div>
  );
}

export default HomePage;