const BASE_URL = "https://673533f15995834c8a922baf.mockapi.io/productos";

const listaProductos = async () => {
    try{
        const respuesta = await fetch(BASE_URL);
        const data = await respuesta.json();
        return data;
    } catch (error) {
        console.log("Error al listar productos: ", error)
    }
};

const crearProducto = async (nombre, precio, imagen) => {
    try {
        const respuesta = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({nombre, precio, imagen})
        });
        const data = await respuesta.json();
        return data;
    } catch (error) {
        console.log ("Error al crear productos:", error)
    }
};

const eliminarProducto = async (idProducto) => {
    try {
        const respuesta = await fetch(`${BASE_URL}/${idProducto}`, {
            method: "DELETE",
        });
        if (!respuesta.ok) {
            throw new Error(`Error al eliminar producto: ${respuesta.status}`);
        }
        console.log(`Producto con ID ${idProducto} eliminado del servidor.`);
    } catch (error) {
        console.log ("Error al crear productos:", error);
        throw error;
    }
};

// const eliminarProducto = async (idProducto, contenedorProducto) => {
//     try {

//         const respuesta = await fetch (`${BASE_URL}/${idProducto}`,{
//             method: "DELETE",
//         });

//         console.log (`Producto con ID ${idProducto} eliminado del servidor.`);
//         const botonBorrar = contenedorProducto.querySelector(
//             `.boton_borrar[data-id="${idProducto}"`
//         );
//         if(botonBorrar){
//             const productoCard = botonBorrar.closest(".producto");
//             if (productoCard) productoCard.remove();
//         }
//     } catch (error) {
//         console.error("Error al intentar eliminar el producto;", error);
//         throw error;
//     }
// }

export const serviciosProductos = {
    listaProductos, crearProducto, eliminarProducto,
};
