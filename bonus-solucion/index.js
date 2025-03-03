/**
 * Este BONUS es orientativo. Ha sido creado por Juan en base a criterio proprio.
 *
 * Según el programador el código será diferente, por lo que es una referencia que quizás
 * a algún alumno atascado pueda ayudar para desatascar y contemplar otra solución posible
 */

let catalogoSeries = JSON.parse(localStorage.getItem("catalogoSeries")) || [
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

let vistaActual = "catalogo";

const renderCatalogo = (filtroTexto = "", vista = "catalogo") => {
    const contenedor = document.getElementById("catalogo");
    contenedor.innerHTML = "";

    let resultados = [];
    
    if (vista === "catalogo") {
        resultados = catalogoSeries;
    }

    if (vista === "favoritos") {
        resultados = catalogoSeries.filter((serie) => serie.favorito);
    }

    if (vista === "likes") {
        resultados = catalogoSeries.filter((serie) => serie.liked);
    }

    if (filtroTexto.trim() !== "") {
        resultados = resultados.filter((serie) => serie.titulo.toLowerCase().includes(filtroTexto.toLowerCase()));
    }

    resultados.forEach((serie) => {
        const card = document.createElement("div");
        card.classList.add("catalog-card");

        const h3 = document.createElement("h3");
        h3.textContent = serie.titulo;

        const btnFav = document.createElement("button");
        btnFav.classList.add("btn");
        btnFav.textContent = serie.favorito ? "Quitar Favorito" : "Añadir Favorito";
        btnFav.addEventListener("click", () => {
            serie.favorito = !serie.favorito;
            btnFav.textContent = serie.favorito ? "Quitar Favorito" : "Añadir Favorito";
            if (serie.favorito) {
                card.classList.add("favorito-activo");
            } else {
                card.classList.remove("favorito-activo");
            }
            recalcularFavoritos();
            guardarEnLocalStorage();
        });

        const btnLike = document.createElement("button");
        btnLike.classList.add("btn");
        btnLike.textContent = "Like";
        if (serie.liked) {
            card.classList.add("like-activo");
            btnLike.classList.add("like-activo");
        }
        btnLike.addEventListener("click", () => {
            serie.liked = !serie.liked;
            btnLike.classList.toggle("like-activo");
            card.classList.toggle("like-activo");
            recalcularLikes();
            guardarEnLocalStorage();
        });

        const btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btn");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", () => {
            const tituloAEliminar = serie.titulo;
            catalogoSeries = catalogoSeries.filter((serie) => serie.titulo !== tituloAEliminar);
            guardarEnLocalStorage();
            renderCatalogo(filtroTexto, vistaActual);
            recalcularFavoritos();
            recalcularLikes();
        });

        card.addEventListener("mouseover", () => {
            card.style.transform = "translateY(-6px)";
        });
        card.addEventListener("mouseout", () => {
            card.style.transform = "translateY(0)";
        });
        card.addEventListener("dblclick", () => {
            alert(`Doble clic en: ${serie.titulo}`);
        });

        if (serie.favorito) {
            card.classList.add("favorito-activo");
        }
        if (serie.liked) {
            card.classList.add("like-activo");
        }

        card.appendChild(h3);
        card.appendChild(btnFav);
        card.appendChild(btnLike);
        card.appendChild(btnEliminar);
        contenedor.appendChild(card);
    });
};

const recalcularFavoritos = () => {
    let total = catalogoSeries.filter((serie) => serie.favorito).length;
    document.getElementById("total-favoritos").textContent = total;
};

const recalcularLikes = () => {
    let total = catalogoSeries.filter((serie) => serie.liked).length;
    document.getElementById("total-likes").textContent = total;
};

const guardarEnLocalStorage = () => {
    localStorage.setItem("catalogoSeries", JSON.stringify(catalogoSeries));
};

document.addEventListener("DOMContentLoaded", () => {
    const btnBuscar = document.getElementById("btn-buscar");
    const inputBuscar = document.getElementById("input-buscar");
    const btnOscuro = document.getElementById("btn-oscuro");

    const tabCatalogo = document.getElementById("tab-catalogo");
    const tabFavoritos = document.getElementById("tab-favoritos");
    const tabLikes = document.getElementById("tab-likes");

    const inputNuevaSerie = document.getElementById("input-nueva-serie");
    const btnAddSerie = document.getElementById("btn-add-serie");

    const busquedaAlmacenada = localStorage.getItem("busqueda") || "";
    inputBuscar.value = busquedaAlmacenada;

    inputBuscar.addEventListener("keyup", (evento) => {
        const texto = evento.target.value;
        localStorage.setItem("busqueda", texto);
        renderCatalogo(texto, vistaActual);
    });

    btnBuscar.addEventListener("click", () => {
        const texto = inputBuscar.value;
        localStorage.setItem("busqueda", texto);
        renderCatalogo(texto, vistaActual);
    });

    btnOscuro.addEventListener("click", () => {
        document.body.classList.toggle("modo-oscuro");
    });

    tabCatalogo.addEventListener("click", () => {
        vistaActual = "catalogo";
        renderCatalogo(inputBuscar.value, vistaActual);
    });
    tabFavoritos.addEventListener("click", () => {
        vistaActual = "favoritos";
        renderCatalogo(inputBuscar.value, vistaActual);
    });
    tabLikes.addEventListener("click", () => {
        vistaActual = "likes";
        renderCatalogo(inputBuscar.value, vistaActual);
    });

    btnAddSerie.addEventListener("click", () => {
        const nuevaSerie = inputNuevaSerie.value.trim();
        if (nuevaSerie === "") {
            alert("Ingresa un nombre de serie válido");
            return;
        }
        const nueva = { titulo: nuevaSerie, favorito: false, liked: false };
        catalogoSeries.push(nueva);
        guardarEnLocalStorage();
        inputNuevaSerie.value = "";
        renderCatalogo(inputBuscar.value, vistaActual);
        recalcularFavoritos();
        recalcularLikes();
    });

    renderCatalogo(busquedaAlmacenada, vistaActual);
    recalcularFavoritos();
    recalcularLikes();
});
