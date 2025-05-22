const guests = [
  { name: "tyler", team: "griefchapter", artist: "Mother Mother" },
  { name: "shaneen", team: "hte", artist: "Billie Eilish, Arctic Monkeys" },
  { name: "lance", team: "hte", artist: "Billie Eilish, Arctic Monkeys" },
  { name: "christie", team: "hte", artist: "Billie Eilish" },
  { name: "thassan", team: "hte", artist: "Billie Eilish" },
  { name: "charlotte", team: "satnightwrist", artist: "Deftones" },
  { name: "andrew", team: "satnightwrist", artist: "Deftones" },
  { name: "ji wei", team: "satnightwrist", artist: "Deftones" },
  { name: "jian yu", team: "satnightwrist", artist: "Deftones" },
  { name: "azelle", team: "hmhas", artist: "Billie Eilish" },
  { name: "kj", team: "hmhas", artist: "Billie Eilish" },
  { name: "dylan", team: "hmhas", artist: "Billie Eilish" },
  { name: "zhen yu", team: "hmhas", artist: "Billie Eilish" },
  { name: "jia ler", team: "hmhas", artist: "Billie Eilish" },
  { name: "grace", team: "humbug", artist: "Arctic Monkeys" },
  { name: "ziv", team: "humbug", artist: "Arctic Monkeys" },
  { name: "fan yi", team: "humbug", artist: "Arctic Monkeys" },
  { name: "yu zhe", team: "humbug", artist: "Arctic Monkeys" },
  { name: "regine", team: "humbug", artist: "Arctic Monkeys" },
  { name: "asher", team: "humbug", artist: "Arctic Monkeys, Korn" },
  { name: "hq", team: "peachy", artist: "Korn" },
  { name: "jaydon", team: "peachy", artist: "Korn" },
  { name: "praveen", team: "peachy", artist: "Korn" },
  { name: "blessi", team: "typical", artist: "Laufey" },
  { name: "hazel", team: "typical", artist: "Laufey" },
  { name: "victoria", team: "typical", artist: "Laufey" },
  { name: "caelyn", team: "typical", artist: "Laufey" },
  { name: "alexis", team: "typical", artist: "Laufey" },
];

const guestList = document.getElementById("guest-list");
const playBtn = document.getElementById("play-btn");
const playIcon = playBtn.querySelector("i");
const cover = document.querySelector('.playlist-header img');
const stickyTitle = document.getElementById('sticky-title');
const rightIcons = document.querySelector('.right-icons');

let currentAudio = null;
let currentActive = null;
let isPlaying = false;

function stopAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if (currentActive) {
    currentActive.classList.remove("active");
    currentActive = null;
  }
  playIcon.classList.remove("fa-pause");
  playIcon.classList.add("fa-play");
  isPlaying = false;
}

function playGuest(guest, guestEl) {
  stopAudio();

  const audio = new Audio(`audio/${guest.name}.m4a`);
  currentAudio = audio;
  currentActive = guestEl;

  audio.addEventListener("loadedmetadata", () => {
    audio.currentTime = 0.3;
    audio.play();
    guestEl.classList.add("active");
    playIcon.classList.remove("fa-play");
    playIcon.classList.add("fa-pause");
    isPlaying = true;
  });

  audio.addEventListener("ended", () => {
    stopAudio();
  });
}

// Generate guest list
guests.forEach((guest) => {
  const guestEl = document.createElement("div");
  guestEl.classList.add("guest");

  guestEl.innerHTML = `
    <img src="assets/${guest.team}.png" alt="${guest.team}" class="guest-img" />
    <div class="guest-info">
      <div class="guest-name">${guest.name}</div>
      <div class="guest-team">${guest.artist}</div>
    </div>
    <div class="guest-menu">...</div>
  `;

  guestEl.addEventListener("click", () => {
    if (currentActive === guestEl && isPlaying) {
      stopAudio();
    } else {
      playGuest(guest, guestEl);
    }
  });

  guestList.appendChild(guestEl);
});

// Scroll logic
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const scale = Math.max(0.45, 1 - scrollY / 300);
  cover.style.width = `${15 * scale}rem`;
  cover.style.height = `${15 * scale}rem`;
  cover.style.opacity = scale;

  if (scale === 0.45) {
    stickyTitle.style.opacity = 1;
  } else {
    stickyTitle.style.opacity = 0;
  }
});

// Play button behavior
playBtn.addEventListener("click", () => {
  if (isPlaying) {
    stopAudio();
    return;
  }

  const randomGuest = guests[Math.floor(Math.random() * guests.length)];
  const guestEls = document.querySelectorAll(".guest");

  guestEls.forEach((el) => {
    const name = el.querySelector(".guest-name").textContent.toLowerCase();
    if (name === randomGuest.name.toLowerCase()) {
      playGuest(randomGuest, el);
    }
  });
});
