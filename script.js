document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     MOBILE NAVIGATION
  ========================== */

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", (event) => {
      event.preventDefault();

      navLinks.classList.toggle("active");
      menuToggle.classList.toggle("active");

    });

    // Close menu after clicking a navigation link
    navLinks.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
      });

    });

  }


  /* =========================
     ANIMATED GRID
  ========================== */

  const canvas = document.getElementById("gridCanvas");

  if (canvas) {

    const ctx = canvas.getContext("2d");

    let width;
    let height;
    let mouseX = 0;
    let mouseY = 0;

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    window.addEventListener("mousemove", (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    });

    function drawGrid() {

      ctx.clearRect(0, 0, width, height);

      const spacing = 55;

      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "rgba(147, 112, 219, 0.08)";

      for (let x = 0; x < width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = 0; y < height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const gradient = ctx.createRadialGradient(
        mouseX,
        mouseY,
        0,
        mouseX,
        mouseY,
        220
      );

      gradient.addColorStop(
        0,
        "rgba(147, 112, 219, 0.08)"
      );

      gradient.addColorStop(
        1,
        "rgba(147, 112, 219, 0)"
      );

      ctx.fillStyle = gradient;

      ctx.fillRect(
        mouseX - 220,
        mouseY - 220,
        440,
        440
      );

      requestAnimationFrame(drawGrid);
    }

    drawGrid();
  }


  /* =========================
     SCROLL REVEAL
  ========================== */

  const revealElements = document.querySelectorAll(
    ".section, .venture-card, .stat-card"
  );

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";

          observer.unobserve(entry.target);
        }

      });

    },
    {
      threshold: 0.08
    }
  );

  revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    element.style.transition =
      "opacity 0.8s ease, transform 0.8s ease";

    observer.observe(element);

  });

});