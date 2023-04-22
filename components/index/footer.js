import Link from 'next/link'
import React from "react";

export default function Pokemon() {
    return (
		<footer className="footer">
			<div className="footer-links">
				<ul>
					<li>
						<a href="https://reddit.com/u/sejin_mb" className="footer-link">
							<i className="fab fa-reddit"></i>
							reddit
						</a>
					</li>
					<li>
						<a href="https://twitter.com/sejin_sjn" className="footer-link">
							<i className="fab fa-twitter"></i>
							twitter
						</a>
					</li>
					<li>
						<a href="https://github.com/sejinsjn" className="footer-link">
							<i className="fab fa-github"></i>
							github
						</a>
					</li>
					<li>
						<a href="https://hq.porygon.co/u/sejin_mb" className="footer-link">
							<i class="fa-solid fa-f"></i>
							flairHQ
						</a>
					</li>
				</ul>
			</div>
			<p>Copyright @ 3024</p>
		</footer>
    )
};