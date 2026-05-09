// Smooth scroll for nav links
document.querySelectorAll('.nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Add fade-in animation on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 1s, transform 1s';
  observer.observe(section);
});

// Nav underline animation
const navLinks = document.querySelectorAll('.nav li');
const sections = document.querySelectorAll('section[id], footer[id]');
const underline = document.querySelector('.nav-underline');

const sectionMap = {
  '#inicio': 0,
  '#sobre': 1,
  '#encontro': 2,
  '#servir': 3,
  '#apoio': 4,
  '#contato': 5
};

sections.forEach((section) => {
  const id = '#' + section.id;
  const index = sectionMap[id];
  if (index !== undefined) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(li => li.classList.remove('active'));
          navLinks[index].classList.add('active');
          const ulRect = document.querySelector('.nav ul').getBoundingClientRect();
          const liRect = navLinks[index].getBoundingClientRect();
          const left = liRect.left - ulRect.left + liRect.width / 2 - 25;
          underline.style.transform = `translateX(${left}px)`;
        }
      });
    }, { threshold: 0.1, rootMargin: '-100px 0px -50% 0px' });
    observer.observe(section);
  }
});
