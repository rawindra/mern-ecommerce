import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"

type IProductCard = {
    product: {
        _id: string
        name: string
        image: string
        price: number
    }
}

const ProductCard = ({ product }: IProductCard) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={`http://localhost:8000/${product.image}`} />
            <Card.Body>
                <Card.Title>
                    <Link style={{ textDecoration: 'none' }} to={`/product/${product._id}`}> {product.name}</Link>
                </Card.Title>
                <Card.Text>
                    Rs {product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ProductCard