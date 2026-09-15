const telefono = "584243349562";


let carrito = [];


/* =========================
   CARGAR CARRITO
========================= */

const carritoGuardado =
  localStorage.getItem("carritoApurenito");


if (carritoGuardado) {

  try {

    carrito =
      JSON.parse(carritoGuardado);

  } catch {

    carrito = [];

  }

}



/* =========================
   GUARDAR CARRITO
========================= */

function guardarCarrito() {

  localStorage.setItem(
    "carritoApurenito",
    JSON.stringify(carrito)
  );

}



/* =========================
   AGREGAR PRODUCTO
========================= */

function agregarAlCarrito(
  nombre,
  precio
) {

  carrito.push({

    nombre: nombre,

    precio: Number(precio)

  });


  guardarCarrito();

  mostrarCarrito();

  actualizarContador();


  const carritoElemento =
    document.getElementById("carrito");


  if (carritoElemento) {

    carritoElemento.scrollIntoView({
      behavior: "smooth"
    });

  }

}



/* =========================
   MOSTRAR CARRITO
========================= */

function mostrarCarrito() {

  const lista =
    document.getElementById(
      "lista-pedido"
    );


  const totalElemento =
    document.getElementById(
      "total-sacos"
    );


  if (!lista || !totalElemento) {

    return;

  }


  lista.innerHTML = "";


  if (carrito.length === 0) {

    lista.innerHTML = `

      <p class="carrito-vacio">

        No has agregado productos todavía.

      </p>

    `;


    totalElemento.textContent =
      "0.00";


    actualizarContador();

    return;

  }


  let total = 0;


  carrito.forEach(
    (producto, indice) => {

      total +=
        Number(producto.precio);


      const item =
        document.createElement(
          "div"
        );


      item.className =
        "item-carrito";


      item.innerHTML = `

        <div>

          <h4>
            ${producto.nombre}
          </h4>

          <p>
            $${Number(
              producto.precio
            ).toFixed(2)}
          </p>

        </div>


        <button
          class="boton-eliminar-carrito"
          onclick="eliminarDelCarrito(${indice})"
        >
          Eliminar
        </button>

      `;


      lista.appendChild(item);

    }
  );


  totalElemento.textContent =
    total.toFixed(2);


  actualizarContador();

}



/* =========================
   ELIMINAR
========================= */

function eliminarDelCarrito(indice) {

  carrito.splice(
    indice,
    1
  );


  guardarCarrito();

  mostrarCarrito();

}



/* =========================
   VACIAR
========================= */

function vaciarCarrito() {

  carrito = [];

  guardarCarrito();

  mostrarCarrito();

}



/* =========================
   CONTADOR
========================= */

function actualizarContador() {

  const contador =
    document.getElementById(
      "contador-carrito"
    );


  if (!contador) {

    return;

  }


  contador.textContent =
    carrito.length;

}



/* =========================
   WHATSAPP
========================= */

function enviarWhatsApp() {

  if (carrito.length === 0) {

    alert(
      "Agrega al menos un producto a tu pedido."
    );

    return;

  }


  let mensaje =
    "Hola, Agropecuaria Apureñito. " +
    "Quiero realizar el siguiente pedido:%0A%0A";


  let total = 0;


  carrito.forEach(
    (producto, indice) => {

      mensaje +=
        `${indice + 1}. ` +
        `${producto.nombre} - ` +
        `$${Number(
          producto.precio
        ).toFixed(2)}%0A`;


      total +=
        Number(producto.precio);

    }
  );


  mensaje +=
    `%0ATotal: ` +
    `$${total.toFixed(2)}`;


  mensaje +=
    "%0A%0AQuisiera confirmar " +
    "disponibilidad y delivery.";


  const url =
    `https://wa.me/${telefono}?text=${mensaje}`;


  window.open(
    url,
    "_blank"
  );

}



/* =========================
   MENÚ MÓVIL
========================= */

function abrirMenu() {

  const menu =
    document.getElementById(
      "menu"
    );


  if (!menu) {

    return;

  }


  menu.classList.toggle(
    "menu-abierto"
  );

}



/* =========================
   CERRAR MENÚ AL HACER CLICK
========================= */

document.addEventListener(
  "click",
  function(evento) {

    const menu =
      document.getElementById(
        "menu"
      );


    const boton =
      document.querySelector(
        ".menu-btn"
      );


    if (
      !menu ||
      !boton
    ) {

      return;

    }


    if (
      !menu.contains(evento.target) &&
      !boton.contains(evento.target)
    ) {

      menu.classList.remove(
        "menu-abierto"
      );

    }

  }
);



/* =========================
   INICIAR
========================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    mostrarCarrito();

    actualizarContador();

  }
);