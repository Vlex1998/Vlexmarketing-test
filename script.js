// Services mega dropdown — toggle handled by inline onclick on each page
// This only handles closing on outside click and on mega-link click
var dropdownItem = document.querySelector('.nav__item--dropdown');

if (dropdownItem) {
  document.addEventListener('click', function (e) {
    if (!dropdownItem.contains(e.target)) {
      dropdownItem.classList.remove('open');
    }
  });

  dropdownItem.querySelectorAll('.nav__mega a').forEach(function (link) {
    link.addEventListener('click', function () {
      dropdownItem.classList.remove('open');
    });
  });
}

// Sticky nav shadow
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile burger
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = burger.querySelectorAll('span');
  if (mobileMenu.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
    });
  });
});

// Scroll-reveal animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .pillar, .stat-card, .testimonial-card, .process-step').forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// Counter animation
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current).toLocaleString();
    if (current >= target) clearInterval(timer);
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-card__number').forEach(animateCounter);
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsGrid = document.querySelector('.stats__grid');
if (statsGrid) statsObserver.observe(statsGrid);

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    setTimeout(() => {
      contactForm.innerHTML = `
        <div class="form-success">
          <div style="font-size:3rem;margin-bottom:16px;">🎯</div>
          <h3>You're In!</h3>
          <p>We'll review your info and reach out within 24 hours to schedule your free strategy audit. Get ready to grow.</p>
        </div>
      `;
    }, 1200);
  });
}

// Treasure map trail draw-on animation
const trail = document.querySelector('.map-trail');
if (trail) {
  const trailObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        trail.classList.add('drawn');
        trailObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  trailObserver.observe(trail.closest('.xmarks'));
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});
