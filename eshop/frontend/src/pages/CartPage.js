import { useContext } from "react";
import { Store } from "../Store";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Title from "../components/shared/Title";
import Checkout from "../components/cartPage/Checkout";
import ItemsInCart from "../components/cartPage/ItemsInCart";

function CartPage() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart: { cartItems } } = state;

    return (
        <div>
            <Title title='Shopping Cart' />
            <Row>
                <Col md={8}>
                    <ItemsInCart dispatch={ctxDispatch} cartItems={cartItems}/>
                </Col>
                <Col md={4}>
                    <Checkout cartItems={cartItems} />
                </Col>
            </Row>
        </div>
    )
}
export default CartPage; 