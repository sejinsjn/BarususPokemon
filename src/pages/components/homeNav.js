import Link from 'next/link'


export default function HomeNav() {
    return <header className="nav">
        <input type="checkbox" id="nav-check"/>
        <div className="nav-header">
            <div className="nav-title">
                Barusu
            </div>
        </div>
        <div className="nav-btn">
            <label for="nav-check">
                <span></span>
                <span></span>
                <span></span>
            </label>
        </div>
        <nav className="nav-links">
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
