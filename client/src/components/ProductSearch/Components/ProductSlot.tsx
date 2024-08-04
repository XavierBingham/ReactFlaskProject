//Imports
import { Link } from 'react-router-dom';

//Styles
import './ProductSlot.css';

//Component
export default function ProductSlot() {

    return (
        <Link to="/products/1">
            <li className="product-slot">
                <div className="image-background">
                    <img src="https://dboysfmi9ombm.cloudfront.net/products/shirt.png"/>
                </div>
                <div className="product-info">
                    <p className="product-title">Product Name</p>
                    <p className="product-price">$30.00</p>
                </div>
            </li>
        </Link>
    );

}