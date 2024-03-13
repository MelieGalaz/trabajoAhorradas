/***********cerrar y abrir secciones******************************************* */

const sections = ["Balance", "reportes", "categorias"];
const EditarOperacion = document.getElementById("EditarOperacion");
sections.forEach((sectionId) => {
  const section = document.getElementById(sectionId);
  if (sectionId !== "Balance") {
    section.classList.add("hidden");
  }
});

const menuLinks = document.querySelectorAll("nav a");
menuLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = event.target.getAttribute("href").substring(1);

    sections.forEach((sectionId) => {
      document.getElementById(sectionId).classList.add("hidden");
      // modal.classList.add("hidden");
      nuevaOperacion.classList.add("hidden");
      EditarOperacion.classList.add("hidden");

      menuHambueguesa.classList.toggle("hidden");
    });

    document.getElementById(targetId).classList.remove("hidden");
  });
});
document.getElementById("boton-menu-cerrar").addEventListener("click", () => {
  menuHambueguesa.classList.add("hidden");
});

//*******************************cerrar y abrir nueva operacion*************************************** */
const abrirNuevaOperacion = document.getElementById("abrirNuevaOperacion");
const nuevaOperacion = document.getElementById("nuevaOperacion");
const Balance = document.getElementById("Balance");
const cerrarNueOperacion = document.getElementById("cerrar");

abrirNuevaOperacion.addEventListener("click", () => {
  nuevaOperacion.classList.remove("hidden");
  Balance.classList.add("hidden");
});

cerrarNueOperacion.addEventListener("click", () => {
  nuevaOperacion.classList.add("hidden");
  Balance.classList.remove("hidden");
});

/******************************menu hambueguesa abrir y cerrar*************************************************/
const menuHambueguesa = document.getElementById("mobile-menu");
document.getElementById("hamburger").addEventListener("click", () => {
  menuHambueguesa.classList.remove("hidden");
});

/*************************************************************** */

const ArrayCategoria = JSON.parse(localStorage.getItem("categorias")) || [
  "Comida",
  "Servicios",
  "Salidas",
  "Educación",
  "Transporte",
  "Trabajo",
];

const actualizarSelectores = () => {
  const selecCat = document.getElementById("selecCat");
  const selecBalance = document.getElementById("selecBalance");
  const selecEditarOperacion = document.getElementById("selecEditarOperacion");
  selecCat.innerHTML = "";
  selecBalance.innerHTML = ""; // Limpiar el contenido previo
  selecEditarOperacion.innerHTML = "";
  localStorage.setItem("categorias", JSON.stringify(ArrayCategoria));

  // Agregar la opción "Todas" al select de balance
  const optionTodas = document.createElement("option");
  optionTodas.value = "Todas";
  optionTodas.textContent = "Todas";
  selecBalance.appendChild(optionTodas);

  // Iterar sobre el array de categorías para agregarlas al select
  for (let categoria of ArrayCategoria) {
    const optionCat = document.createElement("option");
    optionCat.value = categoria;
    optionCat.textContent = categoria;
    selecCat.appendChild(optionCat);

    const optionBalance = document.createElement("option");
    optionBalance.value = categoria;
    optionBalance.textContent = categoria;
    selecBalance.appendChild(optionBalance);

    const optionEditar = document.createElement("option");
    optionEditar.value = categoria;
    optionEditar.textContent = categoria;
    selecEditarOperacion.appendChild(optionEditar);
  }
};

const movimientoCategoria = () => {
  const categoria = document.querySelector(".categoria");
  let contenidoHTML = `
    <div class="categoria flex justify-between mx-7 flex-col p-4 w-80 drop-shadow-lg bg-[#eae6f7] gap-5 mt-[23px] rounded-lg lg:w-3/5 lg:m-auto lg:mt-10">
        <h2 class="text-3xl text-center font-bold lg:text-4xl">Categorías</h2>
        <div>
            <label for="agregarCategorias" class="text-xl">Nombre</label>
            <div class="flex items-center lg:gap-6">
                <input type="text" id="agregarCategorias" class="w-48 h-10 rounded-lg lg:w-4/5">
                <button id="agregarCategoriaBtn" class="w-20 my-4 h-10 bg-green text-white bg-[#b240b8] hover:bg-[#96e0a0] hover:text-[#050505] rounded-lg m-auto lg:w-28">Agregar</button>
            </div>
        </div>
    `;

  for (let i = 0; i < ArrayCategoria.length; i++) {
    const cat = ArrayCategoria[i];
    contenidoHTML += `
        <div class="flex justify-between">
            <p>${cat}</p>
            <div class="flex gap-2">
                <a href="javascript:void(0)" class=" flex gap-1 text-green-500 text-sm eliminar" data-index="${i}"><i class="fi fi-sr-trash"></i>Eliminar</a>
                <a href="javascript:void(0)" class="flex gap-1  text-green-500 text-sm editar" data-index="${i}"><i class="fi fi-sr-edit-alt"></i>Editar</a>
            </div>
        </div>
    `;
  }

  contenidoHTML += `</div>`;
  categoria.innerHTML = contenidoHTML;

  const agregarCategoriaBtn = document.getElementById("agregarCategoriaBtn");
  agregarCategoriaBtn.addEventListener("click", () => {
    const nuevaCategoriaInput = document.getElementById("agregarCategorias");
    const nuevaCategoria = nuevaCategoriaInput.value.trim();
    if (nuevaCategoria !== "") {
      ArrayCategoria.push(nuevaCategoria);
      actualizarSelectores();
      movimientoCategoria();
      nuevaCategoriaInput.value = "";
    }
  });
  const categorias = document.getElementById("categorias");
  categoria.querySelectorAll(".eliminar").forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      const index = parseInt(el.getAttribute("data-index"));
      const modalEliminar = document.getElementById("modal-eliminar");
      const eliminarCategoria = document.getElementById("eliminarCategoria");

      // Obtener el nombre de la categoría a eliminar y mostrarlo en la ventana modal
      const categoriaAEliminar = ArrayCategoria[index];
      eliminarCategoria.textContent = categoriaAEliminar;

      // Mostrar la ventana modal
      modalEliminar.classList.remove("hidden");
      categorias.classList.add("hidden");
      // Manejar evento de clic en el botón de eliminar de la ventana modal
      document
        .getElementById("eliminarCategoriaBtn")
        .addEventListener("click", () => {
          ArrayCategoria.splice(index, 1);
          movimientoCategoria();
          actualizarSelectores();
          // Cerrar la ventana modal después de eliminar la categoría
          modalEliminar.classList.add("hidden");
          categoria.classList.remove("hidden");
        });

      // Manejar evento de clic en el botón de cerrar de la ventana modal
      document
        .querySelector(".modal-btn-close")
        .addEventListener("click", () => {
          modalEliminar.classList.add("hidden");
          categoria.classList.remove("hidden");
        });
      document.querySelector(".modal-close").addEventListener("click", () => {
        // Cerrar la ventana modal sin eliminar la categoría
        modalEliminar.classList.add("hidden");
        categoria.classList.remove("hidden");
      });
    });
    localStorage.setItem("categorias", JSON.stringify(ArrayCategoria));
  });

  // Cuando se hace clic en el botón "Editar" de la categoría

  categoria.querySelectorAll(".editar").forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      const index = parseInt(el.getAttribute("data-index"));
      const modal = document.getElementById("modal");
      const nuevoNombreInput = document.getElementById("nuevoNombreInput");
      const guardarNuevoNombre = document.getElementById("guardarNuevoNombre");

      // Mostrar la ventana modal
      categorias.classList.add("hidden");
      modal.classList.remove("hidden");

      // Rellenar el campo de entrada con el nombre actual de la categoría
      nuevoNombreInput.value = ArrayCategoria[index];

      guardarNuevoNombre.addEventListener("click", () => {
        const nuevoNombre = nuevoNombreInput.value.trim();
        if (nuevoNombre !== "") {
          ArrayCategoria[index] = nuevoNombre;
          modal.classList.add("hidden");
          categorias.classList.remove("hidden");
          movimientoCategoria();
          actualizarSelectores();
        }
      });

      // Cuando se hace clic en la 'x' para cerrar la ventana modal
      modal.querySelector(".close").addEventListener("click", () => {
        modal.classList.add("hidden");
        categorias.classList.remove("hidden");
        // Ocultar la ventana modal
      });
    });
  });
};

movimientoCategoria();
actualizarSelectores();

document.addEventListener("DOMContentLoaded", () => {
  const operaciones = evaluarLocalStorage();
  generarTabla(operaciones);
});

const guardarTablaEnLocalStorage = (tablaData) => {
  localStorage.setItem("tablaData", JSON.stringify(tablaData));
};
const operaciones = JSON.parse(localStorage.getItem("tablaData")) || [];
//Funcion para eliminar una operacion
const eliminarOperacion = (id) => {
  let tablaData = evaluarLocalStorage();
  tablaData = tablaData.filter((operacion) => operacion.id !== id);
  localStorage.removeItem("tablaData");
  localStorage.setItem("tablaData", JSON.stringify(tablaData));
  if (tablaData.length !== 0) {
    generarTabla();
  } else {
    const imagenVista = () => {
      const imagenOperaciones = document.querySelector(".imagen-operaciones");
      imagenOperaciones.classList.remove("hidden");
      const tablaOperaciones = document.getElementById(
        "tabla-data-operaciones"
      );
      tablaOperaciones.classList.add("hidden");
      localStorage.clear();
    };
    localStorage.setItem(imagenVista(), "true");
  }
  actualizarBalance();
};
document.querySelectorAll(".delete-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    eliminarOperacion(id);
  });
});

document.getElementById("nuevaOperacion").addEventListener("submit", (e) => {
  e.preventDefault();

  // Variables que guardan los datos del objeto
  const descripcion = document.getElementById("descripcionForm").value;
  const categoria = document.getElementById("selecCat").value;
  const fecha = document.getElementById("fechaForm").value;

  const monto = parseFloat(document.getElementById("montoForm").value);
  const tipo = document.getElementById("tipo-gasto-ganancia").value;

  //Función para colocar el signo correspondiente en monto
  const tipoMonto = (tipo, monto) => {
    if (tipo === "Gastos") {
      return -monto;
    } else {
      return monto;
    }
  };
  // OBJETO
  const operacion = {
    id: uuidv4(), // Asegúrate de tener una función uuidv4() disponible o reemplázala por otra forma de generar un ID único
    Descripcion: descripcion,
    Categoria: categoria,
    Fecha: fecha,
    Monto: tipoMonto(tipo, monto),
    Tipo: tipo,
  };
  // Recuperar datos existentes de localStorage o inicializar un arreglo vacío
  let tablaData = evaluarLocalStorage();
  tablaData.push(operacion); // Agrega el objeto directamente
  operaciones.push(nuevaOperacion);

  // Filtrar las operaciones según el tipo seleccionado
  const tipoSeleccionado = document.getElementById("tipo-gasto-ganancia").value;
  const operacionesFiltradas = filtrarPorTipo(operaciones, tipoSeleccionado);

  // Generar la tabla con las operaciones filtradas
  generarTabla(operacionesFiltradas);
  // Actualizar localStorage
  localStorage.setItem("tablaData", JSON.stringify(tablaData));
  generarTabla(tablaData);

  actualizarBalance();
});

window.addEventListener("load", function () {
  generarTabla(evaluarLocalStorage());
});

// Modifica la función generarTabla para aceptar un parámetro filtro
function generarTabla(operaciones) {
  const tableBody = document.getElementById("tabody-operaciones");
  tableBody.innerHTML = "";
  operaciones.forEach((operacion) => {
    tableBody.innerHTML += `
      <tr>
          <td class="text-center text-xs lg:text-base">${
            operacion.Descripcion
          }</td>
          <td class="text-center text-xs lg:text-base">${
            operacion.Categoria
          }</td>
          <td class="text-center text-xs hidden lg:block lg:text-base">${fechaFormateada(
            operacion.Fecha
          )}</td>
          <td class="text-center text-xs lg:text-base" >${operacion.Monto}</td>
          <td class="text-[#64c27b] flex justify-center gap-2 text-xs lg:text-base"> 
            <button class="edit-btn" data-id="${
              operacion.id
            }"><i class="fi fi-sr-edit-alt"></i> 
            </button>
            <button class="delete-btn" onclick="eliminarOperacion('${
              operacion.id
            }')"><i class="fi fi-sr-trash"></i> 
            </button>
          </td>
      </tr>
    `;
  });

  // const Balance = document.getElementById("Balance");

  tableBody.querySelectorAll(".edit-btn").forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      EditarOperacion.classList.remove("hidden");
      Balance.classList.add("hidden");
    });
  });
  document.getElementById("cancelar_editar_operacion").onclick = () => {
    EditarOperacion.classList.add("hidden");
    console.log("cancelar_editar_operacion");
    Balance.classList.remove("hidden");
  };
}

//Agrega un listener al cambio de selección en selecBalance
document.getElementById("selecBalance").addEventListener("change", (event) => {
  const filtroSeleccionado = event.target.value;
  generarTabla(filtroSeleccionado); // Genera la tabla con el filtro seleccionado
});

const evaluarLocalStorage = () => {
  return JSON.parse(localStorage.getItem("tablaData")) || [];
  filtrarOrdenar();
};

//boton de agregar al tocarlo lleva a balance
nuevaOperacion.querySelector(".nueva-operacion-agregar-btn").onclick = () => {
  nuevaOperacion.classList.add("hidden");
  localStorage.setItem("imagenOperacionesHidden", "true");
  const imagenOperaciones = document.querySelector(".imagen-operaciones");
  imagenOperaciones.classList.add("hidden");
  const tablaOperaciones = document.getElementById("tabla-data-operaciones");
  tablaOperaciones.classList.remove("hidden");
  Balance.classList.remove("hidden");
};

document.addEventListener("DOMContentLoaded", () => {
  // Verificar el estado almacenado y aplicar la clase 'hidden' si es necesario
  const imagenOperacionesHidden = localStorage.getItem(
    "imagenOperacionesHidden"
  );
  if (imagenOperacionesHidden === "true") {
    document.querySelector(".imagen-operaciones").classList.add("hidden");
    const tablaOperaciones = document.getElementById("tabla-data-operaciones");
    tablaOperaciones.classList.remove("hidden");
  }
});

//Función para actualizar el balance
const actualizarBalance = () => {
  const operacionesGuardadas = evaluarLocalStorage();

  const ganancias = operacionesGuardadas.reduce((total, operacion) => {
    if (parseFloat(operacion.Monto) > 0) {
      return total + parseFloat(operacion.Monto);
    }
    return total;
  }, 0);
  document.getElementById(
    "balance-ganancia"
  ).innerHTML = `<div id="balance-ganancia" class="ganancias flex w-72 lg:w-80 p-2 justify-between ">
  <p class="text-xl">Ganancias</p>
  <p class="text-xl text-[green]">$${ganancias.toFixed(2)}</p>
</div>`;

  const gastos = operacionesGuardadas.reduce((total, operacion) => {
    if (parseFloat(operacion.Monto) < 0) {
      return total + parseFloat(operacion.Monto);
    }
    return total;
  }, 0);
  document.getElementById(
    "balance-gastos"
  ).innerHTML = `<div id="balance-gastos" class="gastos flex w-72 lg:w-80 p-2  justify-between ">
  <p class="text-xl">Gastos</p>
  <p class="text-xl text-[red]">$${Math.abs(gastos).toFixed(2)}</p>
</div>`;
  const balanceTotal = ganancias + gastos;
  document.getElementById(
    "balance-total"
  ).innerHTML = `<div id="balance-total" class="total flex w-72 lg:w-80 p-2   justify-between ">
  <p class="text-xl">Total</p>
  <p class="text-xl font-bold">$${balanceTotal.toFixed(2)}</p>
</div>`;
};

//Función para formatear la fecha en el formato deseado

function fechaFormateada(f) {
  let fc = new Date(f);
  let ff;
  let dia = fc.getDate();
  let mes = fc.getMonth() + 1;
  let anio = fc.getFullYear();

  // Verificamos si estamos en el último día del mes
  if (dia === new Date(anio, mes, 0).getDate()) {
    // Si es el último día del mes, incrementamos el mes y reiniciamos el día a 1
    mes += 1;
    dia = 1;
  } else {
    // Si no es el último día del mes, simplemente incrementamos el día en 1
    dia += 1;
  }

  // Formateamos la fecha en el formato deseado
  ff = `${dia < 10 ? "0" + dia : dia}/`;
  ff += `${mes < 10 ? "0" + mes : mes}/`;
  ff += anio;

  return ff;
}

/////////////////////////////filtros////////////////////////////////////////////
const ocultarFitros = document.getElementById("ocultarFitros");

document.getElementById("ocultarFitros").addEventListener("click", () => {
  const fitrosContenedor = document.getElementById("fitrosContenedor");
  if (fitrosContenedor.style.display === "block") {
    fitrosContenedor.style.display = "none";
  } else {
    fitrosContenedor.style.display = "block";
  }
});
function filtrarPorCategoriaYFecha(
  objetos,
  categoriaSeleccionada,
  fechaSeleccionada
) {
  return objetos.filter(function (objeto) {
    const categoriaValida =
      categoriaSeleccionada === "Todas" ||
      objeto.Categoria === categoriaSeleccionada;
    const fechaValida =
      (!fechaSeleccionada || new Date(objeto.Fecha) >= fechaSeleccionada) &&
      (categoriaSeleccionada === "Todas" || categoriaValida);
    return fechaValida;
  });
}

console.log(operaciones);
function filtrarYGenerarTabla(categoriaSeleccionada, fechaSeleccionada) {
  // Filtrar las operaciones por categoría y fecha seleccionadas
  const operacionesFiltradas = filtrarPorCategoriaYFecha(
    operaciones,
    categoriaSeleccionada,
    fechaSeleccionada
  );
  // Mostrar las operaciones filtradas en la tabla
  generarTabla(operacionesFiltradas);
}

document.getElementById("selecBalance").addEventListener("change", function () {
  const categoriaSeleccionada = this.value;
  const filtroFechaInput = document.getElementById("filtro-fecha");
  const fechaSeleccionada = filtroFechaInput.value
    ? new Date(filtroFechaInput.value)
    : null;

  filtrarYGenerarTabla(categoriaSeleccionada, fechaSeleccionada);
});

const filtroFechaInput = document.getElementById("filtro-fecha");
filtroFechaInput.addEventListener("change", function () {
  const fechaSeleccionada = this.value ? new Date(this.value) : null;
  const categoriaSeleccionada = document.getElementById("selecBalance").value;

  filtrarYGenerarTabla(categoriaSeleccionada, fechaSeleccionada);
});
let operacionFiltroFitros = [];
function filtrarOrdenar() {
  const filtroSeleccionado = document.getElementById("filtro-ordenar").value;
  switch (filtroSeleccionado) {
    case "masRecientes":
      operacionFiltroFitros.sort(
        (a, b) => new Date(a.Fecha) - new Date(b.Fecha)
      );
      break;
    case "MenosRecientes":
      operacionFiltroFitros.sort(
        (a, b) => new Date(b.Fecha) - new Date(a.Fecha)
      );
      break;
    case "MayorMonto":
      operacionFiltroFitros.sort((a, b) => b.Monto - a.Monto);
      break;
    case "ManorMonto":
      operacionFiltroFitros.sort((a, b) => a.Monto - b.Monto);
      break;
    case "A/Z":
      operacionFiltroFitros.sort((a, b) =>
        a.Descripcion.localeCompare(b.Descripcion)
      );
      break;
    case "Z/A":
      operacionFiltroFitros.sort((a, b) =>
        b.Descripcion.localeCompare(a.Descripcion)
      );
      break;
    default:
      break;
  }
  generarTabla(operacionFiltroFitros);
}
document
  .getElementById("filtro-ordenar")
  .addEventListener("change", filtrarOrdenar);
document

  .getElementById("filtro-ordenar")
  .addEventListener("change", filtrarOrdenar);

// Función para cargar los datos iniciales y luego llamar a filtrarOrdenar
function cargarDatosIniciales() {
  const operaciones = JSON.parse(localStorage.getItem("tablaData")) || [];
  operacionFiltroFitros = operaciones.slice();
  generarTabla(operacionFiltroFitros);
  filtrarOrdenar();
}
document.getElementById("filtro-tipo").addEventListener("change", function () {
  const tipoSeleccionado = this.value;

  // Filtrar las operaciones por tipo seleccionado
  const operacionesFiltradas = filtrarPorTipo(operaciones, tipoSeleccionado);

  // Generar la tabla con las operaciones filtradas
  generarTabla(operacionesFiltradas);
});

// Función para filtrar las operaciones por tipo
function filtrarPorTipo(objetos, tipoSeleccionado) {
  return objetos.filter(function (objeto) {
    return tipoSeleccionado === "todo" || tipoSeleccionado === objeto.tipo;
  });
}

window.addEventListener("load", cargarDatosIniciales);
