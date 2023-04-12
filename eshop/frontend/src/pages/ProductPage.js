import {
  useParams, useEffect, useReducer, axios, Row, Col, Loading, MessageBox, getError, ProductDescription, CartDescription,
  Store, useContext, useNavigate, GET_REQUEST, GET_FAIL, GET_SUCCESS, ADD_TO_CART
} from '../Imports'

const reducer = (state, { type, payload }) => {
  switch (type) {
    case GET_REQUEST:
      return { ...state, loading: true };
    case GET_SUCCESS:
      return { ...state, product: payload, loading: false };
    case GET_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

function ProductPage() {
  const params = useParams();
  const { token } = params;
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    product: [],
  });

  const addToCartHandler = async () => {
    const existedItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existedItem ? existedItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/v1/products/${product._id}`);

    if (data.countInStock < quantity) {
      window.alert('Product is out of stock');
      return;
    }

    ctxDispatch({ type: ADD_TO_CART, payload: { ...product, quantity } });
    navigate("/cart");
  }

  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: GET_REQUEST });

      try {
        const res = await axios.get(`/api/v1/products/token/${token}`);
        dispatch({ type: GET_SUCCESS, payload: res.data });
      } catch (err) {
        dispatch({ type: GET_FAIL, payload: getError(err) });
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
                  <CartDescription product={product} addToCartHandler={addToCartHandler} />
                </Col>
              </Row>
            </div>
          )}
    </div>
  );
}
export default ProductPage;