import {
  useEffect, useReducer, axios, Loading, MessageBox, Title, Products,
  GET_SUCCESS, GET_FAIL, GET_REQUEST, homePageReducer
} from '../Imports'

const initialState = {
  loading: true,
  error: '',
  products: [],
};

function HomePage() {
  const [{ loading, error, products }, dispatch] = useReducer(homePageReducer, initialState);

  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: GET_REQUEST });

      try {
        const res = await axios.get('api/v1/products');
        dispatch({ type: GET_SUCCESS, payload: res.data });
      } catch (err) {
        dispatch({ type: GET_FAIL, payload: err.message });
      }
    };

    getProducts();
  }, []);

  return (
    <div>
      <Title title='E-Shop' />

      <div className='backgroundHomePage'>
        <img style={{width: '100%'}} src='https://m.media-amazon.com/images/I/81d5OrWJAkL._SX3000_.jpg'/>
      </div>
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