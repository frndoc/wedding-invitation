const weddingDate = new Date("2026-10-10T15:00:00").getTime();

window.addEventListener("load", () => {
  setTimeout(() => document.getElementById("loader").classList.add("hide"), 700);
});

document.getElementById("openInvitation").addEventListener("click", () => {
  document.getElementById("invitation").scrollIntoView({behavior:"smooth"});
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
},{threshold:.12});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

function updateCountdown(){
  const now = Date.now();
  const distance = weddingDate - now;
  const values = {
    days: Math.max(0, Math.floor(distance / 86400000)),
    hours: Math.max(0, Math.floor((distance / 3600000) % 24)),
    minutes: Math.max(0, Math.floor((distance / 60000) % 60)),
    seconds: Math.max(0, Math.floor((distance / 1000) % 60))
  };
  Object.entries(values).forEach(([id,val]) => {
    document.getElementById(id).textContent = String(val).padStart(2,"0");
  });
}
updateCountdown();
setInterval(updateCountdown,1000);

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");
musicBtn.addEventListener("click", async () => {
  if (music.paused) {
    try { await music.play(); musicBtn.classList.add("playing"); }
    catch(e) { alert("error na pula, check audio filee"); }
  } else {
    music.pause();
    musicBtn.classList.remove("playing");
  }
});
