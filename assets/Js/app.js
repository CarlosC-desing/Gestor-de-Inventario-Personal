function obtenerLista() {
    return JSON.parse(localStorage.getItem("lista")) || [];
}
function actualizarLista(lista) {
    localStorage.setItem("lista", JSON.stringify(lista));
}
function agregarALaLista(p) {
    let lista = obtenerLista();
    lista.push(p);
    actualizarLista(lista);
}
function renderizarTabla(contenedor, lista) {
    contenedor.empty();
    lista.forEach((producto, index) => {
        const fila = $(`
            <tr class = "tbody__row">
                <td class="tbody__column">${producto.nombre}</td>
                <td class="tbody__column">${producto.cantidad}</td>
                <td class="tbody__column">${producto.categoria}</td>
                <td class="tbody__column">${producto.precio.toFixed(2)}</td>
                <td class="tbody__column">${producto.subtotal.toFixed(2)}</td>
                <td class="tbody__column">
                    <div class ="tbody__column--options">
                        <button class="editarproducto" data-index="${index}">Editar</button>
                        <button class="eliminarproducto" data-index="${index}">Eliminar</button>
                    </div>
                </td>
            </tr>`);
        contenedor.append(fila);
    });
}
function actualizarContadores() {
    const IVA = 0.16;
    let lista = obtenerLista();
    const subtotalGeneral = lista.reduce((acumulador, productoSubtotal) => {
        return acumulador + productoSubtotal.subtotal;
    }, 0);
    const ivaGeneral = subtotalGeneral * IVA;
    const totalGeneral = subtotalGeneral + ivaGeneral;

    $("#subtotalgeneral").text(subtotalGeneral.toFixed(2));
    $("#iva").text(ivaGeneral.toFixed(2));
    $("#total").text(totalGeneral.toFixed(2));
    $("#valorInventario").text(subtotalGeneral.toFixed(2));
}
function actualizarTotales() {
    let lista = obtenerLista();
    const totalProductos = lista.length;
    const valorInventario = lista.reduce((precio, productos) => {
        return precio + productos.subtotal;
    }, 0);
    const stockBajo = lista.filter(p => p.cantidad <= 5).length;
    const cantidadOptions = $("#categoria option").length;

    $("#totalProductos").text(totalProductos);
    $("#totalInventario").text(`${Math.floor(valorInventario)} $`);
    $("#totalBajoStock").text(stockBajo);
    $("#totalCategorias").text(cantidadOptions);

}
$(document).ready(() => {
    let lista = obtenerLista();
    renderizarTabla($("#tbody"), lista);
    actualizarContadores();
    actualizarTotales();

    $("#btnAgregar").on("click", function (e) {
        e.preventDefault();
        const formulario = $("#formulario");
        const nombre = $("#nombre").val().trim().toLowerCase();
        const cantidad = parseInt($("#cantidadStock").val());
        const precio = parseFloat($("#precioUnitario").val());
        const categoria = $("#categoria").val();
        const subtotal = cantidad * precio;

        if (categoria === "categorias") {
            Swal.fire("Debe elegir una categoria", "", "error");
            return;
        } else if (nombre === "" || isNaN(cantidad) || isNaN(precio)) {
            Swal.fire("Complete todos los campos correctamente", "", "error");
            return;
        } else {
            let producto = { nombre: nombre, cantidad: cantidad, precio: precio, categoria: categoria, subtotal: subtotal }
            agregarALaLista(producto);
            let lista = obtenerLista();
            renderizarTabla($("#tbody"), lista);
            actualizarContadores();
            actualizarTotales();
            formulario[0].reset();
            Swal.fire("Producto Agregado", "", "success");
        }
    });
    $("#tbody").on("click", ".eliminarproducto", function () {
        Swal.fire({
            title: "¿Eliminar producto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                let index = $(this).data("index");
                let lista = obtenerLista();
                lista.splice(index, 1);
                actualizarLista(lista);
                renderizarTabla($("#tbody"), lista);
                actualizarContadores();
                actualizarTotales();
                Swal.fire("Producto eliminado", "", "success");
            } else {
                Swal.fire("Acción cancelada", "", "error");
            }
        });
    });
    $("#tbody").on("click", ".editarproducto", function () {
        Swal.fire({
            title: "¿Editar producto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Editar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                let index = $(this).data("index");
                let lista = obtenerLista();

                let nuevoNombre = prompt("Nombre:");
                let nuevaCantidad = parseInt(prompt("Cantidad:", lista[index].cantidad), 10);
                let nuevoPrecio = parseFloat(prompt("Precio:", lista[index].precio), 10);
                if (!isNaN(nuevaCantidad) && nuevaCantidad > 0 && !isNaN(nuevoPrecio) && nuevoPrecio > 0 && nuevoNombre !== "") {
                    lista[index].nombre = nuevoNombre;
                    lista[index].cantidad = nuevaCantidad;
                    lista[index].precio = nuevoPrecio;
                    lista[index].subtotal = lista[index].cantidad * lista[index].precio;
                    actualizarLista(lista);
                    renderizarTabla($("#tbody"), lista);
                    actualizarContadores();
                    actualizarTotales();
                }
                Swal.fire("Producto editado", "", "success");
            } else {
                Swal.fire("Edición cancelada", "", "error");
            }
        });
    });
    $("#vaciarInventario").on("click", function () {
        Swal.fire({
            title: "¿Desea vaciar el inventario?",
            text: "esta opción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("lista");
                renderizarTabla($("#tbody"), []);
                actualizarContadores();
                actualizarTotales();
                Swal.fire("Inventario vaciado", "", "success");
            }
        });
    });
    $("#buscarNombre").on("click", function() {
        let lista = obtenerLista();
        let nombre = prompt("Ingrese el nombre del producto a buscar").trim().toLowerCase();
        let filtrados = lista.filter(p => p.nombre === nombre);
        renderizarTabla($("#tbody"), filtrados);
    });
    $("#buscarStock").on("click", function() {
        let lista = obtenerLista();
        let stock = parseInt(prompt("Ingrese el stock a buscar"));
        if (isNaN(stock) || stock < 0) {
            Swal.fire("Debe ingresar un numero mayor a cero", "", "error");
            return;
        }
        let filtrados = lista.filter(p => p.cantidad === stock);
        renderizarTabla($("#tbody"), filtrados);
    });
    $("#buscarCategoria").on("click", function() {
        let lista = obtenerLista();

        // 1. Obtenemos todas las opciones válidas del select (excepto la primera que dice "Categorias")
        let categoriasValidas = [];
        $("#categoria option").each(function () {
            let val = $(this).val();
            if (val !== "categorias") {
                categoriasValidas.push(val.toLowerCase());
            }
        });

        // 2. Pedimos la categoría al usuario
        let entrada = prompt("Categoría que desea buscar (Hogar, Mascotas, etc.)");

        // Si el usuario cancela el prompt
        if (entrada === null) return;

        let categoriaBusqueda = entrada.trim().toLowerCase();

        // 3. Validamos si lo que escribió está en nuestro array de permitidos
        if (!categoriasValidas.includes(categoriaBusqueda)) {
            Swal.fire("Categoría no existente", `Las opciones válidas son: ${categoriasValidas.join(", ")}`, "error");
            return;
        }

        // 4. Filtramos y renderizamos
        let filtrados = lista.filter(p => p.categoria.toLowerCase() === categoriaBusqueda);

        if (filtrados.length === 0) {
            Swal.fire("Sin resultados", "No hay productos en esta categoría", "info");
        }

        renderizarTabla($("#tbody"), filtrados);
    });
    $("#buscarPrecio").on("click", function() {
        let lista =  obtenerLista();
        let precio = parseFloat(prompt("Ingrese el precio a buscar"));
        if(isNaN(precio) || precio < 0) {
            Swal.fire("Debe ingresar un numero válido mayor a cero", "", "error");
            return;
        }
        let filtrados = lista.filter(p=> p.precio === precio);
        renderizarTabla($("#tbody"), filtrados);
    });
});