import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";

function CartDescription({ product, addToCartHandler }) {
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
                                {product.countInStock > 0 ?
                                    <Badge bg='success'>In Stock</Badge>
                                    :
                                    <Badge bg='danger'>Not in Stock</Badge>
                                }
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    {product.countInStock > 0 && (
                        <ListGroup.Item>
                            <div className='d-grid'>
                                <Button
                                    onClick={() => addToCartHandler()}
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