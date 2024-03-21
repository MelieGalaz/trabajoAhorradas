/**********************cerrar y abrir secciones******************************************* */

const sections = ["Balance", "reportes", "categorias"];

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
  generarTabla(evaluarLocalStorage());
});

const guardarTablaEnLocalStorage = (tablaData) => {
  localStorage.setItem("tablaData", JSON.stringify(tablaData));
};
const operaciones = JSON.parse(localStorage.getItem("tablaData")) || [];

//Funcion para mostrar u ocultar la imagen y la tabla segun los datos en el localStorage

const actualizarInterfaz = () => {
  const tablaData = evaluarLocalStorage();
  const imagenReportes = document.getElementById("imagen-reportes");
  const tablaReportes = document.getElementById("tablas-reportes");
  if (tablaData.length > 0) {
    //si hay datos en el localStorage, muestra la tabla y oculta la imagen
    imagenReportes.classList.add("hidden");
    tablaReportes.classList.remove("hidden");
    mostrarTablaReportes();
  } else {
    //si no hay datos en el localStorage, muestra la imagen y oculta la tabla
    imagenReportes.classList.remove("hidden");
    tablaReportes.classList.add("hidden");
  }
};

//Llamar a actualizar interfaz al cargar la pagina
window.addEventListener("load", actualizarInterfaz);

//Funcion para eliminar una operacion
const eliminarOperacion = (id) => {
  let tablaData = evaluarLocalStorage();
  tablaData = tablaData.filter((operacion) => operacion.id !== id);
  localStorage.removeItem("tablaData");
  localStorage.setItem("tablaData", JSON.stringify(tablaData));
  if (tablaData.length !== 0) {
    generarTabla(evaluarLocalStorage());
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
  actualizarInterfaz();
};

const modalEliminarOperacionTabla = document.getElementById(
  "modal-eliminar-operacion-tabla"
);
const deleteBtnModal = document.getElementById("delete-btn-modal");
const mostrarModalEliminar = (id) => {
  modalEliminarOperacionTabla.classList.remove("hidden");
  Balance.classList.add("hidden");

  deleteBtnModal.addEventListener("click", () => {
    eliminarOperacion(id);
    modalEliminarOperacionTabla.classList.add("hidden");
    Balance.classList.remove("hidden");
  });
  modalEliminarOperacionTabla
    .querySelector(".modal-close-operacion ")
    .addEventListener("click", () => {
      modalEliminarOperacionTabla.classList.add("hidden");
      Balance.classList.remove("hidden");
    });
  modalEliminarOperacionTabla
    .querySelector(".modal-close-X")
    .addEventListener("click", () => {
      modalEliminarOperacionTabla.classList.add("hidden");
      Balance.classList.remove("hidden");
    });
  modalEliminarOperacionTabla
    .querySelector(".modal-close-X")
    .addEventListener("click", () => {
      modalEliminarOperacionTabla.classList.add("hidden");
      Balance.classList.remove("hidden");
    });
};

document
  .getElementById("nuevaOperacionForm")
  .addEventListener("submit", (e) => {
    e.preventDefault();

    //Variables que guardan los datos del objeto
    const descripcion = document.getElementById("descripcionForm").value;
    const categoria = document.getElementById("selecCat").value;
    const fecha = document.getElementById("fechaForm").value;
    const monto = parseFloat(document.getElementById("montoForm").value);
    const tipo = document.getElementById("tipo-gasto-ganancia").value;

    // Validación de campos
    // Validación de campos
    if (descripcion === "") {
      alert("Por favor, ingrese una descripción.");
      document.getElementById("descripcionForm").style.background = "red";
      descripcion.focus();
      return false;
    } else {
      document.getElementById("descripcionForm").style.background = ""; // Restablecer el estilo
    }

    if (categoria === "") {
      alert("Por favor, seleccione una categoría.");
      return;
    }

    if (fecha === "") {
      alert("Por favor, seleccione una fecha.");
      return;
    }

    if (isNaN(monto) || monto <= 0) {
      alert("Por favor, ingrese un monto válido.");
      return;
    }

    if (tipo === "") {
      alert("Por favor, seleccione un tipo (Gastos/Ganancias).");
      return;
    }

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
    };
    // Recuperar datos existentes de localStorage o inicializar un arreglo vacío
    let tablaData = evaluarLocalStorage();
    tablaData.push(operacion); // Agrega el objeto directamente

    // Actualizar localStorage
    localStorage.setItem("tablaData", JSON.stringify(tablaData));
    generarTabla(evaluarLocalStorage());

    actualizarBalance();
    mostrarTablaReportes();
  });

function generarTabla(operaciones) {
  const tableBody = document.getElementById("tabody-operaciones");
  tableBody.innerHTML = "";
  operaciones.forEach((operacion) => {
    tableBody.innerHTML += `
      <tr class="border border-slate-400">
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
            <button class="delete-btn" onclick="mostrarModalEliminar('${
              operacion.id
            }')"('${operacion.id}')"><i class="fi fi-sr-trash"></i> 
            </button>
          </td>
      </tr>
    `;
  });
  // Obtener los valores de la tabla
  const obtenerValoresDeTabla = (idOperacion) => {
    const operacion = {};
    const tableRows = document.querySelectorAll("#tabody-operaciones tr");

    tableRows.forEach((row) => {
      const id = row.querySelector(".edit-btn").getAttribute("data-id");

      if (id === idOperacion) {
        operacion.Descripcion = row.cells[0].textContent;
        operacion.Categoria = row.cells[1].textContent;
        operacion.Fecha = row.cells[2].textContent;
        operacion.Monto = parseFloat(row.cells[3].textContent);
        operacion.Id = id;
      }
    });
    return operacion;
  };

  // Rellenar el formulario
  const llenarFormularioEdicion = (operacion) => {
    // Asignar el ID de la operación como un atributo de datos al botón de edición
    const editButton = document.getElementById("editarOperacionBtn");
    editButton.setAttribute("data-id", operacion.Id);
    document.getElementById("descripcionForm-editar").value =
      operacion.Descripcion;
    document.getElementById("montoForm-editar").value = operacion.Monto;
    document.getElementById("fecha-editar-operacion").value = fechaFormateada(
      operacion.Fecha
    );
    const categoriaSelect = document.getElementById("selecEditarOperacion");
    const tipoSelect = document.getElementById("editar-gastos-ganacias");
    if (operacion.monto < 0) {
      tipoSelect.value = "Gastos";
    } else {
      tipoSelect.value = "Ganancias";
    }
    categoriaSelect.value = operacion.Categoria;
  };
  const EditarOperacion = document.getElementById("EditarOperacion");
  // Abrir el formulario de edición
  tableBody.querySelectorAll(".edit-btn").forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      EditarOperacion.classList.remove("hidden");
      Balance.classList.add("hidden");
      const idOperacion = el.getAttribute("data-id");
      console.log(idOperacion);
      const operacionSeleccionada = obtenerValoresDeTabla(idOperacion);
      llenarFormularioEdicion(operacionSeleccionada);
    });
  });

  const editarOperacion = () => {
    // Obtener el ID de la operación que se está editando desde el botón de edición
    const idOperacion = document
      .getElementById("editarOperacionBtn")
      .getAttribute("data-id");

    // Obtener los nuevos valores del formulario de edición
    const tipoSeleccionado = document.getElementById(
      "editar-gastos-ganacias"
    ).value;
    const nuevaDescripcion = document.getElementById(
      "descripcionForm-editar"
    ).value;
    const nuevaCategoria = document.getElementById(
      "selecEditarOperacion"
    ).value;
    const nuevaFecha = document.getElementById("fecha-editar-operacion").value;
    const nuevoMonto = parseFloat(
      document.getElementById("montoForm-editar").value
    );

    // Cambiar el signo del monto según el tipo seleccionado
    const nuevoMontoConSigno =
      tipoSeleccionado === "Gastos"
        ? -Math.abs(nuevoMonto)
        : Math.abs(nuevoMonto);

    // Actualizar la fila correspondiente en la tabla con los nuevos valores
    const tableRows = document.querySelectorAll("#tabody-operaciones tr");
    tableRows.forEach((row) => {
      const id = row.querySelector(".edit-btn").getAttribute("data-id");
      if (id === idOperacion) {
        row.cells[0].textContent = nuevaDescripcion;
        row.cells[1].textContent = nuevaCategoria;
        row.cells[2].textContent = fechaFormateada(nuevaFecha);
        row.cells[3].textContent = nuevoMontoConSigno;
      }
    });

    // Obtener y actualizar los datos de operaciones guardadas en el almacenamiento local
    let operacionesGuardadas = evaluarLocalStorage();
    operacionesGuardadas = operacionesGuardadas.map((operacion) => {
      if (operacion.id === idOperacion) {
        return {
          ...operacion,
          Descripcion: nuevaDescripcion,
          Categoria: nuevaCategoria,
          Fecha: nuevaFecha,
          Monto: nuevoMontoConSigno,
        };
      } else {
        return operacion;
      }
    });

    // Guardar los cambios en el almacenamiento local
    localStorage.setItem("tablaData", JSON.stringify(operacionesGuardadas));

    // Ocultar el formulario de edición después de guardar los cambios
    document.getElementById("EditarOperacion").classList.add("hidden");
    // Mostrar la tabla después de guardar los cambios
    Balance.classList.remove("hidden");

    actualizarBalance();
  };

  document
    .getElementById("editarOperacionBtn")
    .addEventListener("click", (event) => {
      event.preventDefault();
      editarOperacion();
    });

  // Cancelar la edición
  document
    .getElementById("cancelar_editar_operacion")
    .addEventListener("click", () => {
      EditarOperacion.classList.add("hidden");
      console.log("cancelar_editar_operacion");
      Balance.classList.remove("hidden");
    });

  // const Balance = document.getElementById("Balance");

  tableBody.querySelectorAll(".edit-btn").forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      EditarOperacion.classList.remove("hidden");
      Balance.classList.add("hidden");
    });
  });

  document
    .getElementById("cancelar_editar_operacion")
    .addEventListener("click", () => {
      EditarOperacion.classList.add("hidden");
      console.log("cancelar_editar_operacion");
      Balance.classList.remove("hidden");
    });
}

const evaluarLocalStorage = () => {
  console.log(JSON.parse(localStorage.getItem("tablaData")));
  return JSON.parse(localStorage.getItem("tablaData")) || [];
};

//boton de agregar al tocarlo lleva a balance
nuevaOperacion
  .querySelector(".nueva-operacion-agregar-btn")
  .addEventListener("click", () => {
    nuevaOperacion.classList.add("hidden");
    localStorage.setItem("imagenOperacionesHidden", "true");
    const imagenOperaciones = document.querySelector(".imagen-operaciones");
    imagenOperaciones.classList.add("hidden");
    const tablaOperaciones = document.getElementById("tabla-data-operaciones");
    tablaOperaciones.classList.remove("hidden");
    Balance.classList.remove("hidden");
  });

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

//llamar actualizarBalance al cargar la pagina
window.addEventListener("load", actualizarBalance);

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
  // ff = `${anio}-${mes < 10 ? "0" + mes : mes}-${dia < 10 ? "0" + dia : dia}`;
  ff = `${dia < 10 ? "0" + dia : dia}-${mes < 10 ? "0" + mes : mes}-${anio}`;
  return ff;
}

/*----------------------------Tabla Reportes---------------------------------*/

//Funcion para obtener la categoria con mayor ganancia
const obtenerCategoriaConMayorGanancia = () => {
  const operacionesGuardadas = evaluarLocalStorage();
  const gananciasPorCategoria = {};
  const imagenReportes = document.getElementById("imagen-reportes");
  const tablaReportes = document.getElementById("tablas-reportes");
  imagenReportes.classList.add("hidden");
  tablaReportes.classList.remove("hidden");

  // Calcular las ganancias totales por categoría
  operacionesGuardadas.forEach((operacion) => {
    if (operacion.Monto > 0) {
      if (!gananciasPorCategoria[operacion.Categoria]) {
        gananciasPorCategoria[operacion.Categoria] = {
          total: 0,
          categoriaMayorGanancia: null,
        };
      }
      gananciasPorCategoria[operacion.Categoria].total += operacion.Monto;
      if (
        !gananciasPorCategoria[operacion.Categoria].categoriaMayorGanancia ||
        gananciasPorCategoria[operacion.Categoria].total >
          gananciasPorCategoria[operacion.Categoria].categoriaMayorGanancia
            .total
      ) {
        gananciasPorCategoria[operacion.Categoria].categoriaMayorGanancia = {
          total: gananciasPorCategoria[operacion.Categoria].total,
          categoria: operacion.Categoria,
        };
      }
    }
  });

  // Encontrar la categoría con la mayor ganancia
  let categoriaMayorGanancia;
  let mayorGanancia = 0;
  for (const categoria in gananciasPorCategoria) {
    if (gananciasPorCategoria.hasOwnProperty(categoria)) {
      if (
        gananciasPorCategoria[categoria].categoriaMayorGanancia.total >
        mayorGanancia
      ) {
        mayorGanancia =
          gananciasPorCategoria[categoria].categoriaMayorGanancia.total;
        categoriaMayorGanancia =
          gananciasPorCategoria[categoria].categoriaMayorGanancia.categoria;
      }
    }
  }
  localStorage.setItem("categoriaMayorGanancia", categoriaMayorGanancia);
  return {
    categoria: categoriaMayorGanancia,
    montoTotal: mayorGanancia,
  };
};

//funcion para obtener la categoria con mayor gasto
const obtenerCategoriaConMayorGasto = () => {
  const operacionesGuardadas = evaluarLocalStorage();
  const gastosPorCategoria = {};
  const imagenReportes = document.getElementById("imagen-reportes");
  const tablaReportes = document.getElementById("tablas-reportes");
  imagenReportes.classList.add("hidden");
  tablaReportes.classList.remove("hidden");

  // Calcular los gastos totales por categoría
  operacionesGuardadas.forEach((operacion) => {
    if (operacion.Monto < 0) {
      if (!gastosPorCategoria[operacion.Categoria]) {
        gastosPorCategoria[operacion.Categoria] = {
          total: 0,
          categoriaMayorGasto: null,
        };
      }
      gastosPorCategoria[operacion.Categoria].total += operacion.Monto;
      if (
        !gastosPorCategoria[operacion.Categoria].categoriaMayorGasto ||
        gastosPorCategoria[operacion.Categoria].total <
          gastosPorCategoria[operacion.Categoria].categoriaMayorGasto.total
      ) {
        gastosPorCategoria[operacion.Categoria].categoriaMayorGasto = {
          total: gastosPorCategoria[operacion.Categoria].total,
          categoria: operacion.Categoria,
        };
      }
    }
  });

  // Encontrar la categoría con la mayor gasto
  let categoriaMayorGasto;
  let mayorGasto = 0;
  for (const categoria in gastosPorCategoria) {
    if (gastosPorCategoria.hasOwnProperty(categoria)) {
      if (
        gastosPorCategoria[categoria].categoriaMayorGasto.total < mayorGasto
      ) {
        mayorGasto = gastosPorCategoria[categoria].categoriaMayorGasto.total;
        categoriaMayorGasto =
          gastosPorCategoria[categoria].categoriaMayorGasto.categoria;
      }
    }
  }
  localStorage.setItem("categoriaMayorGasto", categoriaMayorGasto);
  return {
    categoriaGastos: categoriaMayorGasto,
    montoTotalGastos: mayorGasto,
  };
};

//Funcion para obtener la categoria con mayor balance
const obtenerCategoriaConMayorBalance = () => {
  const operacionesGuardadas = evaluarLocalStorage();
  const balancePorCategoria = {};
  const imagenReportes = document.getElementById("imagen-reportes");
  const tablaReportes = document.getElementById("tablas-reportes");
  imagenReportes.classList.add("hidden");
  tablaReportes.classList.remove("hidden");

  // Calcular el balance total por categoría
  operacionesGuardadas.forEach((operacion) => {
    if (!balancePorCategoria[operacion.Categoria]) {
      balancePorCategoria[operacion.Categoria] = 0;
    }
    balancePorCategoria[operacion.Categoria] += operacion.Monto;
  });
  let categoriaMayorBalance;
  let mayorBalance = Infinity; // Comenzamos con un valor grande para comparar distancias
  for (const categoria in balancePorCategoria) {
    if (balancePorCategoria.hasOwnProperty(categoria)) {
      const balance = balancePorCategoria[categoria];
      const distanciaBalance = Math.abs(balance);
      if (distanciaBalance < mayorBalance) {
        // Verificamos si la distancia es menor a la anterior
        mayorBalance = distanciaBalance;
        categoriaMayorBalance = categoria;
      }
    }
  }
  localStorage.setItem("categoriaMayorBalance", categoriaMayorBalance);
  return {
    categoriaBalance: categoriaMayorBalance,
    balanceTotal: mayorBalance,
  };
};

//Funcion para obtener el mes con mayor ganancia
const obtenerMesConMayorGanancia = () => {
  const operacionesGuardadas = evaluarLocalStorage();
  const gananciasPorMes = {};

  // Calcular las ganancias totales por mes
  operacionesGuardadas.forEach((operacion) => {
    // Obtener el mes de la fecha de la operación
    const fecha = new Date(operacion.Fecha);
    const mes = fecha.getMonth() + 1;

    if (operacion.Monto > 0) {
      if (!gananciasPorMes[mes]) {
        gananciasPorMes[mes] = 0;
      }
      gananciasPorMes[mes] += operacion.Monto;
    }
  });

  // Encontrar el mes con la mayor ganancia
  let mesMayorGanancia;
  let mayorGanancia = 0;
  for (const mes in gananciasPorMes) {
    if (gananciasPorMes.hasOwnProperty(mes)) {
      if (gananciasPorMes[mes] > mayorGanancia) {
        mayorGanancia = gananciasPorMes[mes];
        mesMayorGanancia = mes;
      }
    }
  }

  localStorage.setItem("mesMayorGanancia", mesMayorGanancia);
  return {
    mes: mesMayorGanancia,
    montoTotalMes: mayorGanancia,
  };
};

//Funcion para obtener el mes con mayor gasto
const obtenerMesConMayorGasto = () => {
  const operacionesGuardadas = evaluarLocalStorage();
  const gastosPorMes = {};

  // Calcular los gastos totales por mes
  operacionesGuardadas.forEach((operacion) => {
    // Obtener el mes de la fecha de la operación
    const fecha = new Date(operacion.Fecha);
    const mes = fecha.getMonth() + 1; // Se suma 1 porque los meses en JavaScript van de 0 a 11

    if (operacion.Monto < 0) {
      if (!gastosPorMes[mes]) {
        gastosPorMes[mes] = 0;
      }
      gastosPorMes[mes] += Math.abs(operacion.Monto); // Se toma el valor absoluto para asegurar que el monto sea positivo
    }
  });

  // Encontrar el mes con el mayor gasto
  let mesMayorGasto;
  let mayorGasto = 0;
  for (const mes in gastosPorMes) {
    if (gastosPorMes.hasOwnProperty(mes)) {
      if (gastosPorMes[mes] > mayorGasto) {
        mayorGasto = gastosPorMes[mes];
        mesMayorGasto = mes;
      }
    }
  }

  localStorage.setItem("mesMayorGasto", mesMayorGasto);
  return {
    mesGasto: mesMayorGasto,
    montoTotalGastoMes: mayorGasto,
  };
};

//Funcion para calcular los totales por categoría
const calcularTotalesPorCategoria = () => {
  const operacionesGuardadas = evaluarLocalStorage();
  const totalesPorCategoria = {};

  // Calcular los totales por categoría
  operacionesGuardadas.forEach((operacion) => {
    if (!totalesPorCategoria[operacion.Categoria]) {
      totalesPorCategoria[operacion.Categoria] = {
        ganancias: 0,
        gastos: 0,
        balance: 0,
      };
    }

    if (operacion.Monto > 0) {
      totalesPorCategoria[operacion.Categoria].ganancias += operacion.Monto;
    } else {
      totalesPorCategoria[operacion.Categoria].gastos -= operacion.Monto; // Se toma el valor absoluto para asegurar que el monto sea positivo
    }
  });

  // Calcular el balance por categoría
  for (const categoria in totalesPorCategoria) {
    if (totalesPorCategoria.hasOwnProperty(categoria)) {
      const { ganancias, gastos } = totalesPorCategoria[categoria];
      totalesPorCategoria[categoria].balance = ganancias - gastos;
    }
  }

  return totalesPorCategoria;
};

//Funcion para calcular los totales por mes
const calcularTotalesPorMes = () => {
  const operacionesGuardadas = evaluarLocalStorage();
  const totalesPorMes = {};

  // Calcular los totales por mes
  operacionesGuardadas.forEach((operacion) => {
    const fecha = new Date(operacion.Fecha);
    const mes = `${fecha.getMonth() + 1}/${fecha.getFullYear()}`;

    if (!totalesPorMes[mes]) {
      totalesPorMes[mes] = {
        ganancias: 0,
        gastos: 0,
        balance: 0,
      };
    }

    if (operacion.Monto > 0) {
      totalesPorMes[mes].ganancias += operacion.Monto;
    } else {
      totalesPorMes[mes].gastos -= operacion.Monto; // Se toma el valor absoluto para asegurar que el monto sea positivo
    }
  });

  // Calcular el balance por mes
  for (const mes in totalesPorMes) {
    if (totalesPorMes.hasOwnProperty(mes)) {
      const { ganancias, gastos } = totalesPorMes[mes];
      totalesPorMes[mes].balance = ganancias - gastos;
    }
  }

  return totalesPorMes;
};
// Función para mostrar la tabla de Reportes
const mostrarTablaReportes = () => {
  const { categoria, montoTotal } = obtenerCategoriaConMayorGanancia();
  const { categoriaGastos, montoTotalGastos } = obtenerCategoriaConMayorGasto();
  const { categoriaBalance, balanceTotal } = obtenerCategoriaConMayorBalance();
  const { mes, montoTotalMes } = obtenerMesConMayorGanancia();
  const { mesGasto, montoTotalGastoMes } = obtenerMesConMayorGasto();
  const totalesPorCategoria = calcularTotalesPorCategoria();
  const totalesPorMes = calcularTotalesPorMes();
  const tablaReportesBody = document.getElementById("tablas-reportes");

  // Crear el HTML para la nueva fila
  tablaReportesBody.innerHTML = `
    <table class="w-full">
      <thead class="">
        <tr >
          <th class="font-bold text-xl text-black text-left py-3 lg:text-2xl">Resumen</th>
        </tr>
      </thead>
      <tbody class="">
        <tr class=" border border-slate-400  ">
          <td class="text-[#b240b8] text-sm font-bold ">Categoría con mayor ganancia</td>
          <td class="text-sm text-center" >${categoria}</td>
          <td class="text-sm text-center">$${montoTotal.toFixed(2)}</td>
        </tr>
        <tr class=" border border-slate-400 ">
          <td class="text-[#b240b8] text-sm font-bold">Categoria con mayor gasto</td>
          <td class="text-sm text-center">${categoriaGastos}</td>
          <td class="text-sm text-center">$${montoTotalGastos.toFixed(2)}</td>
        </tr>
        <tr class=" border border-slate-400 ">
          <td class="text-[#b240b8] text-sm font-bold ">Categoria con mayor balance</td>
          <td class="text-sm text-center">${categoriaBalance}</td>
          <td class="text-sm text-center">$${balanceTotal.toFixed(2)}</td>
        </tr>
        <tr class=" border border-slate-400 ">
          <td class="text-[#b240b8] text-sm font-bold ">Mes con mayor ganancia</td>
          <td class="text-sm text-center">${mes}</td>
          <td class="text-sm text-center">$${montoTotalMes.toFixed(2)}</td>
        </tr>
        <tr class=" border border-slate-400 ">
          <td class="text-[#b240b8] text-sm  font-bold ">Mes con mayor gasto</td>
          <td class="text-sm text-center">${mesGasto}</td>
         <td class="text-sm text-center">$${montoTotalGastoMes.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  `;
  // Crear el HTML para la tabla de totales por categoría
  let tablaTotalesPorCategoriaHTML = `
      <h3 class="font-bold text-xl text-black text-left py-3">Totales por categoría</h3>
      <table class="w-full">
        <thead class="text-[#b240b8] ">
          <tr class="   border border-slate-400  w-full">
            <th class="text-[#b240b8] text-sm  font-bold ">Categoría</th>
            <th class="text-[#b240b8] text-sm    font-bold ">Ganancias</th>
            <th class="text-[#b240b8] text-sm   font-bold ">Gastos</th>
            <th class="text-[#b240b8] text-sm   font-bold ">Balance</th>
          </tr>
        </thead>
        <tbody class="" >
    `;

  // Agregar filas para cada categoría
  for (const categoria in totalesPorCategoria) {
    if (totalesPorCategoria.hasOwnProperty(categoria)) {
      const { ganancias, gastos, balance } = totalesPorCategoria[categoria];
      tablaTotalesPorCategoriaHTML += `
          <tr class=" border border-slate-400  w-full">
            <td class="text-sm text-center ">${categoria}</td>
            <td class="text-sm text-center ">$${ganancias.toFixed(2)}</td>
            <td class="text-sm text-center ">$${gastos.toFixed(2)}</td>
            <td class="text-sm text-center " >$${balance.toFixed(2)}</td>
          </tr>
        `;
    }
  }

  // Cerrar la tabla
  tablaTotalesPorCategoriaHTML += `
        </tbody>
      </table>
    `;

  // Agregar la tabla de totales por categoría al final del cuerpo de la tabla de reportes
  tablaReportesBody.innerHTML += tablaTotalesPorCategoriaHTML;

  // Crear el HTML para la tabla de totales por mes
  let tablaTotalesPorMesHTML = `
  <h3 class="font-bold text-xl text-black text-left py-3">Totales por mes</h3>
  <table class="w-full">
    <thead class="text-[#b240b8] ">
      <tr class=" border border-slate-400 w-full">
        <th class="text-[#b240b8] text-sm   font-bold ">Mes</th>
        <th class="text-[#b240b8] text-sm  font-bold ">Ganancias</th>
        <th class="text-[#b240b8] text-sm   font-bold ">Gastos</th>
        <th class="text-[#b240b8] text-sm  font-bold ">Balance</th>
      </tr>
    </thead>
    <tbody>`;

  // Agregar filas para cada mes
  for (const mes in totalesPorMes) {
    if (totalesPorMes.hasOwnProperty(mes)) {
      const { ganancias, gastos, balance } = totalesPorMes[mes];
      tablaTotalesPorMesHTML += `
        <tr class=" border border-slate-400 ">
          <td class="text-sm text-center  ">${mes}</td>
          <td class="text-sm  text-center ">$${ganancias.toFixed(2)}</td>
          <td class="text-sm text-center  ">$${gastos.toFixed(2)}</td>
          <td class="text-sm  text-center ">$${balance.toFixed(2)}</td>
        </tr>`;
    }
  }

  // Cerrar la tabla
  tablaTotalesPorMesHTML += `
    </tbody>
  </table>`;

  // Agregar la tabla de totales por mes al final del cuerpo de la tabla de reportes
  tablaReportesBody.innerHTML += tablaTotalesPorMesHTML;
};
/////////////////////////////filtros////////////////////////////////////////////
const ocultarFitros = document.getElementById("ocultarFitros");
//let operacionFiltroFitros = [];

document.getElementById("ocultarFiltros").addEventListener("click", () => {
  const filtrosContenedor = document.getElementById("filtrosContenedor");
  if (filtrosContenedor.style.display === "block") {
    filtrosContenedor.style.display = "none";
  } else {
    filtrosContenedor.style.display = "block";
  }
});

const filtrarPorCategoriaYFecha = (
  objetos,
  categoriaSeleccionada,
  fechaSeleccionada
) => {
  return objetos.filter((objeto) => {
    const categoriaValida =
      categoriaSeleccionada === "Todas" ||
      objeto.Categoria === categoriaSeleccionada;
    const fechaValida =
      (!fechaSeleccionada || new Date(objeto.Fecha) >= fechaSeleccionada) &&
      (categoriaSeleccionada === "Todas" || categoriaValida);
    return fechaValida;
  });
};

const filtrarYGenerarTabla = (categoriaSeleccionada, fechaSeleccionada) => {
  const operacionesFiltradas = filtrarPorCategoriaYFecha(
    operaciones,
    categoriaSeleccionada,
    fechaSeleccionada
  );
  generarTabla(operacionesFiltradas);
};

// document.getElementById("selecBalance").addEventListener("change", function () {
//   const categoriaSeleccionada = this.value;
//   const filtroFechaInput = document.getElementById("filtro-fecha");
//   const fechaSeleccionada = filtroFechaInput.value
//     ? new Date(filtroFechaInput.value)
//     : null;
//   filtrarYGenerarTabla(categoriaSeleccionada, fechaSeleccionada);
// });

// const filtroFechaInput = document.getElementById("filtro-fecha");
// filtroFechaInput.addEventListener("change", function () {
//   const fechaSeleccionada = this.value ? new Date(this.value) : null;
//   const categoriaSeleccionada = document.getElementById("selecBalance").value;
//   filtrarYGenerarTabla(categoriaSeleccionada, fechaSeleccionada);
// });
document.getElementById("selecBalance").addEventListener("change", () => {
  const categoriaSeleccionada = document.getElementById("selecBalance").value;
  const filtroFechaInput = document.getElementById("filtro-fecha");
  const fechaSeleccionada = filtroFechaInput.value
    ? new Date(filtroFechaInput.value)
    : null;
  filtrarYGenerarTabla(categoriaSeleccionada, fechaSeleccionada);
});

const filtroFechaInput = document.getElementById("filtro-fecha");
filtroFechaInput.addEventListener("change", () => {
  const fechaSeleccionada = filtroFechaInput.value
    ? new Date(filtroFechaInput.value)
    : null;
  const categoriaSeleccionada = document.getElementById("selecBalance").value;
  filtrarYGenerarTabla(categoriaSeleccionada, fechaSeleccionada);
});

const filtrarOrdenar = (operaciones) => {
  const filtroSeleccionado = document.getElementById("filtro-ordenar").value;
  switch (filtroSeleccionado) {
    case "masRecientes":
      generarTabla(
        operaciones.sort((a, b) => new Date(a.Fecha) - new Date(b.Fecha))
      );
      break;
    case "MenosRecientes":
      generarTabla(
        operaciones.sort((a, b) => new Date(b.Fecha) - new Date(a.Fecha))
      );
      break;
    case "MayorMonto":
      generarTabla(operaciones.sort((a, b) => b.Monto - a.Monto));
      break;
    case "ManorMonto":
      generarTabla(operaciones.sort((a, b) => a.Monto - b.Monto));
      break;
    case "A/Z":
      generarTabla(
        operaciones.sort((a, b) => a.Descripcion.localeCompare(b.Descripcion))
      );
      break;
    case "Z/A":
      generarTabla(
        operaciones.sort((a, b) => b.Descripcion.localeCompare(a.Descripcion))
      );
      break;
  }
};

document.getElementById("filtro-ordenar").addEventListener("change", () => {
  filtrarOrdenar(JSON.parse(localStorage.getItem("tablaData")));
});

const cargarDatosIniciales = () => {
  const operaciones = JSON.parse(localStorage.getItem("tablaData")) || [];
  filtrarYGenerarTabla("Todas", null);
  filtrarOrdenar(operaciones);
};
const filtrarOperacionesTipo = (tipoOperacion) => {
  console.log(tipoOperacion);
  const operacionesTipo = operaciones.filter(
    (operacion) => operacion.tipo === tipoOperacion
  );
  generarTabla(evaluarLocalStorage(operacionesTipo));
};
const filtroTipo = document.getElementById("filtro-tipo");
filtroTipo.addEventListener("change", (e) => {
  filtrarOperacionesTipo(e.target.value);
});

window.addEventListener("load", cargarDatosIniciales);
