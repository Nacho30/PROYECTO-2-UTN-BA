document.addEventListener('DOMContentLoaded', () => {

    // selecciono todas las secciones
    let secciones = document.querySelectorAll('.section');

    // Agg un evento de tipo scroll
    window.addEventListener('scroll', () => {

        // Oculto el botón por defecto
        document.getElementById('volverArriba').style.display = 'none';
        // Pasar por cada seccion
        secciones.forEach((seccion) => {

            // Obtener la posicion de la seccion respecto el viewport
            let posicion = seccion.getBoundingClientRect();

            // Verifica si la seccion esta visible en el viewport
            if (posicion.top < window.innerHeight && posicion.bottom >= 0) {

                // Mostrar el botón
                document.getElementById('volverArriba').style.display = 'block';

            }

        });

    });

});
document.addEventListener('DOMContentLoaded', () => {
    const botonModoOscuroClaro = document.getElementById('modo-oscuro-claro');
    const contenedor = document.querySelector('.container-padre');
    const modoIcono = document.getElementById('modo-icono');

    // guardar el modo en el almacenamiento local
    const savedMode = localStorage.getItem('mode');
    if (savedMode) {
        contenedor.classList.toggle('modo-oscuro', savedMode === 'dark');
        updateIcon();
    }

    botonModoOscuroClaro.addEventListener('click', () => {
        contenedor.classList.toggle('modo-oscuro');
        updateIcon();
        
        // guardar el modo preferido
        const currentMode = contenedor.classList.contains('modo-oscuro') ? 'dark' : 'light';
        localStorage.setItem('mode', currentMode);
    });

    function updateIcon() {
        modoIcono.src = contenedor.classList.contains('modo-oscuro') 
            ? './imagenes/light mode.png'
            : './imagenes/dark mode.png';
    }
});
document.addEventListener('DOMContentLoaded', () => {  
    const carrito = []; // Arreglo para almacenar los items del carrito  
    const carritoLista = document.getElementById('carrito-lista');  
    const totalElement = document.getElementById('total');  
    const carritoDiv = document.getElementById('carrito');  
    const toggleCarritoButton = document.getElementById('toggle-carrito');  
    const limpiarCarritoButton = document.getElementById('limpiar-carrito');  

    // Función para actualizar el carrito en la UI  
    function actualizarCarrito() {  
        carritoLista.innerHTML = ''; // Limpiar la lista actual  
        let total = 0;  

        carrito.forEach(item => {  
            const li = document.createElement('li');  
            li.innerHTML = `<img src="${item.imagen}" alt="${item.nombre}"> ${item.nombre} - $${item.precio.toFixed(2)}`;  
            carritoLista.appendChild(li);  
            total += item.precio; // Sumar el precio al total  
        });  

        // Comprobar si el total es un número antes de actualizar el texto  
        if (!isNaN(total)) {  
            totalElement.textContent = `Total: $${total.toFixed(2)}`;  
        } else {  
            totalElement.textContent = `Total: \$0.00`; // Muestra \$0.00 si el total no es un número  
        }  
    }  

    // Escuchar los clics en los botones de agregar al carrito  
    document.querySelectorAll('.agregar-al-carrito').forEach(boton => {  
        boton.addEventListener('click', (event) => {  
            event.preventDefault(); // Evitar el comportamiento por defecto del enlace  

            const cardBody = event.target.closest('.card').querySelector('.card-body');  
            const nombre = cardBody.querySelector('.card-title').textContent;  
            const precioTexto = cardBody.querySelector('.card-text').textContent;  
            const precio = parseFloat(precioTexto.replace('$', '').trim()); // Asegúrate de que el precio se convierta correctamente  
            const imagenSrc = event.target.closest('.card').querySelector('img').src; // Obtener la imagen del producto  

            // Comprobar que el precio se haya convertido correctamente  
            if (!isNaN(precio)) {  
                // Agregar el producto al carrito  
                carrito.push({ nombre, precio, imagen: imagenSrc });  
            } else {  
                console.error('Error al convertir el precio:', precioTexto); // Mensaje de depuracion  
            }  

            actualizarCarrito();  
        });  
    });  

    // Mostrar/ocultar el carrito al hacer clic en el ícono  
    toggleCarritoButton.addEventListener('click', (event) => {  
        event.preventDefault(); // Evitar el comportamiento por defecto del enlace  
        carritoDiv.style.display = carritoDiv.style.display === 'block' ? 'none' : 'block';  
    });  

    // Cerrar el carrito con el botón "Cerrar"  
    document.getElementById('cerrar-carrito').addEventListener('click', () => {  
        carritoDiv.style.display = 'none'; // Oculta el carrito  
    });  

    // Limpiar el carrito con el botón "Limpiar Carrito"  
    limpiarCarritoButton.addEventListener('click', () => {  
        carrito.length = 0; // Vaciar el array del carrito  
        actualizarCarrito(); // Actualizar la UI para reflejar que el carrito está vacío  
    });  
});    