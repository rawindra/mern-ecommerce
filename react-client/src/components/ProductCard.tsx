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
        <Link style={{ textDecoration: 'none' }} to={`/product/${product._id}`}>
            <Card style={{ width: '18rem', height: '23rem' }} className="p-0 product-card">
                <Card.Img variant="top" src={`http://localhost:8000/${product.image}`} style={{ height: '17rem' }} />
                <Card.Body>
                    <Card.Title>
                        {product.name}
                    </Card.Title>
                    <Card.Text className="text-secondary text-semibold">
                        Rs {product.price}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default ProductCard