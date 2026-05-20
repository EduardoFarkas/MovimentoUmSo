/* ============================================
   JAVASCRIPT — UM SÓ
   v1.0 — Maio 2026
   ============================================ */

// === MOBILE MENU ===
const hamburger = document.querySelector('.hamburger');
const navMobile = document.getElementById('navMobile');
const navLinks = document.querySelectorAll('.nav-link, .nav-links a');

function toggleMobileMenu() {
  const isOpen = navMobile.classList.contains('open');
  
  if (isOpen) {
    navMobile.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  } else {
    navMobile.classList.add('open');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
}

hamburger?.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navMobile.classList.contains('open')) {
      toggleMobileMenu();
    }
  });
});

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// === STICKY HEADER ===
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// === SCROLL PROGRESS BAR ===
function createProgressBar() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.id = 'scrollProgress';
  document.body.prepend(progressBar);
}

function updateProgressBar() {
  const progressBar = document.getElementById('scrollProgress');
  if (!progressBar) return;
  
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.pageYOffset / windowHeight) * 100;
  progressBar.style.width = scrolled + '%';
}

createProgressBar();
window.addEventListener('scroll', updateProgressBar, { passive: true });

// === SCROLL-TRIGGERED ANIMATIONS ===
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Add stagger delays to children if they exist
      const children = entry.target.querySelectorAll('.card, .area, .plan');
      children.forEach((child, index) => {
        child.style.transitionDelay = `${index * 100}ms`;
      });
    }
  });
}, observerOptions);

// Observe all sections and elements with animate-on-scroll class
document.querySelectorAll('section, .animate-on-scroll').forEach(section => {
  section.classList.add('animate-on-scroll');
  scrollObserver.observe(section);
});

// === NAV UNDERLINE ANIMATION ===
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinksDesktop = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinksDesktop.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.3, rootMargin: '-80px 0px -20% 0px' });

sections.forEach(section => navObserver.observe(section));

// === PARTICLES SYSTEM ===
function createParticles() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particles-canvas';
  document.body.prepend(canvas);
  
  const ctx = canvas.getContext('2d');
  let particles = [];
  const particleCount = 35;
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  class Particle {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + Math.random() * 100;
      this.size = Math.random() * 2 + 0.5;
      this.speedY = Math.random() * 0.5 + 0.2;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.3 + 0.1;
      this.fadeOut = Math.random() * 0.002 + 0.001;
    }
    
    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      this.opacity -= this.fadeOut;
      
      if (this.opacity <= 0 || this.y < -10) {
        this.reset();
      }
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
      ctx.fill();
    }
  }
  
  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

createParticles();

// === COPY PIX FUNCTION ===
function copiarPix() {
  var chave = document.getElementById("chavePix").value;
  navigator.clipboard.writeText(chave).then(function() {
    var botao = document.getElementById("btnCopiar");
    var originalText = botao.innerText;
    botao.innerText = "Chave Copiada! ✅";
    botao.style.background = "#28C840";
    
    setTimeout(function() {
      botao.innerText = originalText;
      botao.style.background = "";
    }, 3000);
  }).catch(function(err) {
    alert("Erro ao copiar chave automaticamente. Por favor, copie manualmente.");
  });
}

// === COUNTDOWN TIMER (for Event section) ===
function updateCountdown() {
  const eventDate = new Date('September 7, 2026 00:00:00').getTime();
  const now = new Date().getTime();
  const distance = eventDate - now;
  
  if (distance < 0) {
    return;
  }
  
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  // Could display countdown somewhere if needed
  // For now, just calculating
}

// === PARALLAX EFFECT ON HERO ===
const heroImage = document.querySelector('.hero-image');

window.addEventListener('scroll', () => {
  if (!heroImage) return;
  
  const scrolled = window.pageYOffset;
  const rate = 0.3;
  
  if (scrolled < window.innerHeight) {
    heroImage.style.transform = `translateY(${scrolled * rate}px)`;
  }
}, { passive: true });

// === INITIALIZE ===
document.addEventListener('DOMContentLoaded', () => {
  // Update countdown
  updateCountdown();
  setInterval(updateCountdown, 1000);
  
  // Trigger initial animations
  setTimeout(() => {
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('visible');
      }
    });
  }, 100);
});

// === ACCESSIBILITY ===
// Skip link functionality
const skipLink = document.createElement('a');
skipLink.href = '#main';
skipLink.className = 'skip-link';
skipLink.innerText = 'Pular para o conteúdo';
skipLink.style.cssText = `
  position: absolute;
  left: -9999px;
  z-index: 9999;
  padding: 1rem;
  background: var(--gold);
  color: var(--bg-deep);
  font-weight: 600;
  border-radius: var(--border-radius-md);
`;

skipLink.addEventListener('focus', () => {
  skipLink.style.left = '1rem';
  skipLink.style.top = '1rem';
});

skipLink.addEventListener('blur', () => {
  skipLink.style.left = '-9999px';
});

document.body.prepend(skipLink);

// Add main id to first section after header
const mainContent = document.querySelector('section');
if (mainContent) {
  mainContent.id = mainContent.id || 'main';
}