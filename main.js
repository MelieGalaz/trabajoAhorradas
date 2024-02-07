const balance = document.getElementById("Balance");
const reportes = document.getElementById("reportes");
const categorias = document.getElementById("categorias");
const nuevaOperacion = document.getElementById("nuevaOperacion");

reportes.addEventListener("click", () => {
  reportes.classList.remove("hidden");
  balance.classList.add("hidden");
  categorias.classList.add("hidden");
});

balance.addEventListener("click", () => {
  balance.classList.remove("hidden");
  categorias.classList.add("hidden");
  reportes.classList.add("hidden");
});

categorias.addEventListener("click", () => {
  categorias.classList.remove("hidden");
  balance.classList.add("hidden");
  reportes.classList.add("hidden");
});
