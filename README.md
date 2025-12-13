📦 Gestor de Inventario Personal

🌟 Descripción General del Proyecto

    Este proyecto es un Gestor de Inventario Personal diseñado para ayudar a los usuarios a llevar un control de sus productos, stock, precios y valor total del inventario. La aplicación se     centra en una interfaz de usuario clara y responsive, y está construida utilizando tecnologías web modernas con un enfoque en la modularidad y el mantenimiento del código.

🛠️ Tecnologías Utilizadas

    1. Estructura: HTML5 – Definición de la estructura semántica de la página.

    2. Estilos: Sass (SCSS) – Preprocesador de CSS para escribir estilos de forma más potente y mantenible mediante el uso de variables, anidamiento y mixins.

    3. Estilos Compilados: CSS3 – Hojas de estilo finales para el diseño, presentación y acabados visuales.

    4. Interactividad: JavaScript (ES6+) – Lógica principal de la aplicación, encargada del manejo del inventario, cálculos matemáticos y manipulación del DOM.

    5. Manipulación del DOM: jQuery – Utilizado para simplificar la selección de elementos, el manejo de eventos y las animaciones de la interfaz.

    6. Almacenamiento: localStorage – Implementación para persistir los datos del inventario de forma local en el navegador del usuario.

    7. Alertas: SweetAlert2 – Librería para mostrar notificaciones y diálogos de confirmación estéticos al agregar, editar o eliminar productos.

    8. Tipografía: Google Fonts – Integración de diversas familias de fuentes para lograr un diseño moderno y legible.

📐 Metodologías y Estructura

    1. Metodología BEM (Block Element Modifier)El proyecto sigue la metodología BEM (Bloque, Elemento, Modificador) para nombrar clases de CSS, lo que garantiza que los estilos sean modulares, reutilizables y fáciles de entender.

        Ejemplos de BEM en el HTML:

        1.1. Bloque: .header, .formulario
        1.2. Elemento: .header__brand, .formulario__input
        1.3. Modificador: (No se observan en el fragmento, pero la estructura está lista para su implementación, por ejemplo: .formulario__boton--disabled)

    2. Preprocesador SASS (SCSS) para Estilos Modulares
    
        Se utiliza Sass con la sintaxis SCSS para optimizar el proceso de estilado. Se ha implementado un enfoque modular, separando los estilos por componentes o secciones en diferentes archivos parciales.
    
        Archivos Parciales de SASS:
    
            1. _variables.scss: Para definir variables de color, tipografía, y espaciado, asegurando la consistencia en todo el proyecto.

            2. _header.scss: Estilos específicos para el componente de cabecera.

            3. _footer.scss: Estilos específicos para el pie de página.

            4. _formulario.scss: Estilos para el formulario de adición de productos.

            5. _table.scss: Estilos para la tabla de inventario.
            
            6. main.scss: Importa todos los parciales y genera el archivo main.css final.
            
        Este enfoque mejora significativamente la mantenibilidad y la organización del código CSS.

    3. Diseño Responsive (Mobile-First)

    El proyecto está diseñado para ser completamente responsive, adaptándose a diferentes tamaños de pantalla. Esto asegura una experiencia de usuario óptima tanto en dispositivos móviles como en escritorios.

📁 Estructura de Archivos
La estructura del proyecto es clara y bien organizada, siguiendo las convenciones estándar para proyectos web:

        GESTORIO_INVENTARIO_PERSONAL
        ├── assets/
        │   ├── css/
        │   │   ├── main.css
        │   │   └── main.css.map
        │   ├── img/
        │   │   └── (Imágenes del proyecto: logo.png, Invento_logo.png)
        │   └── js/
        │       ├── app.js
        │       └── jquery-3.7.1.min.js
        ├── sass/
        │   ├── _footer.scss
        │   ├── _formulario.scss
        │   ├── _header.scss
        │   ├── _table.scss
        │   ├── _variables.scss
        │   └── main.scss
        ├── index.html
        ├── package.json
        └── README.md

⚙️ Funcionalidades Clave

    1. Agregar Producto: Formulario validado para añadir nuevos productos al inventario.

    2. Almacenamiento Local: Los datos del inventario se guardan en el localStorage para persistir entre sesiones.

    3. Visualización de Inventario: Una tabla dinámica muestra todos los productos con sus detalles.

    4. Cálculos Automáticos: Cálculo de subtotal por producto, subtotal general, IVA (16%) y valor total del inventario.

    5. Edición y Eliminación: Botones para editar y eliminar productos individualmente de la tabla.

    6. Dashboard: Secciones para mostrar contadores importantes (total de productos, categorías, bajo stock, valor total).
    
🚀 Uso Local

    1. Clonar el repositorio.

    2. Abrir el archivo index.html en tu navegador.

    3. (Opcional) Si quieres modificar los estilos, necesitarás un compilador de Sass para compilar los archivos SCSS a CSS.
