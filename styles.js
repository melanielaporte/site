
// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Navigation Links - Selectors
    const navLinks = document.querySelectorAll("nav a");
  
    // Event Listener Example
    navLinks.forEach(link => {
      link.addEventListener("click", event => {
        event.preventDefault(); // Prevent default anchor behavior
        const sectionId = event.target.getAttribute("href").substring(1); // Get target section
        const section = document.getElementById(sectionId);
  
        if (section) {
          section.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to section
        }
      });
    });
  
    console.log("JavaScript loaded and ready!");
  });