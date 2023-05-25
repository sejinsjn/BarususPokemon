import Link from 'next/link'
import React from "react";
import styles from './Intro.module.css';

export default function Intro() {
    return (
        <section className={styles['intro']} id="home">
            <div className={styles['intro-container']}>
                <div className={styles['intro-text']}>
                    <h2>
                        <span className={styles['hear']}> Welcome to my <br />
                            Pokemon Collection</span>
                    </h2>
                    <p>
                        You can find all my Pokemon here <br />
                        but also information about me and my wishlist.
                    </p>
                    <Link className={styles['btn']} href="#mypokemon">Straight to my Pokemon</Link>
                </div>
                <div className={styles['parallelogram']}></div>
            </div>
        </section>
    );
}