/* =============================================
   main.js — Madan Bhandari Portfolio
   ============================================= */


/* ── 1. SCROLL FADE-IN (replaces inline script) ── */
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger siblings slightly
      entry.target.style.transitionDelay = `${i * 0.1}s`;
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));


/* ── 2. TYPING EFFECT on hero eyebrow ── */
const eyebrow = document.querySelector('.hero-eyebrow');
if (eyebrow) {
  const original = eyebrow.textContent;
  eyebrow.textContent = '';
  eyebrow.style.opacity = '1';
  let i = 0;
  const type = () => {
    if (i < original.length) {
      eyebrow.textContent += original[i++];
      setTimeout(type, 55);
    }
  };
  setTimeout(type, 600);
}


/* ── 3. HERO NAME — letter reveal on load ── */
const heroName = document.querySelector('.hero-name');
if (heroName) {
  heroName.style.opacity = '0';
  heroName.style.transform = 'translateY(40px)';
  heroName.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  setTimeout(() => {
    heroName.style.opacity = '1';
    heroName.style.transform = 'translateY(0)';
  }, 300);
}


/* ── 4. NAVBAR — shrink + highlight active section ── */
const nav = document.querySelector('nav');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  // shrink nav on scroll
  if (window.scrollY > 60) {
    nav.style.padding = '0.7rem 4rem';
    nav.style.background = 'rgba(10,10,10,0.97)';
  } else {
    nav.style.padding = '1.2rem 4rem';
    nav.style.background = 'rgba(10,10,10,0.85)';
  }

  // highlight active nav link
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute('id');
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
});


/* ── 5. MOBILE HAMBURGER MENU ── */
const navLinksUl = document.querySelector('.nav-links');

const burger = document.createElement('button');
burger.className = 'burger';
burger.setAttribute('aria-label', 'Toggle menu');
burger.innerHTML = `<span></span><span></span><span></span>`;
nav.appendChild(burger);

burger.addEventListener('click', () => {
  navLinksUl.classList.toggle('open');
  burger.classList.toggle('active');
});

// close menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinksUl.classList.remove('open');
    burger.classList.remove('active');
  });
});


/* ── 6. CURSOR GLOW ── */
const cursor = document.createElement('div');
cursor.className = 'cursor-glow';
document.body.appendChild(cursor);

let mx = 0, my = 0, cx = 0, cy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

const animateCursor = () => {
  cx += (mx - cx) * 0.1;
  cy += (my - cy) * 0.1;
  cursor.style.transform = `translate(${cx}px, ${cy}px)`;
  requestAnimationFrame(animateCursor);
};
animateCursor();

// grow cursor on hoverable elements
document.querySelectorAll('a, button, .interest-card, .btn').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
});


/* ── 7. PARALLAX on hero image ── */
const heroImgWrap = document.querySelector('.hero-img-wrap');
window.addEventListener('mousemove', e => {
  if (!heroImgWrap) return;
  const xShift = (e.clientX / window.innerWidth - 0.5) * 18;
  const yShift = (e.clientY / window.innerHeight - 0.5) * 18;
  heroImgWrap.style.transform = `translate(${xShift}px, ${yShift}px)`;
});


/* ── 8. INTEREST CARDS — tilt on hover ── */
document.querySelectorAll('.interest-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) scale(1.02)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(600px) rotateY(0) rotateX(0) scale(1)';
    card.style.transition = 'transform 0.5s ease';
  });
});


/* ── 9. CONTACT FORM — validation + feedback ── */
const form = document.querySelector('.contact-form');
if (form) {
  const btn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const inputs = form.querySelectorAll('input, textarea');
    let valid = true;

    inputs.forEach(input => {
      input.style.borderColor = '';
      if (!input.value.trim()) {
        input.style.borderColor = '#e05';
        valid = false;
      }
    });

    if (!valid) {
      shakeEl(btn);
      return;
    }

    // success state
    btn.textContent = 'Message Sent!';
    btn.style.background = '#2a9d5c';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });

  // live border on focus
  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
      if (input.value.trim()) input.style.borderColor = '';
    });
  });
}

function shakeEl(el) {
  el.style.animation = 'shake 0.4s ease';
  el.addEventListener('animationend', () => el.style.animation = '', { once: true });
}


/* ── 10. SMOOTH SCROLL for all anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


/* ── 11. SCROLL PROGRESS BAR ── */
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const total = document.body.scrollHeight - window.innerHeight;
  progressBar.style.width = `${(scrolled / total) * 100}%`;
});


/* ── 12. CSS INJECTED BY JS (burger + cursor + progress + active + shake) ── */
const style = document.createElement('style');
style.textContent = `
  .nav-links a.active { color: #ff6b1a; }

  .burger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    z-index: 200;
  }
  .burger span {
    display: block;
    width: 24px;
    height: 2px;
    background: #f5f0eb;
    transition: all 0.3s ease;
  }
  .burger.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .burger.active span:nth-child(2) { opacity: 0; }
  .burger.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  @media (max-width: 900px) {
    .burger { display: flex; }
    .nav-links {
      position: fixed;
      top: 0; right: -100%;
      width: 70%;
      height: 100vh;
      background: #111;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 2.5rem;
      transition: right 0.35s ease;
      z-index: 150;
    }
    .nav-links.open { right: 0; }
    .nav-links a { font-size: 1.2rem; }
    nav { padding: 1rem 2rem !important; }
  }

  .cursor-glow {
    position: fixed;
    top: -20px; left: -20px;
    width: 40px; height: 40px;
    border-radius: 50%;
    border: 1.5px solid rgba(255,107,26,0.5);
    pointer-events: none;
    z-index: 9999;
    transition: width 0.2s, height 0.2s, border-color 0.2s;
    will-change: transform;
  }
  .cursor-glow.grow {
    width: 60px; height: 60px;
    border-color: rgba(255,107,26,0.9);
  }
  @media (hover: none) { .cursor-glow { display: none; } }

  .scroll-progress {
    position: fixed;
    top: 0; left: 0;
    height: 2px;
    background: #ff6b1a;
    z-index: 9998;
    width: 0%;
    transition: width 0.1s linear;
  }

  .interest-card { transition: transform 0.3s ease; }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%       { transform: translateX(-6px); }
    40%       { transform: translateX(6px); }
    60%       { transform: translateX(-4px); }
    80%       { transform: translateX(4px); }
  }
`;
document.head.appendChild(style);