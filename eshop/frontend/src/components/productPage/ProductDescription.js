import ListGroup from 'react-bootstrap/ListGroup';
import Title from '../shared/Title';
import Rating from '../shared/Rating';

function ProductDescription({name, rating, numReviews, price, description}) {
    return (
        <ListGroup>
            <ListGroup.Item>
                <Title title={name} />
                <h1>{name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
                <Rating
                    rating={rating}
                    numReviews={numReviews}>
                </Rating>
            </ListGroup.Item>
            <ListGroup.Item>Price: ${price}
            </ListGroup.Item>
            <ListGroup.Item>
                Description: <p className='lead'>{description}</p>
            </ListGroup.Item>
        </ListGroup>
    )
}
export default ProductDescription;