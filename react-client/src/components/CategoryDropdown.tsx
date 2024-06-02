import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { httpClient } from '../utils/axios';
import { Link } from 'react-router-dom';

function CategoryDropdown() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        httpClient.get("/categories").then((res) => {
            setCategories(res.data.categories)
        }).catch((err) => console.log(err))
    }, [])

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Categories
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {categories && categories.map((category: any, index) => (
                    <Link to={`/category/${category._id}`} key={index} style={{ textDecoration: 'none' }}>
                        <Dropdown.Item as="button" >{category.name}</Dropdown.Item>
                    </Link>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default CategoryDropdown;