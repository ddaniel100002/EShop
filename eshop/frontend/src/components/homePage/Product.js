import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from '../shared/Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../../Store';

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

      ctxDispatch({type: 'ADD_TO_CART', payload: { ...product, quantity }});

    } catch (err) {
      ctxDispatch({type: 'GET_FAIL',payload: err.message});
    }
  }

  return (
    <Card className="product-card">
      <Link to={`/product/${product.token}`}>
        <Card.Img variant="top" src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.token}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
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
