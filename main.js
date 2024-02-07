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
    });
    // Mostrar la sección correspondiente al enlace clicado
    document.getElementById(targetId).classList.remove("hidden");
  });
});
