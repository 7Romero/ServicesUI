import "./style.scss";

import {Link} from "react-router-dom";

function NotFound() {
    return (
        <section className="error404">
            <div className="context">
                <div className="error404-title">
                    <h1>404</h1>
                </div>

                <div className="error404-info">
                    <h3>Look like you're lost</h3>
                    <p>the page you are looking for not available!</p>
                </div>

                <div className="error404-button">
                    <Link to="/">Go Home</Link>
                </div>
            </div>
        </section>
    );
}

export default NotFound;