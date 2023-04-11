import { useParams } from 'react-router-dom';
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loading from '../components/shared/Loading';
import MessageBox from '../components/shared/MessageBox';
import { getError } from '../Utils';
import ProductDescription from '../components/productPage/ProductDescription';
import CartDescription from '../components/productPage/CartDescription';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'GET_REQUEST':
      return { ...state, loading: true };
    case 'GET_SUCCESS':
      return { ...state, product: payload, loading: false };
    case 'GET_FAIL':
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

function ProductPage() {
  const params = useParams();
  const { token } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    product: [],
  });

  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: 'GET_REQUEST' });

      try {
        const res = await axios.get(`/api/v1/products/token/${token}`);
        dispatch({ type: 'GET_SUCCESS', payload: res.data });
      } catch (err) {
        dispatch({ type: 'GET_FAIL', payload: getError(err) });
      }
    };

    getProduct();
  }, [token]); 

  return (
    <div>
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
            <div>
              <Row>
                <Col md={6}>
                  <img className="img-large" src={`../${product.image}`} alt={product.name} />
                </Col>

                <Col md={3}>
                  <ProductDescription {...product} />
                </Col>

                <Col md={3}>
                  <CartDescription product={product}/>
                </Col>
              </Row>
            </div>
          )}
    </div>
  );
}

export default ProductPage;