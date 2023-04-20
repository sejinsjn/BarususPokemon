import Link from 'next/link'
import React from "react";

export default function Pokemon() {
    return (
		<footer class="footer">
			<div class="footer__redes">
				<ul class="footer__redes-wrapper">
					<li>
						<a href="#" class="footer__link">
							<i class="fab fa-facebook-f"></i>
							facebook
						</a>
					</li>
					<li>
						<a href="#" class="footer__link">
							<i class="fab fa-twitter"></i>
							twitter
						</a>
					</li>
					<li>
						<a href="#" class="footer__link">
							<i class="fab fa-instagram"></i>
							instagram
						</a>
					</li>
					<li>
						<a href="#" class="footer__link">
							<i class="fab fa-youtube"></i>
							youtube
						</a>
					</li>
				</ul>
			</div>
			<div class="separador"></div>
			<p class="footer__texto">Copyright @ 2022</p>
		</footer>
    )
};