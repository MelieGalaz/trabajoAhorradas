//***********************cerrar y abrir secciones******************************************* */

const sections = ["Balance", "reportes", "categorias"];

// Ocultar todas las secciones excepto la de Balance al cargar la página
sections.forEach((sectionId) => {
  const section = document.getElementById(sectionId);
  if (sectionId !== "Balance") {
    section.classList.add("hidden");
  }
});

// Agregar event listeners para cada enlace del menú
const menuLinks = document.querySelectorAll("nav a");
menuLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = event.target.getAttribute("href").substring(1);
    // Ocultar todas las secciones
    sections.forEach((sectionId) => {
      document.getElementById(sectionId).classList.add("hidden");
      //oculta nueva operacion si se hace click en alguna sección
      nuevaOperacion.classList.add("hidden");
      // //oculta el menu hamburguesa si se hace click en alguna sección
      menuHambueguesa.classList.toggle("hidden");
    });
    // Mostrar la sección correspondiente al enlace clicado
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

  // Limpiar opciones existentes
  selecCat.innerHTML = "";
  selecBalance.innerHTML = "";

  // Agregar la opción "Todas" al selector de balance
  const optionTodas = document.createElement("option");
  optionTodas.value = "";
  optionTodas.textContent = "Todas";
  selecBalance.appendChild(optionTodas);

  // Agregar las opciones de categorías a ambos selectores
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
                <button id="agregarCategoriaBtn" class="w-20 my-4 h-10 bg-green text-white bg-[#b240b8] hover:bg-[#c7adff] hover:text-[#050505] rounded-lg m-auto lg:w-28">Agregar</button>
            </div>
        </div>
    `;

  for (let cat of ArrayCategoria) {
    contenidoHTML += `
        <div class="flex justify-between">
            <p>${cat}</p>
            <div class="flex gap-4">
                <a href="" class="text-blue-600">Editar</a>
                <a href="" class="text-blue-600">Eliminar</a>
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
      actualizarSelectores(); // Actualiza los selectores
      movimientoCategoria(); // Actualiza la lista de categorías
      nuevaCategoriaInput.value = ""; // Limpia el input después de agregar la categoría
    }
  });
};
actualizarSelectores();
movimientoCategoria();
