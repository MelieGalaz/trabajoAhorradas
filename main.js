//***********************cerrar y abrir secciones******************************************* */

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

const ArrayCategoria = [
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
  selecCat.innerHTML = "";
  selecBalance.innerHTML = "";

  for (let categoria of ArrayCategoria) {
    const optionCat = document.createElement("option");
    optionCat.value = categoria;
    optionCat.textContent = categoria;
    selecCat.appendChild(optionCat);

    const optionBalance = document.createElement("option");
    optionBalance.value = categoria;
    optionBalance.textContent = categoria;
    selecBalance.appendChild(optionBalance);
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

      // Cuando se hace clic en el botón "Guardar"
      guardarNuevoNombre.onclick = () => {
        const nuevoNombre = nuevoNombreInput.value.trim();
        if (nuevoNombre !== "") {
          ArrayCategoria[index] = nuevoNombre;
          modal.classList.add("hidden");
          categorias.classList.remove("hidden"); // Ocultar la ventana modal
          movimientoCategoria(); // Actualiza la lista de categorías
          actualizarSelectores(); // Actualiza los selectores
        }
      };

      // Cuando se hace clic en la 'x' para cerrar la ventana modal
      modal.querySelector(".close").onclick = () => {
        modal.classList.add("hidden");
        categorias.classList.remove("hidden");
        // Ocultar la ventana modal
      };

      // Cuando se hace clic fuera de la ventana modal, también se cierra
      window.onclick = (event) => {
        if (event.target === modal) {
          modal.classList.add("hidden");
          // Ocultar la ventana modal
        }
      };
    });
  });
};

movimientoCategoria();
actualizarSelectores();

document.addEventListener("DOMContentLoaded", () => {
  generarTabla();
});

document.getElementById("nuevaOperacion").addEventListener("submit", (e) => {
  e.preventDefault();

  // Variables que guardan los datos del objeto
  const descripcion = document.getElementById("descripcionForm").value;
  const categoria = document.getElementById("selecCat").value;
  const fecha = document.getElementById("fechaForm").value;
  const monto = document.getElementById("montoForm").value;

  // OBJETO
  const operacion = {
    id: uuidv4(), // Asegúrate de tener una función uuidv4() disponible o reemplázala por otra forma de generar un ID único
    Descripcion: descripcion,
    Categoria: categoria,
    Fecha: fecha,
    Monto: monto,
  };

  // Recuperar datos existentes de localStorage o inicializar un arreglo vacío
  let tablaData = evaluarLocalStorage();
  tablaData.push(operacion); // Agrega el objeto directamente

  // Actualizar localStorage
  localStorage.setItem("tablaData", JSON.stringify(tablaData));

  generarTabla();
});

const generarTabla = () => {
  const operacionesGuardadas = evaluarLocalStorage();
  const tableBody = document.getElementById("tabody-operaciones");
  tableBody.innerHTML = "";
  operacionesGuardadas.forEach((operacion) => {
    tableBody.innerHTML += `
      <tr>
          <td>${operacion.Descripcion}</td>
          <td>${operacion.Categoria}</td>
          <td>${operacion.Fecha}</td>
          <td>${operacion.Monto}</td>
          <td class="text-[#64c27b]"> 
            <button class="edit-btn" data-id="${operacion.id}"><i class="fi fi-sr-edit-alt"></i> </button>
            <button class="delete-btn" data-id="${operacion.id}"><i class="fi fi-sr-trash"></i> </button>
          </td>
      </tr>
    `;
  });
};

const evaluarLocalStorage = () => {
  return JSON.parse(localStorage.getItem("tablaData")) || [];
};

//boton de agregar al tocarlo lleva a balance
nuevaOperacion.querySelector(".nueva-operacion-agregar-btn").onclick = () => {
  nuevaOperacion.classList.add("hidden");
  const imagenOperaciones = document.querySelector(".imagen-operaciones");
  imagenOperaciones.classList.add("hidden");
  const tablaOperaciones = document.getElementById("tabla-data-operaciones");
  tablaOperaciones.classList.remove("hidden");
  Balance.classList.remove("hidden");
};
