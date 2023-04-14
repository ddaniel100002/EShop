import { Link, Card, Button, axios, Rating, useContext, Store, ADD_TO_CART, GET_FAIL } from '../../Imports';

function Product({ product }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart: { cartItems } } = state;


  const addToCartHandler = async () => {
    const existedItem = cartItems.find((x) => x._id === product._id);
    const quantity = existedItem ? existedItem.quantity + 1 : 1;

    try {
      const { data } = await axios.get(`/api/v1/products/${product._id}`);

      if (data.countInStock < quantity) {
        window.alert('Sorry. Product is out of stock');
        return;
      }

      ctxDispatch({ type: ADD_TO_CART, payload: { ...product, quantity } });

    } catch (err) {
      ctxDispatch({ type: GET_FAIL, payload: err.message });
    }
  };

  const handleDragStart = (event) => {
    event.dataTransfer.setData('text/plain', product._id);
  };

  return (
    <Card draggable="true" onDragStart={handleDragStart} className="product-card">
      <Link to={`/product/${product.token}`}>
        <Card.Img variant='top' src={product.image} alt={product.title} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.token}`}>
          <Card.Title>{product.title}</Card.Title>
        </Link>
        <Rating
          rating={product.rating.rate}
          numReviews={product.rating.count}
        ></Rating>
        <Card.Text>{product.price}$</Card.Text>
        {product.countInStock === 0 ?
          <Button variant='light' disabled>Out of Stock</Button> : <Button onClick={() => addToCartHandler()} className="btn-primary">Add to Cart</Button>
        }
      </Card.Body>
    </Card>
  );
}

export default Product;
