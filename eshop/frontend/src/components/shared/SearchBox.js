import { Button, Form, useLocation, useNavigate, useState } from "../../Imports";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { useEffect } from "react";
import { getFilterUrl } from "../../Utils";

const SearchBox = () => {

    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const { search } = useLocation();
    

    const submitHandler = (e) => {
        e.preventDefault();
        const filterURI = getFilterUrl(search,{query: query});
        navigate(filterURI);
    };



    useEffect(() => {
        //getFilterUrl(search);
        if (!query) {
            return;
        }
        const filterURI = getFilterUrl(search,{query: query});
        navigate(filterURI);
    },[query])

    return (
        <Form onSubmit={(e) => submitHandler(e)} className="d-flex me-auto w-50">
            <InputGroup>
                <FormControl aria-describedby='button-search' placeholder='Search for products' type='text' name='q' id='q' onChange={(e) => setQuery(e.target.value)}>

                </FormControl>
                <Button variant="outline-primary" type='submit' id="button-search"><i className="fas fa-search"></i></Button>
            </InputGroup>
        </Form>
    )
}
export default SearchBox;