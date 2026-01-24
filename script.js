// ===================================
// GLOBAL VARIABLES
// ===================================
let soundEnabled = true;
let currentTheme = 0;
const themes = ['theme-green', 'theme-blue', 'theme-purple', 'theme-orange'];
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

// ===================================
// LOADING SCREEN
// ===================================
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loadingScreen');
  const loadingBar = document.getElementById('loadingBar');
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 30;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
      }, 500);
    }
    loadingBar.style.width = progress + '%';
  }, 200);
});

// ===================================
// SCROLL PROGRESS BAR
// ===================================
window.addEventListener('scroll', () => {
  const scrollProgress = document.getElementById('scrollProgress');
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / totalHeight) * 100;
  scrollProgress.style.width = progress + '%';
  
  // Show/hide rocket button
  const rocketBtn = document.getElementById('rocketBtn');
  if (window.scrollY > 500) {
    rocketBtn.classList.add('visible');
  } else {
    rocketBtn.classList.remove('visible');
  }
});

// ===================================
// ROCKET BUTTON
// ===================================
document.getElementById('rocketBtn').addEventListener('click', function() {
  this.style.animation = 'rocket-launch 0.6s ease-out';
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.style.animation = '';
  }, 600);
});

// ===================================
// THEME TOGGLE
// ===================================
document.getElementById('themeToggle').addEventListener('click', function() {
  document.body.classList.remove(themes[currentTheme]);
  currentTheme = (currentTheme + 1) % themes.length;
  if (themes[currentTheme] !== 'theme-green') {
    document.body.classList.add(themes[currentTheme]);
  }
  
  playSound('click');
  
  // Update icon
  const icons = ['fa-moon', 'fa-sun', 'fa-star', 'fa-fire'];
  this.querySelector('i').className = `fas ${icons[currentTheme]}`;
});

// ===================================
// SOUND TOGGLE
// ===================================
document.getElementById('soundToggle').addEventListener('click', function() {
  soundEnabled = !soundEnabled;
  this.classList.toggle('muted');
  const icon = this.querySelector('i');
  icon.className = soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
  playSound('click');
});

// ===================================
// SOUND EFFECTS
// ===================================
function playSound(type) {
  if (!soundEnabled) return;
  
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  switch(type) {
    case 'click':
      oscillator.frequency.value = 800;
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      break;
    case 'hover':
      oscillator.frequency.value = 600;
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
      break;
    case 'success':
      oscillator.frequency.value = 1000;
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      break;
  }
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.3);
}

// ===================================
// PARTICLES SYSTEM
// ===================================
const particlesCanvas = document.getElementById('particlesCanvas');
const particlesCtx = particlesCanvas.getContext('2d');

particlesCanvas.width = window.innerWidth;
particlesCanvas.height = window.innerHeight;

const particles = [];
const particleCount = 50;

class Particle {
  constructor() {
    this.x = Math.random() * particlesCanvas.width;
    this.y = Math.random() * particlesCanvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
    this.opacity = Math.random() * 0.5 + 0.2;
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    if (this.x > particlesCanvas.width) this.x = 0;
    if (this.x < 0) this.x = particlesCanvas.width;
    if (this.y > particlesCanvas.height) this.y = 0;
    if (this.y < 0) this.y = particlesCanvas.height;
  }
  
  draw() {
    particlesCtx.fillStyle = `rgba(0, 255, 136, ${this.opacity})`;
    particlesCtx.beginPath();
    particlesCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    particlesCtx.fill();
  }
}

for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animateParticles);
}

animateParticles();

// ===================================
// CONSTELLATION EFFECT
// ===================================
const constellationCanvas = document.getElementById('constellationCanvas');
const constellationCtx = constellationCanvas.getContext('2d');

constellationCanvas.width = window.innerWidth;
constellationCanvas.height = window.innerHeight;

const stars = [];
const starCount = 100;
const maxDistance = 150;

class Star {
  constructor() {
    this.x = Math.random() * constellationCanvas.width;
    this.y = Math.random() * constellationCanvas.height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 1.5;
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    
    if (this.x < 0 || this.x > constellationCanvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > constellationCanvas.height) this.vy *= -1;
  }
  
  draw() {
    constellationCtx.fillStyle = 'rgba(0, 255, 136, 0.3)';
    constellationCtx.beginPath();
    constellationCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    constellationCtx.fill();
  }
}

for (let i = 0; i < starCount; i++) {
  stars.push(new Star());
}

function connectStars() {
  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const dx = stars[i].x - stars[j].x;
      const dy = stars[i].y - stars[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < maxDistance) {
        const opacity = (1 - distance / maxDistance) * 0.2;
        constellationCtx.strokeStyle = `rgba(0, 255, 136, ${opacity})`;
        constellationCtx.lineWidth = 0.5;
        constellationCtx.beginPath();
        constellationCtx.moveTo(stars[i].x, stars[i].y);
        constellationCtx.lineTo(stars[j].x, stars[j].y);
        constellationCtx.stroke();
      }
    }
  }
}

function animateConstellation() {
  constellationCtx.clearRect(0, 0, constellationCanvas.width, constellationCanvas.height);
  stars.forEach(star => {
    star.update();
    star.draw();
  });
  connectStars();
  requestAnimationFrame(animateConstellation);
}

animateConstellation();

// Resize canvases
window.addEventListener('resize', () => {
  particlesCanvas.width = window.innerWidth;
  particlesCanvas.height = window.innerHeight;
  constellationCanvas.width = window.innerWidth;
  constellationCanvas.height = window.innerHeight;
});

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
      playSound('click');
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
// COUNTER ANIMATION FOR STATS
// ===================================
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      const target = parseFloat(entry.target.dataset.target);
      const statNumber = entry.target;
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          statNumber.textContent = current.toFixed(2);
          requestAnimationFrame(updateCounter);
        } else {
          statNumber.textContent = target.toFixed(2);
        }
      };
      
      updateCounter();
      entry.target.classList.add('counted');
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(stat => {
  counterObserver.observe(stat);
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
// SKILLS VIEW TOGGLE
// ===================================
document.querySelectorAll('.view-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    
    const view = this.dataset.view;
    const skillsGrid = document.getElementById('skillsGrid');
    
    if (view === 'circles') {
      skillsGrid.classList.add('circle-view');
    } else {
      skillsGrid.classList.remove('circle-view');
    }
    
    playSound('click');
  });
});

// ===================================
// FLIP CARD PROJECTS
// ===================================
document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', function(e) {
    // Don't flip if clicking on a link
    if (e.target.tagName === 'A' || e.target.closest('a')) return;
    
    this.classList.toggle('flipped');
    playSound('click');
    
    // Particle burst effect
    createParticleBurst(e.clientX, e.clientY);
  });
});

// ===================================
// PARTICLE BURST EFFECT
// ===================================
function createParticleBurst(x, y) {
  const burst = document.createElement('div');
  burst.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    width: 10px;
    height: 10px;
    pointer-events: none;
    z-index: 10000;
  `;
  document.body.appendChild(burst);
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    const angle = (Math.PI * 2 * i) / 20;
    const velocity = 50 + Math.random() * 50;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    particle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: var(--color-primary);
      border-radius: 50%;
      animation: particle-fade 0.6s ease-out forwards;
    `;
    
    burst.appendChild(particle);
    
    let posX = 0;
    let posY = 0;
    let opacity = 1;
    
    function animateParticle() {
      posX += vx * 0.016;
      posY += vy * 0.016 + 0.5;
      opacity -= 0.016;
      
      particle.style.transform = `translate(${posX}px, ${posY}px)`;
      particle.style.opacity = opacity;
      
      if (opacity > 0) {
        requestAnimationFrame(animateParticle);
      }
    }
    
    animateParticle();
  }
  
  setTimeout(() => burst.remove(), 600);
}

// ===================================
// MAGNETIC BUTTON EFFECT
// ===================================
document.querySelectorAll('.magnetic-btn').forEach(btn => {
  btn.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
  
  btn.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
  
  btn.addEventListener('mouseenter', () => playSound('hover'));
});

// ===================================
// TYPING EFFECT WITH ROTATING TEXT
// ===================================
const typingText = document.getElementById('typingText');
const roles = [
  'AI/ML Engineer',
  'Full Stack Developer',
  'Problem Solver',
  'Tech Enthusiast',
  'Innovation Driver'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];
  
  if (isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }
  
  let typeSpeed = isDeleting ? 50 : 100;
  
  if (!isDeleting && charIndex === currentRole.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 500;
  }
  
  setTimeout(typeEffect, typeSpeed);
}

// Start typing effect after a delay
setTimeout(typeEffect, 1000);

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
  document.querySelectorAll('a, button, .project-card, .stat-box, .flip-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2)';
      cursor.style.background = 'rgba(0, 255, 136, 0.2)';
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursor.style.background = 'transparent';
    });
  });
}

// ===================================
// SPOTLIGHT EFFECT
// ===================================
let spotlightActive = false;

document.addEventListener('keydown', (e) => {
  if (e.key === 's' && e.ctrlKey) {
    e.preventDefault();
    spotlightActive = !spotlightActive;
    document.body.classList.toggle('spotlight-active', spotlightActive);
  }
});

document.addEventListener('mousemove', (e) => {
  if (spotlightActive) {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.body.style.setProperty('--mouse-x', x + '%');
    document.body.style.setProperty('--mouse-y', y + '%');
  }
});

// ===================================
// CONFETTI EFFECT
// ===================================
const confettiCanvas = document.getElementById('confettiCanvas');
const confettiCtx = confettiCanvas.getContext('2d');

confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let confettiPieces = [];

class Confetti {
  constructor() {
    this.x = Math.random() * confettiCanvas.width;
    this.y = -10;
    this.size = Math.random() * 8 + 5;
    this.speedY = Math.random() * 3 + 2;
    this.speedX = Math.random() * 2 - 1;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 10 - 5;
    this.color = `hsl(${Math.random() * 360}, 70%, 60%)`;
  }
  
  update() {
    this.y += this.speedY;
    this.x += this.speedX;
    this.rotation += this.rotationSpeed;
    
    if (this.y > confettiCanvas.height) {
      return false;
    }
    return true;
  }
  
  draw() {
    confettiCtx.save();
    confettiCtx.translate(this.x, this.y);
    confettiCtx.rotate(this.rotation * Math.PI / 180);
    confettiCtx.fillStyle = this.color;
    confettiCtx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    confettiCtx.restore();
  }
}

function launchConfetti() {
  for (let i = 0; i < 150; i++) {
    confettiPieces.push(new Confetti());
  }
  animateConfetti();
  playSound('success');
}

function animateConfetti() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  
  confettiPieces = confettiPieces.filter(confetti => {
    confetti.update();
    confetti.draw();
    return confetti.y < confettiCanvas.height;
  });
  
  if (confettiPieces.length > 0) {
    requestAnimationFrame(animateConfetti);
  }
}

// ===================================
// FORM SUBMISSION WITH CONFETTI
// ===================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = contactForm.querySelector('#name').value;
    const email = contactForm.querySelector('#email').value;
    const message = contactForm.querySelector('#message').value;

    if (name && email && message) {
      launchConfetti();
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
    border-radius: 4px;
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
  
  @keyframes particle-fade {
    to {
      opacity: 0;
      transform: scale(0);
    }
  }
`;
document.head.appendChild(notificationStyle);

// ===================================
// KONAMI CODE EASTER EGG
// ===================================
document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      activateEasterEgg();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function activateEasterEgg() {
  // Matrix rain effect
  const matrixCanvas = document.createElement('canvas');
  matrixCanvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10001;
    pointer-events: none;
  `;
  document.body.appendChild(matrixCanvas);
  
  const ctx = matrixCanvas.getContext('2d');
  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;
  
  const letters = 'PRAGATIMAHESHWARI0123456789@#$%^&*()';
  const fontSize = 16;
  const columns = matrixCanvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);
  
  let frameCount = 0;
  const maxFrames = 300;
  
  function drawMatrix() {
    ctx.fillStyle = 'rgba(26, 26, 26, 0.05)';
    ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
    
    ctx.fillStyle = 'var(--color-primary)';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      
      if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
    
    frameCount++;
    if (frameCount < maxFrames) {
      requestAnimationFrame(drawMatrix);
    } else {
      matrixCanvas.style.opacity = '0';
      matrixCanvas.style.transition = 'opacity 1s ease';
      setTimeout(() => matrixCanvas.remove(), 1000);
    }
  }
  
  drawMatrix();
  showNotification('🎮 Konami Code Activated! Matrix Mode ON', 'success');
  playSound('success');
}

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
    shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
  });
});

// ===================================
// HOVER EFFECTS FOR STATS
// ===================================
document.querySelectorAll('.stat-box').forEach(stat => {
  stat.addEventListener('mouseenter', function() {
    playSound('hover');
  });
});

// ===================================
// BUTTON RIPPLE EFFECT
// ===================================
document.querySelectorAll('.cta-btn, .submit-btn, .more-link, .control-btn').forEach(btn => {
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

// ===================================
// GLITCH TEXT EFFECT
// ===================================
const glitchText = document.querySelector('.glitch-text');
if (glitchText) {
  glitchText.addEventListener('mouseenter', () => {
    playSound('hover');
  });
}

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c✨ Welcome to My Portfolio! ✨', 'font-size:24px;color:#00ff88;font-weight:bold');
console.log('%c🚀 Built with passion and code', 'font-size:16px;color:#9ca3af');
console.log('%c📧 Let\'s connect: pragatimaheshwari04@gmail.com', 'font-size:14px;color:#00ff88');
console.log('%c🎮 Try the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A', 'font-size:12px;color:#0088ff');
console.log('%c💡 Press Ctrl+S for spotlight mode', 'font-size:12px;color:#a855f7');

// ===================================
// INITIALIZE ON PAGE LOAD
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎉 Portfolio fully loaded and interactive!');
});