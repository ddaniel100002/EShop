import { Container, Link, Badge, LinkContainer, NavBar, axios, ADD_TO_CART, useContext, Store, GET_FAIL } from '../../Imports';

function Header({ cart }) {

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart: { cartItems } } = state;

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = async (event) => {
        event.preventDefault();
        const productId = event.dataTransfer.getData('text/plain');

        const existedItem = cartItems.find((x) => x._id === productId);
        const quantity = existedItem ? existedItem.quantity + 1 : 1;

    try {
      const { data } = await axios.get(`/api/v1/products/${productId}`);

      if (data.countInStock < quantity) {
        window.alert('Sorry. Product is out of stock');
        return;
      }

      ctxDispatch({ type: ADD_TO_CART, payload: { ...data, quantity } });

    } catch (err) {
      ctxDispatch({ type: GET_FAIL, payload: err.message });
    }


    };

    return (
        <div>
            <header className="header">
                <NavBar bg="dark" variant="dark">
                    <Container>
                        <LinkContainer to="/">
                            <NavBar.Brand>Eshop</NavBar.Brand>
                        </LinkContainer>
                        <nav onDragOver={handleDragOver} onDrop={handleDrop}>
                            <Link to='/cart' className='nav-link'>
                                <i className='fas fa-shopping-cart text-white'></i>
                                {cart.cartItems.length > 0 && (
                                    <Badge pill bg='danger'>
                                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                                    </Badge>
                                )}
                            </Link>
                        </nav>
                    </Container>
                </NavBar>
            </header>
        </div>
    )
}
export default Header