    // Definimos el objeto opciones con las diferentes categorías y productos
    var opciones;
    // buscamos las opciones localmente en el archivo opciones.json
    fetch('opciones.json')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            opciones = data;
            // Una vez que se cargan los datos, se llama a la función mostrarOpcionesProductos() para mostrar las opciones iniciales.
            mostrarOpcionesProductos();
        })
        .catch(function(error) {
            console.log('Error al cargar el archivo de opciones:', error);
        });

    // Función para mostrar las opciones de productos de acuerdo a la categoría seleccionada
    function mostrarOpcionesProductos() {
        var categoriaSeleccionada = document.getElementById("categoria").value;
        var opcionesProductos = opciones[categoriaSeleccionada];
        var opcionProductoSelect = document.getElementById("opcionProducto");

        opcionProductoSelect.innerHTML = "";

        // Iteramos sobre las opciones de productos y creamos las opciones en el select
        for (var i = 0; i < opcionesProductos.length; i++) {
            var opcionProducto = opcionesProductos[i];
            var opcionProductoOption = document.createElement("option");
            opcionProductoOption.value = i;
            opcionProductoOption.textContent = opcionProducto.nombre + " - Precio: $" + opcionProducto.precio;
            opcionProductoSelect.appendChild(opcionProductoOption);
        }
    }

    function actualizarInteresCuotas() {
        var cantidadCuotasSelect = document.getElementById("cantidadCuotas");
        var interesCuotasInput = document.getElementById("interesCuotas");
        var cantidadCuotas = parseInt(cantidadCuotasSelect.value);

        // Establecemos el porcentaje de interés de acuerdo a la cantidad de cuotas seleccionada
        var interesPorcentaje;
        switch (cantidadCuotas) {
            case 3:
                interesPorcentaje = 15;
                break;
            case 6:
                interesPorcentaje = 20;
                break;
            case 9:
                interesPorcentaje = 25;
                break;
            case 12:
                interesPorcentaje = 30;
                break;
            default:
                interesPorcentaje = 0;
                break;
        }

        // Mostramos el interés en el campo de texto correspondiente
        interesCuotasInput.value = interesPorcentaje + "%";
    }

    // Función para calcular el monto final y el monto de cada cuota
    function calcularMontoFinal() {
        var categoriaSeleccionada = document.getElementById("categoria").value;
        var opcionProductoSelect = document.getElementById("opcionProducto");
        var opcionProductoIndex = parseInt(opcionProductoSelect.value);
        var cantidadCuotasSelect = document.getElementById("cantidadCuotas");
        var cantidadCuotas = parseInt(cantidadCuotasSelect.value);
        var interesCuotasInput = document.getElementById("interesCuotas");

        // Obtenemos el producto seleccionado y su precio
        var opcionProducto = opciones[categoriaSeleccionada][opcionProductoIndex];
        var precioProducto = opcionProducto.precio;

        // Obtenemos el porcentaje de interés de las cuotas
        var interesPorcentaje = parseInt(interesCuotasInput.value);

        // Calculamos el monto final multiplicando el precio del producto por el porcentaje de interés
        var montoFinal = precioProducto + (precioProducto * (interesPorcentaje / 100));

        // Calculamos el monto de cada cuota dividiendo el monto final entre la cantidad de cuotas
        var montoCuota = montoFinal / cantidadCuotas;

        // Mostramos el monto de cada cuota en el div correspondiente
        var montoCuotaDiv = document.getElementById("montoCuota");
        montoCuotaDiv.textContent = "$" + montoCuota.toFixed(2);

        // Mostramos el monto final en el div correspondiente
        var resultadoDiv = document.getElementById("resultado");
        resultadoDiv.textContent = cantidadCuotas + " cuotas";

        // Mostramos el porcentaje aplicado segun las cuotas
        var porcentajeDiv = document.getElementById("porcentaje");
        porcentajeDiv.textContent = interesPorcentaje + " %";

        // Mostramos el monto final financiado
        var porcentajeDiv = document.getElementById("montoFinalFinanciado");
        porcentajeDiv.textContent = " $ " + montoFinal.toFixed(2);
    }

    // Seccion de Comentarios
    var comentarios = []; // Lista para almacenar los comentarios cargados
    var botonCarga = document.getElementById('boton-carga');

    document.addEventListener("DOMContentLoaded", function() {
        cargarComentariosIniciales();
    });

    function cargarComentariosIniciales() {
        var url = 'https://jsonplaceholder.typicode.com/comments';

        // Realizar la solicitud fetch a la URL de los comentarios
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Obtener los primeros 10 comentarios
                comentarios = data.slice(0, 10);

                // Renderizar los comentarios en el HTML
                mostrarComentarios(comentarios);

                // Verificar si hay más comentarios por cargar
                if (comentarios.length < data.length) {
                    mostrarBotonCarga();
                } else {
                    ocultarBotonCarga();
                }
            })
            .catch(error => console.log(error));
    }

    function cargarMasComentarios() {
        var url = 'https://jsonplaceholder.typicode.com/comments';

        // Realizar la solicitud fetch a la URL de los comentarios
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Obtener los 10 comentarios adicionales
                var nuevosComentarios = data.slice(comentarios.length, comentarios.length + 10);

                // Agregar los nuevos comentarios a la lista existente
                comentarios = comentarios.concat(nuevosComentarios);

                // Renderizar los comentarios en el HTML
                mostrarComentarios(comentarios);

                // Verificar si hay más comentarios por cargar
                if (comentarios.length < data.length) {
                    mostrarBotonCarga();
                } else {
                    ocultarBotonCarga();
                }
            })
            .catch(error => console.log(error));
    }

    // Función para mostrar los comentarios en el HTML
    function mostrarComentarios(comentarios) {
        var listaComentarios = document.getElementById('comentarios');
        listaComentarios.innerHTML = '';

        comentarios.forEach((comentario, index) => {
            var titulo = document.createElement('h5');
            titulo.textContent = comentario.name;

            var subtitulo = document.createElement('h6');
            subtitulo.textContent = comentario.email;

            var parrafo = document.createElement('p');
            parrafo.textContent = comentario.body;

            listaComentarios.appendChild(titulo);
            listaComentarios.appendChild(subtitulo);
            listaComentarios.appendChild(parrafo);

            // Agregar un <hr> entre cada comentario, excepto el último
            if (index < comentarios.length - 1) {
                var hr = document.createElement('hr');
                listaComentarios.appendChild(hr);
            }
        });
    }

    // Función para mostrar el botón "Cargar más"
    function mostrarBotonCarga() {
        botonCarga.style.display = 'block';
    }

    // Función para ocultar el botón "Cargar más"
    function ocultarBotonCarga() {
        botonCarga.style.display = 'none';
    }

    // Boton logout
    const logout = document.querySelector('#logout');
    logout.addEventListener('click', () => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción cerrará la sesión',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
        Swal.fire({
            title: '¡Hasta pronto!',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
        }).then(() => {
            localStorage.removeItem('login_success');
            window.location.href = 'index.html';
        });
        }
    });
});
