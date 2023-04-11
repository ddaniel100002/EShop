import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Store } from "../../Store";
import { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function CartDescription({ product }) {

    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart } = state;

    const addToCartHandler = async () => {
        const existedItem = cart.cartItems.find((x) => x._id === product._id);
        const quantity = existedItem ? existedItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/v1/products/${product._id}`);

        if (data.countInStock < quantity) {
            window.alert('Product is out of stock');
            return;
        }

        ctxDispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });

        navigate("/cart");
    }

    return (
        <Card>
            <Card.Body>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col>Price:</Col>
                            <Col>${product.price}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Status:</Col>
                            <Col>
                                {product.countInStock > 0 ? (
                                    <Badge bg='success'>In Stock</Badge>
                                ) : (
                                    <Badge bg='danger'>Not in Stock</Badge>
                                )}
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    {product.countInStock > 0 && (
                        <ListGroup.Item>
                            <div className='d-grid'>
                                <Button
                                    onClick={addToCartHandler}
                                    variant='primary'>
                                    Add to cart
                                </Button>
                            </div>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Card.Body>
        </Card>
    )
}
export default CartDescription;