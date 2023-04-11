import Row  from "react-bootstrap/Row";
import Col  from "react-bootstrap/Col";
import Product from "./Product";

function DisplayProducts({products}) {
    return (
        <Row>
            {products.map((product) => (
                <Col key={product.token} lg={3} md={4} sm={6} className="mb-3">
                    <Product product={product}></Product>
                </Col>
            ))}
        </Row>
    )
}
export default DisplayProducts;