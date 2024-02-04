const balance = document.getElementById("Balance");
const reportes = document.getElementById("reportes");
const categorias = document.getElementById("categorias");
const nuevaOperacion = document.getElementById("nuevaOperacion");
const aBalance = document.querySelector(".balance1");
const aReportes = document.querySelector(".reportes1");
const aCategorias = document.querySelector(".categorias1");

aReportes.addEventListener("click", () => {
  reportes.classList.remove("hidden");
  balance.classList.add("hidden");
  categorias.classList.add("hidden");
});

aBalance.addEventListener("click", () => {
  balance.classList.remove("hidden");
  categorias.classList.add("hidden");
  reportes.classList.add("hidden");
});

aCategorias.addEventListener("click", () => {
  categorias.classList.remove("hidden");
  balance.classList.add("hidden");
  reportes.classList.add("hidden");
});
