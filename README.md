# Ejercicios DOM - Eventos

Visualiza el vídeo de explicación de este ejercicio que encontrarás en la clase correspondiente en la academia.

En este vídeo, se explica el ejercicio y el resultado al que tendrás que llegar.

## Ayuda
Encontrarás una carpeta con el código de Javascript con la solución. Te recomiendo que no abras estos archivos e intentes por todos los medios, desarrollar tú mism@ la solución al ejercicio. Se busca en este ejercicio que te "pelees" con el código para fortalecer tu mentalidad lógica y tu capacidad para resolver problemas mediante la programación.

# SÚPER BONUS:
Para samuráis con tiempo y ganas de enfrentarse a un reto, añade las siguientes funcionalidades. Puedes añadir algunas o todas. Las que quieras.

1. Formulario para añadir nuevas series al listado.
2. Guardar en el local Storage el listado de catálogo de series.
3. Evitar el "reseteo" al recargar la página en caso que haya alguna búsqueda en curso. Para ello: 
    Caso de uso: Buscas "ho" en el buscador y aparecen 4 resultados. Que al recargar la página, sigan esos resultados y esa búsqueda.
    - Deberás guardar el valor del input de busqueda en localStorage cada vez que este input modifique su valor
    - Al cargar la página (DOMContentLoaded), busca por si existe valor de búsqueda y:
        - Añade el valor de búsqueda al input.value
        - Renderiza la función `renderCatalogo` con ese valor de búsqueda.
4.  Crea vistas de Favoritos y "Liked". 
    - Crea 3 pestañas donde al pulsar cada una de ellas
        1. Catálogo completo: Muestra todo el catálogo
        2. Favoritos: Renderiza solo las tarjetas de las películas favoritas.
        3. Gustadas: Renderiza solo las tarjetas de las películas gustadas.
5. Implementa borrado de elementos. Para ello, añade un botón "Eliminar" en cada tarjeta que elimine del array la serie en cuestión.