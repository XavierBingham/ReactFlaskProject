//Styles
import { useParams } from 'react-router-dom';
import './ProductView.css'

//Component
export default function ProductView() {

    const {id} = useParams();

    return (
        <div>
            A product {id}
        </div>
    );

}