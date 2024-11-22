const slides = [
	{
		"image": "assets/images/slideshow/slide1.jpg",
		"tagLine": "Impressions tous formats <span>en boutique et en ligne</span>"
	},
	{
		"image": "assets/images/slideshow/slide2.jpg",
		"tagLine": "Tirages haute définition grand format <span>pour vos bureaux et events</span>"
	},
	{
		"image": "assets/images/slideshow/slide3.jpg",
		"tagLine": "Grand choix de couleurs <span>de CMJN aux pantones</span>"
	},
	{
		"image": "assets/images/slideshow/slide4.png",
		"tagLine": "Autocollants <span>avec découpe laser sur mesure</span>"
	}
];

let currentIndex = 0; // Indice de la slide actuellement affichée

document.addEventListener("DOMContentLoaded", () => {
	// S'assure que le DOM est chargé avant d'exécuter le code

	let id_banner = document.getElementById("banner"); // Sélectionne l'élément contenant le carrousel
	let dotsContainer = document.querySelector(".dots"); // Sélectionne le conteneur des points de navigation

	/*** Étape 1 : Création et gestion de l'image + texte ***/
	let bannerImage = document.createElement("img"); // Crée un élément image pour afficher les slides
	bannerImage.classList.add("banner-img"); // Ajoute une classe CSS pour styliser l'image
	bannerImage.alt = "Banner Print-it"; // Définit l'attribut `alt` pour l'image (accessibilité)
	id_banner.appendChild(bannerImage); // Ajoute l'image au conteneur principal du carrousel

	let tagLineElement = document.createElement("p"); // Crée un élément paragraphe pour la tagline
	id_banner.appendChild(tagLineElement); // Ajoute le paragraphe au conteneur principal du carrousel

	let updateSlide = () => {
		// Fonction pour mettre à jour l'image, la tagline et les points

		bannerImage.src = slides[currentIndex].image; // Met à jour la source de l'image avec l'image de la slide actuelle
		tagLineElement.innerHTML = slides[currentIndex].tagLine; // Met à jour le texte de la tagline

		// Parcourt tous les points de navigation pour mettre à jour leur état
		Array.from(dotsContainer.children).forEach((dot, index) => {
			// Si l'index correspond à la slide actuelle, le point devient actif
			dot.className = index === currentIndex ? "dot dot_selected" : "dot";
		});
	};

	/*** Étape 2 : Création et gestion des flèches ***/
	let createArrow = (src, className) => {
		// Fonction pour créer une flèche (gauche ou droite)
		let arrow = document.createElement("img"); // Crée un élément image pour la flèche
		arrow.src = src; // Définit la source de l'image de la flèche
		arrow.classList.add(className, 'arrow'); // Ajoute des classes CSS pour styliser la flèche
		id_banner.appendChild(arrow); // Ajoute la flèche au conteneur principal
		return arrow; // Retourne la flèche créée
	};

	// Création de la flèche gauche
	let arrow_left = createArrow('./assets/images/arrow_left.png', 'arrow_left');
	// Création de la flèche droite
	let arrow_right = createArrow('./assets/images/arrow_right.png', 'arrow_right');

	// Ajoute un événement `click` à la flèche gauche pour passer à la slide précédente
	arrow_left.addEventListener("click", () => {
		// Si on est sur la première slide, aller à la dernière. Sinon, passer à la slide précédente
		currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
		updateSlide(); // Met à jour l'affichage du carrousel
	});

	// Ajoute un événement `click` à la flèche droite pour passer à la slide suivante
	arrow_right.addEventListener("click", () => {
		// Si on est sur la dernière slide, revenir à la première. Sinon, passer à la slide suivante
		currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
		updateSlide(); // Met à jour l'affichage du carrousel
	});

	/*** Étape 3 : Création et gestion des points de navigation ***/
	slides.forEach((_, index) => {
		// Pour chaque slide, créer un point de navigation
		let dot = document.createElement("span"); // Crée un élément `span` pour représenter un point
		dot.classList.add("dot"); // Ajoute la classe CSS de base pour un point
		if (index === currentIndex) dot.classList.add("dot_selected"); // Marque le point actif si c'est la slide actuelle

		// Ajoute un événement `click` au point pour naviguer directement à une slide spécifique
		dot.addEventListener("click", () => {
			currentIndex = index; // Change l'indice actuel à celui du point cliqué
			updateSlide(); // Met à jour l'affichage du carrousel
		});
		dotsContainer.appendChild(dot); // Ajoute le point au conteneur des points
	});

	// Initialisation du carrousel avec la première slide
	updateSlide(); // Met à jour l'affichage du carrousel
});
