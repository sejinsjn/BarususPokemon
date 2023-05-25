import Link from 'next/link'
import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';

function LinkWithOnClick(url, name) {
    const [checked, setChecked] = useState(false);

    const linkhandler = () => {
        document.getElementById("nav-check1").checked = false;
    }

    return (
        <Link className={`${styles['nav-item']} ${styles.ni2}`} href={url}
            onClick={linkhandler}>{name}</Link>
    );
}

export default function HomeNav({ navItems }) {
    return (
        <div className={styles['header-container']}>
            <header className={styles.header} role="navigation">
                <h2>Barusu</h2>
                <nav className={styles['nav-menu']}>
                    <input id='nav-check1' type="checkbox" />
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul className={styles['nav-links']}>
                        {navItems.map((item, index) => (
                            <li key={index}>{LinkWithOnClick(item.url, item.label)}</li>
                        ))}
                    </ul>
                </nav>
            </header>
        </div>
    );
}
