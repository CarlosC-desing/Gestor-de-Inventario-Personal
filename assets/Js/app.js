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
    lista.forEach((producto, index)=> {
        const fila = $(`
            <tr>
                <td style="text-align: center; background-color: white; color: black;">${producto.nombre}</td>
                <td style="text-align: center; background-color: white;color: black;">${producto.cantidad}</td>
                <td style="text-align: center; background-color: white;color: black;">${producto.categoria}</td>
                <td style="text-align: center; background-color: white;color: black;">${producto.precio.toFixed(2)}</td>
                <td style="text-align: center; background-color: white;color: black;">${producto.subtotal.toFixed(2)}</td>
                <td style="text-align: center; background-color: white;color: black;">
                    <button class="editarproducto" data-index="${index}">Editar</button>
                    <button class="eliminarproducto" data-index="${index}">Eliminar</button>
                </td>
            </tr>`);
            contenedor.append(fila);
    });
}
$(document).ready(()=> {
    let lista = obtenerLista();
    renderizarTabla($("#tbody"), lista);

    $("#btnAgregar").on("click", function(e) {
        e.preventDefault();
        const nombre = $("#nombre").val();
        const cantidad = parseInt($("#cantidadStock").val());
        const precio = parseFloat($("#precioUnitario").val());
        const categoria = $("#categoria").val();
        const subtotal = cantidad * precio;
        
        let producto = {nombre: nombre, cantidad: cantidad, precio: precio, categoria: categoria, subtotal: subtotal}
        agregarALaLista(producto);
        let lista = obtenerLista();
        renderizarTabla($("#tbody"), lista);
    });
});