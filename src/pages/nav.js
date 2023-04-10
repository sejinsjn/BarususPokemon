import Link from 'next/link'

export default function Nav() {
    return <nav>
        <ul>
            <li className="nav-item">
                <Link className="" aria-current="page" href="/">Home</Link>
            </li>
            <li className="nav-item">
                <Link className="" href="/sheet/fortrade">For Trade</Link>
            </li>
            <li className="nav-item">
                <Link className="" href="/sheet/gen8events">Gen 8 Events</Link>
            </li>
            <li className="nav-item">
                <Link className="" href="/sheet/gen9events">Gen 9 Events</Link>
            </li>
            <li className="nav-item">
                <Link className="" href="/sheet/mycollection">My Collection</Link>
            </li>
        </ul>
    </nav>
}
