const $ = (selector) => document.querySelector(selector)

// const balance = document.getElementById("Balance");
// const reportes = document.getElementById("reportes");
// const categorias = document.getElementById("categorias");
// const nuevaOperacion = document.getElementById("nuevaOperacion");
// const aBalance = document.querySelector(".balance1");
// const aReportes = document.querySelector(".reportes1");
// const aCategorias = document.querySelector(".categorias1");

$("#navbar-responsive").addEventListener("click", () =>{
  $("#mobile-menu").classList.toggle("visible")
  $("#mobile-menu").classList.toggle("hidden")
})

$("#reportes").addEventListener("click", () => {
  $("#reportes").classList.toggle("visible")
  $("#Balance").classList.toggle("hidden")
})




