import NavBar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';

function Header(props) {
    return (
        <div>
            <header className="header">
                <NavBar bg="dark" variant="dark">
                    <Container>
                        <LinkContainer to="/">
                            <NavBar.Brand>Eshop</NavBar.Brand>
                        </LinkContainer>
                        <nav className='ms-auto w-50 justify-content-end'>
                            <Link to='/cart' className='nav-link'>
                                <i className='fas fa-shopping-cart text-white'></i>
                                {props.cart.cartItems.length > 0 && (
                                    <Badge pill bg='danger'>
                                        {props.cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
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