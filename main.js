/**********************cerrar y abrir secciones******************************************* */

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

let ArrayCategoria = JSON.parse(localStorage.getItem("categorias")) || [
	{ id: uuidv4(), nombre: "Comida" },
	{ id: uuidv4(), nombre: "Servicios" },
	{ id: uuidv4(), nombre: "Salidas" },
	{ id: uuidv4(), nombre: "Educación" },
	{ id: uuidv4(), nombre: "Transporte" },
	{ id: uuidv4(), nombre: "Trabajo" },
];

const actualizarSelectores = () => {
	const selecCat = document.getElementById("selecCat");
	const selecBalance = document.getElementById("selecBalance");
	const selecEditarOperacion = document.getElementById("selecEditarOperacion");

	selecCat.innerHTML = "";
	selecBalance.innerHTML = "";
	selecEditarOperacion.innerHTML = "";
	localStorage.setItem("categorias", JSON.stringify(ArrayCategoria));
	const optionTodas = document.createElement("option");
	optionTodas.value = "Todas";
	optionTodas.textContent = "Todas";
	selecBalance.appendChild(optionTodas);

	if (ArrayCategoria.length > 0) {
		for (let categoria of ArrayCategoria) {
			const optionCat = document.createElement("option");
			optionCat.value = categoria.nombre;
			optionCat.textContent = categoria.nombre;
			selecCat.appendChild(optionCat);

			const optionBalance = document.createElement("option");
			optionBalance.value = categoria.nombre;
			optionBalance.textContent = categoria.nombre;
			selecBalance.appendChild(optionBalance);

			const optionEditar = document.createElement("option");
			optionEditar.value = categoria.nombre;
			optionEditar.textContent = categoria.nombre;
			selecEditarOperacion.appendChild(optionEditar);
		}
	} else {
		console.warn("No hay categorías disponibles");
	}
};

const movimientoCategoria = () => {
	const categoria = document.querySelector(".categoria");
	let contenidoHTML = `
    <div class="categoria flex justify-between 
        flex-col p-4 w-80 drop-shadow-lg bg-[#eae6f7] dark:bg-[#3c2f66] gap-5 mt-[23px] rounded-lg lg:w-3/5 m-auto lg:mt-10">
        <h2 class="text-3xl text-center font-bold lg:text-4xl dark:text-white">Categorías</h2>
        <div>
            <label for="agregarCategorias" class="text-xl dark:text-white">Nombre</label>
            <div class="flex items-center lg:gap-6">
                <input type="text" placeholder="categoria" id="agregarCategorias" class="w-48 p-1 h-10 rounded-lg lg:w-4/5 dark:text-white dark:bg-[#7d6899]">
                <button id="agregarCategoriaBtn" class="w-20 my-4 h-10 bg-green text-white bg-[#b240b8] hover:bg-[#96e0a0] hover:text-[#050505] rounded-lg m-auto lg:w-28 dark:lg:hover:bg-[#7c6a94] dark:bg-[#5f4187] dark:text-[white]">Agregar</button>
            </div>
        </div>
    `;
	ArrayCategoria.forEach((cat) => {
		contenidoHTML += `
        <div class="flex justify-between">
            <p class="dark:text-[white]">${cat.nombre}</p>
            <div class="flex gap-2">
                <a href="javascript:void(0)" class="flex gap-1 text-green-500 text-sm eliminar dark:text-[#1e7020]" data-id="${cat.id}">
                    <i class="fi fi-sr-trash"></i>Eliminar</a>
                <a href="javascript:void(0)" class="flex gap-1 text-green-500 text-sm editar dark:text-[#1e7020]" data-id="${cat.id}">
                    <i class="fi fi-sr-edit-alt"></i>Editar</a>
            </div>
        </div>
        `;
	});

	contenidoHTML += `</div>`;
	categoria.innerHTML = contenidoHTML;
	const agregarCategoriaBtn = document.getElementById("agregarCategoriaBtn");
	agregarCategoriaBtn.addEventListener("click", () => {
		const nuevaCategoriaInput = document.getElementById("agregarCategorias");
		const nuevaCategoria = nuevaCategoriaInput.value.trim();

		if (nuevaCategoria === "") {
			alert("El nombre de la categoría no puede estar vacío.");
		} else {
			const newId = uuidv4();
			ArrayCategoria.push({ id: newId, nombre: nuevaCategoria });
			localStorage.setItem("categorias", JSON.stringify(ArrayCategoria));
			movimientoCategoria();
			nuevaCategoriaInput.value = "";
		}
		actualizarSelectores();
	});

	categoria.querySelectorAll(".eliminar").forEach((el) => {
		el.addEventListener("click", (event) => {
			event.preventDefault();
			const id = el.getAttribute("data-id");
			const categoriaAEliminar = ArrayCategoria.find((cat) => cat.id === id);

			if (!categoriaAEliminar) {
				console.error(`Categoría con ID ${id} no encontrada.`);
				return;
			}

			const modalEliminar = document.getElementById("modal-eliminar");
			const eliminarCategoria = document.getElementById("eliminarCategoria");

			eliminarCategoria.textContent = categoriaAEliminar.nombre;

			modalEliminar.classList.remove("hidden");
			categoria.classList.add("hidden");

			document
				.getElementById("eliminarCategoriaBtn")
				.addEventListener("click", () => {
					ArrayCategoria = ArrayCategoria.filter((cat) => cat.id !== id);
					localStorage.setItem("categorias", JSON.stringify(ArrayCategoria));
					movimientoCategoria();

					modalEliminar.classList.add("hidden");
					categoria.classList.remove("hidden");
				});
			document
				.querySelector(".modal-btn-close")
				.addEventListener("click", () => {
					modalEliminar.classList.add("hidden");
					categoria.classList.remove("hidden");
				});
			document.querySelector(".modal-close").addEventListener("click", () => {
				modalEliminar.classList.add("hidden");
				categoria.classList.remove("hidden");
			});
		});
		actualizarSelectores();
	});

	categoria.querySelectorAll(".editar").forEach((el) => {
		el.addEventListener("click", (event) => {
			event.preventDefault();
			const id = el.getAttribute("data-id");

			const categoriaAEditar = ArrayCategoria.find((cat) => cat.id === id);

			if (!categoriaAEditar) {
				console.error(`Categoría con ID ${id} no encontrada.`);
				return;
			}

			const modal = document.getElementById("modal");
			const nuevoNombreInput = document.getElementById("nuevoNombreInput");

			categoria.classList.add("hidden");
			modal.classList.remove("hidden");

			nuevoNombreInput.value = categoriaAEditar.nombre;

			const nuevoGuardarBtn = document.getElementById("guardarNuevoNombre");
			nuevoGuardarBtn.replaceWith(nuevoGuardarBtn.cloneNode(true));
			const nuevoBtn = document.getElementById("guardarNuevoNombre");

			nuevoBtn.addEventListener("click", () => {
				const nuevoNombre = nuevoNombreInput.value.trim();
				if (nuevoNombre !== "") {
					categoriaAEditar.nombre = nuevoNombre;
					localStorage.setItem("categorias", JSON.stringify(ArrayCategoria));
					modal.classList.add("hidden");
					categoria.classList.remove("hidden");
					movimientoCategoria();
				}
			});

			modal.querySelector(".close").addEventListener("click", () => {
				modal.classList.add("hidden");
				categoria.classList.remove("hidden");
			});
		});
		actualizarSelectores();
	});
};
document.addEventListener("DOMContentLoaded", () => {
	movimientoCategoria();
	actualizarSelectores();
});

document.addEventListener("DOMContentLoaded", () => {
	generarTabla(evaluarLocalStorage());
});

const guardarTablaEnLocalStorage = (tablaData) => {
	localStorage.setItem("tablaData", JSON.stringify(tablaData));
};
const operaciones = JSON.parse(localStorage.getItem("tablaData")) || [];

const actualizarInterfaz = () => {
	const tablaData = evaluarLocalStorage();
	const imagenReportes = document.getElementById("imagen-reportes");
	const tablaReportes = document.getElementById("tablas-reportes");
	if (tablaData.length > 0) {
		imagenReportes.classList.add("hidden");
		tablaReportes.classList.remove("hidden");
		mostrarTablaReportes();
	} else {
		imagenReportes.classList.remove("hidden");
		tablaReportes.classList.add("hidden");
	}
};

window.addEventListener("load", actualizarInterfaz);

const imagenOperaciones = document.querySelector(".imagen-operaciones");
const tablaOperaciones = document.getElementById("tabla-data-operaciones");
const eliminarOperacion = (id) => {
	let tablaData = evaluarLocalStorage();
	tablaData = tablaData.filter((operacion) => operacion.id !== id);
	localStorage.removeItem("tablaData");
	localStorage.setItem("tablaData", JSON.stringify(tablaData));
	if (tablaData.length !== 0) {
		generarTabla(evaluarLocalStorage());
	} else {
		const imagenVista = () => {
			imagenOperaciones.classList.remove("hidden");
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
		const descripcion = document.getElementById("descripcionForm").value;
		const categoria = document.getElementById("selecCat").value;
		const fecha = document.getElementById("fechaForm").value;
		const monto = parseFloat(document.getElementById("montoForm").value);
		const tipo = document.getElementById("tipo-gasto-ganancia").value;

		const mantenerOperacion = () => {
			document.getElementById("Balance").classList.add("hidden");
			document.getElementById("nuevaOperacion").classList.remove("hidden");
		};

		if (descripcion.trim() === "") {
			document.getElementById("error-descripcion").classList.remove("hidden");
			mantenerOperacion();
		}
		if (isNaN(monto) || monto === "") {
			document.getElementById("error-monto").classList.remove("hidden");
			mantenerOperacion();
		}
		if (fecha.trim() === "") {
			document.getElementById("error-fecha").classList.remove("hidden");
			mantenerOperacion();
		}
		if (
			descripcion.trim() === "" ||
			fecha.trim() === "" ||
			isNaN(monto) ||
			monto === ""
		) {
			return;
		}

		document.getElementById("error-descripcion").classList.add("hidden");
		document.getElementById("error-monto").classList.add("hidden");
		document.getElementById("error-fecha").classList.add("hidden");
		const tipoMonto = (tipo, monto) => {
			if (tipo === "Gastos") {
				return -monto;
			} else {
				return monto;
			}
		};
		const operacion = {
			id: uuidv4(),
			Descripcion: descripcion,
			Categoria: categoria,
			Fecha: fecha,
			Monto: tipoMonto(tipo, monto),
		};
		let tablaData = evaluarLocalStorage();
		tablaData.push(operacion);

		localStorage.setItem("tablaData", JSON.stringify(tablaData));
		generarTabla(evaluarLocalStorage());

		actualizarBalance();
		mostrarTablaReportes();
		document.getElementById("nuevaOperacionForm").reset();
	});

function generarTabla(operaciones) {
	const tableBody = document.getElementById("tabody-operaciones");
	tableBody.innerHTML = "";
	operaciones.forEach((operacion) => {
		tableBody.innerHTML += `
      <tr class="border border-slate-400">
          <td class="text-center text-xs lg:text-base dark:text-[white]">${
						operacion.Descripcion
					}</td>
          <td class="text-center text-xs lg:text-base dark:text-[white]">${
						operacion.Categoria
					}</td>
          <td class="text-center text-xs hidden lg:block lg:text-base dark:text-[white]">${fechaFormateada(
						operacion.Fecha
					)}</td>
          <td class="text-center text-xs lg:text-base dark:text-[white]" >${
						operacion.Monto
					}</td>
          <td class="text-[#64c27b] dark:text-[#1e7020] flex justify-center gap-2 text-xs lg:text-base"> 
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

	const llenarFormularioEdicion = (operacion) => {
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
	tableBody.querySelectorAll(".edit-btn").forEach((el) => {
		el.addEventListener("click", (event) => {
			event.preventDefault();
			EditarOperacion.classList.remove("hidden");
			Balance.classList.add("hidden");
			const idOperacion = el.getAttribute("data-id");

			const operacionSeleccionada = obtenerValoresDeTabla(idOperacion);
			llenarFormularioEdicion(operacionSeleccionada);
		});
	});

	const editarOperacion = () => {
		const idOperacion = document
			.getElementById("editarOperacionBtn")
			.getAttribute("data-id");

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
		const mantenerEditarOperacion = () => {
			document.getElementById("Balance").classList.add("hidden");
			document.getElementById("EditarOperacion").classList.remove("hidden");
		};

		if (tipoSeleccionado.trim() === "") {
			document.getElementById("error-editarTipo").classList.remove("hidden");
			mantenerEditarOperacion();
		}
		if (nuevaDescripcion.trim() === "") {
			document
				.getElementById("error-editarDescripcion")
				.classList.remove("hidden");
			mantenerEditarOperacion();
		}
		if (nuevaFecha.trim() === "") {
			document.getElementById("error-editarFecha").classList.remove("hidden");
			mantenerEditarOperacion();
		}
		if (isNaN(nuevoMonto) || nuevoMonto === "") {
			document
				.getElementById("error-editarNuevoMonto")
				.classList.remove("hidden");
			mantenerEditarOperacion();
		}
		if (
			tipoSeleccionado.trim() === "" ||
			nuevaDescripcion.trim() === "" ||
			nuevaFecha.trim() === "" ||
			isNaN(nuevoMonto) ||
			nuevoMonto === ""
		) {
			return;
		}
		const nuevoMontoConSigno =
			tipoSeleccionado === "Gastos"
				? -Math.abs(nuevoMonto)
				: Math.abs(nuevoMonto);

		console.log("Tipo seleccionado:", tipoSeleccionado);
		console.log("Monto con signo:", nuevoMontoConSigno);

		const tableRows = document.querySelectorAll("#tabody-operaciones tr");
		tableRows.forEach((row) => {
			const id = row.querySelector(".edit-btn")?.getAttribute("data-id");

			if (id === idOperacion && row.cells.length >= 4) {
				row.cells[0].textContent = nuevaDescripcion;
				row.cells[1].textContent = nuevaCategoria;
				row.cells[2].textContent = fechaFormateada(nuevaFecha);
				row.cells[3].textContent = nuevoMontoConSigno;
			}
		});

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
		localStorage.setItem("tablaData", JSON.stringify(operacionesGuardadas));

		document.getElementById("EditarOperacion").classList.add("hidden");
		Balance.classList.remove("hidden");

		actualizarBalance();
	};

	document
		.getElementById("editarOperacionBtn")
		.addEventListener("click", (event) => {
			event.preventDefault();
			editarOperacion();
		});

	document
		.getElementById("cancelar_editar_operacion")
		.addEventListener("click", () => {
			EditarOperacion.classList.add("hidden");

			Balance.classList.remove("hidden");
		});

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
			Balance.classList.remove("hidden");
		});
}

const evaluarLocalStorage = () => {
	return JSON.parse(localStorage.getItem("tablaData")) || [];
};

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
	const imagenOperacionesHidden = localStorage.getItem(
		"imagenOperacionesHidden"
	);
	if (imagenOperacionesHidden === "true") {
		document.querySelector(".imagen-operaciones").classList.add("hidden");
		const tablaOperaciones = document.getElementById("tabla-data-operaciones");
		tablaOperaciones.classList.remove("hidden");
	}
});

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
  <p class="text-xl dark:text-white">Ganancias</p>
  <p class="text-xl text-[green] dark:text-[#558a69]">$${ganancias.toFixed(
		2
	)}</p>
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
  <p class="text-xl dark:text-white">Gastos</p>
  <p class="text-xl text-[red] dark:text-[#8a5160]">$${Math.abs(gastos).toFixed(
		2
	)}</p>
</div>`;
	const balanceTotal = ganancias + gastos;
	document.getElementById(
		"balance-total"
	).innerHTML = `<div id="balance-total" class="total flex w-72 lg:w-80 p-2   justify-between ">
  <p class="text-xl dark:text-white">Total</p>
  <p class="text-xl font-bold dark:text-white">$${balanceTotal.toFixed(2)}</p>
</div>`;
};

window.addEventListener("load", actualizarBalance);

function fechaFormateada(f) {
	let fc = new Date(f);
	let ff;
	let dia = fc.getDate();
	let mes = fc.getMonth() + 1;
	let anio = fc.getFullYear();
	ff = `${dia < 10 ? "0" + dia : dia}-${mes < 10 ? "0" + mes : mes}-${anio}`;
	return ff;
}

const obtenerCategoriaConMayorGanancia = () => {
	const operacionesGuardadas = evaluarLocalStorage();
	const gananciasPorCategoria = {};
	const imagenReportes = document.getElementById("imagen-reportes");
	const tablaReportes = document.getElementById("tablas-reportes");
	imagenReportes.classList.add("hidden");
	tablaReportes.classList.remove("hidden");

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

const obtenerCategoriaConMayorGasto = () => {
	const operacionesGuardadas = evaluarLocalStorage();
	const gastosPorCategoria = {};
	const imagenReportes = document.getElementById("imagen-reportes");
	const tablaReportes = document.getElementById("tablas-reportes");
	imagenReportes.classList.add("hidden");
	tablaReportes.classList.remove("hidden");

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

const obtenerCategoriaConMayorBalance = () => {
	const operacionesGuardadas = evaluarLocalStorage();
	const balancePorCategoria = {};
	const imagenReportes = document.getElementById("imagen-reportes");
	const tablaReportes = document.getElementById("tablas-reportes");
	imagenReportes.classList.add("hidden");
	tablaReportes.classList.remove("hidden");

	operacionesGuardadas.forEach((operacion) => {
		if (!balancePorCategoria[operacion.Categoria]) {
			balancePorCategoria[operacion.Categoria] = 0;
		}
		balancePorCategoria[operacion.Categoria] += operacion.Monto;
	});
	let categoriaMayorBalance;
	let mayorBalance = Infinity;
	for (const categoria in balancePorCategoria) {
		if (balancePorCategoria.hasOwnProperty(categoria)) {
			const balance = balancePorCategoria[categoria];
			const distanciaBalance = Math.abs(balance);
			if (distanciaBalance < mayorBalance) {
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

const obtenerMesConMayorGanancia = () => {
	const operacionesGuardadas = evaluarLocalStorage();
	const gananciasPorMes = {};

	operacionesGuardadas.forEach((operacion) => {
		const fecha = new Date(operacion.Fecha);
		const mes = fecha.getMonth() + 1;

		if (operacion.Monto > 0) {
			if (!gananciasPorMes[mes]) {
				gananciasPorMes[mes] = 0;
			}
			gananciasPorMes[mes] += operacion.Monto;
		}
	});

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

const obtenerMesConMayorGasto = () => {
	const operacionesGuardadas = evaluarLocalStorage();
	const gastosPorMes = {};
	operacionesGuardadas.forEach((operacion) => {
		const fecha = new Date(operacion.Fecha);
		const mes = fecha.getMonth() + 1;

		if (operacion.Monto < 0) {
			if (!gastosPorMes[mes]) {
				gastosPorMes[mes] = 0;
			}
			gastosPorMes[mes] += Math.abs(operacion.Monto);
		}
	});
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

const calcularTotalesPorCategoria = () => {
	const operacionesGuardadas = evaluarLocalStorage();
	const totalesPorCategoria = {};

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
			totalesPorCategoria[operacion.Categoria].gastos -= operacion.Monto;
		}
	});

	for (const categoria in totalesPorCategoria) {
		if (totalesPorCategoria.hasOwnProperty(categoria)) {
			const { ganancias, gastos } = totalesPorCategoria[categoria];
			totalesPorCategoria[categoria].balance = ganancias - gastos;
		}
	}

	return totalesPorCategoria;
};

const calcularTotalesPorMes = () => {
	const operacionesGuardadas = evaluarLocalStorage();
	const totalesPorMes = {};
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
			totalesPorMes[mes].gastos -= operacion.Monto;
		}
	});

	for (const mes in totalesPorMes) {
		if (totalesPorMes.hasOwnProperty(mes)) {
			const { ganancias, gastos } = totalesPorMes[mes];
			totalesPorMes[mes].balance = ganancias - gastos;
		}
	}

	return totalesPorMes;
};

const nombresMeses = [
	"Enero",
	"Febrero",
	"Marzo",
	"Abril",
	"Mayo",
	"Junio",
	"Julio",
	"Agosto",
	"Septiembre",
	"Octubre",
	"Noviembre",
	"Diciembre",
];
const mostrarTablaReportes = () => {
	const { categoria, montoTotal } = obtenerCategoriaConMayorGanancia();
	const { categoriaGastos, montoTotalGastos } = obtenerCategoriaConMayorGasto();
	const { categoriaBalance, balanceTotal } = obtenerCategoriaConMayorBalance();
	const { mes, montoTotalMes } = obtenerMesConMayorGanancia();
	const { mesGasto, montoTotalGastoMes } = obtenerMesConMayorGasto();
	const totalesPorCategoria = calcularTotalesPorCategoria();
	const totalesPorMes = calcularTotalesPorMes();
	const tablaReportesBody = document.getElementById("tablas-reportes");

	tablaReportesBody.innerHTML = `
    <table class="w-full">
      <thead class="">
        <tr>
          <th class="font-bold text-xl text-black text-left py-3 lg:text-2xl dark:text-white">Resumen</th>
        </tr>
      </thead>
      <tbody class="">
        <tr class="border border-slate-400">
          <td class="text-[#b240b8] text-sm font-bold dark:text-white">Categoría con mayor ganancia</td>
          <td class="text-sm text-center dark:text-white">${
						categoria || "-"
					}</td>
          <td class="text-sm text-center dark:text-white">$${
						montoTotal !== undefined ? montoTotal.toFixed(2) : "0.00"
					}</td>
        </tr>
        <tr class="border border-slate-400">
          <td class="text-[#b240b8] text-sm font-bold dark:text-white">Categoría con mayor gasto</td>
          <td class="text-sm text-center dark:text-white">${
						categoriaGastos || "-"
					}</td>
          <td class="text-sm text-center dark:text-white">$${
						montoTotalGastos !== undefined
							? montoTotalGastos.toFixed(2)
							: "0.00"
					}</td>
        </tr>
        <tr class="border border-slate-400">
          <td class="text-[#b240b8] text-sm font-bold dark:text-white">Categoría con mayor balance</td>
          <td class="text-sm text-center dark:text-white">${
						categoriaBalance || "-"
					}</td>
          <td class="text-sm text-center dark:text-white">$${
						balanceTotal !== undefined ? balanceTotal.toFixed(2) : "0.00"
					}</td>
        </tr>
        <tr class="border border-slate-400">
          <td class="text-[#b240b8] text-sm font-bold dark:text-white">Mes con mayor ganancia</td>
          <td class="text-sm text-center dark:text-white">${
						nombresMeses[mes - 1] || "-"
					}</td>
          <td class="text-sm text-center dark:text-white">$${
						montoTotalMes !== undefined ? montoTotalMes.toFixed(2) : "0.00"
					}</td>
        </tr>
        <tr class="border border-slate-400">
          <td class="text-[#b240b8] text-sm font-bold dark:text-white">Mes con mayor gasto</td>
          <td class="text-sm text-center dark:text-white">${
						nombresMeses[mesGasto - 1] || "-"
					}</td>
          <td class="text-sm text-center dark:text-white">$${
						montoTotalGastoMes !== undefined
							? montoTotalGastoMes.toFixed(2)
							: "0.00"
					}</td>
        </tr>
      </tbody>
    </table>
`;

	let tablaTotalesPorCategoriaHTML = `
    <h3 class="font-bold text-xl text-black text-left py-3 dark:text-white">Totales por categoría</h3>
    <table class="w-full">
      <thead class="text-[#b240b8] ">
        <tr class="border border-slate-400 w-full">
          <th class="text-[#b240b8] text-sm font-bold dark:text-white">Categoría</th>
          <th class="text-[#b240b8] text-sm font-bold dark:text-white">Ganancias</th>
          <th class="text-[#b240b8] text-sm font-bold dark:text-white">Gastos</th>
          <th class="text-[#b240b8] text-sm font-bold dark:text-white">Balance</th>
        </tr>
      </thead>
      <tbody class="">
`;

	for (const categoria in totalesPorCategoria) {
		if (totalesPorCategoria.hasOwnProperty(categoria)) {
			const { ganancias, gastos, balance } = totalesPorCategoria[categoria];
			tablaTotalesPorCategoriaHTML += `
        <tr class="border border-slate-400 w-full">
            <td class="text-sm text-center dark:text-white">${
							categoria || "-"
						}</td>
            <td class="text-sm text-center dark:text-white">$${
							ganancias !== undefined ? ganancias.toFixed(2) : "0.00"
						}</td>
            <td class="text-sm text-center dark:text-white">$${
							gastos !== undefined ? gastos.toFixed(2) : "0.00"
						}</td>
            <td class="text-sm text-center dark:text-white">$${
							balance !== undefined ? balance.toFixed(2) : "0.00"
						}</td>
        </tr>
        `;
		}
	}

	tablaTotalesPorCategoriaHTML += `
        </tbody>
    </table>
`;
	tablaReportesBody.innerHTML += tablaTotalesPorCategoriaHTML;
	let tablaTotalesPorMesHTML = `
    <h3 class="font-bold text-xl text-black text-left py-3 dark:text-white">Totales por mes</h3>
    <table class="w-full">
      <thead class="text-[#b240b8] ">
        <tr class="border border-slate-400 w-full">
          <th class="text-[#b240b8] text-sm font-bold dark:text-white">Mes</th>
          <th class="text-[#b240b8] text-sm font-bold dark:text-white">Ganancias</th>
          <th class="text-[#b240b8] text-sm font-bold dark:text-white">Gastos</th>
          <th class="text-[#b240b8] text-sm font-bold dark:text-white">Balance</th>
        </tr>
      </thead>
      <tbody>
`;

	for (const mes in totalesPorMes) {
		if (totalesPorMes.hasOwnProperty(mes)) {
			const { ganancias, gastos, balance } = totalesPorMes[mes];
			tablaTotalesPorMesHTML += `
        <tr class="border border-slate-400">
          <td class="text-sm text-center dark:text-white">${mes || "-"}</td>
          <td class="text-sm text-center dark:text-white">$${
						ganancias !== undefined ? ganancias.toFixed(2) : "0.00"
					}</td>
          <td class="text-sm text-center dark:text-white">$${
						gastos !== undefined ? gastos.toFixed(2) : "0.00"
					}</td>
          <td class="text-sm text-center dark:text-white">$${
						balance !== undefined ? balance.toFixed(2) : "0.00"
					}</td>
        </tr>`;
		}
	}

	tablaTotalesPorMesHTML += `
    </tbody>
  </table>`;

	tablaReportesBody.innerHTML += tablaTotalesPorMesHTML;
};
const ocultarFitros = document.getElementById("ocultarFitros");

document.getElementById("ocultarFiltros").addEventListener("click", () => {
	const filtrosContenedor = document.getElementById("filtrosContenedor");
	const boton = document.getElementById("ocultarFiltros");

	if (
		filtrosContenedor.style.display === "block" ||
		filtrosContenedor.style.display === ""
	) {
		filtrosContenedor.style.display = "none";
		boton.textContent = "Ver filtros";
	} else {
		filtrosContenedor.style.display = "block";
		boton.textContent = "Ocultar filtros";
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
	if (operacionesFiltradas.length === 0) {
		imagenOperaciones.classList.remove("hidden");
		tablaOperaciones.classList.add("hidden");
	} else {
		generarTabla(operacionesFiltradas);
		tablaOperaciones.classList.remove("hidden");
		imagenOperaciones.classList.add("hidden");
	}
};

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
				operaciones.sort((a, b) => new Date(b.Fecha) - new Date(a.Fecha))
			);
			break;
		case "MenosRecientes":
			generarTabla(
				operaciones.sort((a, b) => new Date(a.Fecha) - new Date(b.Fecha))
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
	const operaciones = JSON.parse(localStorage.getItem("tablaData")) || [];
	let operacionesFiltradas = [];

	if (tipoOperacion === "gastos") {
		operacionesFiltradas = operaciones.filter(
			(operacion) => parseFloat(operacion.Monto) < 0
		);
	} else if (tipoOperacion === "ganancias") {
		operacionesFiltradas = operaciones.filter(
			(operacion) => parseFloat(operacion.Monto) > 0
		);
	} else {
		operacionesFiltradas = operaciones;
	}

	if (operacionesFiltradas.length === 0) {
		imagenOperaciones.classList.remove("hidden");
		tablaOperaciones.classList.add("hidden");
	} else {
		generarTabla(operacionesFiltradas);
		imagenOperaciones.classList.add("hidden");
		tablaOperaciones.classList.remove("hidden");
	}
};

const filtroTipo = document.getElementById("filtro-tipo");
filtroTipo.addEventListener("change", (e) => {
	const tipoSeleccionado = e.target.value;
	filtrarOperacionesTipo(tipoSeleccionado);
});

const htmlElement = document.querySelector("html");
const toogleButton = document.getElementById("btn-claro-oscuro");
const toogleButton2 = document.getElementById("btn-claro-oscuro2");
toogleButton.addEventListener("click", () => {
	if (document.documentElement.classList.toggle("dark")) {
		toogleButton.innerHTML =
			'<i class="fa-solid fa-sun text-yellow-600 text-lg"></i>';
	} else {
		toogleButton.innerHTML =
			'<i class="fa-solid fa-moon text-blue-600 text-lg"></i>';
	}
});
toogleButton2.addEventListener("click", () => {
	if (document.documentElement.classList.toggle("dark")) {
		toogleButton2.innerHTML =
			'<i class="fa-solid fa-sun text-yellow-600 text-lg"></i>';
	} else {
		toogleButton2.innerHTML =
			'<i class="fa-solid fa-moon text-blue-600 text-lg"></i>';
	}
});
