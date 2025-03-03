/********************************************************
 * EJERCICIO: Catálogo Interactivo
 ********************************************************/

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

const renderCatalogo = (filtroTexto = "") => {
    const contenedor = document.getElementById("catalogo");
    contenedor.innerHTML = ""; // Limpiar catálogo antes de renderizar nada

    // Filtrado
    let resultados = catalogoSeries;
    if (filtroTexto.trim() !== "") {
        resultados = catalogoSeries.filter((item) => item.titulo.toLowerCase().includes(filtroTexto.toLowerCase()));
    }

    resultados.forEach((serie) => {
        const card = document.createElement("div");
        card.classList.add("catalog-card");

        const titulo = document.createElement("h3");
        titulo.textContent = serie.titulo;

        // Botón Favorito para cada tarjeta - HTML + Evento correspondiente.
        const btnFav = document.createElement("button");
        btnFav.textContent = serie.favorito ? "Quitar Favorito" : "Añadir Favorito";
        btnFav.classList.add("btn");
        btnFav.addEventListener("click", () => {
            serie.favorito = !serie.favorito;
            btnFav.textContent = serie.favorito ? "Quitar Favorito" : "Añadir Favorito";

            // Añade o quita la clase .favorito-activo en la tarjeta
            if (serie.favorito) {
                card.classList.add("favorito-activo");
            } else {
                card.classList.remove("favorito-activo");
            }
            recalcularFavoritos(); // Función recalcular que vuelve a ejecutar y actualizar el contador.
        });

        // Botón Like para cada tarjeta 
        const btnLike = document.createElement("button");
        btnLike.textContent = "Like";
        btnLike.classList.add("btn");
        if (serie.liked) {
            btnLike.classList.add("like-activo");
            card.classList.add("like-activo");
        }
        btnLike.addEventListener("click", () => {
            serie.liked = !serie.liked;
            // Toggle para la clase like-activo
            btnLike.classList.toggle("like-activo");
            // Toggle en la tarjeta para el fondo rojo suave
            card.classList.toggle("like-activo");
            recalcularLikes(); // Función recalcular que vuelve a ejecutar y actualizar el contador.
        });

        // Eventos mouseover / mouseout en la tarjeta que únicamente aplica un transform css visual
        card.addEventListener("mouseover", () => {
            card.style.transform = "translateY(-6px)";
        });
        card.addEventListener("mouseout", () => {
            card.style.transform = "translateY(0)";
        });

        // dblclick => un pequeño alert
        card.addEventListener("dblclick", () => {
            alert(`Doble clic en: ${serie.titulo}`);
        });

        // Revisar si ya estaba en favorito
        if (serie.favorito) {
            card.classList.add("favorito-activo");
        }

        // Construir la tarjeta
        card.appendChild(titulo);
        card.appendChild(btnFav);
        card.appendChild(btnLike);
        contenedor.appendChild(card);
    });
}

const recalcularFavoritos = () => {
    let total = catalogoSeries.filter((item) => item.favorito).length;
    document.getElementById("total-favoritos").textContent = total;
}

const recalcularLikes = () => {
    let total = catalogoSeries.filter((item) => item.liked).length;
    document.getElementById("total-likes").textContent = total;
}

// Eventos principales
document.addEventListener("DOMContentLoaded", () => {
    const btnBuscar = document.getElementById("btn-buscar");
    const inputBuscar = document.getElementById("input-buscar");
    const btnOscuro = document.getElementById("btn-oscuro");

    // Botón "Buscar"
    btnBuscar.addEventListener("click", () => {
        const texto = inputBuscar.value;
        renderCatalogo(texto);
    });

    // Filtrado en vivo con keyup
    inputBuscar.addEventListener("keyup", (evento) => {
        const texto = evento.target.value;
        renderCatalogo(texto);
    });

    // Modo oscuro
    btnOscuro.addEventListener("click", () => {
        document.body.classList.toggle("modo-oscuro");
    });

    // Render inicial
    renderCatalogo();
    recalcularFavoritos();
    recalcularLikes();
});
