import Link from 'next/link'
import React from "react";

export default function Pokemon() {
    return (
		<footer className="footer">
			<div className="footer-links">
				<ul>
					<li>
						<Link href="https://reddit.com/u/sejin_mb" className="footer-link">
							<i className="fab fa-reddit"></i>
							reddit
						</Link>
					</li>
					<li>
						<Link href="https://twitter.com/sejin_sjn" className="footer-link">
							<i className="fab fa-twitter"></i>
							twitter
						</Link>
					</li>
					<li>
						<Link href="https://github.com/sejinsjn" className="footer-link">
							<i className="fab fa-github"></i>
							github
						</Link>
					</li>
					<li>
						<Link href="https://hq.porygon.co/u/sejin_mb" className="footer-link">
							<i class="fa-solid fa-f"></i>
							flairHQ
						</Link>
					</li>
				</ul>
			</div>
			<p>Copyright @ 3024</p>
		</footer>
    )
};