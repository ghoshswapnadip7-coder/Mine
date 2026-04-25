// ====== LOADER ======
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.visibility = 'hidden';
    }, 800);
  }, 2000);
});

// ====== CUSTOM CURSOR ======
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  
  setTimeout(() => {
    cursorTrail.style.left = e.clientX + 'px';
    cursorTrail.style.top = e.clientY + 'px';
  }, 100);
});

const interactiveElements = document.querySelectorAll('a, button, .nav-logo, .trait');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
});

// ====== NAVBAR & HAMBURGER ======
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// ====== REVEAL ANIMATIONS ======
function reveal() {
  var reveals = document.querySelectorAll('.reveal');
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 100;
    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add('active');
    }
  }
}
window.addEventListener('scroll', reveal);
reveal(); // Trigger on load

// ====== CANVAS HEARTS ======
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];

class Heart {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.size = Math.random() * 3 + 1;
    this.speed = Math.random() * 1 + 0.5;
    this.opacity = Math.random() * 0.5 + 0.1;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = `rgba(255, 77, 133, ${this.opacity})`;
    // Draw simple circle for performance, but it represents hearts
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
  update() {
    this.y -= this.speed;
    this.x += Math.sin(this.y * 0.01) * 0.5;
    if (this.y < -10) {
      this.y = canvas.height + 10;
      this.x = Math.random() * canvas.width;
    }
    this.draw();
  }
}

function initHearts() {
  for (let i = 0; i < 50; i++) {
    hearts.push(new Heart());
  }
}
initHearts();

function animateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach(heart => heart.update());
  requestAnimationFrame(animateHearts);
}
animateHearts();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ====== MUSIC PLAYER ======
let isPlaying = false;
const bgAudio = document.getElementById('bgAudio');
const playBtn = document.getElementById('playBtn');
const playIcon = document.getElementById('playIcon');
const vinyl = document.getElementById('vinyl');
const equalizer = document.getElementById('equalizer');
const lyricsScroll = document.getElementById('lyricsScroll');

function toggleMusic() {
  if (isPlaying) {
    bgAudio.pause();
    playIcon.className = 'fas fa-play';
    vinyl.classList.remove('playing');
    equalizer.classList.remove('active');
    lyricsScroll.style.transform = 'translateY(0)';
  } else {
    bgAudio.play().catch(e => console.log("Audio play blocked until user interaction", e));
    playIcon.className = 'fas fa-pause';
    vinyl.classList.add('playing');
    equalizer.classList.add('active');
    scrollLyrics();
  }
  isPlaying = !isPlaying;
}

function scrollLyrics() {
  if (!isPlaying) return;
  let pos = 0;
  const interval = setInterval(() => {
    if (!isPlaying) {
      clearInterval(interval);
      return;
    }
    pos -= 0.5;
    lyricsScroll.style.transform = `translateY(${pos}px)`;
    if (pos < -200) pos = 50; // Reset scroll
  }, 100);
}

// ====== PROPOSAL LOGIC ======
const noBtn = document.getElementById('noBtn');

// Make the No button run away
function runAway(btn) {
  const container = document.querySelector('.propose-buttons');
  const containerRect = container.getBoundingClientRect();
  
  const maxX = containerRect.width - btn.offsetWidth;
  const maxY = 200; // Allow it to go higher/lower
  
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY) - (maxY/2);
  
  btn.style.left = randomX + 'px';
  btn.style.transform = `translateY(${randomY}px)`;
}

function sayYes() {
  const buttons = document.getElementById('proposeButtons');
  const celebrate = document.getElementById('celebrateMessage');
  const particles = document.getElementById('proposeParticles');
  
  // Hide buttons, show celebration
  buttons.style.display = 'none';
  celebrate.style.display = 'block';
  
  // Create Firework Hearts
  createFireworks(particles);
  
  // If music isn't playing, start it!
  if (!isPlaying) {
    toggleMusic();
  }
}

function createFireworks(container) {
  for (let i = 0; i < 30; i++) {
    const heart = document.createElement('i');
    heart.className = 'fas fa-heart';
    heart.style.position = 'absolute';
    heart.style.color = '#ff4d85';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    heart.style.left = '50%';
    heart.style.top = '50%';
    heart.style.transform = 'translate(-50%, -50%)';
    heart.style.zIndex = '100';
    
    // Random direction
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 100 + 50;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;
    
    heart.style.transition = 'all 1s ease-out';
    
    container.appendChild(heart);
    
    setTimeout(() => {
      heart.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`;
      heart.style.opacity = '0';
    }, 50);
    
    setTimeout(() => {
      heart.remove();
    }, 1050);
  }
  
  // Create ongoing falling hearts
  setInterval(() => {
    const fallingHeart = document.createElement('i');
    fallingHeart.className = 'fas fa-heart';
    fallingHeart.style.position = 'absolute';
    fallingHeart.style.color = Math.random() > 0.5 ? '#ff4d85' : '#a239ca';
    fallingHeart.style.left = Math.random() * 100 + '%';
    fallingHeart.style.top = '-20px';
    fallingHeart.style.fontSize = Math.random() * 15 + 10 + 'px';
    fallingHeart.style.opacity = '0.7';
    fallingHeart.style.transition = 'top 3s linear, opacity 3s linear';
    
    document.getElementById('fireworks').appendChild(fallingHeart);
    
    setTimeout(() => {
      fallingHeart.style.top = '100%';
      fallingHeart.style.opacity = '0';
    }, 50);
    
    setTimeout(() => {
      fallingHeart.remove();
    }, 3050);
  }, 300);
}
