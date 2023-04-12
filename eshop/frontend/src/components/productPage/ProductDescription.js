import {ListGroup, Title, Rating} from '../../Imports';

function ProductDescription({title, rating, price, description}) {
    return (
        <ListGroup>
            <ListGroup.Item>
                <Title title={title} />
                <h1>{title}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
                <Rating
                    rating={rating.rate}
                    numReviews={rating.count}>
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