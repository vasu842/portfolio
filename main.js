// Scroll Reveal Animation Logic
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');

  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 80;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add('active');
    }
  }
}

// Event Listeners
window.addEventListener('scroll', revealOnScroll);
document.addEventListener('DOMContentLoaded', revealOnScroll);