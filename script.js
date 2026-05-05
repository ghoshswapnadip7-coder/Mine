// ====== AUTO CLEAR OLD LOCK DATA ======
localStorage.removeItem('siteDestroyed');

// ====== DESTROY AND VIEW ONCE LOGIC ======
const destroyScreen = document.getElementById('destroyScreen');
const viewOnceScreen = document.getElementById('viewOnceScreen');

if (false && localStorage.getItem('siteDestroyed') === 'true') {
  if (destroyScreen) destroyScreen.style.display = 'flex';
  document.body.style.overflow = 'hidden';
} else if (localStorage.getItem('hasVisited') === 'true' && !sessionStorage.getItem('allowAccess')) {
  if (viewOnceScreen) viewOnceScreen.style.display = 'flex';
  document.body.style.overflow = 'hidden';
} else {
  localStorage.setItem('hasVisited', 'true');
}

function openAgain() {
  sessionStorage.setItem('allowAccess', 'true');
  location.reload();
}

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

let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
let cursorX = mouseX, cursorY = mouseY;
let trailX = mouseX, trailY = mouseY;

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.5;
    cursorY += (mouseY - cursorY) * 0.5;
    trailX += (mouseX - trailX) * 0.15;
    trailY += (mouseY - trailY) * 0.15;
    
    if (cursor) cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
    if (cursorTrail) cursorTrail.style.transform = `translate3d(${trailX}px, ${trailY}px, 0) translate(-50%, -50%)`;
    
    requestAnimationFrame(animateCursor);
  }
  requestAnimationFrame(animateCursor);

  const interactiveElements = document.querySelectorAll('a, button, .nav-logo, .trait, .dot, .quote-nav-btn');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });
} else {
  if (cursor) cursor.style.display = 'none';
  if (cursorTrail) cursorTrail.style.display = 'none';
}

// ====== NAVBAR & HAMBURGER ======
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

let isScrolling = false;
window.addEventListener('scroll', () => {
  if (!isScrolling) {
    window.requestAnimationFrame(() => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
      isScrolling = false;
    });
    isScrolling = true;
  }
}, { passive: true });

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
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

revealElements.forEach(el => revealObserver.observe(el));

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
const letterText = `Anushka,

I've held onto these words for so long, partly because I didn't know how to say them, and partly because I didn't want to ruin whatever small space I had in your life.

It all started in Class 9. I remember seeing you standing in front of Ayan sir's batch. It wasn't anything cinematic, just a quiet moment that somehow anchored itself in my mind. By the time Class 10 results came out, we were talking. Those conversations stretched into hours, and without me even noticing, you became the quiet comfort of my everyday life. 

When I finally told you how I felt, the misunderstanding that followed hurt more than I can explain. The distance grew. I remember that day you were eating fuchka with the others, and I was sitting across the road, shaking, unable to stand, crying silently onto a friend's shoulder. The tightness in my chest was unbearable. I tried so hard to move on after that, but I never truly forgot you.

Then the gym brought us close again. It was the only place I could see you every day, and I held onto that routine because, outside of it, you never really needed me. I know you know how I feel. And I know sometimes my presence bothers you, like when you complained about me just looking at you. I never meant to make you uncomfortable.

I just loved you—silently and patiently. I never asked you to love me back. I only wished to stay somewhere in your world.`;

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
const lyricsBox = document.querySelector('.lyrics-box');

let lyricsAnimationId;
let exactScrollTop = 0;
let isUserScrolling = false;
let userScrollTimeout;

if (lyricsBox) {
  lyricsBox.addEventListener('wheel', handleUserScroll, {passive: true});
  lyricsBox.addEventListener('touchstart', handleUserScroll, {passive: true});
  lyricsBox.addEventListener('touchmove', handleUserScroll, {passive: true});
}

function handleUserScroll() {
  isUserScrolling = true;
  if (lyricsBox) exactScrollTop = lyricsBox.scrollTop;
  clearTimeout(userScrollTimeout);
  userScrollTimeout = setTimeout(() => {
    isUserScrolling = false;
  }, 2500); // Resume auto-scroll after 2.5s of inactivity
}

function toggleMusic() {
  if (isPlaying) {
    bgAudio.pause();
    playIcon.className = 'fas fa-play';
    vinyl.classList.remove('playing');
    equalizer.classList.remove('active');
    cancelAnimationFrame(lyricsAnimationId);
  } else {
    bgAudio.play().catch(e => console.log("Audio play blocked", e));
    playIcon.className = 'fas fa-pause';
    vinyl.classList.add('playing');
    equalizer.classList.add('active');
    if (lyricsBox) exactScrollTop = lyricsBox.scrollTop;
    scrollLyrics();
  }
  isPlaying = !isPlaying;
}

function scrollLyrics() {
  if (!isPlaying || !lyricsBox) return;

  function animate() {
    if (!isPlaying) return;
    
    if (!isUserScrolling) {
      exactScrollTop += 0.3; // Cinematic scroll speed
      
      // Loop back if reached the bottom
      if (exactScrollTop + lyricsBox.clientHeight >= lyricsBox.scrollHeight - 2) {
        exactScrollTop = 0;
      }
      
      lyricsBox.scrollTop = exactScrollTop;
    } else {
      // Keep exactScrollTop in sync when user is scrolling
      exactScrollTop = lyricsBox.scrollTop;
    }
    
    lyricsAnimationId = requestAnimationFrame(animate);
  }
  lyricsAnimationId = requestAnimationFrame(animate);
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

// ====== FINAL CHOICE LOGIC ======
function keepStory() {
  const finalButtons = document.getElementById('finalButtons');
  const finalContentP = document.querySelector('#finalChoiceContent p');
  const keepMessage = document.getElementById('keepMessage');
  
  if (finalButtons) finalButtons.style.display = 'none';
  if (finalContentP) finalContentP.style.display = 'none';
  if (keepMessage) keepMessage.style.display = 'block';
}

function fadeAway() {
  // Set permanent lock (Temporarily disabled for testing)
  // localStorage.setItem('siteDestroyed', 'true');

  // Show the fade screen
  const fadeScreen = document.getElementById('fadeOutScreen');
  if (fadeScreen) fadeScreen.classList.add('active');
  
  // Fade out hearts
  const canvas = document.getElementById('heartCanvas');
  if (canvas) {
    canvas.style.transition = 'opacity 3s ease';
    canvas.style.opacity = '0';
  }
  
  // Stop music
  if (isPlaying) {
    toggleMusic(); // Stops and resets vinyl/equalizer
  } else {
    const bgAudio = document.getElementById('bgAudio');
    if (bgAudio) bgAudio.pause();
  }
  
  // Disable scrolling
  document.body.style.overflow = 'hidden';
  
  // Show messages sequentially
  setTimeout(() => {
    const p1 = document.getElementById('fadeText1');
    const p2 = document.getElementById('fadeText2');
    const p3 = document.getElementById('fadeText3');
    
    if (p1) setTimeout(() => p1.classList.add('visible'), 500);
    if (p2) setTimeout(() => p2.classList.add('visible'), 3500);
    if (p3) setTimeout(() => p3.classList.add('visible'), 7000);
  }, 4000); // Wait until screen is mostly faded to black
}
// Auto Scroll Lyrics logic integrated into music player

// ====== SYNC WITH BIRTHDAY FLOW MUSIC START ======
window.addEventListener('bdMusicStarted', function () {
  // Birthday overlay already called audio.play() and updated UI icons.
  // Mark isPlaying=true so toggleMusic() won't double-play.
  isPlaying = true;
  // Start lyrics scroll animation since music is playing
  if (lyricsBox) {
    exactScrollTop = lyricsBox.scrollTop;
    scrollLyrics();
  }
});

// ====== EMAIL NOTIFICATION SYSTEM ======
function sendDecisionEmail(type) {
  let templateID;

  if (type === "keep") {
    templateID = "template_4j2me57";
    console.log("KEEP email triggered");
  }

  if (type === "fade") {
    templateID = "template_lsiglrr";
    console.log("FADE email triggered");
  }

  if (window.emailjs) {
    emailjs.send(
      "service_k6r37m4",
      templateID,
      {
        decision: type,
        time: new Date().toLocaleString()
      }
    )
    .then(function(response) {
      console.log("Email sent successfully!");
    })
    .catch(function(error) {
      console.log("Email failed", error);
    });
  } else {
    console.log("EmailJS is not loaded.");
  }
}

function showEmailConfirmation() {
  let msg = document.getElementById("emailConfirmMsg");
  if (!msg) {
    msg = document.createElement("div");
    msg.id = "emailConfirmMsg";
    msg.textContent = "For a moment, something changed.";
    msg.style.cssText = "position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); background: rgba(0, 0, 0, 0.7); color: rgba(255, 255, 255, 0.9); padding: 12px 24px; border-radius: 30px; font-size: 0.95rem; z-index: 10000; opacity: 0; transition: opacity 1.5s ease; font-style: italic; border: 1px solid rgba(255, 255, 255, 0.15); backdrop-filter: blur(5px); pointer-events: none;";
    document.body.appendChild(msg);
  }
  
  // Trigger reflow and fade in
  setTimeout(() => {
    if (msg) msg.style.opacity = "1";
  }, 50);
}

const keepBtn = document.getElementById("keepBtn");
if (keepBtn) {
  keepBtn.addEventListener("click", function () {
    sendDecisionEmail("keep");
    localStorage.setItem("decision", "keep");
    showEmailConfirmation();
  });
}

const fadeBtn = document.getElementById("fadeBtn");
if (fadeBtn) {
  fadeBtn.addEventListener("click", function () {
    sendDecisionEmail("fade");
    localStorage.setItem("decision", "fade");
    showEmailConfirmation();
  });
}