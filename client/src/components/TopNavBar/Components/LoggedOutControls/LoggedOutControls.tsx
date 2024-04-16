//Imports
import { Link } from 'react-router-dom';

//Styles
import './LoggedOutControls.css'

//Component
function LoggedOutControls() {

    return (<div id="controls">
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Login</Link>
    </div>)
    
}

export default LoggedOutControls;