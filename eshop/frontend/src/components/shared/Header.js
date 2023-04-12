import {Container, Link, Badge, LinkContainer, NavBar} from '../../Imports';

function Header({ cart }) {
    return (
        <div>
            <header className="header">
                <NavBar bg="dark" variant="dark">
                    <Container>
                        <LinkContainer to="/">
                            <NavBar.Brand>Eshop</NavBar.Brand>
                        </LinkContainer>
                        <nav>
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