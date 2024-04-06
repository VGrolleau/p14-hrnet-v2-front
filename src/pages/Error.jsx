import { useEffect } from "react";
import { Link } from "react-router-dom";
import '../utils/style/Error.css';

function Error() {
    useEffect(() => { document.title = "HRnet - 404" })
    return (
        <section className="section-error">
            <h2>404</h2>
            <p>
                Oups! La page que vous demandez n’existe pas.
            </p>
            {/* <Link to='/sites/openclassrooms/hrnet'>Retourner à la page d'accueil</Link> */}
            <Link to='/'>Retourner à la page d'accueil</Link>
        </section>
    )
}

export default Error;