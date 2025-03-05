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
	// Implementar aquí
	const divCatalogo = document.querySelector("#catalogo");
	if (divCatalogo) {
		divCatalogo.innerHTML = "";
	}

	const catalogoFiltrado = catalogoSeries.filter((serie) => {
		const tituloSerie = serie.titulo.toLowerCase();
		const textoFiltradoMinusculas = filtroTexto.toLowerCase();
		if (filtroTexto.length > 0 && tituloSerie.includes(textoFiltradoMinusculas)) {
			console.log("SERIE FILTRADA =>", serie); //PRUEBA TEXTO
			return serie;
		}
		if (filtroTexto.length === 0) {
			// console.log("SERIE FILTRADA TEXTO VACIO =>", serie); //PRUEBA TEXTO VACIO
			return serie;
		}
	});

	if (catalogoFiltrado.length > 0) {
		catalogoFiltrado.forEach((serie) => {
			const divSerieContainer = document.createElement("div");
			divSerieContainer.classList.add("catalog-card");
			divCatalogo.append(divSerieContainer);

			const h3Serie = document.createElement("h3");
			h3Serie.textContent = serie.titulo;
			divSerieContainer.append(h3Serie);

			const buttonFavSerie = document.createElement("button");
			buttonFavSerie.classList.add("btn");
			buttonFavSerie.textContent = "Favorito";
			divSerieContainer.append(buttonFavSerie);

			const buttonLikeSerie = document.createElement("button");
			buttonLikeSerie.classList.add("btn");
			buttonLikeSerie.textContent = "Like";
			divSerieContainer.append(buttonLikeSerie);
		});
	}

	const divSerieFiltrada = document.querySelectorAll("div.catalog-card");
	if (divSerieFiltrada.length > 0) {
		divSerieFiltrada.forEach((card) => {
			card.addEventListener("mouseover", () => {
                // console.log("RATON entra en tarjeta");
				card.style.transform = "translateY(-6px)";
			});

			card.addEventListener("mouseout", () => {
                // console.log("RATON sale de tarjeta");
				card.style.transform = "translateY(0)";
			});

			card.addEventListener("dblclick", () => {
                console.log("Doble click sobre la tarjeta");
				alert(`Doble click en => ${card.querySelector("h3").textContent}`);
			});

			const botonesSeriesFiltradas = card.querySelectorAll("button.btn");
			botonesSeriesFiltradas.forEach((boton) => {
				if (boton.textContent.toLowerCase().includes("favorito")) {
					boton.addEventListener("click", () => {
						catalogoSeries.forEach((serie) => {
							if (serie.titulo === card.querySelector("h3").textContent) {
								if (!serie.favorito) {
                                    console.log("Favorito Activado");
									serie.favorito = true;
									card.classList.add("favorito-activo");
									boton.textContent = "Quitar Favorito";
								} else {
                                    console.log("Favorito Desactivado");
									serie.favorito = false;
									card.classList.remove("favorito-activo");
									boton.textContent = "Favorito";
								}
							}
						});

						recalcularFavoritos();
					});
				}

				if (boton.textContent.toLowerCase().includes("like")) {
					boton.addEventListener("click", () => {
						catalogoSeries.forEach((serie) => {
							if (serie.titulo === card.querySelector("h3").textContent) {
								if (!serie.liked) {
                                    console.log("Like Activado");
									serie.liked = true;
									boton.classList.toggle("like-activo");
									card.classList.toggle("like-activo");
								} else {
                                    console.log("Like Desactivado");
									serie.liked = false;
									boton.classList.toggle("like-activo");
									card.classList.toggle("like-activo");
								}
							}
						});
					});
				}
			});
		});
	}
};


/**
 * 3) FUNCIÓN: recalcularFavoritos()
 *    OBJETIVO:
 *      - Contar cuántos elementos de catalogoSeries tienen favorito = true
 *      - Mostrar ese número en el <span id="total-favoritos">.textContent
*/
const recalcularFavoritos = () => {
    // Implementar aquí
    const spanFavoritos = document.querySelector("#total-favoritos");
    const numeroDeFavoritos = catalogoSeries.reduce((acc, serie) => {
        if (serie.favorito) {
            acc++;
        }
        return acc;
    }, 0);
    spanFavoritos.textContent = numeroDeFavoritos;
};

renderCatalogo("");

/**
 * 4) FUNCIÓN: recalcularLikes()
 *    OBJETIVO:
 *      - Contar cuántos elementos de catalogoSeries tienen liked = true
 *      - Mostrar ese número en el <span id="total-likes">.textContent
 */
const recalcularLikes = () => {
	// Implementar aquí
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
	// Implementar la inicialización de eventos y las llamadas iniciales
});
// PONER DENTRO DEL EVENTO LUEGO
// *      6) Añadir eventos click a los botones:
// *          - Click en "Favorito":   alterna serie.favorito = !serie.favorito. Es decir, modifica el array de catalogoSeries
// *                        si serie.favorito = true, haz => card.classList.add("favorito-activo")
// *                        si está a false, haz => card.classList.remove("favorito-activo")
// *                        actualizar texto del botón ( "Quitar Favorito" / "Añadir Favorito" )
// *                        llamar a recalcularFavoritos() (se define esta función más adelante)
// *
// *          - Click en "Like":       alterna serie.liked = !serie.liked
// *                        toggle .like-activo en el BOTÓN y en la tarjeta
// *                        card.classList.toggle("like-activo")
// *                        btnLike.classList.toggle("like-activo")
// *                        llamar a recalcularLikes()
