/********************************************************
 * EJERCICIO: Catálogo Interactivo
 * ------------------------------------------------------
 * En este ejercicio, se te proporciona:
 *   - Un array de ~30 series (catalogoSeries)
 *   - Un HTML y un CSS listos (index.html y styles.css)
 *
 * Tu tarea es completar las funciones y eventos en este
 * archivo JS para que el catálogo funcione como se describe
 * en los comentarios.
 *
 * MÉTODOS y PROPIEDADES que deberías usar:
 *  - createElement, appendChild, textContent
 *  - classList.add, classList.remove, classList.toggle
 *  - addEventListener("click", "mouseover", "mouseout", "dblclick", "keyup")
 *  - querySelector, querySelectorAll (p.e. para #catalogo)
 *  - style.transform = "translateY(-6px)" (mouseover)
 *  - style.transform = "translateY(0)"    (mouseout)
 ********************************************************/

/**
 * 1) ARRAY DE SERIES (NO TOCAR).
 * Cada objeto representa una serie:
 *    { titulo: "texto", favorito: boolean, liked: boolean }
 */
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
// localStorage.removeItem("seriesLibrary");
// FUNCION PARA ALMACENAR CATALOGO DE SERIES
const saveSeries = (seriesList) => {
	localStorage.setItem("seriesLibrary", JSON.stringify(seriesList));
};

if (!localStorage.getItem("seriesLibrary")) {
	saveSeries(catalogoSeries);
}
// FUNCION PARA ALMACENAR BUSQUEDA
const saveSearch = (inputValue) => {
	localStorage.setItem("currentSearch", inputValue);
};

// ARRAY DE OBJETOS (NUBE) CON EL QUE TRABAJAREMOS
let seriesLibraryCloud = catalogoSeries;
if (localStorage.getItem("seriesLibrary")) {
	seriesLibraryCloud = JSON.parse(localStorage.getItem("seriesLibrary"));
}

// FUNCION PARA CREAR BOTON DE RESETEO
const createButtonForReset = () => {
	const divForButton = document.createElement("div");
	divForButton.id = "div-reset-container";

	const btnForReset = document.createElement("button");
	btnForReset.classList.add("btn-reset");
	btnForReset.textContent = "Reiniciar Catalogo";
	divForButton.appendChild(btnForReset);

	document.body.prepend(divForButton);
};

// FUNCION PARA CREAR EL DIV DE BOTONES!
const createButtonsForSection = () => {
	const divCounterSection = document.querySelector("div.counters-section");

	const divForFilterButtons = document.createElement("div");
	divForFilterButtons.classList.add("div-filter-libraries");

	const btnFullLibrary = document.createElement("button");
	btnFullLibrary.id = "btn-full-library";
	btnFullLibrary.classList.add("btn");
	btnFullLibrary.classList.add("open-full-library");
	btnFullLibrary.textContent = "Catalogo Completo";
	divForFilterButtons.appendChild(btnFullLibrary);

	const btnFavoriteLibrary = document.createElement("button");
	btnFavoriteLibrary.id = "btn-favorite-library";
	btnFavoriteLibrary.classList.add("btn");

	btnFavoriteLibrary.textContent = "Series Favoritas";
	divForFilterButtons.appendChild(btnFavoriteLibrary);

	const btnLikedLibrary = document.createElement("button");
	btnLikedLibrary.id = "btn-liked-library";
	btnLikedLibrary.classList.add("btn");

	btnLikedLibrary.textContent = "Series que me Gustan";
	divForFilterButtons.appendChild(btnLikedLibrary);

	divCounterSection.after(divForFilterButtons);
};

// FUNCION PARA CREAR FORMULARIO DE AÑADIR SERIE
const createformContainer = () => {
	const h1 = document.querySelector("h1");

	const form = document.createElement("form");
	form.id = "form-container";

	const inputAñadir = document.createElement("input");
	inputAñadir.type = "text";
	inputAñadir.id = "input-add";
	inputAñadir.placeholder = "¿Te falta alguna serie? Añadela...";
	form.appendChild(inputAñadir);

	const btnAñadir = document.createElement("button");
	btnAñadir.id = "btn-add";
	btnAñadir.classList.add("btn");
	btnAñadir.textContent = "Añadir Serie";
	form.appendChild(btnAñadir);

	h1.after(form);
};

// FUNCION PARA AÑADIR SERIE AL ARRAY
const addSerieToArray = (titulo) => {
	if (!titulo.trim()) {
		return alert("Por favor introduzca un titulo antes de Añadir");
	}
	const newSerie = { titulo: titulo, favorito: false, liked: false };
	const coincidence = seriesLibraryCloud.find((serie) => titulo.trim().toLowerCase() === serie.titulo.toLowerCase());
	if (coincidence) {
		return alert("La serie añadida ya existe. Pruebe otra");
	}
	seriesLibraryCloud.unshift(newSerie);
	saveSeries(seriesLibraryCloud);
};

// FUNCION PARA VACIAR EL CONTENEDOR
const clearContainer = () => {
	const container = document.getElementById("catalogo");
	container.innerHTML = "";
};

// FUNCION PARA FILTRAR SERIES (TITULO)
const filterSeriesByTittle = (titulo = "") => {
	const filteredSeries = seriesLibraryCloud.filter((serie) =>
		serie.titulo.toLowerCase().includes(titulo.trim().toLowerCase())
	);
	if (!titulo) {
		return seriesLibraryCloud;
	}
	return filteredSeries;
};

// FUNCION PARA FILTRAR SERIES (FAVORITAS)
const filterSeriesByFavorites = () => {
	const filteredSeries = seriesLibraryCloud.filter((serie) => serie.favorito);
	const btnFullLibrary = document.getElementById("btn-full-library");
	const btnFavoriteLibrary = document.getElementById("btn-favorite-library");

	if (!filteredSeries.length) {
		alert("Actualmente no tienes ninguna serie en Favorito");
		btnFullLibrary.classList.add("open-full-library");
		btnFavoriteLibrary.classList.remove("open-favorite-library");
		return renderCatalogo();
	}
	return filteredSeries;
};

// FUNCION PARA FILTRAR SERIES (LIKES)
const filterSeriesByLikes = () => {
	const filteredSeries = seriesLibraryCloud.filter((serie) => serie.liked);
	const btnFullLibrary = document.getElementById("btn-full-library");
	const btnLikedLibrary = document.getElementById("btn-liked-library");
	if (!filteredSeries.length) {
		alert("Actualmente no tienes ninguna serie con Likes");
		btnFullLibrary.classList.add("open-full-library");
		btnLikedLibrary.classList.remove("open-liked-library");
		return renderCatalogo();
	}
	return filteredSeries;
};

// FUNCION PARA CREAR BOTON DE ELIMINAR
const createButtonForDelete = () => {
	const btnDelete = document.createElement("button");
	btnDelete.classList.add("btn-delete");
	btnDelete.textContent = "X";
	return btnDelete;
};

// FUNCION PARA CREAR BOTON LIKES
const createLikesButton = (liked) => {
	const btnLikes = document.createElement("button");
	btnLikes.classList.add("btn");
	if (liked) {
		btnLikes.classList.add("like-activo");
		btnLikes.textContent = "Liked";
	} else {
		btnLikes.classList.remove("like-activo");
		btnLikes.textContent = "Like";
	}

	return btnLikes;
};

// FUNCION PARA CREAR BOTON FAVORITO
const createFavoriteButton = (favorito) => {
	const btnFavorito = document.createElement("button");
	btnFavorito.classList.add("btn");
	btnFavorito.textContent = favorito ? "Quitar Favorito" : "Favorito";

	return btnFavorito;
};

// FUNCION PARA CREAR TITULO DE SERIE
const createSerieTittle = (titulo) => {
	const h3TituloSerie = document.createElement("h3");
	h3TituloSerie.textContent = titulo;

	return h3TituloSerie;
};

// FUNCION PARA CREAR TARJETA DE SERIE
const createSerieCard = (serie, index) => {
	const divSerieCard = document.createElement("div");
	divSerieCard.classList.add("catalog-card");
	if (serie.favorito) {
		divSerieCard.classList.add("favorito-activo");
	} else {
		divSerieCard.classList.remove("favorito-activo");
	}

	const { titulo } = serie;
	const titleSerie = createSerieTittle(titulo);
	divSerieCard.appendChild(titleSerie);

	const { favorito } = serie;
	const btnFavorite = createFavoriteButton(favorito);
	btnFavorite.addEventListener("click", () => {
		if (serie.favorito) {
			serie.favorito = false;
			btnFavorite.textContent = "Favorito";
			divSerieCard.classList.remove("favorito-activo");
		} else {
			serie.favorito = true;
			btnFavorite.textContent = "Quitar favorito";
			divSerieCard.classList.add("favorito-activo");
		}

		saveSeries(seriesLibraryCloud);
		recalcularFavoritos();
	});
	divSerieCard.appendChild(btnFavorite);

	const { liked } = serie;
	const btnLiked = createLikesButton(liked);
	btnLiked.addEventListener("click", () => {
		if (serie.liked) {
			serie.liked = false;
			btnLiked.classList.remove("like-activo");
			divSerieCard.classList.remove("like-activo");
			btnLiked.textContent = "Like";
		} else {
			serie.liked = true;
			btnLiked.classList.add("like-activo");
			divSerieCard.classList.add("like-activo");
			btnLiked.textContent = "Liked";
		}
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
	if (btnLiked.classList.contains("like-activo")) {
		divSerieCard.classList.add("like-activo");
	} else {
		divSerieCard.classList.remove("like-activo");
	}
	if (btnFavorite.classList.contains("favorito-activo")) {
		divSerieCard.classList.add("favorito-activo");
	} else {
		divSerieCard.classList.remove("favorito-activo");
	}
	saveSeries(seriesLibraryCloud);
	return divSerieCard;
};

/**
 * 2) FUNCIÓN: renderCatalogo(filtroTexto)
 *    TIPO DE FUNCIÓN: function renderCatalogo(filtroTexto = "")
 *
 *  - PARÁMETRO: filtroTexto (string), opcional
 *  - OBJETIVO:
 *      1) Seleccionar el contenedor <div id="catalogo">
 *      2) Vaciarlo con contenedor.innerHTML = ""
 *      3) Filtrar el array catalogoSeries:
 *         Si filtroTexto está vacío => usamos todo el array
 *         Si filtroTexto contiene algo => filtramos si en la propiedad titulo de la serie (en lowercase)
 *              incluye el string filtroTexto en lowercase.
 *      4) Recorrer el array filtrado y, para cada elemento, crear:
 *          a) Un <div> con class "catalog-card" y dentro los siguientes elementos:
 *          b) Un <h3> para el título de la serie
 *          c) Un <button> para "Favorito" con class "btn"
 *          d) Otro <button> para "Like" con class "btn"
 *      5) Añadir eventos a la "catalog-card":
 *          - mouseover => que aplica el siguiente estilo: card.style.transform = "translateY(-6px)"
 *          - mouseout => que aplica el siguiente estilo: card.style.transform = "translateY(0)"
 *          - dblclick => mostrar un alert con el texto "Doble clic en: " + serie.titulo
 *      6) Añadir eventos click a los botones:
 *          - Click en "Favorito":   alterna serie.favorito = !serie.favorito. Es decir, modifica el array de catalogoSeries
 *                        si serie.favorito = true, haz => card.classList.add("favorito-activo")
 *                        si está a false, haz => card.classList.remove("favorito-activo")
 *                        actualizar texto del botón ( "Quitar Favorito" / "Añadir Favorito" )
 *                        llamar a recalcularFavoritos() (se define esta función más adelante)
 *
 *          - Click en "Like":       alterna serie.liked = !serie.liked
 *                        toggle .like-activo en el BOTÓN y en la tarjeta
 *                        card.classList.toggle("like-activo")
 *                        btnLike.classList.toggle("like-activo")
 *                        llamar a recalcularLikes()
 *      7) Insertar cada <div> card en el contenedor con appendChild(card).
 *
 *  Tienes que Implementar todos estos pasos dentro de la función renderCatalogo que está definida aquí:
 */
const renderCatalogo = (filtroTexto = "") => {
	// const divContenedorCatalogo = document.getElementById("catalogo");
	const btnFullLibrary = document.getElementById("btn-full-library");
	const btnFavotireLibrary = document.getElementById("btn-favorite-library");
	const btnLikedLibrary = document.getElementById("btn-liked-library");
	// console.log("El div Contenedor vale => ", divContenedorCatalogo.innerHTML);
	clearContainer();

	if (btnFullLibrary.classList.contains("open-full-library")) {
		const filteredSeries = filterSeriesByTittle(filtroTexto);
		filteredSeries.forEach((serie, index) => {
			const libraryContainer = document.getElementById("catalogo");
			const serieCard = createSerieCard(serie, index);
			if (serie.favorito) {
				serieCard.classList.toggle("favorito-activo");
			}

			libraryContainer.appendChild(serieCard);
		});
	}

	if (btnFavotireLibrary.classList.contains("open-favorite-library")) {
		const filteredSeries = filterSeriesByFavorites();
		if (filteredSeries) {
			filteredSeries.forEach((serie, index) => {
				const libraryContainer = document.getElementById("catalogo");
				const serieCard = createSerieCard(serie, index);
				serieCard.classList.add("favorito-activo");

				libraryContainer.appendChild(serieCard);
			});
		}
	}

	if (btnLikedLibrary.classList.contains("open-liked-library")) {
		const filteredSeries = filterSeriesByLikes();
		if (filteredSeries) {
			filteredSeries.forEach((serie, index) => {
				const libraryContainer = document.getElementById("catalogo");
				const serieCard = createSerieCard(serie, index);
				serieCard.classList.add("like-activo");

				libraryContainer.appendChild(serieCard);
			});
		}
	}
	saveSeries(seriesLibraryCloud);
};

/**
 * 3) FUNCIÓN: recalcularFavoritos()
 *    OBJETIVO:
 *      - Contar cuántos elementos de catalogoSeries tienen favorito = true
 *      - Mostrar ese número en el <span id="total-favoritos">.textContent
 */
const recalcularFavoritos = () => {
	const spanFavoritos = document.getElementById("total-favoritos");
	let accumulator = 0;

	seriesLibraryCloud.forEach((serie) => (serie.favorito ? accumulator++ : accumulator));

	spanFavoritos.textContent = accumulator;
};

/**
 * 4) FUNCIÓN: recalcularLikes()
 *    OBJETIVO:
 *      - Contar cuántos elementos de catalogoSeries tienen liked = true
 *      - Mostrar ese número en el <span id="total-likes">.textContent
 */
const recalcularLikes = () => {
	const spanLikes = document.getElementById("total-likes");
	let accumulator = 0;

	seriesLibraryCloud.forEach((serie) => (serie.liked ? accumulator++ : accumulator));

	spanLikes.textContent = accumulator;
};

/**
 * 5) EVENTOS PRINCIPALES en DOMContentLoaded
 *
 * DOMContentLoaded es una función que se ejecugará automáticamente cuando el navegador haya renderizado el HTML correctamente.
 * Este evento lo disparará el objeto "document" de manera automática.
 * Por lo tanto, dentro del evento DOMContentLoaded se invocarán todas las funciones necesarias para que la web funcione.
 * Como por ejemplo, la primera llamada a renderCatalogo() para que esta función se ejecute y renderice la primera vez
 * las card para cada serie.
 *
 * Deberás hacer:
 *   - Seleccionar elementos:
 *       const btnBuscar = document.getElementById("btn-buscar");
 *       const inputBuscar = document.getElementById("input-buscar");
 *       const btnOscuro = document.getElementById("btn-oscuro");
 *   - Botón "Buscar" Añadir evento (click) => renderCatalogo(inputBuscar.value)
 *   - inputBuscar Añadir evento (keyup) => filtrar en vivo => renderCatalogo(inputBuscar.value)
 *   - Botón "Modo Oscuro" Añadir evento click => document.body.classList.toggle("modo-oscuro")
 *
 *   - Llamamos a renderCatalogo() (sin filtro) la primera vez
 *   - Llamamos a recalcularFavoritos() y recalcularLikes() para iniciar contadores
 */
document.addEventListener("DOMContentLoaded", () => {
	createButtonForReset();
	createformContainer();
	createButtonsForSection();

	const btnReset = document.querySelector("button.btn-reset");

	const inputAdd = document.getElementById("input-add");
	const btnAdd = document.getElementById("btn-add");

	const inputBuscar = document.getElementById("input-buscar");
	const btnBuscar = document.getElementById("btn-buscar");
	const btnOscuro = document.getElementById("btn-oscuro");

	const btnFullLibrary = document.getElementById("btn-full-library");
	const btnFavotireLibrary = document.getElementById("btn-favorite-library");
	const btnLikedLibrary = document.getElementById("btn-liked-library");

	// console.log(JSON.parse(localStorage.getItem("seriesLibrary"))[0]);
	btnReset.addEventListener("click", (event) => {
		console.log("Estoy funcionando");
		saveSeries(catalogoSeries);
		seriesLibraryCloud = JSON.parse(localStorage.getItem("seriesLibrary"));
		recalcularFavoritos();
		recalcularLikes();
		renderCatalogo();
	});

	btnAdd.addEventListener("click", () => {
		addSerieToArray(inputAdd.value);
		btnFullLibrary.classList.add("open-full-library");
		btnFavotireLibrary.classList.remove("open-favorite-library");
		btnLikedLibrary.classList.remove("open-liked-library");
	});

	inputBuscar.value = localStorage.getItem("currentSearch");
	inputBuscar.addEventListener("keyup", () => {
		saveSearch(inputBuscar.value);
		// BUSQUEDA EN CURSO
		const currentSearch = localStorage.getItem("currentSearch");

		renderCatalogo(currentSearch);
	});

	btnBuscar.addEventListener("click", () => {
		renderCatalogo(inputBuscar.value);
	});

	btnOscuro.addEventListener("click", () => {
		document.body.classList.toggle("modo-oscuro");
	});

	btnFullLibrary.addEventListener("click", () => {
		btnFullLibrary.classList.add("open-full-library");
		btnFavotireLibrary.classList.remove("open-favorite-library");
		btnLikedLibrary.classList.remove("open-liked-library");
		renderCatalogo();
	});

	btnFavotireLibrary.addEventListener("click", () => {
		btnFavotireLibrary.classList.add("open-favorite-library");
		btnFullLibrary.classList.remove("open-full-library");
		btnLikedLibrary.classList.remove("open-liked-library");
		renderCatalogo();
	});

	btnLikedLibrary.addEventListener("click", () => {
		btnLikedLibrary.classList.add("open-liked-library");
		btnFullLibrary.classList.remove("open-full-library");
		btnFavotireLibrary.classList.remove("open-favorite-library");
		renderCatalogo();
	});

	if (inputBuscar.value) {
		renderCatalogo(inputBuscar.value);
	} else {
		renderCatalogo();
	}
	recalcularFavoritos();
	recalcularLikes();
});
