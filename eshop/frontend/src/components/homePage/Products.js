import { Row, Col, Product } from '../../Imports';

function Products({ products }) {
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
export default Products;