const guests = [
  "tyler",
  "shaneen",
  "lance",
  "grace",
  "asher",
  "ziv",
  "fan yi",
  "yushe",
  "regine"
];

const guestList = document.getElementById("guest-list");
let currentAudio = null;
let currentActive = null;

guests.forEach((name, index) => {
  const guestEl = document.createElement("div");
  guestEl.classList.add("guest");
  guestEl.textContent = `${index + 1}. ${name}`;

  guestEl.addEventListener("click", () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    if (currentActive) {
      currentActive.classList.remove("active");
    }

    const audio = new Audio(`audio/${name}.mp3`);
    audio.play();
    currentAudio = audio;
    guestEl.classList.add("active");
    currentActive = guestEl;
  });

  guestList.appendChild(guestEl);
});

// Play button does nothing for now, but you could trigger a party horn?
document.getElementById("play-btn").addEventListener("click", () => {
  alert("🎉 Let's get this party started!");
});
