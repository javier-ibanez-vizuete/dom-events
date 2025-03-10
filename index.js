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
// console.log("ANTES DE LA NUBE =>", localStorage.getItem("catalogoSeries"));
if (!localStorage.getItem("catalogoSeries")) {
	localStorage.setItem("catalogoSeries", JSON.stringify(catalogoSeries));
}
// console.log("DESPUES DE LA NUBE =>", localStorage.getItem("catalogoSeries"));
let listadoSeriesEnLaNube = JSON.parse(localStorage.getItem("catalogoSeries"));
// console.log("QUE VALE LISTADO SERIES EN LA NUBE ", listadoSeriesEnLaNube);

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

	const catalogoFiltrado = listadoSeriesEnLaNube.filter((serie) => {
		const tituloSerie = serie.titulo.toLowerCase();
		const textoFiltradoMinusculas = filtroTexto.toLowerCase();
		if (filtroTexto.length > 0 && tituloSerie.includes(textoFiltradoMinusculas)) {
			// console.log("SERIE FILTRADA =>", serie); //PRUEBA TEXTO
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
			if (serie.liked) {
				divSerieContainer.classList.add("like-activo");
			}
			if (serie.favorito) {
				divSerieContainer.classList.add("favorito-activo");
			}
			divCatalogo.append(divSerieContainer);
			//  AÑADIENDO EL BOTON DE ELIMINAR DEL ARRAY
			const botoneliminar = document.createElement("button");
			botoneliminar.classList.add("btn-eliminar");
			botoneliminar.textContent = "X";
			divSerieContainer.append(botoneliminar);

			const h3Serie = document.createElement("h3");
			h3Serie.textContent = serie.titulo;
			divSerieContainer.append(h3Serie);

			const buttonFavSerie = document.createElement("button");
			buttonFavSerie.classList.add("btn");
			if (serie.favorito) {
				buttonFavSerie.textContent = "Quitar Favorito";
			} else {
				buttonFavSerie.textContent = "Favorito";
			}
			divSerieContainer.append(buttonFavSerie);

			const buttonLikeSerie = document.createElement("button");
			buttonLikeSerie.classList.add("btn");
			if (serie.liked) {
				buttonLikeSerie.classList.add("like-activo");
			}
			buttonLikeSerie.textContent = serie.liked ? "Liked" : "Like";

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
				// console.log("Doble click sobre la tarjeta");
				alert(`Doble click en => ${card.querySelector("h3").textContent}`);
			});

			const botonesSeriesFiltradas = card.querySelectorAll("button.btn");
			botonesSeriesFiltradas.forEach((boton) => {
				if (boton.textContent.toLowerCase().includes("favorito")) {
					boton.addEventListener("click", () => {
						listadoSeriesEnLaNube.forEach((serieNube) => {
							if (serieNube.titulo === card.querySelector("h3").textContent) {
								if (!serieNube.favorito) {
									// console.log("Favorito Activado");
									serieNube.favorito = true;
									card.classList.add("favorito-activo");
									boton.textContent = "Quitar Favorito";
								} else {
									// console.log("Favorito Desactivado");
									serieNube.favorito = false;
									card.classList.remove("favorito-activo");
									boton.textContent = "Favorito";
								}
								localStorage.setItem("catalogoSeries", JSON.stringify(listadoSeriesEnLaNube));
							}
						});

						recalcularFavoritos();
					});
				}

				if (boton.textContent.toLowerCase().includes("like")) {
					boton.addEventListener("click", () => {
						listadoSeriesEnLaNube.forEach((serieNube) => {
							if (serieNube.titulo === card.querySelector("h3").textContent) {
								if (!serieNube.liked) {
									// console.log("Like Activado");
									serieNube.liked = true;
									boton.classList.add("like-activo");
									boton.textContent = "Liked";
									card.classList.add("like-activo");
								} else {
									// console.log("Like Desactivado");
									serieNube.liked = false;
									boton.classList.remove("like-activo");
									boton.textContent = "Like";
									card.classList.remove("like-activo");
								}
								localStorage.setItem("catalogoSeries", JSON.stringify(listadoSeriesEnLaNube));
							}
						});

						recalcularLikes();
					});
				}
			});
			//  ELIMINANDO TARJETAS
			const botonEliminarSerie = card.querySelector("button.btn-eliminar");
			if (botonEliminarSerie) {
				botonEliminarSerie.addEventListener("click", () => {
					listadoSeriesEnLaNube.forEach((serieNube, index) => {
						if (serieNube.titulo === card.querySelector("h3").textContent) {
							listadoSeriesEnLaNube.splice(index, 1);
							localStorage.setItem("catalogoSeries", JSON.stringify(listadoSeriesEnLaNube));
							renderCatalogo();
						}
					});
				});
			}
		});
	}
	return listadoSeriesEnLaNube;
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
	const numeroDeFavoritos = listadoSeriesEnLaNube.reduce((acc, serie) => {
		if (serie.favorito) {
			acc++;
		}
		return acc;
	}, 0);
	if (spanFavoritos) {
		spanFavoritos.textContent = numeroDeFavoritos;
	}
};

/**
 * 4) FUNCIÓN: recalcularLikes()
 *    OBJETIVO:
 *      - Contar cuántos elementos de catalogoSeries tienen liked = true
 *      - Mostrar ese número en el <span id="total-likes">.textContent
 */
const recalcularLikes = () => {
	// Implementar aquí
	const spanLikes = document.querySelector("#total-likes");
	const numeroDeLikes = listadoSeriesEnLaNube.reduce((acc, serie) => {
		if (serie.liked) {
			acc++;
		}
		return acc;
	}, 0);

	if (spanLikes) {
		spanLikes.textContent = numeroDeLikes;
	}
};

/**
 *  FORMULARIO PARA AÑADIR SERIES AL LISTADO!
 * 1-CREAR UNA FUNCION QUE AÑADA UN OBJETO NUEVO AL LISTADO ANTIGUO.
 * 2-ESE OBJETO TIENE QUE TENER DE FORMA PREDETERMINADA FAVORITOS: TRUE / FALSE Y LIKED: TRUE O FALSE;
 */

const añadirSerie = (tituloNuevaSerie) => {
	let nuevaSerie = { titulo: tituloNuevaSerie, favorito: false, liked: false };

	if (tituloNuevaSerie.length === 0) {
		alert("Porfavor introduzca un titulo antes de añadir");
	}
	let tituloNuevaSerieEnMinusculas = "";
	if (tituloNuevaSerie.length > 0) {
		tituloNuevaSerieEnMinusculas = tituloNuevaSerie.trim().toLowerCase();
	}
	if (listadoSeriesEnLaNube.length > 0) {
		for (let serie of listadoSeriesEnLaNube) {
			const tituloSerieExistente = serie.titulo.toLowerCase();
			if (tituloSerieExistente === tituloNuevaSerieEnMinusculas) {
				alert("La serie introducida ya existe");
				break;
			}
		}
		listadoSeriesEnLaNube.forEach((serie, index, array) => {
			if (index === array.length - 1) {
				listadoSeriesEnLaNube.unshift(nuevaSerie);
				localStorage.setItem("catalogoSeries", JSON.stringify(listadoSeriesEnLaNube));
			}
		});
		// console.log("lista De Series en la nube", listadoSeriesEnLaNube);
	}
};

/**
 * AÑADIR SOLO FAVORITOS
 */
const seriesFavoritas = () => {
	const soloSeriesFavoritas = listadoSeriesEnLaNube.filter((serie) => {
		if (serie.favorito) {
			return serie;
		}
	});
	const divCatalogo = document.getElementById("catalogo");
	if (divCatalogo) {
		divCatalogo.innerHTML = "";
	}

	if (soloSeriesFavoritas.length > 0) {
		soloSeriesFavoritas.forEach((serie) => {
			const divSerieFavoritaContainer = document.createElement("div");
			divSerieFavoritaContainer.classList.add("catalog-card");
			if (serie.liked) {
				divSerieFavoritaContainer.classList.add("like-activo");
			}
			if (serie.favorito) {
				divSerieFavoritaContainer.classList.add("favorito-activo");
			}
			divCatalogo.append(divSerieFavoritaContainer);
			//  BOTON PARA ELIMINAR SERIE DEL ARRAY
			const botoneliminar = document.createElement("button");
			botoneliminar.classList.add("btn-eliminar");
			botoneliminar.textContent = "X";
			divSerieFavoritaContainer.append(botoneliminar);

			const h3Serie = document.createElement("h3");
			h3Serie.textContent = serie.titulo;
			divSerieFavoritaContainer.append(h3Serie);

			const buttonFavSerie = document.createElement("button");
			buttonFavSerie.classList.add("btn");
			if (serie.favorito) {
				buttonFavSerie.textContent = "Quitar Favorito";
			} else {
				buttonFavSerie.textContent = "Favorito";
			}
			divSerieFavoritaContainer.append(buttonFavSerie);

			const buttonLikeSerie = document.createElement("button");
			buttonLikeSerie.classList.add("btn");
			if (serie.liked) {
				buttonLikeSerie.classList.add("like-activo");
			}
			buttonLikeSerie.textContent = serie.liked ? "Liked" : "Like";
			divSerieFavoritaContainer.append(buttonLikeSerie);
		});
	}

	const containerSerieFavorita = document.querySelectorAll("div.catalog-card");
	if (containerSerieFavorita.length > 0) {
		containerSerieFavorita.forEach((card) => {
			card.addEventListener("mouseover", () => {
				// console.log("RATON entra en tarjeta");
				card.style.transform = "translateY(-6px)";
			});

			card.addEventListener("mouseout", () => {
				// console.log("RATON sale de tarjeta");
				card.style.transform = "translateY(0)";
			});

			card.addEventListener("dblclick", () => {
				// console.log("Doble click sobre la tarjeta");
				alert(`Doble click en => ${card.querySelector("h3").textContent}`);
			});

			const botonesSeriesFiltradas = card.querySelectorAll("button.btn");
			botonesSeriesFiltradas.forEach((boton) => {
				if (boton.textContent.toLowerCase().includes("favorito")) {
					boton.addEventListener("click", () => {
						listadoSeriesEnLaNube.forEach((serieNube) => {
							if (serieNube.titulo === card.querySelector("h3").textContent) {
								if (!serieNube.favorito) {
									// console.log("Favorito Activado");
									serieNube.favorito = true;
									card.classList.add("favorito-activo");
									boton.textContent = "Quitar Favorito";
								} else {
									// console.log("Favorito Desactivado");
									serieNube.favorito = false;
									card.classList.remove("favorito-activo");
									boton.textContent = "Favorito";
									card.remove();
								}
								localStorage.setItem("catalogoSeries", JSON.stringify(listadoSeriesEnLaNube));
							}
						});

						recalcularFavoritos();
					});
				}

				if (boton.textContent.toLowerCase().includes("like")) {
					boton.addEventListener("click", () => {
						listadoSeriesEnLaNube.forEach((serieNube) => {
							if (serieNube.titulo === card.querySelector("h3").textContent) {
								if (!serieNube.liked) {
									// console.log("Like Activado");
									serieNube.liked = true;
									boton.classList.add("like-activo");
									boton.textContent = "Liked";
									card.classList.add("like-activo");
								} else {
									// console.log("Like Desactivado");
									serieNube.liked = false;
									boton.classList.remove("like-activo");
									boton.textContent = "Like";
									card.classList.remove("like-activo");
								}
								localStorage.setItem("catalogoSeries", JSON.stringify(listadoSeriesEnLaNube));
							}
						});

						recalcularLikes();
					});
				}
			});

			const botonEliminar = card.querySelector("button.btn-eliminar");
			if (botonEliminar) {
				listadoSeriesEnLaNube.forEach((serieNube, index) => {
					if (serieNube.titulo === card.querySelector("h3").textContent) {
						botonEliminar.addEventListener("click", () => {
							console.log("Que mierda de pelicula ", serieNube.titulo);
							listadoSeriesEnLaNube.splice(index, 1);
							localStorage.setItem("catalogoSeries", JSON.stringify(listadoSeriesEnLaNube));
							seriesFavoritas();
						});
					}
				});
			}
		});
	}
};

/**
 *  AÑADIOR SOLO SERIES ME GUSTAN
 */
const seriesLiked = () => {
	const soloSeriesLiked = listadoSeriesEnLaNube.filter((serie) => {
		if (serie.liked) {
			// console.log(`La serie en cuestion es ${serie.titulo}`);
			return serie;
		}
	});

	const divCatalogo = document.getElementById("catalogo");
	if (divCatalogo) {
		divCatalogo.innerHTML = "";
	}

	if (soloSeriesLiked.length > 0) {
		soloSeriesLiked.forEach((serie) => {
			const divSerieLikedContainer = document.createElement("div");
			divSerieLikedContainer.classList.add("catalog-card");
			if (serie.liked) {
				divSerieLikedContainer.classList.add("like-activo");
			}
			if (serie.favorito) {
				divSerieLikedContainer.classList.add("favorito-activo");
			}
			divCatalogo.append(divSerieLikedContainer);
			//  BOTON ELIMINAR DEL ARRAY
			const botoneliminar = document.createElement("button");
			botoneliminar.classList.add("btn-eliminar");
			botoneliminar.textContent = "X";
			divSerieLikedContainer.append(botoneliminar);

			const h3Serie = document.createElement("h3");
			h3Serie.textContent = serie.titulo;
			divSerieLikedContainer.append(h3Serie);

			const buttonFavSerie = document.createElement("button");
			buttonFavSerie.classList.add("btn");
			if (serie.favorito) {
				buttonFavSerie.textContent = "Quitar Favorito";
			} else {
				buttonFavSerie.textContent = "Favorito";
			}
			divSerieLikedContainer.append(buttonFavSerie);

			const buttonLikeSerie = document.createElement("button");
			buttonLikeSerie.classList.add("btn");
			if (serie.liked) {
				buttonLikeSerie.classList.add("like-activo");
			}
			buttonLikeSerie.textContent = serie.liked ? "Liked" : "Like";
			divSerieLikedContainer.append(buttonLikeSerie);
		});
	}

	const containerSerieLiked = document.querySelectorAll("div.catalog-card");
	if (containerSerieLiked.length > 0) {
		containerSerieLiked.forEach((card) => {
			card.addEventListener("mouseover", () => {
				// console.log("RATON entra en tarjeta");
				card.style.transform = "translateY(-6px)";
			});

			card.addEventListener("mouseout", () => {
				// console.log("RATON sale de tarjeta");
				card.style.transform = "translateY(0)";
			});

			card.addEventListener("dblclick", () => {
				// console.log("Doble click sobre la tarjeta");
				alert(`Doble click en => ${card.querySelector("h3").textContent}`);
			});

			const botonesSeriesLiked = card.querySelectorAll("button.btn");
			if (botonesSeriesLiked.length > 0) {
				botonesSeriesLiked.forEach((boton) => {
					if (boton.textContent.toLowerCase().includes("favorito")) {
						boton.addEventListener("click", () => {
							listadoSeriesEnLaNube.forEach((serieNube) => {
								if (serieNube.titulo === card.querySelector("h3").textContent) {
									if (!serieNube.favorito) {
										// console.log("Favorito Activado");
										serieNube.favorito = true;
										card.classList.add("favorito-activo");
										boton.textContent = "Quitar Favorito";
									} else {
										// console.log("Favorito Desactivado");
										serieNube.favorito = false;
										card.classList.remove("favorito-activo");
										boton.textContent = "Favorito";
									}
									localStorage.setItem("catalogoSeries", JSON.stringify(listadoSeriesEnLaNube));
								}
							});

							recalcularFavoritos();
						});
					}

					if (boton.textContent.toLowerCase().includes("like")) {
						boton.addEventListener("click", () => {
							listadoSeriesEnLaNube.forEach((serieNube) => {
								if (serieNube.titulo === card.querySelector("h3").textContent) {
									if (serieNube.liked) {
										// console.log("Like Desactivado");
										serieNube.liked = false;
										boton.classList.remove("like-activo");
										card.classList.remove("like-activo");
										boton.textContent = "like";
										card.remove();
									}
									localStorage.setItem("catalogoSeries", JSON.stringify(listadoSeriesEnLaNube));
								}
							});
						});
					}
				});
			}

			const botonEliminar = card.querySelector("button.btn-eliminar");
			if (botonEliminar) {
				listadoSeriesEnLaNube.forEach((serieNube, index) => {
					if (serieNube.titulo === card.querySelector("h3").textContent) {
						botonEliminar.addEventListener("click", () => {
							listadoSeriesEnLaNube.splice(index, 1);
							localStorage.setItem("catalogoSeries", JSON.stringify(listadoSeriesEnLaNube));
							seriesLiked();
						});
					}
				});
			}
		});
	}
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

	const btnCatalogoCompleto = document.getElementById("btn-main-screen");
	const btnCatalogoFavoritas = document.getElementById("btn-fav-screen");
	const btnCatalogoGustadas = document.getElementById("btn-liked-screen");
	const btnReiniciarCatalogo = document.getElementById("btn-reiniciar-catalogo");

	const btnAñadirSerie = document.getElementById("btn-añadir");
	const inputAñadirSerie = document.getElementById("input-new-serie");

	const btnBuscar = document.getElementById("btn-buscar");
	const inputBuscar = document.getElementById("input-buscar");

	const btnOscuro = document.getElementById("btn-oscuro");
	const busquedaEnCurso = localStorage.getItem("busquedaEnCurso");

	//APARTADO CAMBIAR ENTRE FILTROS
	btnCatalogoCompleto.addEventListener("click", (event) => {
		event.preventDefault();
		renderCatalogo(busquedaEnCurso);
	});

	btnCatalogoFavoritas.addEventListener("click", (event) => {
		event.preventDefault();
		seriesFavoritas();
	});

	btnCatalogoGustadas.addEventListener("click", (event) => {
		event.preventDefault();
		seriesLiked();
	});

	// APARTADO REINICIAR CATALOGO
	btnReiniciarCatalogo.addEventListener("click", (event) => {
		event.preventDefault();
		localStorage.removeItem("catalogoSeries");
		if (!localStorage.getItem("catalogoSeries")) {
			localStorage.setItem("catalogoSeries", JSON.stringify(catalogoSeries));
		}
		listadoSeriesEnLaNube = JSON.parse(localStorage.getItem("catalogoSeries"));
		renderCatalogo(busquedaEnCurso);
	});

	// APARTADO DE AÑADIR SERIE
	btnAñadirSerie.addEventListener("click", (event) => {
		event.preventDefault();
		añadirSerie(inputAñadirSerie.value);
		inputAñadirSerie.value = "";
		renderCatalogo();
	});

	// APARTADO DE BUSCAR SERIE (INPUT/BOTON)
	inputBuscar.value = busquedaEnCurso;
	inputBuscar.addEventListener("keyup", (event) => {
		localStorage.setItem("busquedaEnCurso", inputBuscar.value);
		const busquedaEnCurso = localStorage.getItem("busquedaEnCurso");
		renderCatalogo(busquedaEnCurso);
	});

	btnBuscar.addEventListener("click", (event) => {
		renderCatalogo(inputBuscar.value);
	});
	// APARTADO DE MODO OSCURO
	btnOscuro.addEventListener("click", () => {
		document.body.classList.toggle("modo-oscuro");
	});
	renderCatalogo(busquedaEnCurso);
	// seriesFavoritas();
	recalcularFavoritos();
	recalcularLikes();
});

// console.log("RENDER CATALOGO => ", listadoSeriesEnLaNube);
