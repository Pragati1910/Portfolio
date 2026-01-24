// ===================================
// SMOOTH SCROLL
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===================================
// ACTIVE NAV LINK ON SCROLL
// ===================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--color-primary)';
    }
  });
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('.section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  observer.observe(section);
});

// ===================================
// SKILL BAR ANIMATION
// ===================================
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar').forEach((bar, i) => {
        setTimeout(() => bar.classList.add('animate'), i * 100);
      });
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-category').forEach(cat => skillObserver.observe(cat));
// ===================================
// PROJECT CARD TILT
// ===================================
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (y - rect.height / 2) / 20;
    const rotateY = (rect.width / 2 - x) / 20;

    card.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });
});

// ===================================
// BUTTON RIPPLE
// ===================================
document.querySelectorAll('.cta-btn, .submit-btn, .more-link').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position:absolute;
      width:${size}px;
      height:${size}px;
      left:${e.clientX - rect.left - size / 2}px;
      top:${e.clientY - rect.top - size / 2}px;
      background:rgba(255,255,255,.5);
      border-radius:50%;
      transform:scale(0);
      animation:ripple 0.6s ease-out;
      pointer-events:none;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

document.head.appendChild(Object.assign(document.createElement('style'), {
  textContent: `
    @keyframes ripple {
      to { transform: scale(4); opacity: 0; }
    }
  `
}));

// ===================================
// PARALLAX EFFECT ON SCROLL
// ===================================
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroContent = document.querySelector('.hero-content');
  const shapes = document.querySelectorAll('.shape');
  
  if (heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    heroContent.style.opacity = 1 - (scrolled / 700);
  }
  
  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.1;
    shape.style.transform = `translateY(${scrolled * speed}px)`;
  });
});
// ===================================
// FORM SUBMISSION
// ===================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = contactForm.querySelector('#name').value;
    const email = contactForm.querySelector('#email').value;
    const message = contactForm.querySelector('#message').value;

    if (name && email && message) {
      showNotification(
        '✅ Message sent successfully! I\'ll get back to you soon.',
        'success'
      );
      contactForm.reset();
    } else {
      showNotification('⚠️ Please fill all fields.', 'error');
    }
  });
}

function showNotification(message, type) {
  const div = document.createElement('div');
  div.textContent = message;
  div.style.cssText = `
    position:fixed;
    top:100px;
    right:30px;
    padding:1.5rem 2rem;
    background:${type === 'success' ? 'var(--color-primary)' : 'var(--color-accent)'};
    color:var(--color-bg);
    font-weight:600;
    box-shadow:0 10px 30px rgba(0,0,0,.3);
    z-index:10000;
    animation:slideIn .5s ease;
  `;
  document.body.appendChild(div);

  setTimeout(() => {
    div.style.animation = 'slideOut .5s ease';
    setTimeout(() => div.remove(), 500);
  }, 3000);
}

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(notificationStyle);

// ===================================
// TYPING EFFECT FOR HERO
// ===================================
const observeHero = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startTypingEffect();
      observeHero.disconnect();
    }
  });
});

const heroSection = document.querySelector('.hero');
if (heroSection) {
  observeHero.observe(heroSection);
}

function startTypingEffect() {
  const subtitleLines = document.querySelectorAll('.subtitle-line .text');
  subtitleLines.forEach((line, index) => {
    const text = line.textContent;
    line.textContent = '';
    line.style.borderRight = '2px solid var(--color-primary)';
    
    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex < text.length) {
        line.textContent += text[charIndex];
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          line.style.borderRight = 'none';
        }, 500);
      }
    }, 50);
  });
}

// ===================================
// HOVER EFFECTS FOR STATS
// ===================================
document.querySelectorAll('.stat-box').forEach(stat => {
  stat.addEventListener('mouseenter', function() {
    this.style.background = 'rgba(0, 255, 136, 0.05)';
  });
  
  stat.addEventListener('mouseleave', function() {
    this.style.background = 'transparent';
  });
});

// ===================================
// TECH ITEMS STAGGER ANIMATION
// ===================================
const techObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const techItems = entry.target.querySelectorAll('.tech-item');
      techItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, index * 100);
      });
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.tech-stack').forEach(stack => {
  const items = stack.querySelectorAll('.tech-item');
  items.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.5s ease';
  });
  techObserver.observe(stack);
});

// ===================================
// TIMELINE ANIMATION
// ===================================
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateX(0)';
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.timeline-item').forEach((item, index) => {
  item.style.opacity = '0';
  item.style.transform = 'translateX(-50px)';
  item.style.transition = `all 0.6s ease ${index * 0.2}s`;
  timelineObserver.observe(item);
});

// ===================================
// CURSOR TRAIL EFFECT (Desktop only)
// ===================================
if (window.innerWidth > 768) {
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    width: 10px;
    height: 10px;
    border: 2px solid var(--color-primary);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 10000;
    transition: transform 0.15s ease;
    mix-blend-mode: difference;
  `;
  document.body.appendChild(cursor);
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
  
  // Enlarge cursor on interactive elements
  document.querySelectorAll('a, button, .project-card, .stat-box').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2)';
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
    });
  });
}

// ===================================
// PAGE LOAD ANIMATION
// ===================================
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c✨ Welcome to My Portfolio! ✨', 'font-size:24px;color:#00ff88;font-weight:bold');
console.log('%c🚀 Built with passion and code', 'font-size:16px;color:#9ca3af');
console.log('%c📧 Let\'s connect: pragatimaheshwari04@gmail.com', 'font-size:14px;color:#00ff88');
