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

const interactiveElements = document.querySelectorAll('a, button, .nav-logo, .trait, .dot, .quote-nav-btn');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
});

// ====== NAVBAR & HAMBURGER ======
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
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
  document.querySelectorAll('.reveal').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add('active');
    }
  });
}
window.addEventListener('scroll', reveal);
reveal();

// ====== CANVAS HEARTS (Upgraded with stars) ======
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2.5 + 0.5;
    this.speed = Math.random() * 0.8 + 0.2;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.type = Math.random() > 0.7 ? 'heart' : 'star';
    this.twinkleSpeed = Math.random() * 0.02 + 0.01;
    this.twinklePhase = Math.random() * Math.PI * 2;
  }
  draw() {
    this.twinklePhase += this.twinkleSpeed;
    const alpha = this.opacity * (0.5 + 0.5 * Math.sin(this.twinklePhase));
    if (this.type === 'heart') {
      ctx.fillStyle = `rgba(255, 77, 133, ${alpha})`;
    } else {
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.7})`;
    }
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
  update() {
    this.y -= this.speed;
    this.x += Math.sin(this.y * 0.008) * 0.3;
    if (this.y < -10) {
      this.y = canvas.height + 10;
      this.x = Math.random() * canvas.width;
    }
    this.draw();
  }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => p.update());
  requestAnimationFrame(animateParticles);
}
animateParticles();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ====== BIRTHDAY COUNTDOWN ======
const birthday = new Date('2008-01-03');

function calculateAge() {
  const now = new Date();
  let age = now.getFullYear() - birthday.getFullYear();
  const m = now.getMonth() - birthday.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birthday.getDate())) age--;
  const el = document.getElementById('birthdayAge');
  if (el) el.textContent = `✨ She is ${age} years old ✨`;
}
calculateAge();

function updateCountdown() {
  const now = new Date();
  let nextBday = new Date(now.getFullYear(), 0, 3); // Jan 3
  if (now >= nextBday) nextBday.setFullYear(nextBday.getFullYear() + 1);

  const diff = nextBday - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const dEl = document.getElementById('countDays');
  const hEl = document.getElementById('countHours');
  const mEl = document.getElementById('countMinutes');
  const sEl = document.getElementById('countSeconds');

  if (dEl) dEl.textContent = String(days).padStart(3, '0');
  if (hEl) hEl.textContent = String(hours).padStart(2, '0');
  if (mEl) mEl.textContent = String(minutes).padStart(2, '0');
  if (sEl) sEl.textContent = String(seconds).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ====== LOVE LETTER TYPEWRITER ======
const letterText = `There are so many things I want to say to you, but words always feel too small for what I feel.

From the moment you came into my world, everything changed. The songs I sing suddenly had meaning. The code I write suddenly had purpose. Because everything I do, I do thinking of you.

I know the world is big and complicated, and I know I'm just a simple boy who sings and codes. But my love for you? It's anything but simple. It's vast like the ocean, deep like the night sky, and eternal like the stars.

You may not feel the same way about me, and I understand that. But I want you to know — you are loved. Deeply. Unconditionally. Forever.

You are the most beautiful soul I have ever encountered. And till my last breath, your name will be the song my heart sings.

I love you, Anushka. Today, tomorrow, and for every day after that. 💕`;

let letterIndex = 0;
let letterStarted = false;
let letterInterval = null;

function startTypewriter() {
  if (letterStarted) return;
  letterStarted = true;
  const el = document.getElementById('typewriterText');
  if (!el) return;
  el.innerHTML = '<span class="typewriter-cursor"></span>';
  letterIndex = 0;

  letterInterval = setInterval(() => {
    if (letterIndex < letterText.length) {
      const char = letterText[letterIndex];
      const cursorEl = el.querySelector('.typewriter-cursor');
      if (char === '\n') {
        cursorEl.insertAdjacentHTML('beforebegin', '<br/>');
      } else {
        cursorEl.insertAdjacentText('beforebegin', char);
      }
      letterIndex++;
    } else {
      clearInterval(letterInterval);
    }
  }, 30);
}

function replayLetter() {
  letterStarted = false;
  if (letterInterval) clearInterval(letterInterval);
  const el = document.getElementById('typewriterText');
  if (el) el.innerHTML = '';
  startTypewriter();
}

// Start typewriter when letter section is visible
const letterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(startTypewriter, 500);
      letterObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const letterSection = document.getElementById('letter');
if (letterSection) letterObserver.observe(letterSection);

// ====== QUOTES CAROUSEL ======
let currentQuote = 0;
const totalQuotes = 5;
let quoteAutoplay = null;

function goToQuote(index) {
  document.querySelectorAll('.quote-card').forEach((card, i) => {
    card.classList.toggle('active', i === index);
  });
  document.querySelectorAll('.quotes-dots .dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  currentQuote = index;
}

function nextQuote() {
  goToQuote((currentQuote + 1) % totalQuotes);
  resetAutoplay();
}

function prevQuote() {
  goToQuote((currentQuote - 1 + totalQuotes) % totalQuotes);
  resetAutoplay();
}

function resetAutoplay() {
  clearInterval(quoteAutoplay);
  quoteAutoplay = setInterval(() => nextQuote(), 5000);
}

// Start autoplay
quoteAutoplay = setInterval(() => nextQuote(), 5000);

// ====== MUSIC PLAYER ======
let isPlaying = false;
const bgAudio = document.getElementById('bgAudio');
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
    bgAudio.play().catch(e => console.log("Audio play blocked", e));
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
    if (!isPlaying) { clearInterval(interval); return; }
    pos -= 0.5;
    lyricsScroll.style.transform = `translateY(${pos}px)`;
    if (pos < -200) pos = 50;
  }, 100);
}

// ====== PROPOSAL LOGIC ======
function runAway(btn) {
  const container = document.querySelector('.propose-buttons');
  const containerRect = container.getBoundingClientRect();
  const maxX = containerRect.width - btn.offsetWidth;
  const maxY = 200;
  btn.style.left = Math.floor(Math.random() * maxX) + 'px';
  btn.style.transform = `translateY(${Math.floor(Math.random() * maxY) - maxY/2}px)`;
}

function sayYes() {
  const buttons = document.getElementById('proposeButtons');
  const celebrate = document.getElementById('celebrateMessage');
  const particles = document.getElementById('proposeParticles');
  buttons.style.display = 'none';
  celebrate.style.display = 'block';
  createFireworks(particles);
  if (!isPlaying) toggleMusic();
}

function createFireworks(container) {
  for (let i = 0; i < 30; i++) {
    const heart = document.createElement('i');
    heart.className = 'fas fa-heart';
    heart.style.cssText = `position:absolute;color:#ff4d85;font-size:${Math.random()*20+10}px;left:50%;top:50%;transform:translate(-50%,-50%);z-index:100;transition:all 1s ease-out;`;
    const angle = Math.random() * Math.PI * 2;
    const vel = Math.random() * 100 + 50;
    const tx = Math.cos(angle) * vel, ty = Math.sin(angle) * vel;
    container.appendChild(heart);
    setTimeout(() => { heart.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`; heart.style.opacity = '0'; }, 50);
    setTimeout(() => heart.remove(), 1050);
  }
  setInterval(() => {
    const h = document.createElement('i');
    h.className = 'fas fa-heart';
    h.style.cssText = `position:absolute;color:${Math.random()>0.5?'#ff4d85':'#a239ca'};left:${Math.random()*100}%;top:-20px;font-size:${Math.random()*15+10}px;opacity:0.7;transition:top 3s linear,opacity 3s linear;`;
    document.getElementById('fireworks').appendChild(h);
    setTimeout(() => { h.style.top = '100%'; h.style.opacity = '0'; }, 50);
    setTimeout(() => h.remove(), 3050);
  }, 300);
}
