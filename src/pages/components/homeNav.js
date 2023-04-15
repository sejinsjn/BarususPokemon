import Link from 'next/link'

export default function HomeNav() {
    return <header>
            <nav className="nav">
                <ul>
                    <li className="nav-item">
                        <Link className="" aria-current="page" href="#home">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="" href="#aboutme">About me</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="" href="#mywishlist">My Wishlist</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="" href="#mypokemon">My Pokemon</Link>
                    </li>
                </ul>
            </nav>
    </header>
}
