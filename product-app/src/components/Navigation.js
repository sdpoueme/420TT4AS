import { Link } from 'react-router-dom';

function Navigation()
{
    return(
        <div>
            <nav>
                <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
        </div>
    );

}

export default Navigation; 