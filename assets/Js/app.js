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
                    <button class="editarproducto" data-index="${index}">Editar</button>
                    <button class="eliminarproducto" data-index="${index}">Eliminar</button>
                </td>
            </tr>`);
        contenedor.append(fila);
    });
}
function actualizarContadores() {
    const IVA = 0.16;
    let lista = obtenerLista();
    const subtotalGeneral = lista.reduce((acumulador, productoSubtotal)=> {
        return acumulador + productoSubtotal.subtotal;
    }, 0);
    const ivaGeneral = subtotalGeneral * IVA;
    const totalGeneral = subtotalGeneral + ivaGeneral;

    $("#subtotalgeneral").text(subtotalGeneral.toFixed(2));
    $("#iva").text(ivaGeneral.toFixed(2));
    $("#total").text(totalGeneral.toFixed(2));
    $("#valorInventario").text(subtotalGeneral.toFixed(2));
}
$(document).ready(() => {
    let lista = obtenerLista();
    renderizarTabla($("#tbody"), lista);
    actualizarContadores();

    $("#btnAgregar").on("click", function (e) {
        e.preventDefault();
        const formulario = $("#formulario");
        const nombre = $("#nombre").val();
        const cantidad = parseInt($("#cantidadStock").val());
        const precio = parseFloat($("#precioUnitario").val());
        const categoria = $("#categoria").val();
        const subtotal = cantidad * precio;

        if (categoria !== "todas") {
            let producto = { nombre: nombre, cantidad: cantidad, precio: precio, categoria: categoria, subtotal: subtotal }
            agregarALaLista(producto);
            let lista = obtenerLista();
            renderizarTabla($("#tbody"), lista);
            actualizarContadores();
            formulario[0].reset();
            Swal.fire("Producto Agregado", "", "success");
        } else {
            Swal.fire("Debe marcar una categoría", "", "error");
            return;
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
            cancelButtonText: "Eliminar"
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
                }
                Swal.fire("Producto editado", "", "success");
            } else {
                Swal.fire("Edición cancelada", "", "error");
            }
        });
    });
});