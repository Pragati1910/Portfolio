// Navbar highlight on scroll
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
  let current = "";
  document.querySelectorAll("section").forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Contact form handling
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = contactForm.querySelector("input").value.trim();
    const message = contactForm.querySelector("textarea").value.trim();

    if (email && message) {
      alert("✅ Thanks for your message! I'll get back to you soon.");
      contactForm.reset();
    } else {
      alert("⚠️ Please fill all fields before submitting.");
    }
  });
}
