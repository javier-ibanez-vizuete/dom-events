let catalogoSeries = [
	{ titulo: "Breaking Bad", favorito: false, liked: false },
	{ titulo: "Stranger Things", favorito: false, liked: false },
	{ titulo: "The Witcher", favorito: false, liked: false },
	{ titulo: "Better Call Saul", favorito: false, liked: false },
	{ titulo: "La Casa de Papel", favorito: false, liked: false },
	{ titulo: "Dark", favorito: false, liked: false },
	{ titulo: "The Crown", favorito: false, liked: false },
	{ titulo: "Peaky Blinders", favorito: false, liked: false },
	{ titulo: "Game of Thrones", favorito: false, liked: false },
	{ titulo: "The Mandalorian", favorito: false, liked: false },
	{ titulo: "The Boys", favorito: false, liked: false },
	{ titulo: "Lucifer", favorito: false, liked: false },
	{ titulo: "Ozark", favorito: false, liked: false },
	{ titulo: "Mindhunter", favorito: false, liked: false },
	{ titulo: "Narcos", favorito: false, liked: false },
	{ titulo: "Oz", favorito: false, liked: false },
	{ titulo: "Vikings", favorito: false, liked: false },
	{ titulo: "Sherlock", favorito: false, liked: false },
	{ titulo: "House of Cards", favorito: false, liked: false },
	{ titulo: "Westworld", favorito: false, liked: false },
	{ titulo: "Homeland", favorito: false, liked: false },
	{ titulo: "The Walking Dead", favorito: false, liked: false },
	{ titulo: "Fargo", favorito: false, liked: false },
	{ titulo: "Mr. Robot", favorito: false, liked: false },
	{ titulo: "The Haunting of Hill House", favorito: false, liked: false },
	{ titulo: "The Expanse", favorito: false, liked: false },
	{ titulo: "Rick and Morty", favorito: false, liked: false },
	{ titulo: "BoJack Horseman", favorito: false, liked: false },
	{ titulo: "Arrested Development", favorito: false, liked: false },
	{ titulo: "Lupin", favorito: false, liked: false },
];

const saveSeries = (seriesList) => {
	localStorage.setItem("seriesLibrary", JSON.stringify(seriesList));
};

if (!localStorage.getItem("seriesLibrary")) {
	saveSeries(catalogoSeries);
}

const saveSearch = (inputValue) => {
	localStorage.setItem("currentSearch", inputValue);
};

let seriesLibraryCloud = catalogoSeries;
if (localStorage.getItem("seriesLibrary")) {
	seriesLibraryCloud = JSON.parse(localStorage.getItem("seriesLibrary"));
}

const createButtonForReset = () => {
	const divForButton = document.createElement("div");
	divForButton.id = "div-reset-container";

	const btnForReset = document.createElement("button");
	btnForReset.classList.add("btn-reset");
	btnForReset.textContent = "Reiniciar Catalogo";
	divForButton.appendChild(btnForReset);

	document.body.prepend(divForButton);
};

const createButtonsForSection = () => {
	const counterSection = document.querySelector(".counters-section");
	const filterButtonsContainer = document.createElement("div");
	filterButtonsContainer.classList.add("div-filter-libraries");

	const buttons = [
		{ id: "btn-full-library", extraClasses: ["open-full-library"], text: "Catalogo Completo" },
		{ id: "btn-favorite-library", extraClasses: [], text: "Series Favoritas" },
		{ id: "btn-liked-library", extraClasses: [], text: "Series que me Gustan" },
	];

	buttons.forEach(({ id, extraClasses, text }) => {
		const btn = document.createElement("button");
		btn.id = id;
		btn.classList.add("btn", ...extraClasses);
		btn.textContent = text;
		filterButtonsContainer.appendChild(btn);
	});

	counterSection.after(filterButtonsContainer);
};

const createFormContainer = () => {
	const h1 = document.querySelector("h1");
	const form = Object.assign(document.createElement("form"), { id: "form-container" });

	const inputAdd = Object.assign(document.createElement("input"), {
		type: "text",
		id: "input-add",
		placeholder: "¿Te falta alguna serie? Añadela...",
	});

	const btnAdd = Object.assign(document.createElement("button"), {
		id: "btn-add",
		textContent: "Añadir Serie",
	});
	btnAdd.classList.add("btn");

	form.append(inputAdd, btnAdd);
	h1.after(form);
};

const addSerieToArray = (titulo) => {
	const trimmedTitle = titulo.trim();
	if (!trimmedTitle) return alert("Por favor introduzca un título antes de añadir");

	const exists = seriesLibraryCloud.some((serie) => serie.titulo.toLowerCase() === trimmedTitle.toLowerCase());
	if (exists) return alert("La serie añadida ya existe. Pruebe otra");

	const newSerie = { titulo: trimmedTitle, favorito: false, liked: false };
	seriesLibraryCloud.unshift(newSerie);
	saveSeries(seriesLibraryCloud);
};

const clearContainer = () => {
	const container = document.getElementById("catalogo");
	if (container) container.innerHTML = "";
};

const filterSeriesByTittle = (titulo = "") => {
	const trimmedTitle = titulo.trim().toLowerCase();
	if (!trimmedTitle) return seriesLibraryCloud;
	return seriesLibraryCloud.filter(({ titulo: serieTitulo }) => serieTitulo.toLowerCase().includes(trimmedTitle));
};

const filterSeriesByFavorites = () => {
	const favorites = seriesLibraryCloud.filter(({ favorito }) => favorito);

	if (!favorites.length) {
		alert("Actualmente no tienes ninguna serie en Favorito");
		document.getElementById("btn-full-library")?.classList.add("open-full-library");
		document.getElementById("btn-favorite-library")?.classList.remove("open-favorite-library");
		return renderCatalogo();
	}

	return favorites;
};

const filterSeriesByLikes = () => {
	const likedSeries = seriesLibraryCloud.filter(({ liked }) => liked);

	if (!likedSeries.length) {
		alert("Actualmente no tienes ninguna serie con Likes");
		document.getElementById("btn-full-library")?.classList.add("open-full-library");
		document.getElementById("btn-liked-library")?.classList.remove("open-liked-library");
		return renderCatalogo();
	}

	return likedSeries;
};

const createButtonForDelete = () =>
	Object.assign(document.createElement("button"), { className: "btn-delete", textContent: "X" });

const createLikesButton = (liked) => {
	const btnLikes = Object.assign(document.createElement("button"), {
		className: "btn",
		textContent: liked ? "Liked" : "Like",
	});

	btnLikes.classList.toggle("like-activo", liked);
	return btnLikes;
};

const createFavoriteButton = (favorito) =>
	Object.assign(document.createElement("button"), {
		className: "btn",
		textContent: favorito ? "Quitar Favorito" : "Favorito",
	});

const createSerieTittle = (titulo) => Object.assign(document.createElement("h3"), { textContent: titulo });

const createSerieCard = (serie, index) => {
	const { titulo, favorito, liked } = serie;

	const divSerieCard = document.createElement("div");
	divSerieCard.classList.add("catalog-card");

	const toggleFavorite = (favorito) => {
		serie.favorito = !favorito;
		divSerieCard.classList.toggle("favorito-activo", serie.favorito);
	};

	const toggleLike = (liked) => {
		serie.liked = !liked;
		divSerieCard.classList.toggle("like-activo", serie.liked);
	};

	const titleSerie = createSerieTittle(titulo);
	divSerieCard.appendChild(titleSerie);

	const btnFavorite = createFavoriteButton(favorito);
	btnFavorite.addEventListener("click", () => {
		toggleFavorite(serie.favorito);
		btnFavorite.textContent = serie.favorito ? "Quitar favorito" : "Favorito";
		saveSeries(seriesLibraryCloud);
		recalcularFavoritos();
	});
	divSerieCard.appendChild(btnFavorite);

	const btnLiked = createLikesButton(liked);
	btnLiked.addEventListener("click", () => {
		toggleLike(serie.liked);
		btnLiked.textContent = serie.liked ? "Liked" : "Like";
		saveSeries(seriesLibraryCloud);
		recalcularLikes();
	});
	divSerieCard.appendChild(btnLiked);

	const btnDelete = createButtonForDelete();
	btnDelete.addEventListener("click", () => {
		seriesLibraryCloud.splice(index, 1);
		recalcularFavoritos();
		recalcularLikes();
		renderCatalogo();
		saveSeries(seriesLibraryCloud);
	});
	divSerieCard.appendChild(btnDelete);

	divSerieCard.classList.toggle("like-activo", btnLiked.classList.contains("like-activo"));
	divSerieCard.classList.toggle("favorito-activo", btnFavorite.classList.contains("favorito-activo"));

	saveSeries(seriesLibraryCloud);
	return divSerieCard;
};

const renderCatalogo = (filtroTexto = "") => {
	const btnFullLibrary = document.getElementById("btn-full-library");
	const btnFavotireLibrary = document.getElementById("btn-favorite-library");
	const btnLikedLibrary = document.getElementById("btn-liked-library");

	const clearAndRender = (series, classToAdd) => {
		const libraryContainer = document.getElementById("catalogo");
		series.forEach((serie, index) => {
			const serieCard = createSerieCard(serie, index);
			if (classToAdd) {
				serieCard.classList.add(classToAdd);
			}
			libraryContainer.appendChild(serieCard);
		});
	};

	clearContainer();

	if (btnFullLibrary.classList.contains("open-full-library")) {
		const filteredSeries = filterSeriesByTittle(filtroTexto);
		clearAndRender(filteredSeries);
	}

	if (btnFavotireLibrary.classList.contains("open-favorite-library")) {
		const filteredSeries = filterSeriesByFavorites();
		if (filteredSeries) {
			clearAndRender(filteredSeries, "favorito-activo");
		}
	}

	if (btnLikedLibrary.classList.contains("open-liked-library")) {
		const filteredSeries = filterSeriesByLikes();
		if (filteredSeries) {
			clearAndRender(filteredSeries, "like-activo"); // añadir tambien Favorito activo
		}
	}

	saveSeries(seriesLibraryCloud);
};

const recalcularFavoritos = () => {
	const spanFavoritos = document.getElementById("total-favoritos");

	const totalFavoritos = seriesLibraryCloud.reduce(
		(accumulator, { favorito }) => (favorito ? accumulator + 1 : accumulator),
		0
	);

	spanFavoritos.textContent = totalFavoritos;
};

const recalcularLikes = () => {
	const spanLikes = document.getElementById("total-likes");

	const totalLikes = seriesLibraryCloud.reduce(
		(accumulator, { liked }) => (liked ? accumulator + 1 : accumulator),
		0
	);

	spanLikes.textContent = totalLikes;
};

// document.addEventListener("DOMContentLoaded", () => {
// 	const initializeButtons = () => {
// 		const buttons = {
// 			btnReset: document.querySelector("button.btn-reset"),
// 			btnAdd: document.getElementById("btn-add"),
// 			btnBuscar: document.getElementById("btn-buscar"),
// 			btnOscuro: document.getElementById("btn-oscuro"),
// 			btnFullLibrary: document.getElementById("btn-full-library"),
// 			btnFavotireLibrary: document.getElementById("btn-favorite-library"),
// 			btnLikedLibrary: document.getElementById("btn-liked-library"),
// 		};

// 		buttons.btnReset.addEventListener("click", resetHandler);
// 		buttons.btnAdd.addEventListener("click", addSerieHandler);
// 		buttons.btnBuscar.addEventListener("click", () => renderCatalogo(inputBuscar.value));
// 		buttons.btnOscuro.addEventListener("click", toggleDarkMode);
// 		buttons.btnFullLibrary.addEventListener("click", () => changeLibraryView("full"));
// 		buttons.btnFavotireLibrary.addEventListener("click", () => changeLibraryView("favorite"));
// 		buttons.btnLikedLibrary.addEventListener("click", () => changeLibraryView("liked"));

// 		return buttons;
// 	};

// 	const changeLibraryView = (view) => {
// 		const { btnFullLibrary, btnFavotireLibrary, btnLikedLibrary } = buttons;

// 		btnFullLibrary.classList.remove("open-full-library");
// 		btnFavotireLibrary.classList.remove("open-favorite-library");
// 		btnLikedLibrary.classList.remove("open-liked-library");

// 		if (view === "full") btnFullLibrary.classList.add("open-full-library");
// 		if (view === "favorite") btnFavotireLibrary.classList.add("open-favorite-library");
// 		if (view === "liked") btnLikedLibrary.classList.add("open-liked-library");

// 		renderCatalogo();
// 	};

// 	const resetHandler = () => {
// 		console.log("Estoy funcionando");
// 		saveSeries(catalogoSeries);
// 		seriesLibraryCloud = JSON.parse(localStorage.getItem("seriesLibrary"));
// 		recalcularFavoritos();
// 		recalcularLikes();
// 		renderCatalogo();
// 	};

// 	const addSerieHandler = () => {
// 		addSerieToArray(inputAdd.value);
// 		changeLibraryView("full");
// 	};

// 	const toggleDarkMode = () => document.body.classList.toggle("modo-oscuro");

// 	const inputBuscar = document.getElementById("input-buscar");
// 	inputBuscar.value = localStorage.getItem("currentSearch") || "";
// 	inputBuscar.addEventListener("keyup", () => saveSearch(inputBuscar.value));

// 	const buttons = initializeButtons();

// 	if (inputBuscar.value) {
// 		renderCatalogo(inputBuscar.value);
// 	} else {
// 		renderCatalogo();
// 	}

// 	recalcularFavoritos();
// 	recalcularLikes();
// });


// LA REFACTORIZACION CON IA HA FALLADO (xD)