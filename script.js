// ---------- PARTICLE NETWORK (Background Stars) ----------
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
const PARTICLE_COUNT = 160;
const CONNECTION_DIST = 140;

function initCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
initCanvas();

window.addEventListener('resize', () => {
    initCanvas();
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.8 + 0.5,
            speedX: (Math.random() - 0.5) * 0.4,
            speedY: (Math.random() - 0.5) * 0.4,
        });
    }
});

for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.5,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
    });
}

function draw() {
    ctx.clearRect(0, 0, width, height);

    for (let p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.shadowColor = '#00f3ff';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < CONNECTION_DIST) {
                const opacity = (1 - dist / CONNECTION_DIST) * 0.6;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(0, 243, 255, ${opacity})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(draw);
}

draw();

// ---------- COPY GAME UID FUNCTION ----------
function copyUid() {
    const uidElement = document.getElementById('gameUid');
    const uidText = uidElement.innerText;
    
    navigator.clipboard.writeText(uidText).then(() => {
        const msg = document.getElementById('copyMessage');
        msg.classList.add('show');
        setTimeout(() => {
            msg.classList.remove('show');
        }, 2000);
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = uidText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        const msg = document.getElementById('copyMessage');
        msg.classList.add('show');
        setTimeout(() => {
            msg.classList.remove('show');
        }, 2000);
    });
}

// =========================================================
// 🎵 MUSIC PLAYER (Play/Pause Toggle) - NAYA FUNCTION
// =========================================================
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const musicIcon = document.getElementById('musicIcon');

function toggleMusic() {
    if (music.paused) {
        music.play().catch(error => {
            console.log('Audio play failed:', error);
            alert('⚠️ Audio file could not be loaded. Please check the URL.');
        });
        musicIcon.className = 'fas fa-pause';
        musicBtn.classList.add('playing');
    } else {
        music.pause();
        musicIcon.className = 'fas fa-play';
        musicBtn.classList.remove('playing');
    }
}

// Reset button when song ends
music.addEventListener('ended', () => {
    musicIcon.className = 'fas fa-play';
    musicBtn.classList.remove('playing');
});

// =========================================================
// 📧 EMAIL FALLBACK (Agar mailto na khule toh)
// =========================================================
document.getElementById('emailBtn').addEventListener('click', function(e) {
    // Agar default email client nahi khulta, toh yeh fallback kaam karega
    // Browser khud mailto handle karta hai, agar nahi hota toh hum alert de sakte hain
    // Lekin yeh sirf extra safety ke liye hai
    console.log('Email link clicked: AMANKMR62017@GMAIL.COM');
});
