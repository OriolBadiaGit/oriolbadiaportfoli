  const scrollTopBtn = document.getElementById("scrollTopBtn");

  // Mostrar el botó quan s’ha fet scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add("show");
    } else {
      scrollTopBtn.classList.remove("show");
    }
  });

  // Tornar amunt amb animació suau
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });