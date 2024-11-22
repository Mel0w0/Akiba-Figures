import { serviciosProductos } from "../servicios/servicio-productos.js";

const contenedorProducto = document.querySelector("[data-productos]");
const form = document.querySelector("[data-formulario]");
// const eliminarBoton = document.querySelector("[data-id]");

function crearCard({id, nombre, precio, imagen}){
    const card = document.createElement("div")
    card.classList.add("card");
    card.innerHTML = `
    <div class="contenedor_imagen">
        <img src="${imagen}" alt="imagen figura producto" />
    </div>
    <div class="contenedor_card--info">
        <p>${nombre}</p>
        <div class="contenedor_card--valor">
            <p>$${precio}</p>
            <button class="boton_borrar" data-id="${id}">
                <img src="/assets/basura.png" class="boton_borrar-img" alt="Eliminar">
            </button>
        </div>
    </div>
    `;
    return card;
};


const renderizarProducto = async () => {
    try{
        const productosLista = await serviciosProductos.listaProductos();
        productosLista.forEach((producto) => {
            const productoCard = crearCard(producto);
            contenedorProducto.appendChild(productoCard);
        })
    } catch (error) {
        console.log(error)
    }
};

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nombre = document.querySelector("[data-nombre]").value;
    const precio = document.querySelector("[data-precio]").value;
    const imagen = document.querySelector("[data-imagen]").value;

    try {
        const nuevoProducto = await serviciosProductos.crearProducto(nombre, precio, imagen);
        const nuevaCard = crearCard(nuevoProducto);
        contenedorProducto.appendChild(nuevaCard);
    } catch (error) {
        console.log(error)
    }
    form.reset
});

// contenedorProducto.addEventListener("click", async (event) => {
//     event.target.classList.contains("boton_borrar");

//     const idProducto = document.querySelector("[data-id]");

//     try {
//         await serviciosProductos.eliminarProducto(idProducto);
//         const productCard = event.target.closest(".producto")
//         if (productCard) productoCard.remove();
//     } catch (error) {
//         console.log("Error al eliminar el producto:", error);
//     }
// })

// eliminarBoton.addEventListener("click", async (event) => {
//         try {
//             if (event.target.classList.contains("boton_borrar")){
//                 const idProducto = event.target.getAttribute("data-id");
//                 if (idProducto){

//                    await serviciosProductos.eliminarProducto(idProducto); 

//                 }
                
//                 const productoCard = event.target.closest(".producto");
//                 if(productoCard) productoCard.remove();
                
//             }
//             } catch (error) {
//             console.log(error);            
//         }
// });


 
contenedorProducto.addEventListener("click", async (event) => {
    if (event.target.classList.contains("boton_borrar")) {
        const idProducto = event.target.getAttribute("data-id");

        if(idProducto){
            try {
                await serviciosProductos.eliminarProducto(idProducto);

                const productoCard = event.target.closest(".producto");

                if (productoCard) productoCard.remove();

                console.log(`Producto con ID ${idProducto} eliminado.`);

            } catch (error) {
                console.log("Error al eliminar el producto:", error);
            }
        }
    }
})

renderizarProducto();