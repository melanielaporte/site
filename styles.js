document.addEventListener("DOMContentLoaded", function() {
  // Smooth scrolling for navigation
  document.querySelectorAll('nav a').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });

  // Fade-in effect for sections on scroll
  const sections = document.querySelectorAll("section");
  const options = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };
  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add("visible");
          }
      });
  }, options);
  
  sections.forEach(section => observer.observe(section));

  // Dynamic portfolio hover effect
  document.querySelectorAll(".project").forEach(project => {
      project.addEventListener("mouseover", () => {
          project.style.transform = "scale(1.05)";
          project.style.transition = "transform 0.3s ease-in-out";
      });
      project.addEventListener("mouseout", () => {
          project.style.transform = "scale(1)";
      });
  });

  // Add a dynamic background color change to header on scroll
  window.addEventListener("scroll", () => {
      const header = document.querySelector("header");
      if (window.scrollY > 100) {
          header.style.background = "linear-gradient(135deg, #ff9a9e, #fad0c4, #FFB6C1)";
      } else {
          header.style.background = "linear-gradient(135deg, #ff9a9e, #fad0c4)";
      }
  });
});
