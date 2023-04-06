import Link from 'next/link'

export default function Nav() {
    return <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
            <button
                className="navbar-toggler"
                type="button"
                data-mdb-toggle="collapse"
                data-mdb-target="#navbarRightAlignExample"
                aria-controls="navbarRightAlignExample"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <i className="fas fa-bars"></i>
            </button>

            <div className="collapse navbar-collapse" id="navbarRightAlignExample">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" href="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="/sheet/fortrade">For Trade</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="/sheet/gen8events">Gen 8 Events</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="/sheet/gen9events">Gen 9 Events</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" href="/sheet/mycollection">My Collection</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
}