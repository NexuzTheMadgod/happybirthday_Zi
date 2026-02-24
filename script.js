
// PHASE 1 – AGREEMENT LOGIC
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const agreeBtn = document.getElementById('agreeBtn');
const btnWrapper = agreeBtn.parentElement;
const overlay = document.getElementById('magic-overlay');
const phase1 = document.getElementById('phase1');
const phase2 = document.getElementById('phase2');

function checkAll() {
  const allChecked = Array.from(checkboxes).every(cb => cb.checked);
  agreeBtn.classList.toggle('enabled', allChecked);
}

checkboxes.forEach(cb => cb.addEventListener('change', checkAll));

agreeBtn.addEventListener('click', () => {
  if (!agreeBtn.classList.contains('enabled')) return;

  agreeBtn.classList.add('particle-active');

  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const angle = Math.random() * Math.PI * 2;
    const dist = 50 + Math.random() * 90;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 40;
    p.style.setProperty('--dx', `${dx}px`);
    p.style.setProperty('--dy', `${dy}px`);
    p.style.left = '50%';
    p.style.top = '50%';
    p.style.animationDelay = `${Math.random() * 0.5}s`;
    btnWrapper.appendChild(p);
    setTimeout(() => p.remove(), 2200);
  }

  setTimeout(() => {
    overlay.classList.add('active');

    for (let i = 0; i < 100; i++) {
      const g = document.createElement('div');
      g.classList.add('glitter');
      g.style.left = `${Math.random() * 100}%`;
      g.style.top = `${Math.random() * -50}%`;
      g.style.setProperty('--drift', `${(Math.random() - 0.5) * 60}px`);
      g.style.animationDelay = `${Math.random() * 4}s`;
      g.style.animationDuration = `${4 + Math.random() * 5}s`;
      overlay.appendChild(g);
      setTimeout(() => g.remove(), 10000);
    }

    const music = document.getElementById('bgMusic');
    music.play().then(() => {
      music.volume = 0.25;
    }).catch(() => {});

    alert("Yay! Agreement sealed with love 💜 baby Loading your birthday magic...");

    phase1.style.opacity = '0';
    setTimeout(() => {
      phase1.style.display = 'none';
      phase2.classList.remove('hidden');
      phase2.classList.add('visible');

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#c084fc', '#d8b4fe', '#ffffff']
      });

      for (let i = 0; i < 12; i++) {
        const b = document.createElement('div');
        b.classList.add('balloon');
        b.style.left = `${Math.random() * 100}%`;
        b.style.animationDelay = `${Math.random() * 6}s`;
        b.style.animationDuration = `${8 + Math.random() * 8}s`;
        document.body.appendChild(b);
        setTimeout(() => b.remove(), 20000);
      }
    }, 1200);
  }, 900);
});

// PHASE 2 – CODE ENTRY LOGIC + PHASE 3 TRIGGER
const codeEntry = document.getElementById('codeEntry');
const unlockButton = document.getElementById('unlockButton');
const wrongCodeMsg = document.getElementById('wrongCodeMsg');
const phase3 = document.getElementById('phase3');
const correctCode = '280207';

unlockButton.addEventListener('click', () => {
  let entered = codeEntry.value.trim();
  entered = entered.replace(/\s+/g, '');

  if (entered === correctCode) {
    wrongCodeMsg.classList.remove('visible');
    confetti({
      particleCount: 180,
      spread: 100,
      origin: { y: 0.6 }
    });

    // Balloons on correct code
    for (let i = 0; i < 12; i++) {
      const b = document.createElement('div');
      b.classList.add('balloon');
      b.style.left = `${Math.random() * 100}%`;
      b.style.animationDelay = `${Math.random() * 6}s`;
      b.style.animationDuration = `${8 + Math.random() * 8}s`;
      document.body.appendChild(b);
      setTimeout(() => b.remove(), 20000);
    }

    codeEntry.style.boxShadow = '0 0 30px #c084fc';

    setTimeout(() => {
      phase2.classList.remove('visible');
      phase2.classList.add('hidden');
      phase3.classList.remove('hidden');
      phase3.classList.add('visible');
      codeEntry.style.boxShadow = '';
    }, 1500);
  } else {
    wrongCodeMsg.classList.add('visible');
    codeEntry.classList.add('shake');
    setTimeout(() => {
      wrongCodeMsg.classList.remove('visible');
      codeEntry.classList.remove('shake');
    }, 3000);
  }
});

codeEntry.addEventListener('input', () => {
  wrongCodeMsg.classList.remove('visible');
});

// PHASE 3 – Envelope click logic (runs after phase3 is visible)
document.addEventListener('DOMContentLoaded', () => {
  const envelope = document.getElementById('envelope');
  const fadeLayer = document.getElementById('fadeLayer');
  const poemReveal = document.getElementById('poemReveal');
  const heartsContainer = document.getElementById('heartsContainer');

  function spawnHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = ['💜', '❤️', '💕', '💖'][Math.floor(Math.random() * 4)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.top = Math.random() * 120 + '%';
    heart.style.animationDuration = (7 + Math.random() * 7) + 's';
    heart.style.opacity = 0.4 + Math.random() * 0.6;
    heartsContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 14000);
  }

  if (envelope) {
    envelope.addEventListener('click', () => {
      fadeLayer.classList.add('active');

      const ripple = document.createElement('div');
      ripple.classList.add('ripple');
      ripple.style.left = '50%';
      ripple.style.top = '50%';
      document.getElementById('rippleLayer').appendChild(ripple);
      setTimeout(() => ripple.remove(), 5000);

      setInterval(spawnHeart, 300);

      setTimeout(() => {
        poemReveal.classList.add('visible');
        envelope.style.display = 'none';
      }, 4500);
    });

    // Initial hearts preview
    for (let i = 0; i < 6; i++) {
      setTimeout(spawnHeart, i * 1200);
    }
  }
});
