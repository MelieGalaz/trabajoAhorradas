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

      nuevaOperacion.classList.add("hidden");

      menuHambueguesa.classList.toggle("hidden");
    });

    document.getElementById(targetId).classList.remove("hidden");
  });
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

// const ArrayCategoria = [
//   "Comida",
//   "Servicios",
//   "Salidas",
//   "Educación",
//   "Transporte",
//   "Trabajo",
// ];

// const actualizarSelectores = () => {
//   const selecCat = document.getElementById("selecCat");
//   const selecBalance = document.getElementById("selecBalance");
//   selecCat.innerHTML = "";
//   selecBalance.innerHTML = "";

//   for (let categoria of ArrayCategoria) {
//     const optionCat = document.createElement("option");
//     optionCat.value = categoria;
//     optionCat.textContent = categoria;
//     selecCat.appendChild(optionCat);

//     const optionBalance = document.createElement("option");
//     optionBalance.value = categoria;
//     optionBalance.textContent = categoria;
//     selecBalance.appendChild(optionBalance);
//   }
// };

// const movimientoCategoria = () => {
//   const categoria = document.querySelector(".categoria");
//   let contenidoHTML = `
//     <div class="categoria flex justify-between mx-7 flex-col p-4 w-80 drop-shadow-lg bg-[#eae6f7] gap-5 mt-[23px] rounded-lg lg:w-3/5 lg:m-auto lg:mt-10">
//         <h2 class="text-3xl text-center font-bold lg:text-4xl">Categorías</h2>
//         <div>
//             <label for="agregarCategorias" class="text-xl">Nombre</label>
//             <div class="flex items-center lg:gap-6">
//                 <input type="text" id="agregarCategorias" class="w-48 h-10 rounded-lg lg:w-4/5">
//                 <button id="agregarCategoriaBtn" class="w-20 my-4 h-10 bg-green text-white bg-[#b240b8] hover:bg-[#c7adff] hover:text-[#050505] rounded-lg m-auto lg:w-28">Agregar</button>
//             </div>
//         </div>
//     `;

//   for (let i = 0; i < ArrayCategoria.length; i++) {
//     const cat = ArrayCategoria[i];
//     contenidoHTML += `
//         <div class="flex justify-between">
//             <p>${cat}</p>
//             <div class="flex gap-4">
//                 <a href="javascript:void(0)" class="text-blue-600 eliminar" data-index="${i}">Eliminar</a>
//                 <a href="javascript:void(0)" class="text-blue-600 editar" data-index="${i}">Editar</a>
//             </div>
//         </div>
//     `;
//   }

//   contenidoHTML += `</div>`;
//   categoria.innerHTML = contenidoHTML;

//   const agregarCategoriaBtn = document.getElementById("agregarCategoriaBtn");
//   agregarCategoriaBtn.addEventListener("click", () => {
//     const nuevaCategoriaInput = document.getElementById("agregarCategorias");
//     const nuevaCategoria = nuevaCategoriaInput.value.trim();
//     if (nuevaCategoria !== "") {
//       ArrayCategoria.push(nuevaCategoria);
//       actualizarSelectores();
//       movimientoCategoria();
//       nuevaCategoriaInput.value = "";
//     }
//   });

//   categoria.querySelectorAll(".eliminar").forEach((el) => {
//     el.addEventListener("click", (event) => {
//       event.preventDefault();
//       const index = parseInt(el.getAttribute("data-index"));
//       ArrayCategoria.splice(index, 1);
//       movimientoCategoria();
//       actualizarSelectores();
//     });
//   });

//   // Cuando se hace clic en el botón "Editar" de la categoría

//   categoria.querySelectorAll(".editar").forEach((el) => {
//     el.addEventListener("click", (event) => {
//       event.preventDefault();
//       const index = parseInt(el.getAttribute("data-index"));
//       const modal = document.getElementById("modal");
//       const nuevoNombreInput = document.getElementById("nuevoNombreInput");
//       const guardarNuevoNombre = document.getElementById("guardarNuevoNombre");
//       const categorias = document.getElementById("categorias");
//       // Mostrar la ventana modal
//       categorias.classList.add("hidden");
//       modal.classList.remove("hidden");

//       // Rellenar el campo de entrada con el nombre actual de la categoría
//       nuevoNombreInput.value = ArrayCategoria[index];

//       // Cuando se hace clic en el botón "Guardar"
//       guardarNuevoNombre.onclick = () => {
//         const nuevoNombre = nuevoNombreInput.value.trim();
//         if (nuevoNombre !== "") {
//           ArrayCategoria[index] = nuevoNombre;
//           modal.classList.add("hidden");
//           categorias.classList.remove("hidden"); // Ocultar la ventana modal
//           movimientoCategoria(); // Actualiza la lista de categorías
//           actualizarSelectores(); // Actualiza los selectores
//         }
//       };

//       // Cuando se hace clic en la 'x' para cerrar la ventana modal
//       modal.querySelector(".close").onclick = () => {
//         modal.classList.add("hidden");
//         categorias.classList.remove("hidden");
//         // Ocultar la ventana modal
//       };

//       // Cuando se hace clic fuera de la ventana modal, también se cierra
//       window.onclick = (event) => {
//         if (event.target === modal) {
//           modal.classList.add("hidden"); // Ocultar la ventana modal
//         }
//       };
//     });
//   });
// };

// movimientoCategoria();
// actualizarSelectores();

const categorias = {
  Comida: { id: uuidv4(), nombre: "Comida" },
  Servicios: { id: uuidv4(), nombre: "Servicios" },
  Salidas: { id: uuidv4(), nombre: "Salidas" },
  Educación: { id: uuidv4(), nombre: "Educación" },
  Transporte: { id: uuidv4(), nombre: "Transporte" },
  Trabajo: { id: uuidv4(), nombre: "Trabajo" },
};

const actualizarSelectores = () => {
  const selecCat = document.getElementById("selecCat");
  const selecBalance = document.getElementById("selecBalance");
  selecCat.innerHTML = "";
  selecBalance.innerHTML = "";

  for (let categoria in categorias) {
    const optionCat = document.createElement("option");
    optionCat.value = categorias[categoria].id;
    optionCat.textContent = categorias[categoria].nombre;
    selecCat.appendChild(optionCat);

    const optionBalance = document.createElement("option");
    optionBalance.value = categorias[categoria].id;
    optionBalance.textContent = categorias[categoria].nombre;
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
                <button id="agregarCategoriaBtn" class="w-20 my-4 h-10 bg-green text-white bg-[#b240b8] hover:bg-[#c7adff] hover:text-[#050505] rounded-lg m-auto lg:w-28">Agregar</button>
            </div>
        </div>
    `;

  for (let categoria in categorias) {
    contenidoHTML += `
        <div class="flex justify-between">
            <p>${categorias[categoria].nombre}</p>
            <div class="flex gap-4">
                <a href="javascript:void(0)" class="text-blue-600 eliminar" data-id="${categorias[categoria].id}">Eliminar</a>
                <a href="javascript:void(0)" class="text-blue-600 editar" data-id="${categorias[categoria].id}">Editar</a>
            </div>
        </div>
    `;
  }

  contenidoHTML += `</div>`;
  categoria.innerHTML = contenidoHTML;

  const agregarCategoriaBtn = document.getElementById("agregarCategoriaBtn");
  agregarCategoriaBtn.addEventListener("click", () => {
    const nuevaCategoriaInput = document.getElementById("agregarCategorias");
    const nuevaCategoriaNombre = nuevaCategoriaInput.value.trim();
    if (nuevaCategoriaNombre !== "") {
      const nuevaCategoriaId = uuidv4();
      categorias[nuevaCategoriaNombre] = {
        id: nuevaCategoriaId,
        nombre: nuevaCategoriaNombre,
      };
      actualizarSelectores();
      movimientoCategoria(); // Actualizar lista de categorías
      nuevaCategoriaInput.value = "";
    }
  });

  categoria.querySelectorAll(".eliminar").forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      const categoriaId = el.getAttribute("data-id");
      for (let nombreCategoria in categorias) {
        if (categorias[nombreCategoria].id === categoriaId) {
          delete categorias[nombreCategoria];
          break;
        }
      }
      movimientoCategoria(); // Actualizar lista de categorías
      actualizarSelectores();
    });
  });

  // Cuando se hace clic en el botón "Editar" de la categoría
  categoria.querySelectorAll(".editar").forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      const categoriaId = el.getAttribute("data-id");
      const modal = document.getElementById("modal");
      const nuevoNombreInput = document.getElementById("nuevoNombreInput");
      const guardarNuevoNombre = document.getElementById("guardarNuevoNombre");
      const categoriasContainer = document.getElementById("categorias");

      // Mostrar la ventana modal
      categoriasContainer.classList.add("hidden");
      modal.classList.remove("hidden");

      // Rellenar el campo de entrada con el nombre actual de la categoría
      for (let nombreCategoria in categorias) {
        if (categorias[nombreCategoria].id === categoriaId) {
          nuevoNombreInput.value = categorias[nombreCategoria].nombre;
          break;
        }
      }

      // Cuando se hace clic en el botón "Guardar"
      guardarNuevoNombre.onclick = () => {
        const nuevoNombre = nuevoNombreInput.value.trim();
        if (nuevoNombre !== "") {
          for (let nombreCategoria in categorias) {
            if (categorias[nombreCategoria].id === categoriaId) {
              categorias[nombreCategoria].nombre = nuevoNombre;
              break;
            }
          }
          modal.classList.add("hidden");
          categoriasContainer.classList.remove("hidden"); // Ocultar la ventana modal
          movimientoCategoria(); // Actualiza la lista de categorías
          actualizarSelectores(); // Actualiza los selectores
        }
      };

      // Cuando se hace clic en la 'x' para cerrar la ventana modal
      modal.querySelector(".close").onclick = () => {
        modal.classList.add("hidden");
        categoriasContainer.classList.remove("hidden");
        // Ocultar la ventana modal
      };

      // Cuando se hace clic fuera de la ventana modal, también se cierra
      window.onclick = (event) => {
        if (event.target === modal) {
          modal.classList.add("hidden"); // Ocultar la ventana modal
        }
      };
    });
  });
};

movimientoCategoria();
actualizarSelectores();
