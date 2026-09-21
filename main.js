// Reveal elements on scroll
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');

  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 100;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add('active');
    }
  }
}

// Attach event listener to scroll
window.addEventListener('scroll', revealOnScroll);

// Initial check on page load
document.addEventListener('DOMContentLoaded', revealOnScroll);