import { useContext } from "react";
import { Store } from "../Store";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Title from "../components/shared/Title";
import Checkout from "../components/cartPage/Checkout";
import ItemsInCart from "../components/cartPage/ItemsInCart";
import axios from 'axios';

function CartPage() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart: { cartItems } } = state;

    const updateCartHandler = async (item, quantity) => {
        const { data } = await axios.get(`/api/v1/products/${item._id}`);

        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
        }
        ctxDispatch({
            type: 'ADD_TO_CART',
            payload: { ...item, quantity },
        });
    }

    const removeItemHandler = (item) => {
        ctxDispatch({
            type: 'REMOVE_FROM_CART',
            payload: item,
        })
    }

    return (
        <div>
            <Title title='Shopping Cart' />
            <Row>
                <Col md={8}>
                    <ItemsInCart removeItemHandler={removeItemHandler} updateCartHandler={updateCartHandler} cartItems={cartItems} />
                </Col>
                <Col md={4}>
                    <Checkout cartItems={cartItems} />
                </Col>
            </Row>
        </div>
    )
}
export default CartPage; 