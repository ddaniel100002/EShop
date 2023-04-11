import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function Checkout({cartItems}) {

    const navigate = useNavigate();

    const checkoutHandler = () => {
        navigate("/signin?redirect=/shipping");
    }

    return (
        <Card>
            <Card.Body>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>
                            Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}
                            {' '}
                            Items) : ${cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                        </h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className="d-grid">
                            <Button type="button" variant="primary" disabled={cartItems.length === 0} onClick={() => checkoutHandler()}>
                                Checkout
                            </Button>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
            </Card.Body>
        </Card>
    )
}
export default Checkout;