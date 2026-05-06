// ====== PERMANENT DECISION LOCK & EPILOGUE (REVISIT BEHAVIOR) ======
(function() {
  if (localStorage.getItem("final_decision_locked") === "true") {
    let showEpilogue = false;
    let decision = localStorage.getItem("final_decision");
    
    if (localStorage.getItem("epilogue_ready") === "true" && localStorage.getItem("epilogue_shown") !== "true") {
      const epilogueTime = parseInt(localStorage.getItem("epilogue_time") || "0", 10);
      const hours12 = 12 * 60 * 60 * 1000;
      if (Date.now() - epilogueTime > hours12) {
        showEpilogue = true;
      }
    }

    const overlay = document.createElement("div");
    overlay.style.cssText = "position: fixed; inset: 0; background: #000; z-index: 2147483647; display: flex; flex-direction: column; align-items: center; justify-content: center; color: rgba(255,255,255,0.7); font-family: 'Playfair Display', serif; font-style: italic; font-size: clamp(1.2rem, 4vw, 1.5rem); letter-spacing: 0.05em; line-height: 2;";

    if (showEpilogue) {
      localStorage.setItem("epilogue_shown", "true");
      
      let l1, l2, l3;
      if (decision === 'keep') {
        l1 = "Some things stayed.";
        l2 = "Not loudly…<br>not obviously…";
        l3 = "But they did.";
      } else {
        l1 = "Some things faded.";
        l2 = "Not all at once…<br>but slowly…";
        l3 = "And that was enough.";
      }

      overlay.innerHTML = `
        <div style="text-align: center; max-width: 80%; margin: 0 auto; line-height: 2.2;">
          <p id="epi1" style="opacity: 0; transition: opacity 2s ease;">${l1}</p>
          <p id="epi2" style="opacity: 0; transition: opacity 2s ease; margin-top: 20px;">${l2}</p>
          <p id="epi3" style="opacity: 0; transition: opacity 2s ease; margin-top: 20px;">${l3}</p>
          <p id="epi4" style="opacity: 0; transition: opacity 2s ease; margin-top: 50px; font-size: 1.1em; color: rgba(255,255,255,0.9);">And life… kept going.</p>
          <p id="epi5" style="opacity: 0; transition: opacity 2s ease; position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%); font-family: 'Lato', sans-serif; font-size: 0.85rem; font-style: normal; color: rgba(255,255,255,0.3); letter-spacing: 0.1em; white-space: nowrap;">You came back.</p>
        </div>
      `;

      setTimeout(() => { const d1=document.getElementById('epi1'); if(d1) d1.style.opacity = '1'; }, 1500);
      setTimeout(() => { const d2=document.getElementById('epi2'); if(d2) d2.style.opacity = '1'; }, 4500);
      setTimeout(() => { const d3=document.getElementById('epi3'); if(d3) d3.style.opacity = '1'; }, 7500);
      setTimeout(() => { const d4=document.getElementById('epi4'); if(d4) d4.style.opacity = '1'; }, 11500);
      setTimeout(() => { const d5=document.getElementById('epi5'); if(d5) d5.style.opacity = '1'; }, 15500);

    } else {
      overlay.innerHTML = `
        <p style="opacity: 0; animation: fadeIn 2s ease forwards 1s;">This moment isn’t meant to repeat.</p>
        <p style="opacity: 0; animation: fadeIn 2s ease forwards 4s; margin-top: 30px;">And maybe…<br>that’s enough.</p>
        <style>@keyframes fadeIn { to { opacity: 1; } }</style>
      `;
    }

    document.documentElement.style.overflow = "hidden";
    if (document.body) {
      document.body.appendChild(overlay);
      document.body.style.overflow = "hidden";
    } else {
      document.addEventListener("DOMContentLoaded", () => {
        document.body.appendChild(overlay);
        document.body.style.overflow = "hidden";
      });
    }
  } else {
    // Hardened multi-layer tracking
    sessionStorage.setItem("session_seen", "true");
  }
})();

// ====== BACK BUTTON PROTECTION ======
history.pushState(null, null, location.href);
window.onpopstate = () => history.go(1);

// ====== FLICKER-FREE FIRST PAINT RESOLUTION ======
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
});

// ====== LIGHTWEIGHT PRIVACY-SAFE ANALYTICS ======
(function() {
  try {
    const now = Date.now();
    let visitCount = parseInt(localStorage.getItem('ols_visit_count') || '0', 10);
    const lastVisit = parseInt(localStorage.getItem('ols_last_visit_time') || '0', 10);
    
    // 3. Return Detection
    if (lastVisit > 0) {
      const hoursSince = (now - lastVisit) / (1000 * 60 * 60);
      if (hoursSince >= 24) {
        window._olsReturnStatus = 'deep_return';
      } else if (hoursSince >= 6) {
        window._olsReturnStatus = 'return_visit';
      } else {
        window._olsReturnStatus = 'active_session';
      }
      
      // If returning, increment visit
      if (hoursSince >= 6) {
        visitCount++;
      }
    } else {
      visitCount = 1;
      localStorage.setItem('ols_first_visit_time', now.toString());
      window._olsReturnStatus = 'first_visit';
    }

    localStorage.setItem('ols_visit_count', visitCount.toString());
    localStorage.setItem('ols_last_visit_time', now.toString());
    window._olsVisitCount = visitCount;

    // 2. Time Spent Tracking
    const sessionStart = now;
    window.addEventListener('beforeunload', () => {
      const sessionDuration = Date.now() - sessionStart;
      const totalTime = parseInt(localStorage.getItem('ols_total_time_spent') || '0', 10);
      localStorage.setItem('ols_total_time_spent', (totalTime + sessionDuration).toString());
      localStorage.setItem('ols_last_session_time', sessionDuration.toString());
    });
  } catch(e) {
    // Fail silently
  }
})();

// ====== ONE-TIME ACCESS — CONTROLLED VIEWING FLOW ======
// The birthday section is ALWAYS shown on every visit.
// Access to the OneLastSmile gift is controlled via:
//   1. Warning screen (shown when user clicks "One Last Smile")
//   2. warningContinue() in index.html checks localStorage
//      → First time:  opens the gift, sets "onelastsmile_viewed"
//      → Subsequent:  cinematic lock screen transition
//
// Key: "onelastsmile_viewed" (set in warningContinue on first entry)
// NO blocking, NO throw, NO page-load lock. Birthday always works.

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

// ====== GLOBAL INTERACTION & RIPPLE EFFECT ======
window._olsClickCount = 0;
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

document.addEventListener('click', function(e) {
  window._olsClickCount++;

  // Subtle ripple effect (disabled on mobile)
  if (!isTouchDevice) {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    document.body.appendChild(ripple);
    setTimeout(() => { if (ripple.parentNode) ripple.remove(); }, 800);
  }
}, { passive: true });

// ====== NAVBAR & HAMBURGER ======
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

let isScrolling = false;
window.addEventListener('scroll', () => {
  if (!isScrolling) {
    window.requestAnimationFrame(() => {
      if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
      isScrolling = false;
    });
    isScrolling = true;
  }
}, { passive: true });

if (hamburger) hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  if (navLinks) navLinks.classList.toggle('active');
});

if (navLinks) navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (hamburger) hamburger.classList.remove('active');
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

for (let i = 0; i < 60; i++) particles.push(new Particle());

let _heartAnimId = null;
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => p.update());
  _heartAnimId = requestAnimationFrame(animateParticles);
}
animateParticles();

window.addEventListener('resize', () => {
  // Resize without interrupting the loop — canvas clears automatically next frame
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  // Re-randomise particles that are now out of bounds
  particles.forEach(p => {
    if (p.x > canvas.width)  p.x = Math.random() * canvas.width;
    if (p.y > canvas.height) p.y = Math.random() * canvas.height;
  });
}, { passive: true });

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
    if (playIcon) playIcon.className = 'fas fa-play';
    if (vinyl)    vinyl.classList.remove('playing');
    if (equalizer) equalizer.classList.remove('active');
    cancelAnimationFrame(lyricsAnimationId);
    isPlaying = false;
  } else {
    var playP = bgAudio.play();
    if (playP !== undefined) {
      playP.then(() => {
        isPlaying = true;
        if (playIcon) playIcon.className = 'fas fa-pause';
        if (vinyl)    vinyl.classList.add('playing');
        if (equalizer) equalizer.classList.add('active');
        if (lyricsBox) exactScrollTop = lyricsBox.scrollTop;
        scrollLyrics();
      }).catch(e => console.log('Audio play blocked:', e));
    }
  }
}

function scrollLyrics() {
  if (!isPlaying || !lyricsBox) return;

  let lastTs = 0;
  function animate(ts) {
    if (!isPlaying) return;
    
    if (!lastTs) lastTs = ts;
    const dt = Math.min(ts - lastTs, 50); // cap delta to 50ms
    lastTs = ts;
    
    if (!isUserScrolling) {
      // 0.3px per 16.67ms frame -> 0.018 * dt
      exactScrollTop += 0.018 * dt;
      
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

var _fireworksInterval = null;  // stored so it can be cleared

function createFireworks(container) {
  // Initial burst
  for (let i = 0; i < 30; i++) {
    const heart = document.createElement('i');
    heart.className = 'fas fa-heart';
    heart.style.cssText = `position:absolute;color:#ff4d85;font-size:${Math.random()*20+10}px;left:50%;top:50%;transform:translate(-50%,-50%);z-index:100;transition:all 1s ease-out;`;
    const angle = Math.random() * Math.PI * 2;
    const vel   = Math.random() * 100 + 50;
    const tx = Math.cos(angle) * vel, ty = Math.sin(angle) * vel;
    container.appendChild(heart);
    setTimeout(() => { heart.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`; heart.style.opacity = '0'; }, 50);
    setTimeout(() => heart.remove(), 1050);
  }
  // Continuous rain — stored so it can be cleared
  if (_fireworksInterval) clearInterval(_fireworksInterval);
  _fireworksInterval = setInterval(() => {
    const h = document.createElement('i');
    h.className = 'fas fa-heart';
    h.style.cssText = `position:absolute;color:${Math.random()>0.5?'#ff4d85':'#a239ca'};left:${Math.random()*100}%;top:-20px;font-size:${Math.random()*15+10}px;opacity:0.7;transition:top 3s linear,opacity 3s linear;`;
    const fw = document.getElementById('fireworks');
    if (!fw) { clearInterval(_fireworksInterval); return; }
    fw.appendChild(h);
    setTimeout(() => { h.style.top = '100%'; h.style.opacity = '0'; }, 50);
    setTimeout(() => h.remove(), 3050);
  }, 300);
}

// ====== HESITATION TRACKING ======
(function() {
  if (localStorage.getItem("final_decision_locked") === "true") return;
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  let hesitationTimer = null;
  let hasHesitated = false;
  let hoverCount = 0;
  window._olsHesitationTime = 0;
  let hoverStart = 0;
  
  const finalButtons = document.getElementById('finalButtons');
  if (!finalButtons) return;

  finalButtons.addEventListener('mouseenter', () => {
    hoverStart = Date.now();
    hoverCount++;
    clearTimeout(hesitationTimer);
    hesitationTimer = setTimeout(() => {
      if (hasHesitated) return;
      hasHesitated = true;
      finalButtons.style.filter = 'brightness(0.85) contrast(0.95)';
      const prompt = document.createElement('div');
      prompt.style.cssText = "position:fixed;top:70%;left:50%;transform:translate(-50%, -50%);color:rgba(255,182,210,0.6);font-family:'Playfair Display',serif;font-style:italic;font-size:1.05rem;pointer-events:none;z-index:99999;opacity:0;transition:opacity 2s ease;letter-spacing:0.05em;white-space:nowrap;";
      prompt.innerText = "It’s okay… take your time.";
      document.body.appendChild(prompt);
      setTimeout(() => prompt.style.opacity = '1', 100);
      setTimeout(() => prompt.style.opacity = '0', 4000);
    }, 3000);
  }, { passive: true });

  finalButtons.addEventListener('mouseleave', () => {
    if (hoverStart > 0) window._olsHesitationTime += (Date.now() - hoverStart);
    clearTimeout(hesitationTimer);
    if (hoverCount > 2) finalButtons.style.filter = 'brightness(0.85)';
  }, { passive: true });
})();

// ====== DYNAMIC ENDING LOGIC (CONNECTED TO EMAILJS) ======
function handleEndingDecision(decision) {
  if (localStorage.getItem("final_decision_locked") === "true") return;
  try { 
    localStorage.setItem("final_decision", decision); 
    localStorage.setItem("final_decision_locked", "true");
    localStorage.setItem("epilogue_ready", "true");
    localStorage.setItem("epilogue_time", Date.now().toString());
  } catch(e){}
  
  window._olsExiting = true; // Signal behavioral layer to stop interfering

  const btnId = decision === 'keep' ? 'keepBtn' : 'fadeBtn';
  const btn = document.getElementById(btnId);
  const otherBtnId = decision === 'keep' ? 'fadeBtn' : 'keepBtn';
  const otherBtn = document.getElementById(otherBtnId);

  // Lock UI Immediately
  if (btn) {
    btn.classList.add('pulse');
    btn.style.pointerEvents = 'none';
  }
  if (otherBtn) {
    otherBtn.style.opacity = '0.3';
    otherBtn.style.pointerEvents = 'none';
  }
  const finalButtons = document.getElementById('finalButtons');
  if (finalButtons) finalButtons.style.pointerEvents = 'none';

  // 1. Trigger EmailJS silently
  const timeSpent = window._olsStartTime ? Date.now() - window._olsStartTime : 0;
  const hesiTime = window._olsHesitationTime || 0;
  const cumulativeTime = parseInt(localStorage.getItem('ols_total_time_spent') || '0', 10) + timeSpent;
  
  let templateID = decision === 'keep' ? "template_4j2me57" : "template_lsiglrr";
  if (window.emailjs) {
    emailjs.send("service_k6r37m4", templateID, {
        decision: decision.toUpperCase(),
        time_spent: Math.floor(timeSpent / 1000) + "s",
        hesitation_time: Math.floor(hesiTime / 1000) + "s",
        cumulative_time: Math.floor(cumulativeTime / 1000) + "s",
        visit_count: window._olsVisitCount || 1,
        return_status: window._olsReturnStatus || "first_visit",
        time: new Date().toLocaleString()
    }).catch(err => console.log("EmailJS logged silently")); 
  }

  // 2. Pause for 0.5s (Emotional Weight)
  setTimeout(() => {
    // 3. Fade out music slowly
    const audio = document.getElementById('bgAudio');
    if (audio && !audio.paused) {
      let step = audio.volume / 40;
      let fadeOut = setInterval(() => {
        if (audio.volume > step) audio.volume -= step;
        else { audio.volume = 0; audio.pause(); clearInterval(fadeOut); isPlaying = false; }
      }, 50);
    }

    const dynamicScreen = document.getElementById('dynamicEndingScreen');
    if (!dynamicScreen) return;

    const bg = document.getElementById('deBg');
    const vig = document.getElementById('deVignette');
    const l1 = document.getElementById('deLine1');
    const l2 = document.getElementById('deLine2');
    const l3 = document.getElementById('deLine3');
    const l4 = document.getElementById('deLine4');
    const sig = document.getElementById('deSig');
    const extra = document.getElementById('deExtra');
    const finalSilenceText = document.getElementById('deFinalSilence');

    const hesitatedLong = hesiTime > 3000;

    if (decision === 'keep') {
      bg.className = 'de-bg theme-keep';
      vig.className = 'de-vignette theme-keep';
      l1.innerHTML = "Some things don’t fade.";
      l2.innerHTML = "They stay… quietly.";
      l3.innerHTML = "And maybe…<br>this was one of them.";
      l3.style.display = 'block';
      l4.innerHTML = "A smile that stayed.";
      l4.className = 'de-line de-final theme-keep-final';
      
      let extraText = "";
      if (hesitatedLong) extraText = "You thought about it…<br><span style='opacity:0.6;font-size:0.9em;display:block;margin-top:8px;'>and still chose to keep it.</span>";
      else extraText = "You chose to keep it.";
      extra.innerHTML = extraText;
      
      if (typeof particles !== 'undefined') {
        particles.forEach(p => { 
          p.opacity = Math.min(1, p.opacity * 1.5); 
          p.speed = p.speed * 1.2;
        });
      }
    } else {
      bg.className = 'de-bg theme-fade';
      vig.className = 'de-vignette theme-fade';
      l1.innerHTML = "Not everything is meant to stay.";
      l2.innerHTML = "Some things…<br>are only meant to be felt once.";
      l3.innerHTML = ""; 
      l3.style.display = 'none';
      l4.innerHTML = "And then… let go.";
      l4.className = 'de-line de-final theme-fade-final';
      
      let extraText = "";
      if (hesitatedLong) extraText = "Letting go isn’t easy…<br><span style='opacity:0.6;font-size:0.9em;display:block;margin-top:8px;'>but you still did.</span>";
      else extraText = "You chose to let it go.";
      extra.innerHTML = extraText;
      
      const canvas = document.getElementById('heartCanvas');
      if (canvas) {
        canvas.style.transition = 'opacity 3s ease';
        canvas.style.opacity = '0';
      }
    }

    dynamicScreen.classList.add('active');

    setTimeout(() => l1.classList.add('visible'), 2500);
    setTimeout(() => l2.classList.add('visible'), 5500);
    
    let timeOffset = 0;
    if (decision === 'keep') {
      setTimeout(() => l3.classList.add('visible'), 8500);
      setTimeout(() => l4.classList.add('visible'), 11500);
      timeOffset = 11500;
    } else {
      setTimeout(() => l4.classList.add('visible'), 9000);
      timeOffset = 9000;
    }

    setTimeout(() => sig.classList.add('visible'), timeOffset + 2500);
    setTimeout(() => extra.classList.add('visible'), timeOffset + 5500);

    // Final Silence 
    setTimeout(() => {
      l1.style.opacity = '0';
      l2.style.opacity = '0';
      l3.style.opacity = '0';
      l4.style.opacity = '0';
      sig.style.opacity = '0';
      extra.style.opacity = '0';
      
      setTimeout(() => {
        if (finalSilenceText) finalSilenceText.classList.add('visible');
      }, 2500); 
    }, timeOffset + 10500); 

  }, 500); // 0.5s pause before fading to black
}

function keepStory() { handleEndingDecision('keep'); }
function fadeAway()  { handleEndingDecision('fade'); }
function triggerSecretEnding() { /* Safely deprecated */ }
// Auto Scroll Lyrics logic integrated into music player

// ====== SYNC WITH BIRTHDAY FLOW MUSIC START ======
window.addEventListener('bdMusicStarted', function () {
  // Gift intro / birthday overlay started audio and synced UI icons.
  // Mark isPlaying=true so toggleMusic() won't double-play.
  isPlaying = true;
  // Restart lyrics scroll (cancel any stale loop first)
  cancelAnimationFrame(lyricsAnimationId);
  if (lyricsBox) {
    exactScrollTop = lyricsBox.scrollTop;
    scrollLyrics();
  }
  // Re-attach cursor hover to newly-visible interactive elements
  if (!isTouchDevice && cursor) {
    document.querySelectorAll('a, button, .nav-logo, .trait, .dot, .quote-nav-btn').forEach(el => {
      el.removeEventListener('mouseenter', _cursorHoverOn);
      el.removeEventListener('mouseleave', _cursorHoverOff);
      el.addEventListener('mouseenter', _cursorHoverOn);
      el.addEventListener('mouseleave', _cursorHoverOff);
    });
  }
});

// Named cursor hover handlers (reusable, no duplicate listeners)
function _cursorHoverOn()  { if (cursor) cursor.classList.add('hovering'); }
function _cursorHoverOff() { if (cursor) cursor.classList.remove('hovering'); }

// ====== "YOU STAYED TILL THE END" HIDDEN DETAIL ======
(function () {
  var _stayTimer = null;
  var _stayShown = false;

  var finalSection = document.getElementById('final-choice');
  if (!finalSection) return;

  var stayObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !_stayShown) {
        _stayTimer = setTimeout(function () {
          var el = document.getElementById('stayMessage');
          if (el) { el.classList.add('stay-visible'); _stayShown = true; }
        }, 3500);
      } else {
        clearTimeout(_stayTimer);
      }
    });
  }, { threshold: 0.4 });

  stayObs.observe(finalSection);
})();

// Old standalone EmailJS listeners and confirmation toast removed,
// as they are now securely and elegantly bundled into handleEndingDecision().

// ═══════════════════════════════════════════════════════════════
//  CINEMATIC ENHANCEMENT LAYER — JS-driven immersive upgrades
//  Subtle. Emotional. Premium. Performance-safe.
// ═══════════════════════════════════════════════════════════════
(function () {
  'use strict';

  // ─────────────────────────────────────────────────────────────
  //  1. HERO PARALLAX — scroll-driven, RAF-throttled
  //     Background drifts at 0.25× scroll rate
  //     Foreground counter-drifts at 0.06× (natural float)
  // ─────────────────────────────────────────────────────────────
  var hero = document.querySelector('.hero');
  if (hero) {
    var parallaxBg = document.createElement('div');
    parallaxBg.className = 'hero-parallax-bg';
    hero.insertBefore(parallaxBg, hero.firstChild);
    hero.classList.add('has-parallax');

    var heroContent = hero.querySelector('.hero-content');
    if (heroContent) heroContent.classList.add('parallax-fg');

    var _pRaf = null;
    function applyParallax() {
      _pRaf = null;
      var sy = window.scrollY;
      if (sy > hero.offsetTop + hero.offsetHeight) return;
      parallaxBg.style.transform  = 'translateY(' + (sy * 0.25) + 'px)';
      if (heroContent) heroContent.style.transform = 'translateY(' + (-sy * 0.06) + 'px)';
    }
    window.addEventListener('scroll', function () {
      if (!_pRaf) _pRaf = requestAnimationFrame(applyParallax);
    }, { passive: true });
  }

  // ─────────────────────────────────────────────────────────────
  //  2. LIGHT SWEEP LAYER — slow cinematic reflection
  //     Pure CSS pseudo-element; just inject the wrapper div.
  // ─────────────────────────────────────────────────────────────
  var sweepLayer = document.createElement('div');
  sweepLayer.className = 'light-sweep-layer';
  document.body.appendChild(sweepLayer);

  // ─────────────────────────────────────────────────────────────
  //  3. PARTICLE REFINEMENT — fewer, slower, softer
  // ─────────────────────────────────────────────────────────────
  setTimeout(function () {
    if (typeof particles !== 'undefined' && Array.isArray(particles)) {
      // Remove ~20 particles (down from 80 → ~60)
      particles.splice(0, 20);
      // Slow + soften survivors
      particles.forEach(function (p) {
        p.speed        = p.speed        * 0.55;
        p.opacity      = Math.max(0.04, p.opacity * 0.72);
        p.twinkleSpeed = p.twinkleSpeed * 0.60;
        p.twinklePhase = Math.random() * Math.PI * 2;
      });
    }
  }, 250);

  // ─────────────────────────────────────────────────────────────
  //  4. LYRIC LINE HIGHLIGHTING — active line glows on scroll
  // ─────────────────────────────────────────────────────────────
  var lyricsBoxEl = document.querySelector('.lyrics-box');
  if (lyricsBoxEl) {
    var _lRaf = null;
    function highlightLyric() {
      _lRaf = null;
      var lines = lyricsBoxEl.querySelectorAll('.cinematic-line');
      if (!lines.length) return;
      var center = lyricsBoxEl.scrollTop + lyricsBoxEl.clientHeight * 0.42;
      var closest = null, closestD = Infinity;
      lines.forEach(function (l) {
        var d = Math.abs(l.offsetTop - center);
        l.classList.remove('lyric-active');
        if (d < closestD) { closestD = d; closest = l; }
      });
      if (closest) closest.classList.add('lyric-active');
    }
    lyricsBoxEl.addEventListener('scroll', function () {
      if (!_lRaf) _lRaf = requestAnimationFrame(highlightLyric);
    }, { passive: true });
  }

  // ─────────────────────────────────────────────────────────────
  //  5. MUSIC SECTION AURA — visual pulse when playing
  // ─────────────────────────────────────────────────────────────
  var musicSect = document.querySelector('.music-section');
  if (musicSect) {
    var audioEl2 = document.getElementById('bgAudio');
    if (audioEl2) {
      audioEl2.addEventListener('play',  function () { musicSect.classList.add('music-playing'); });
      audioEl2.addEventListener('pause', function () { musicSect.classList.remove('music-playing'); });
    }
    window.addEventListener('bdMusicStarted', function () {
      musicSect.classList.add('music-playing');
    });
  }

  // ─────────────────────────────────────────────────────────────
  //  6. GLASS PANELS — soft blur behind key text blocks
  // ─────────────────────────────────────────────────────────────
  ['.about-text', '.confession-content', '.story-scroll-box', '.propose-message']
    .forEach(function (sel) {
      var el = document.querySelector(sel);
      if (el) el.classList.add('glass-panel');
    });

  // ─────────────────────────────────────────────────────────────
  //  7. FINAL MOMENT LINGERING GLOW
  //     Injected glow div activates when secret text fades (~7s mark).
  //     Holds for 2 calm seconds, then dissolves.
  // ─────────────────────────────────────────────────────────────
  var lingerGlow = document.createElement('div');
  lingerGlow.className = 'ols-linger-glow';
  document.body.appendChild(lingerGlow);

  var _origSecret = window.triggerSecretEnding;
  if (typeof _origSecret === 'function') {
    window.triggerSecretEnding = function () {
      _origSecret.apply(this, arguments);
      // At ~7.2s the secret text wrapper starts fading → activate glow
      setTimeout(function () {
        lingerGlow.classList.add('active');
        // Hold for 2s then fade out
        setTimeout(function () {
          lingerGlow.classList.remove('active');
          lingerGlow.classList.add('fade-out');
        }, 2000);
      }, 7200);
    };
  }

  // ─────────────────────────────────────────────────────────────
  //  8. TEXT EMPHASIS — glow-phrase spans on hero tagline
  // ─────────────────────────────────────────────────────────────
  function wrapPhrase(selector, phrase) {
    var el = document.querySelector(selector);
    if (!el) return;
    // Safely replace plain text without touching HTML tags
    el.innerHTML = el.innerHTML.replace(
      phrase,
      '<span class="glow-phrase">' + phrase + '</span>'
    );
  }
  wrapPhrase('.hero-tagline', 'stay somewhere in your world');

})();

// ═══════════════════════════════════════════════════════════════
//  BEHAVIORAL INTERACTION LAYER — Responsive to user state
// ═══════════════════════════════════════════════════════════════
(function () {
  'use strict';

  // 8. Mobile Rules — Disable complex tracking on touch devices
  var isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
  if (isTouch) return;

  var body = document.body;

  // --- 1. SCROLL BEHAVIOR DETECTION ---
  var lastScrollY = window.scrollY;
  var scrollRaf = null;
  var scrollResetTimeout = null;

  function trackScroll() {
    scrollRaf = null;
    var currentY = window.scrollY;
    var dy = Math.abs(currentY - lastScrollY);
    lastScrollY = currentY;

    if (dy > 40) {
      body.classList.add('scroll-fast');
      body.classList.remove('scroll-slow');
    } else if (dy > 0 && dy < 15) {
      body.classList.add('scroll-slow');
      body.classList.remove('scroll-fast');
    }

    clearTimeout(scrollResetTimeout);
    scrollResetTimeout = setTimeout(function() {
      body.classList.remove('scroll-fast', 'scroll-slow');
    }, 200);
  }

  window.addEventListener('scroll', function() {
    if (!scrollRaf) scrollRaf = requestAnimationFrame(trackScroll);
    resetIdle();
  }, { passive: true });

  // --- 2. PAUSE DETECTION & 6. BREATHING UI ---
  var idleTimer = null;
  var isIdle = false;
  var idlePrompt = document.createElement('div');
  idlePrompt.className = 'idle-prompt';
  
  // 6. Soft Internal Response
  if (window._olsReturnStatus === 'return_visit' || window._olsReturnStatus === 'deep_return') {
    idlePrompt.textContent = "You came back…";
  } else if (window._olsVisitCount > 1) {
    idlePrompt.textContent = "Some things stay with us…";
  } else {
    idlePrompt.textContent = "Still here…";
  }
  
  document.body.appendChild(idlePrompt);
  var promptFadeTimeout = null;

  function setIdle() {
    if (isIdle) return;
    isIdle = true;
    body.classList.add('is-idle');
    
    // Show text: "Still here..."
    idlePrompt.classList.add('visible');
    clearTimeout(promptFadeTimeout);
    promptFadeTimeout = setTimeout(function() {
      idlePrompt.classList.remove('visible');
    }, 2000);

    // 7. Music Response (Lower Volume)
    fadeMusicVolume(0.20);
  }

  function resetIdle() {
    clearTimeout(idleTimer);
    if (isIdle) {
      isIdle = false;
      body.classList.remove('is-idle');
      idlePrompt.classList.remove('visible');
      // 7. Restore Volume
      fadeMusicVolume(0.45);
    }
    idleTimer = setTimeout(setIdle, 4500); // 4.5s of no interaction
  }

  function fadeMusicVolume(target) {
    var audio = document.getElementById('bgAudio');
    if (!audio || audio.paused || !window._bdMusicActive) return;
    if (window._olsExiting) return; // Don't interrupt cinematic exit

    var diff = target - audio.volume;
    var step = diff / 30; // 30 steps over 1.5s
    var count = 0;
    var fade = setInterval(function() {
      count++;
      var nextVol = audio.volume + step;
      audio.volume = Math.max(0, Math.min(1, nextVol));
      if (count >= 30) {
        audio.volume = target;
        clearInterval(fade);
      }
    }, 50);
  }

  window.addEventListener('mousemove', resetIdle, { passive: true });
  window.addEventListener('click', resetIdle, { passive: true });
  idleTimer = setTimeout(setIdle, 4500);

  // --- 3. ENGAGEMENT RESPONSE ---
  var clicks = 0;
  var highEngagement = false;

  window.addEventListener('click', function() {
    clicks++;
    if (!highEngagement && clicks > 4) {
      highEngagement = true;
      body.classList.add('high-engagement');
    }
  }, { passive: true });

  // --- 5. CURSOR PROXIMITY EFFECT ---
  var proxTargets = null;
  var mouseX = 0, mouseY = 0;
  var proxRaf = null;

  function updateProximity() {
    proxRaf = null;
    if (!proxTargets) {
      proxTargets = document.querySelectorAll('.reason-card, .timeline-content, .btn-primary, .btn-secondary, .quote-card.active, .glass-panel');
    }
    
    proxTargets.forEach(function(el) {
      var rect = el.getBoundingClientRect();
      // Calculate distance from cursor to closest edge of the element
      var dx = Math.max(rect.left - mouseX, 0, mouseX - rect.right);
      var dy = Math.max(rect.top - mouseY, 0, mouseY - rect.bottom);
      var dist = Math.sqrt(dx*dx + dy*dy);

      if (dist < 80) { // Trigger effect when within 80px
        el.classList.add('prox-near');
      } else {
        el.classList.remove('prox-near');
      }
    });
  }

  window.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!proxRaf) proxRaf = requestAnimationFrame(updateProximity);
  }, { passive: true });

})();

// ====== GLOBAL MUSIC RELIABILITY FIX ======
let _globalMusicStarted = false;
document.addEventListener("click", () => {
  if (!_globalMusicStarted) {
    var audio = document.getElementById('bgAudio');
    if (audio && audio.paused) {
      audio.volume = 0;
      audio.play().then(() => {
        let step = 0;
        let fade = setInterval(() => {
          step++;
          audio.volume = Math.min(0.35, (step / 40) * 0.35);
          if (step >= 40) clearInterval(fade);
        }, 50);
        _globalMusicStarted = true;
      }).catch(() => {});
    } else {
      _globalMusicStarted = true;
    }
  }
}, { once: true });