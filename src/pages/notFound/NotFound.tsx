import { NavLink } from 'react-router-dom'
import './notFound.css'

export default function NotFound() {
    return (
        <div className="notFoundContainer">
            <div className="image404">
                <img src="src\assets\pngegg.png" alt="imageNotFound" />
            </div>
            <div className="infoContainer">
                <h2>There's NOTHING here...</h2>
                <p>...maybe the page you're looking for is not found or never existed.</p>
            </div>
            <div className="buttonBack">
                <NavLink to='/dashboard' className="backButtonContainer">
                    <button className='backButton'>Go back</button>
                </NavLink>
            </div>
        </div>
    )

}